const { db: firestore } = require('./firebase-admin-config');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');
const xml2js = require('xml2js');
const { Transform } = require('stream');

// IRS BMF state files - these are the regions we'll pull from
const BMF_REGIONS = [
    'eo_al', 'eo_ak', 'eo_az', 'eo_ar', 'eo_ca', 'eo_co', 'eo_ct', 'eo_de', 'eo_dc',
    'eo_fl', 'eo_ga', 'eo_hi', 'eo_id', 'eo_il', 'eo_in', 'eo_ia', 'eo_ks', 'eo_ky',
    'eo_la', 'eo_me', 'eo_md', 'eo_ma', 'eo_mi', 'eo_mn', 'eo_ms', 'eo_mo', 'eo_mt',
    'eo_ne', 'eo_nv', 'eo_nh', 'eo_nj', 'eo_nm', 'eo_ny', 'eo_nc', 'eo_nd', 'eo_oh',
    'eo_ok', 'eo_or', 'eo_pa', 'eo_ri', 'eo_sc', 'eo_sd', 'eo_tn', 'eo_tx', 'eo_ut',
    'eo_vt', 'eo_va', 'eo_wa', 'eo_wv', 'eo_wi', 'eo_wy'
];

// Data source URLs and configurations
const URLS = {
    // IRS Business Master File base URL (state files)
    BMF_BASE: 'https://www.irs.gov/pub/irs-soi',
    // IRS Form 990 E-File data on AWS (using 2023 index as it's the latest available)
    EFILE_BASE: 'https://s3.amazonaws.com/irs-form-990',
    EFILE_INDEX: 'https://s3.amazonaws.com/irs-form-990/index_2023.json',
    // ProPublica API
    PROPUBLICA: 'https://projects.propublica.org/nonprofits/api/v2'
};

// BMF file structure based on IRS documentation
interface BMFRecord {
    EIN: string;
    NAME: string;
    ICO: string;
    STREET: string;
    CITY: string;
    STATE: string;
    ZIP: string;
    GROUP: string;
    SUBSECTION: string;
    AFFILIATION: string;
    CLASSIFICATION: string;
    RULING: string;
    DEDUCTIBILITY: string;
    FOUNDATION: string;
    ACTIVITY: string;
    ORGANIZATION: string;
    STATUS: string;
    TAX_PERIOD: string;
    ASSET_CD: string;
    INCOME_CD: string;
    FILING_REQ_CD: string;
    PF_FILING_REQ_CD: string;
    ACCT_PD: string;
    ASSET_AMT: string;
    INCOME_AMT: string;
    REVENUE_AMT: string;
    NTEE_CD: string;
    SORT_NAME: string;
}

interface Form990Data {
    ReturnHeader: {
        ReturnTs: string;
        TaxPeriodEndDt: string;
        ReturnTypeCd: string;
    };
    ReturnData: {
        IRS990: {
            // Core form data
            GrossReceiptsAmt?: string;
            TotalAssetsEOYAmt?: string;
            TotalLiabilitiesEOYAmt?: string;
            TotalRevenueAmt?: string;
            TotalExpensesAmt?: string;
            // Program service accomplishments
            ProgramServiceAccomplishmentGrp?: {
                DescriptionProgramSrvcAccomTxt?: string;
                ExpenseAmt?: string;
                GrantAmt?: string;
                RevenueAmt?: string;
            }[];
            // Key employees and compensation
            CompensationOfHghstPdEmplGrp?: {
                PersonNm?: string;
                TitleTxt?: string;
                CompensationAmt?: string;
            }[];
        };
    };
}

