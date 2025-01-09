import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ein } = req.query;

  if (!ein || typeof ein !== 'string') {
    return res.status(400).json({ error: 'EIN is required' });
  }

  try {
    // 1. Basic organization data
    const orgResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}.json`
    );
    
    if (!orgResponse.ok) {
      console.error('ProPublica API Error:', await orgResponse.text());
      throw new Error('Failed to fetch nonprofit data');
    }

    const orgData = await orgResponse.json();
    console.log('Organization Data:', JSON.stringify(orgData, null, 2));
    
    // 2. Try to get the XML data which contains mission statement
    let missionStatement = null;
    const xmlResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/irs_990s.json`
    );
    
    if (xmlResponse.ok) {
      const xmlData = await xmlResponse.json();
      console.log('XML Filings Available:', xmlData?.filings?.length);
      console.log('XML Data Sample:', xmlData?.filings?.[0]);
      
      if (xmlData?.filings?.length > 0) {
        // Get the most recent filing that has XML data
        const recentXmlFiling = xmlData.filings.find((f: any) => f.xml_url);
        console.log('Recent XML Filing:', recentXmlFiling);
        
        if (recentXmlFiling?.xml_url) {
          console.log('Fetching XML from:', recentXmlFiling.xml_url);
          try {
            const rawXmlResponse = await fetch(recentXmlFiling.xml_url);
            if (rawXmlResponse.ok) {
              const xmlText = await rawXmlResponse.text();
              console.log('XML Content Sample:', xmlText.substring(0, 500));
              
              // Look for mission statement in XML using various tag patterns
              const missionPatterns = [
                /<MissionDesc>([^<]+)<\/MissionDesc>/,
                /<ActivityOrMissionDesc>([^<]+)<\/ActivityOrMissionDesc>/,
                /<ProgramServiceAccomplishments>.*?<Desc>([^<]+)<\/Desc>/s,
                /<ProgramSrvcAccomplishmentGrp>.*?<Desc>([^<]+)<\/Desc>/s,
                /<Organization501c3>.*?<Desc>([^<]+)<\/Desc>/s,
                /<ProgramServiceDescription>([^<]+)<\/ProgramServiceDescription>/,
                /<Description>([^<]+)<\/Description>/
              ];
              
              for (const pattern of missionPatterns) {
                const match = xmlText.match(pattern);
                if (match) {
                  missionStatement = match[1].trim();
                  console.log('Found mission statement using pattern:', pattern);
                  console.log('Mission statement:', missionStatement);
                  break;
                }
              }
            }
          } catch (error) {
            console.error('Error fetching XML:', error);
          }
        }
      }
    } else {
      console.error('Failed to fetch XML data:', await xmlResponse.text());
    }
    
    // 3. Get all filings
    const filingsResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/filings.json`
    );
    
    let filingsData = { filings: [] };
    if (filingsResponse.ok) {
      filingsData = await filingsResponse.json();
      console.log('Filings Data:', JSON.stringify(filingsData, null, 2));
    } else {
      console.error('Failed to fetch filings:', await filingsResponse.text());
    }

    // 4. Get latest filing details (Form 990)
    let latestFilingDetails = null;
    if (filingsData.filings && filingsData.filings.length > 0) {
      const latestFiling = filingsData.filings[0];
      console.log('Latest filing ID:', latestFiling.id);
      
      const filingDetailsResponse = await fetch(
        `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/filings/${latestFiling.id}/federal_filing.json`
      );
      
      if (filingDetailsResponse.ok) {
        latestFilingDetails = await filingDetailsResponse.json();
        console.log('Mission Fields:', {
          description_mission: latestFilingDetails?.filing?.description_of_organization_mission,
          org_mission: latestFilingDetails?.filing?.organization_mission,
          mission: latestFilingDetails?.filing?.mission,
          activity_or_mission: latestFilingDetails?.filing?.activity_or_mission,
          program_service_accomplishments: latestFilingDetails?.filing?.program_service_accomplishments,
          statement_of_program_service_accomplishments: latestFilingDetails?.filing?.statement_of_program_service_accomplishments,
          organization_primary_exempt_purpose: latestFilingDetails?.filing?.organization_primary_exempt_purpose,
        });
      } else {
        console.error('Failed to fetch filing details:', await filingDetailsResponse.text());
      }
    }

    // 5. Get audited financial report if available
    let auditedReport = null;
    const auditResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/audited_financial_report.json`
    );
    
    if (auditResponse.ok) {
      auditedReport = await auditResponse.json();
      console.log('Audited Financial Report:', JSON.stringify(auditedReport, null, 2));
    } else {
      console.error('Failed to fetch audit report:', await auditResponse.text());
    }

    // 6. Get all grants data if available
    let grantsData = null;
    const grantsResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/grants.json`
    );
    
    if (grantsResponse.ok) {
      grantsData = await grantsResponse.json();
      console.log('Grants Data:', JSON.stringify(grantsData, null, 2));
    } else {
      console.error('Failed to fetch grants:', await grantsResponse.text());
    }

    // Combine all data
    const combinedData = {
      ...orgData.organization,
      filings_with_data: filingsData.filings?.filter((f: any) => f.formtype === '990') || [],
      filings_without_data: filingsData.filings?.filter((f: any) => f.formtype !== '990') || [],
      description: missionStatement || 
                  latestFilingDetails?.filing?.description_of_organization_mission ||
                  latestFilingDetails?.filing?.organization_mission ||
                  latestFilingDetails?.filing?.mission ||
                  latestFilingDetails?.filing?.activity_or_mission ||
                  latestFilingDetails?.filing?.organization_primary_exempt_purpose ||
                  latestFilingDetails?.filing?.program_service_accomplishments?.[0]?.description ||
                  latestFilingDetails?.filing?.statement_of_program_service_accomplishments?.[0]?.text ||
                  orgData.organization?.mission ||
                  'No description available.',
      website: orgData.organization?.website || latestFilingDetails?.filing?.website || null,
      latest: {
        revenue: latestFilingDetails?.filing?.totrevenue || orgData.organization?.revenue_amount,
        expenses: latestFilingDetails?.filing?.totfuncexpns || orgData.organization?.expenses_amount,
        assets: latestFilingDetails?.filing?.totassetsend || orgData.organization?.assets_amount,
      }
    };

    console.log('Combined Data:', JSON.stringify(combinedData, null, 2));
    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching nonprofit details:', error);
    res.status(500).json({ error: 'Failed to fetch nonprofit details' });
  }
}
