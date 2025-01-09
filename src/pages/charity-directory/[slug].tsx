import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../utils/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Charity } from '../../types/charity';
import { getNonprofitDetails, Nonprofit, calculateFinancialScore, nteeToCategory } from '../../services/propublica';
import { MapPin, DollarSign, TrendingUp, Building, Users, Award, AlertCircle } from 'lucide-react';

interface CharityDetails {
  // Basic Info
  ein: string;
  name: string;
  city: string;
  state: string;
  ntee_code: string;
  
  // IRS Data
  ruling_date?: string;
  deductibility?: string;
  foundation_status?: string;
  organization_type?: string;
  tax_status?: string;
  
  // Financial Data
  total_revenue?: number;
  total_expenses?: number;
  total_assets?: number;
  program_expenses?: number;
  fundraising_expenses?: number;
  administrative_expenses?: number;
  
  // Form 990 Data
  mission_statement?: string;
  program_accomplishments?: {
    description: string;
    expenses: number;
    grants: number;
    revenue: number;
  }[];
  key_employees?: {
    name: string;
    title: string;
    compensation: number;
  }[];
  
  // Impact & Ratings
  charity_navigator_rating?: number;
  guidestar_seal?: string;
  impact_metrics?: {
    people_served?: number;
    outcomes?: string[];
  };
  
  // Social Proof
  reviews?: {
    source: string;
    rating: number;
    count: number;
  }[];
  news_mentions?: {
    title: string;
    source: string;
    date: string;
    url: string;
  }[];
}

interface EnrichedCharityData {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  ein: string;
  classification: {
    ruling_date: string;
    foundation_status: string;
    deductibility: string;
    organization_type: string;
    exempt_status: string;
  };
  financials: {
    total_revenue: number;
    total_expenses: number;
    total_assets: number;
    program_expenses: number;
  };
  programs: {
    accomplishments: {
      description: string;
      expenses: number;
      grants: number;
      revenue: number;
    }[];
  };
  people: {
    key_employees: {
      name: string;
      title: string;
      compensation: number;
    }[];
  };
  data_sources: {
    bmf_date: string;
    form_990_date: string;
  };
}

