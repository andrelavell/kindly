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

// URLs for IRS data
const URLS = {
    BMF_BASE: 'https://www.irs.gov/pub/irs-soi',
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

interface EnrichedCharityData {
    // Basic Info (from BMF)
    ein: string;
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    classification: {
        subsection: string;
        foundation_status: string;
        deductibility: string;
        activity_codes: string[];
        organization_type: string;
        exempt_status: string;
        ruling_date: string;
    };

    // Financial Data (from Form 990)
    financials: {
        gross_receipts?: number;
        total_assets?: number;
        total_liabilities?: number;
        total_revenue?: number;
        total_expenses?: number;
        program_service_revenue?: number;
        investment_income?: number;
        contributions_grants?: number;
        program_expenses?: number;
        administrative_expenses?: number;
        fundraising_expenses?: number;
    };

    // Program Information
    programs: {
        mission_statement?: string;
        accomplishments?: {
            description: string;
            expenses?: number;
            grants?: number;
            revenue?: number;
        }[];
    };

    // People
    people: {
        key_employees?: {
            name: string;
            title: string;
            compensation: number;
            benefits: number;
            other_compensation: number;
        }[];
        board_members?: {
            name: string;
            title: string;
            hours_per_week: number;
        }[];
    };

    // Historical Data
    historical_filings?: {
        year: number;
        total_revenue: number;
        total_expenses: number;
        total_assets: number;
        form_type: string;
    }[];

    // Metadata
    last_updated: string;
    data_sources: {
        bmf_date?: string;
        form_990_date?: string;
    };
}

// Track failed E-File fetches
const failedEFileFetches = new Set<string>();

// Track stats
interface SyncStats {
    totalProcessed: number;
    noEFileAvailable: number;
    enrichmentFailed: number;
    enrichmentSuccess: number;
}

const stats: SyncStats = {
    totalProcessed: 0,
    noEFileAvailable: 0,
    enrichmentFailed: 0,
    enrichmentSuccess: 0
};

// Retry configuration
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 5000; // 5 seconds
const MAX_RETRY_DELAY = 30000; // 30 seconds

// Rate limiting
const RATE_LIMIT_DELAY = 1000; // 1 second between requests
let lastRequestTime = 0;

async function rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
        await sleep(RATE_LIMIT_DELAY - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry<T>(
  operation: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = INITIAL_RETRY_DELAY,
  context = ''
): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    if (retries > 0) {
      const nextDelay = Math.min(delay * 2, MAX_RETRY_DELAY);
      const errorMessage = error.response?.status 
        ? `HTTP ${error.response.status}`
        : error.message || 'Unknown error';
      console.log(`${errorMessage} - Retrying ${context} after ${delay}ms. ${retries} retries remaining.`);
      await sleep(delay);
      return retry(operation, retries - 1, nextDelay, context);
    }
    throw error;
  }
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

interface IrsFilingIndex {
    Filings: Array<{
        EIN: string;
        ObjectId: string;
        [key: string]: any;
    }>;
}

async function getEFileData(ein: string): Promise<Form990Data | null> {
    try {
        await rateLimit();
        stats.totalProcessed++;
        
        // Get the organization data from ProPublica
        const orgResponse = await retry<any>(
            async () => {
                await rateLimit();
                return axios.get(`${URLS.PROPUBLICA}/organizations/${ein}.json`, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (compatible; KindlyCharity/1.0;)'
                    },
                    timeout: 10000
                });
            },
            MAX_RETRIES,
            INITIAL_RETRY_DELAY,
            `fetching organization data for EIN ${ein}`
        );
        
        if (!orgResponse.data?.organization?.filings_with_data?.length) {
            stats.noEFileAvailable++;
            return null;
        }

        // Get the latest filing with data
        const latestFiling = orgResponse.data.organization.filings_with_data[0];
        await rateLimit();

        // Get the detailed filing data
        const filingResponse = await retry<any>(
            async () => {
                await rateLimit();
                return axios.get(`${URLS.PROPUBLICA}/filings/${latestFiling.id}.json`, {
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (compatible; KindlyCharity/1.0;)'
                    },
                    timeout: 10000
                });
            },
            MAX_RETRIES,
            INITIAL_RETRY_DELAY,
            `fetching filing ${latestFiling.id} for EIN ${ein}`
        );

        if (!filingResponse?.data) {
            stats.enrichmentFailed++;
            return null;
        }

        // Convert ProPublica format to our Form990Data format
        const filing = filingResponse.data;
        stats.enrichmentSuccess++;
        
        return {
            ReturnHeader: {
                ReturnTs: filing.tax_period_end_date,
                TaxPeriodEndDt: filing.tax_period_end_date,
                ReturnTypeCd: filing.form_type || '990',
                TaxPeriodBeginDt: filing.tax_period_begin_date
            },
            ReturnData: {
                IRS990: {
                    TotalRevenueAmt: filing.total_revenue,
                    TotalExpensesAmt: filing.total_expenses,
                    TotalAssetsEOYAmt: filing.total_assets_end_of_year,
                    TotalLiabilitiesEOYAmt: filing.total_liabilities_end_of_year,
                    NetAssetsOrFundBalancesEOYAmt: filing.net_assets_end_of_year,
                    ProgramServiceRevenueAmt: filing.program_service_revenue,
                    InvestmentIncomeAmt: filing.investment_income,
                    ContributionsGrantsAmt: filing.contributions_and_grants,
                    BenefitsPaidToMembersAmt: filing.benefits_paid_to_members,
                    SalariesOtherCompensationAmt: filing.salaries_and_compensation,
                    TotalFundraisingExpenseAmt: filing.total_fundraising_expenses,
                    TotalProfFundraisingExpensesAmt: filing.professional_fundraising_expenses,
                    CurrentYearGrantOrContributionAmt: filing.grants_paid,
                    NetIncomeOrLossAmt: filing.total_revenue - filing.total_expenses
                }
            }
        };
    } catch (error: any) {
        // Only log non-404 errors as they indicate actual problems
        if (error.response?.status !== 404) {
            const errorMessage = error.response?.status 
                ? `HTTP ${error.response.status}: ${error.message}`
                : error.message || error;
            console.error(`Error fetching E-File data for EIN ${ein}:`, errorMessage);
        }
        stats.enrichmentFailed++;
        failedEFileFetches.add(ein);
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

async function processForm990Data(eFileData: Form990Data): Promise<Partial<EnrichedCharityData>> {
    if (!eFileData?.ReturnData?.IRS990) return {};

    const form990 = eFileData.ReturnData.IRS990;

    return {
        financials: {
            gross_receipts: Number(form990.GrossReceiptsAmt) || undefined,
            total_assets: Number(form990.TotalAssetsEOYAmt) || undefined,
            total_liabilities: Number(form990.TotalLiabilitiesEOYAmt) || undefined,
            total_revenue: Number(form990.TotalRevenueAmt) || undefined,
            total_expenses: Number(form990.TotalExpensesAmt) || undefined,
        },
        programs: {
            accomplishments: form990.ProgramServiceAccomplishmentGrp?.map(prog => ({
                description: prog.DescriptionProgramSrvcAccomTxt || '',
                expenses: Number(prog.ExpenseAmt) || undefined,
                grants: Number(prog.GrantAmt) || undefined,
                revenue: Number(prog.RevenueAmt) || undefined,
            })),
        },
        people: {
            key_employees: form990.CompensationOfHghstPdEmplGrp?.map(emp => ({
                name: emp.PersonNm || '',
                title: emp.TitleTxt || '',
                compensation: Number(emp.CompensationAmt) || 0,
                benefits: 0, // Add if available in the data
                other_compensation: 0, // Add if available in the data
            })),
        },
    };
}

async function enrichCharityData(bmfRecord: BMFRecord): Promise<EnrichedCharityData> {
    // Start with BMF data
    const enrichedData: EnrichedCharityData = {
        ein: bmfRecord.EIN,
        name: bmfRecord.NAME,
        address: {
            street: bmfRecord.STREET,
            city: bmfRecord.CITY,
            state: bmfRecord.STATE,
            zip: bmfRecord.ZIP,
        },
        classification: {
            subsection: bmfRecord.SUBSECTION,
            foundation_status: bmfRecord.FOUNDATION,
            deductibility: bmfRecord.DEDUCTIBILITY,
            activity_codes: [bmfRecord.ACTIVITY],
            organization_type: bmfRecord.ORGANIZATION,
            exempt_status: bmfRecord.STATUS,
            ruling_date: bmfRecord.RULING,
        },
        financials: {},
        programs: {},
        people: {},
        last_updated: new Date().toISOString(),
        data_sources: {
            bmf_date: new Date().toISOString(),
        },
    };

    // Get Form 990 data
    const eFileData = await getEFileData(bmfRecord.EIN);
    if (eFileData) {
        const form990Data = await processForm990Data(eFileData);
        Object.assign(enrichedData, form990Data);
        enrichedData.data_sources.form_990_date = eFileData.ReturnHeader?.ReturnTs;
    }

    return enrichedData;
}

async function retryFailedEFileFetches(): Promise<void> {
    console.log(`Retrying ${failedEFileFetches.size} failed E-File fetches...`);
    const failedEins = Array.from(failedEFileFetches);
    let successCount = 0;
    let stillFailed = 0;

    for (const ein of failedEins) {
        try {
            console.log(`Retrying E-File fetch for EIN ${ein}...`);
            const eFileData = await getEFileData(ein);
            
            if (eFileData) {
                const enrichedData = await processForm990Data(eFileData);
                // Update the existing document with the new E-File data
                await firestore.collection('charities').doc(ein).update({
                    ...enrichedData,
                    'data_sources.form_990_date': eFileData.ReturnHeader?.ReturnTs || new Date().toISOString()
                });
                successCount++;
                failedEFileFetches.delete(ein);
            } else {
                stillFailed++;
            }
            
            // Add a small delay between requests to avoid overwhelming the API
            await sleep(500);
        } catch (error) {
            console.error(`Error retrying E-File fetch for EIN ${ein}:`, error);
            stillFailed++;
        }
    }

    console.log(`Retry results:
    - Successfully retrieved: ${successCount}
    - Still failed: ${stillFailed}`);

    // Save remaining failed EINs to a file for future reference
    if (stillFailed > 0) {
        const remainingFailed = Array.from(failedEFileFetches);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const failedEinsFile = path.join(__dirname, `failed_eins_${timestamp}.json`);
        fs.writeFileSync(failedEinsFile, JSON.stringify({
            timestamp: new Date().toISOString(),
            eins: remainingFailed
        }, null, 2));
        console.log(`Saved ${stillFailed} failed EINs to ${failedEinsFile}`);
    }
}

// Modify the main sync function to retry failed fetches at the end
async function syncCharityData(): Promise<void> {
    console.log('Starting charity data sync...');
    
    for (const region of BMF_REGIONS) {
        console.log(`Processing BMF data for region: ${region}`);
        await processBMFStream(region);
    }
    
    // After processing all regions, retry any failed E-File fetches
    if (failedEFileFetches.size > 0) {
        console.log('Initial sync complete. Starting retry of failed E-File fetches...');
        await retryFailedEFileFetches();
    }
    
    // Log final stats
    console.log('\nFinal Statistics:');
    console.log(`Total Charities Processed: ${stats.totalProcessed}`);
    console.log(`No E-File Available: ${stats.noEFileAvailable} (${(stats.noEFileAvailable/stats.totalProcessed*100).toFixed(1)}%)`);
    console.log(`Enrichment Failed: ${stats.enrichmentFailed} (${(stats.enrichmentFailed/stats.totalProcessed*100).toFixed(1)}%)`);
    console.log(`Successfully Enriched: ${stats.enrichmentSuccess} (${(stats.enrichmentSuccess/stats.totalProcessed*100).toFixed(1)}%)`);
    
    console.log('Charity data sync complete!');
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
