import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getNonprofitDetails } from '../services/propublica';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Types
interface CharityPageProps {
  charity: EnrichedCharity;
  seoTitle: string;
  seoDescription: string;
}

interface EnrichedCharity {
  ein: string;
  name: string;
  slug: string;
  mission?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  category: string;
  financials: {
    revenue: number;
    expenses: number;
    assets: number;
    historical: {
      year: number;
      revenue: number;
      expenses: number;
      assets: number;
    }[];
  };
  programs?: {
    name: string;
    description: string;
    expenses: number;
    impact?: string;
  }[];
  impact?: {
    beneficiaries?: number;
    outcomes?: string[];
    metrics?: {
      label: string;
      value: number;
      unit: string;
    }[];
  };
  people?: {
    name: string;
    title: string;
    compensation?: number;
  }[];
}

export default function CharityPage({ charity, seoTitle, seoDescription }: CharityPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kindly.com/${charity.slug}`} />
        {/* Add more meta tags as needed */}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{charity.name}</h1>
                {charity.mission && (
                  <p className="text-xl text-gray-600 mb-6">{charity.mission}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                    {charity.category}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    EIN: {charity.ein}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Facts</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Annual Revenue</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {formatMoney(charity.financials.revenue)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-gray-900">
                        {charity.address.city}, {charity.address.state}
                      </dd>
                    </div>
                    {charity.impact?.beneficiaries && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">People Helped</dt>
                        <dd className="mt-1 text-2xl font-semibold text-gray-900">
                          {new Intl.NumberFormat('en-US').format(charity.impact.beneficiaries)}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-6">
                    <button className="w-full bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-12">
              {/* Financial Trends */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Performance</h2>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={charity.financials.historical}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tickFormatter={(value) => formatMoney(value)} />
                        <Tooltip formatter={(value) => formatMoney(Number(value))} />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stackId="1"
                          stroke="#f43f5e"
                          fill="#fecdd3"
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stackId="1"
                          stroke="#0ea5e9"
                          fill="#bae6fd"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Revenue</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {formatMoney(charity.financials.revenue)}
                      </dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Expenses</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {formatMoney(charity.financials.expenses)}
                      </dd>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500">Assets</dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {formatMoney(charity.financials.assets)}
                      </dd>
                    </div>
                  </div>
                </div>
              </section>

              {/* Programs */}
              {charity.programs && charity.programs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Programs & Impact</h2>
                  <div className="space-y-6">
                    {charity.programs.map((program, index) => (
                      <div key={index} className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                          {program.name}
                        </h3>
                        <p className="text-gray-600 mb-4">{program.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Program Expenses: {formatMoney(program.expenses)}
                          </span>
                          {program.impact && (
                            <span className="text-sm text-gray-500">
                              Impact: {program.impact}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Leadership */}
              {charity.people && charity.people.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Leadership</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {charity.people.map((person, index) => (
                      <div key={index} className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                        <p className="text-gray-600">{person.title}</p>
                        {person.compensation && (
                          <p className="text-sm text-gray-500 mt-2">
                            Compensation: {formatMoney(person.compensation)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <address className="not-italic">
                  <p>{charity.address.street}</p>
                  <p>
                    {charity.address.city}, {charity.address.state} {charity.address.zip}
                  </p>
                </address>
              </div>

              {/* Impact Metrics */}
              {charity.impact?.metrics && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Impact Metrics</h3>
                  <dl className="space-y-4">
                    {charity.impact.metrics.map((metric, index) => (
                      <div key={index}>
                        <dt className="text-sm font-medium text-gray-500">{metric.label}</dt>
                        <dd className="mt-1 text-2xl font-semibold text-gray-900">
                          {new Intl.NumberFormat('en-US').format(metric.value)}
                          {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Share & Follow */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Share & Follow</h3>
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Share
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all charities from Firestore
  const charitiesRef = collection(db, 'charities');
  const snapshot = await getDocs(charitiesRef);
  
  // Generate paths for each charity
  const paths = snapshot.docs.map(doc => {
    const charity = doc.data();
    const slug = `${charity.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${charity.ein}`;
    return { params: { 'charity-slug': slug } };
  });

  return {
    paths,
    fallback: true // Enable ISR (Incremental Static Regeneration)
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.['charity-slug'] as string;
    const ein = slug.split('-').pop(); // Get EIN from slug

    // Get charity from Firestore
    const charitiesRef = collection(db, 'charities');
    const q = query(charitiesRef, where('ein', '==', ein));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return { notFound: true };
    }

    const charityDoc = snapshot.docs[0];
    const basicData = charityDoc.data();

    // Get enriched data from ProPublica
    const enrichedData = await getNonprofitDetails(ein);

    // Combine data
    const charity: EnrichedCharity = {
      ...basicData,
      ...enrichedData,
      slug
    };

    // Generate SEO metadata
    const seoTitle = `${charity.name} - Nonprofit Organization | Kindly`;
    const seoDescription = charity.mission || 
      `Learn about ${charity.name}, a nonprofit organization focused on ${charity.category.toLowerCase()}. View financial information, programs, and impact metrics.`;

    return {
      props: {
        charity,
        seoTitle,
        seoDescription
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching charity:', error);
    return { notFound: true };
  }
};