export default function CharityDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const ein = slug?.toString().split('-').pop();
  const [isLoading, setIsLoading] = useState(true);
  const [enrichedData, setEnrichedData] = useState<EnrichedCharityData | null>(null);
  const [basicData, setBasicData] = useState<Charity | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!ein) return;
      
      setIsLoading(true);
      try {
        // Try to get enriched data first
        const enrichedRef = doc(db, 'charities', ein);
        const enrichedDoc = await getDoc(enrichedRef);
        
        if (enrichedDoc.exists()) {
          setBasicData(enrichedDoc.data() as Charity);
          
          // Then try to get additional enriched data
          const enrichedDataRef = doc(db, 'enriched-charities', ein);
          const enrichedDataDoc = await getDoc(enrichedDataRef);
          
          if (enrichedDataDoc.exists()) {
            setEnrichedData(enrichedDataDoc.data() as EnrichedCharityData);
          }
        }
      } catch (error) {
        console.error('Error fetching charity data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [ein]);

  const charityData = enrichedData || basicData;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!charityData) {
    return <div>Charity not found</div>;
  }

  // If we have basic data but no enriched data, show a message
  const showEnrichmentMessage = !enrichedData && basicData;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{charityData.name}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{charityData.address.city}, {charityData.address.state}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showEnrichmentMessage && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700">
              We're currently enriching this charity's data with additional information from IRS sources. 
              Check back soon to see more detailed information about their programs, financials, and impact.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Only show enriched sections if we have enriched data */}
            {enrichedData ? (
              <>
                {/* Classification Information */}
                {enrichedData.classification && (
                  <section className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-semibold mb-6">Organization Details</h2>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enrichedData.classification.ruling_date && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Ruling Date</dt>
                          <dd className="mt-1 text-gray-900">
                            {new Date(enrichedData.classification.ruling_date).toLocaleDateString()}
                          </dd>
                        </div>
                      )}
                      {enrichedData.classification.foundation_status && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Foundation Status</dt>
                          <dd className="mt-1 text-gray-900">{enrichedData.classification.foundation_status}</dd>
                        </div>
                      )}
                      {enrichedData.classification.deductibility && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Deductibility</dt>
                          <dd className="mt-1 text-gray-900">{enrichedData.classification.deductibility}</dd>
                        </div>
                      )}
                      {enrichedData.classification.organization_type && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Organization Type</dt>
                          <dd className="mt-1 text-gray-900">{enrichedData.classification.organization_type}</dd>
                        </div>
                      )}
                    </dl>
                  </section>
                )}

                {/* Financial Information */}
                {enrichedData.financials && Object.keys(enrichedData.financials).some(key => enrichedData.financials[key] !== undefined) && (
                  <section className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-semibold mb-6">Financial Information</h2>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {enrichedData.financials.total_revenue !== undefined && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Total Revenue</dt>
                          <dd className="mt-1 text-gray-900">${enrichedData.financials.total_revenue.toLocaleString()}</dd>
                        </div>
                      )}
                      {enrichedData.financials.total_expenses !== undefined && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Total Expenses</dt>
                          <dd className="mt-1 text-gray-900">${enrichedData.financials.total_expenses.toLocaleString()}</dd>
                        </div>
                      )}
                      {enrichedData.financials.total_assets !== undefined && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Total Assets</dt>
                          <dd className="mt-1 text-gray-900">${enrichedData.financials.total_assets.toLocaleString()}</dd>
                        </div>
                      )}
                      {enrichedData.financials.program_expenses !== undefined && (
                        <div>
                          <dt className="text-sm font-medium text-gray-600">Program Expenses</dt>
                          <dd className="mt-1 text-gray-900">${enrichedData.financials.program_expenses.toLocaleString()}</dd>
                        </div>
                      )}
                    </dl>
                  </section>
                )}

                {/* Programs and Accomplishments */}
                {enrichedData.programs?.accomplishments && enrichedData.programs.accomplishments.length > 0 && (
                  <section className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-semibold mb-6">Programs & Accomplishments</h2>
                    <div className="space-y-6">
                      {enrichedData.programs.accomplishments.map((program, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                          <p className="text-gray-900 mb-4">{program.description}</p>
                          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {program.expenses !== undefined && (
                              <div>
                                <dt className="text-sm font-medium text-gray-600">Program Expenses</dt>
                                <dd className="mt-1 text-gray-900">${program.expenses.toLocaleString()}</dd>
                              </div>
                            )}
                            {program.grants !== undefined && (
                              <div>
                                <dt className="text-sm font-medium text-gray-600">Grants Given</dt>
                                <dd className="mt-1 text-gray-900">${program.grants.toLocaleString()}</dd>
                              </div>
                            )}
                            {program.revenue !== undefined && (
                              <div>
                                <dt className="text-sm font-medium text-gray-600">Program Revenue</dt>
                                <dd className="mt-1 text-gray-900">${program.revenue.toLocaleString()}</dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Key Employees */}
                {enrichedData.people?.key_employees && enrichedData.people.key_employees.length > 0 && (
                  <section className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-semibold mb-6">Key Employees</h2>
                    <div className="space-y-6">
                      {enrichedData.people.key_employees.map((employee, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                          <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-gray-600">Title</dt>
                              <dd className="mt-1 text-gray-900">{employee.title}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-600">Compensation</dt>
                              <dd className="mt-1 text-gray-900">${employee.compensation.toLocaleString()}</dd>
                            </div>
                          </dl>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              // Basic charity data sections
              <section className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {basicData.classification && (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">NTEE Code</dt>
                        <dd className="mt-1 text-gray-900">{basicData.classification.nteeCode}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">Ruling Date</dt>
                        <dd className="mt-1 text-gray-900">{basicData.classification.rulingDate}</dd>
                      </div>
                    </>
                  )}
                  {basicData.financials && (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">Revenue</dt>
                        <dd className="mt-1 text-gray-900">${basicData.financials.revenue.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-600">Assets</dt>
                        <dd className="mt-1 text-gray-900">${basicData.financials.assets.toLocaleString()}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <section className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Address</h3>
                  <p className="mt-1 text-gray-900">
                    {charityData.address.street}<br />
                    {charityData.address.city}, {charityData.address.state} {charityData.address.zip}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">EIN</h3>
                  <p className="mt-1 text-gray-900">{charityData.ein}</p>
                </div>
              </div>
            </section>

            {/* Data Sources - Only show if we have enriched data */}
            {enrichedData?.data_sources && (
              <section className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Data Sources</h2>
                <div className="space-y-2">
                  {enrichedData.data_sources.bmf_date && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">IRS BMF Data</span>
                      <span className="text-sm text-gray-900">
                        {new Date(enrichedData.data_sources.bmf_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {enrichedData.data_sources.form_990_date && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Form 990 Data</span>
                      <span className="text-sm text-gray-900">
                        {new Date(enrichedData.data_sources.form_990_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
