import { useState } from 'react';
import { searchClient } from '../utils/typesense';
import { InstantSearch, Hits, Configure, RefinementList, connectRefinementList } from 'react-instantsearch-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, DollarSign, Calendar, ArrowRight, Heart } from 'lucide-react';
import { formatCurrency } from '../lib/format';
import { slugify } from '../utils/helpers';
import { useQuery } from '@tanstack/react-query';
import { getNonprofitDetails } from '../services/propublica';

const ITEMS_PER_PAGE = 12;

export default function CharityDirectory() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Create custom refinement components
  const StateDropdown = connectRefinementList(({ items, refine, currentRefinement }) => (
    <select
      value={currentRefinement?.[0] || ''}
      onChange={(e) => refine(e.target.value ? [e.target.value] : [])}
      className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-rose-500 focus:border-rose-500"
    >
      <option value="">All States</option>
      {[
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
      ].map(state => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
  ));

  const CategoryDropdown = connectRefinementList(({ items, refine, currentRefinement }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      // Use exact match since we're using friendly names now
      refine(value ? [value] : []);
    };

    return (
      <select
        value={currentRefinement?.[0] || ''}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-rose-500 focus:border-rose-500"
      >
        <option value="">All Categories</option>
        {[
          { name: 'Arts, Culture & Humanities' },
          { name: 'Education' },
          { name: 'Environmental Conservation' },
          { name: 'Animal Welfare' },
          { name: 'Health - General' },
          { name: 'Mental Health & Crisis Intervention' },
          { name: 'Disease & Disorder Specific' },
          { name: 'Medical Research' },
          { name: 'Crime & Legal Services' },
          { name: 'Employment Services' },
          { name: 'Food, Agriculture & Nutrition' },
          { name: 'Housing & Shelter' },
          { name: 'Public Safety & Disaster Relief' },
          { name: 'Recreation & Sports' },
          { name: 'Youth Development' },
          { name: 'Human Services - Other' },
          { name: 'International Development' },
          { name: 'Civil Rights & Advocacy' },
          { name: 'Community Development' },
          { name: 'Philanthropy & Nonprofit Support' }
        ].map(category => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    );
  });

  const CategoryQuickFilters = connectRefinementList(({ items, refine, currentRefinement }) => {
    const topCategories = [
      'Education',
      'Health - General',
      'Animal Welfare',
      'Environmental Conservation',
      'Housing & Shelter'
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {topCategories.map(category => (
          <button
            key={category}
            onClick={() => refine(currentRefinement?.includes(category) ? [] : [category])}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currentRefinement?.includes(category)
                ? 'bg-rose-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-rose-200 hover:bg-rose-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  });

  const Hit = ({ hit }: { hit: any }) => {
    const { data: propublicaData, isLoading, error } = useQuery({
      queryKey: ['nonprofit', hit.ein],
      queryFn: () => getNonprofitDetails(hit.ein),
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    console.log('ProPublica Data for', hit.ein, ':', propublicaData);
    if (error) console.error('Error fetching data:', error);

    // Try different revenue fields in order of preference
    const revenue = propublicaData?.latest?.revenue || 
                   propublicaData?.revenue_amount || 
                   propublicaData?.totrevenue || 
                   0;
    
    const formattedRevenue = revenue ? `$${revenue.toLocaleString()}` : '$0';

    return (
      <Link
        href={`/charity-directory/${slugify(hit.name)}-${hit.ein}`}
        className="block h-full group"
      >
        <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/50 w-full">
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-gray-900 group-hover:text-rose-600 transition-colors duration-200">
              {hit.name}
            </h3>
            
            <div className="mt-4 space-y-3">
              {hit.city && hit.state && (
                <div className="flex items-center text-gray-600">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 mr-3 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-sm font-medium">
                    {`${hit.city}, ${hit.state}`}
                  </span>
                </div>
              )}
              
              <div className="flex items-center text-gray-600">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 mr-3 flex-shrink-0">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm font-medium">
                  Revenue: {isLoading ? 'Loading...' : formattedRevenue}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 mr-3 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm font-medium">
                  EIN: {hit.ein}
                </span>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center text-sm font-medium text-rose-600 group-hover:text-rose-700 transition-colors duration-200">
              View Details
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
            alt="People helping others"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-300 text-sm font-medium">
                <Heart className="w-4 h-4" fill="currentColor" />
                Discover & Support
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Find Your Cause
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Explore our comprehensive directory of verified charitable organizations and discover where you can make the most impact.
            </p>
          </div>
        </div>
      </section>

      <InstantSearch 
        searchClient={searchClient} 
        indexName="charities"
      >
        <Configure 
          hitsPerPage={ITEMS_PER_PAGE} 
          query={searchInput}
        />

        <div className="container mx-auto px-4 -mt-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              {/* Quick Filters */}
              <CategoryQuickFilters attribute="category" operator="and" />
              
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInput}
                  placeholder="Search charities by name..."
                  className="w-full pl-12 pr-6 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-rose-500 focus:border-rose-500 text-lg"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StateDropdown attribute="state" operator="and" />
                <CategoryDropdown attribute="category" operator="and" />

                <input
                  type="number"
                  placeholder="Min Revenue"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-rose-500 focus:border-rose-500"
                />

                <input
                  type="number"
                  placeholder="Max Revenue"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="max-w-7xl mx-auto mt-8">
            <div className="[&_.ais-Hits-list]:grid [&_.ais-Hits-list]:grid-cols-1 [&_.ais-Hits-list]:sm:grid-cols-2 [&_.ais-Hits-list]:lg:grid-cols-3 [&_.ais-Hits-list]:xl:grid-cols-4 [&_.ais-Hits-list]:gap-6">
              <Hits hitComponent={Hit} />
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