async function processBMFStream(region: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Downloading BMF data for region: ${region}`);
            const response = await axios.get(`${URLS.BMF_BASE}/${region}.csv`, {
                responseType: 'stream'
            });

            const parser = csv.parse({
                columns: true,
                skip_empty_lines: true,
                trim: true
            });

            let batch: BMFRecord[] = [];
            const batchSize = 100;

            const processStream = new Transform({
                objectMode: true,
                async transform(record, encoding, callback) {
                    batch.push(record);
                    
                    if (batch.length >= batchSize) {
                        try {
                            await processBatch(batch);
                            batch = [];
                            callback();
                        } catch (error) {
                            callback(error);
                        }
                    } else {
                        callback();
                    }
                },
                async flush(callback) {
                    if (batch.length > 0) {
                        try {
                            await processBatch(batch);
                            callback();
                        } catch (error) {
                            callback(error);
                        }
                    } else {
                        callback();
                    }
                }
            });

            response.data
                .pipe(parser)
                .pipe(processStream)
                .on('finish', () => {
                    console.log(`Finished processing region: ${region}`);
                    resolve();
                })
                .on('error', (error) => {
                    console.error(`Error processing ${region}:`, error);
                    reject(error);
                });
        } catch (error) {
            console.error(`Error downloading BMF data for region ${region}:`, error);
            reject(error);
        }
    });
}

async function processBatch(records: BMFRecord[]): Promise<void> {
    let successCount = 0;
    let failureCount = 0;
    let enrichmentFailures = 0;
    let firebaseFailures = 0;

    await Promise.all(records.map(async (record) => {
        try {
            const enrichedData = await enrichCharityData(record);
            if (enrichedData) {
                try {
                    await firestore.collection('charities').doc(record.EIN).set(enrichedData);
                    successCount++;
                } catch (error) {
                    console.error(`Error saving to Firestore for EIN ${record.EIN}:`, error);
                    firebaseFailures++;
                    failureCount++;
                }
            } else {
                enrichmentFailures++;
                failureCount++;
            }
        } catch (error) {
            console.error(`Error processing record ${record.EIN}:`, error);
            enrichmentFailures++;
            failureCount++;
        }
    }));

    console.log(`Batch processing complete:
    - Success: ${successCount}
    - Total Failures: ${failureCount}
      - Enrichment Failures: ${enrichmentFailures}
      - Firebase Failures: ${firebaseFailures}`);
}

async function getEFileData(ein: string): Promise<Form990Data | null> {
    try {
        // Get the index file for 2023 (latest available)
        const indexResponse = await axios.get(URLS.EFILE_INDEX);
        const filings = indexResponse.data.Filings.filter(f => f.EIN === ein);
        
        if (filings.length === 0) {
            return null;
        }
        
        // Get the most recent filing
        const latestFiling = filings[0];
        const xmlUrl = `${URLS.EFILE_BASE}/${latestFiling.ObjectId}_public.xml`;
        
        // Download and parse the XML file
        const xmlResponse = await axios.get(xmlUrl);
        const parser = new xml2js.Parser({ 
            explicitArray: false, 
            trim: true,
            explicitRoot: false 
        });
        const result = await parser.parseStringPromise(xmlResponse.data);
        
        return result.Return;
    } catch (error) {
        console.error(`Error fetching E-File data for EIN ${ein}:`, error);
        return null;
    }
}

async function getProPublicaData(ein: string): Promise<any> {
    try {
        const response = await axios.get(
            `${URLS.PROPUBLICA}/organizations/${ein}.json`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching ProPublica data for EIN ${ein}:`, error);
        return null;
    }
}

