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
    console.log('ProPublica Organization Response:', JSON.stringify(orgData, null, 2));
    
    // 2. Get all filings
    const filingsResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/filings.json`
    );
    
    let filingsData = { filings: [] };
    if (filingsResponse.ok) {
      filingsData = await filingsResponse.json();
      console.log('ProPublica Filings Response:', JSON.stringify(filingsData, null, 2));
    } else {
      console.error('Failed to fetch filings:', await filingsResponse.text());
    }

    // 3. Get latest filing details (Form 990)
    let latestFilingDetails = null;
    if (filingsData.filings && filingsData.filings.length > 0) {
      const latestFiling = filingsData.filings[0];
      const filingDetailsResponse = await fetch(
        `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/filings/${latestFiling.id}/federal_filing.json`
      );
      
      if (filingDetailsResponse.ok) {
        latestFilingDetails = await filingDetailsResponse.json();
        console.log('ProPublica Latest Filing Response:', JSON.stringify(latestFilingDetails, null, 2));
      } else {
        console.error('Failed to fetch latest filing:', await filingDetailsResponse.text());
      }
    }

    // 4. Get audited financial report if available
    let auditedReport = null;
    const auditResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/audited_financial_report.json`
    );
    
    if (auditResponse.ok) {
      auditedReport = await auditResponse.json();
      console.log('ProPublica Audit Response:', JSON.stringify(auditedReport, null, 2));
    } else {
      console.error('Failed to fetch audit report:', await auditResponse.text());
    }

    // 5. Get all grants data if available
    let grantsData = null;
    const grantsResponse = await fetch(
      `https://projects.propublica.org/nonprofits/api/v2/organizations/${ein}/grants.json`
    );
    
    if (grantsResponse.ok) {
      grantsData = await grantsResponse.json();
      console.log('ProPublica Grants Response:', JSON.stringify(grantsData, null, 2));
    } else {
      console.error('Failed to fetch grants:', await grantsResponse.text());
    }

    // Combine all data
    const combinedData = {
      organization: orgData.organization || {},
      filings: filingsData.filings || [],
      latestFilingDetails: latestFilingDetails?.filing || null,
      auditedReport: auditedReport || null,
      grants: grantsData?.grants || []
    };

    console.log('Combined Data:', JSON.stringify(combinedData, null, 2));
    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching nonprofit details:', error);
    res.status(500).json({ error: 'Failed to fetch nonprofit details' });
  }
}