async function enrichCharityData(bmfRecord: BMFRecord): Promise<any> {
    try {
        console.log(`Enriching data for ${bmfRecord.NAME} (${bmfRecord.EIN})...`);
        
        // First, get existing data from Firestore
        const existingDoc = await firestore.collection('charities').doc(bmfRecord.EIN).get();
        const existingData = existingDoc.exists ? existingDoc.data() : {};
        
        if (existingDoc.exists) {
            console.log(`Found existing record for ${bmfRecord.EIN}, merging data...`);
        } else {
            console.log(`Creating new record for ${bmfRecord.EIN}...`);
        }
        
        // Fetch additional data in parallel
        const [efileData, propublicaData] = await Promise.all([
            getEFileData(bmfRecord.EIN),
            getProPublicaData(bmfRecord.EIN)
        ]);
        
        // Combine all data sources, preserving existing data
        const enrichedData = {
            ...existingData, // Keep existing data as base
            ein: bmfRecord.EIN,
            name: bmfRecord.NAME || existingData?.name,
            address: {
                ...existingData?.address,
                street: bmfRecord.STREET || existingData?.address?.street,
                city: bmfRecord.CITY || existingData?.address?.city,
                state: bmfRecord.STATE || existingData?.address?.state,
                zip: bmfRecord.ZIP || existingData?.address?.zip
            },
            classification: {
                ...existingData?.classification,
                subsection: bmfRecord.SUBSECTION || existingData?.classification?.subsection,
                foundationStatus: bmfRecord.FOUNDATION || existingData?.classification?.foundationStatus,
                deductibility: bmfRecord.DEDUCTIBILITY || existingData?.classification?.deductibility,
                nteeCode: bmfRecord.NTEE_CD || existingData?.classification?.nteeCode,
                activityCodes: bmfRecord.ACTIVITY ? bmfRecord.ACTIVITY.split(',') : existingData?.classification?.activityCodes || [],
                organization: bmfRecord.ORGANIZATION || existingData?.classification?.organization,
                status: bmfRecord.STATUS || existingData?.classification?.status,
                rulingDate: bmfRecord.RULING || existingData?.classification?.rulingDate
            },
            financials: {
                ...existingData?.financials,
                assets: Number(bmfRecord.ASSET_AMT) || existingData?.financials?.assets || 0,
                revenue: Number(bmfRecord.REVENUE_AMT) || existingData?.financials?.revenue || 0,
                income: Number(bmfRecord.INCOME_AMT) || existingData?.financials?.income || 0,
                latestTaxPeriod: bmfRecord.TAX_PERIOD || existingData?.financials?.latestTaxPeriod,
                // Add new Form 990 data if available
                form990: efileData?.ReturnData?.IRS990 ? {
                    ...existingData?.financials?.form990,
                    grossReceipts: Number(efileData.ReturnData.IRS990.GrossReceiptsAmt) || existingData?.financials?.form990?.grossReceipts || 0,
                    totalAssets: Number(efileData.ReturnData.IRS990.TotalAssetsEOYAmt) || existingData?.financials?.form990?.totalAssets || 0,
                    totalLiabilities: Number(efileData.ReturnData.IRS990.TotalLiabilitiesEOYAmt) || existingData?.financials?.form990?.totalLiabilities || 0,
                    totalRevenue: Number(efileData.ReturnData.IRS990.TotalRevenueAmt) || existingData?.financials?.form990?.totalRevenue || 0,
                    totalExpenses: Number(efileData.ReturnData.IRS990.TotalExpensesAmt) || existingData?.financials?.form990?.totalExpenses || 0
                } : existingData?.financials?.form990
            },
            programs: efileData?.ReturnData?.IRS990?.ProgramServiceAccomplishmentGrp || existingData?.programs || [],
            people: efileData?.ReturnData?.IRS990?.CompensationOfHghstPdEmplGrp || existingData?.people || [],
            // Update ProPublica data if available
            propublica: propublicaData?.organization ? {
                ...existingData?.propublica,
                nteeDescription: propublicaData.organization.ntee_description || existingData?.propublica?.nteeDescription,
                mission: propublicaData.organization.mission || existingData?.propublica?.mission,
                website: propublicaData.organization.website || existingData?.propublica?.website,
                filings: propublicaData.filings_with_data || existingData?.propublica?.filings || []
            } : existingData?.propublica,
            metadata: {
                ...existingData?.metadata,
                lastUpdated: new Date().toISOString(),
                sources: {
                    hasBMF: true,
                    hasEFile: !!efileData || existingData?.metadata?.sources?.hasEFile,
                    hasProPublica: !!propublicaData || existingData?.metadata?.sources?.hasProPublica
                }
            },
            // Keep the existing slug or create a new one
            slug: existingData?.slug || `${bmfRecord.NAME.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${bmfRecord.EIN}`
        };

        return enrichedData;
    } catch (error) {
        console.error(`Error enriching data for EIN ${bmfRecord.EIN}:`, error);
        return null;
    }
}

async function syncCharityData() {
    try {
        console.log('Processing BMF data from all regions...');
        
        let processedRegions = 0;
        const totalRegions = BMF_REGIONS.length;
        
        // Process regions in chunks to avoid memory issues
        const chunkSize = 5;
        for (let i = 0; i < BMF_REGIONS.length; i += chunkSize) {
            const chunk = BMF_REGIONS.slice(i, i + chunkSize);
            await Promise.all(chunk.map(region => processBMFStream(region)));
            processedRegions += chunk.length;
            console.log(`Progress: ${processedRegions}/${totalRegions} regions processed (${Math.round(processedRegions/totalRegions*100)}%)`);
        }
        
        console.log('Finished syncing charity data');
    } catch (error) {
        console.error('Error syncing charity data:', error);
        throw error;
    }
}

// Run the sync if this file is run directly
if (require.main === module) {
    syncCharityData()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}
