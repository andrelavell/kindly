import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Search, Filter, X } from 'lucide-react';
import debounce from 'lodash/debounce';
import type { Charity } from '../types/firebase';
import { getNonprofitDetails } from '../services/propublica';

interface FilterState {
  categories: string[];
  state: string[];
}

type SortOption = 'relevance' | 'name' | 'state';

export function CauseSection() {
  const { user } = useAuth();
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [selectedCauseDetails, setSelectedCauseDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    state: []
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [charities, setCharities] = useState<Charity[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch user's selected cause on mount
  useEffect(() => {
    const fetchUserCause = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'profiles', user.uid));
        const userData = userDoc.data();
        if (userData?.selectedCause) {
          setSelectedCause(userData.selectedCause);
          try {
            const details = await getNonprofitDetails(userData.selectedCause);
            setSelectedCauseDetails(details);
          } catch (error) {
            console.error('Error fetching cause details:', error);
          }
        }
      }
      setLoading(false);
    };

    fetchUserCause();
  }, [user]);

  // Search charities
  const searchCharities = async () => {
    setLoading(true);
    try {
      let q = collection(db, 'charities');
      
      // Build query based on filters
      const conditions: any[] = [];
      
      if (searchQuery) {
        conditions.push(where('name', '>=', searchQuery));
        conditions.push(where('name', '<=', searchQuery + '\uf8ff'));
      }
      
      if (filters.categories.length > 0) {
        conditions.push(where('category', 'in', filters.categories));
      }
      
      if (filters.state.length > 0) {
        conditions.push(where('state', 'in', filters.state));
      }
      
      // Apply sorting
      let sortField = 'name';
      switch (sortBy) {
        case 'name':
          sortField = 'name';
          break;
        case 'state':
          sortField = 'state';
          break;
        default:
          sortField = 'name';
      }
      
      q = query(q, ...conditions, orderBy(sortField), limit(20));
      
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => doc.data() as Charity);
      
      setCharities(results);
      setTotalResults(snapshot.size);
    } catch (error) {
      console.error('Error searching charities:', error);
    }
    setLoading(false);
  };

  // Debounced search
  const debouncedSearch = debounce(searchCharities, 300);

  useEffect(() => {
    debouncedSearch();
  }, [searchQuery, filters, page, sortBy]);

  const handleSelectCause = async (charity: Charity) => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'profiles', user.uid), {
        selectedCause: charity.ein
      });
      setSelectedCause(charity.ein);
      
      // Fetch full details from ProPublica
      const details = await getNonprofitDetails(charity.ein);
      setSelectedCauseDetails(details);
    } catch (error) {
      console.error('Error updating selected cause:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      state: []
    });
    setSearchQuery('');
    setPage(1);
    setSortBy('relevance');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for a charity..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-50"
        >
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
        >
          <option value="relevance">Most Relevant</option>
          <option value="name">Name</option>
          <option value="state">State</option>
        </select>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
              <div className="space-y-2">
                {[
                  'Arts, Culture & Humanities',
                  'Education',
                  'Environmental Conservation',
                  'Animal Welfare',
                  'Health - General',
                  'Mental Health & Crisis Intervention',
                  'Disease & Disorder Specific',
                  'Medical Research',
                  'Crime & Legal Services',
                  'Employment Services',
                  'Food, Agriculture & Nutrition',
                  'Housing & Shelter',
                  'Public Safety & Disaster Relief',
                  'Recreation & Sports',
                  'Youth Development',
                  'Human Services - Other',
                  'International Development',
                  'Civil Rights & Advocacy',
                  'Community Development',
                  'Philanthropy & Nonprofit Support',
                  'Science & Technology',
                  'Social Science Research',
                  'Public Policy',
                  'Religious Organizations',
                  'Mutual Benefit Organizations'
                ].map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleFilterChange('categories', category)}
                      className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* States */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">State</h4>
              <div className="space-y-2">
                {[
                  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
                ].map(state => (
                  <label key={state} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.state.includes(state)}
                      onChange={() => handleFilterChange('state', state)}
                      className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">{state}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {charities.length} results
      </div>

      {/* Charity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charities.map((charity) => (
          <div
            key={charity.ein}
            className={`relative rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedCause === charity.ein
                ? 'border-rose-500 bg-rose-50'
                : 'border-gray-200 hover:border-rose-200'
            }`}
          >
            <h3 className="text-lg font-medium text-gray-900">{charity.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{charity.city}, {charity.state}</p>
            <p className="mt-1 text-sm text-gray-500">{charity.category}</p>

            <div className="mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCauseDetails(charity)}
                  className="flex-1 bg-white text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 text-sm font-medium"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleSelectCause(charity)}
                  className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
                    selectedCause === charity.ein
                      ? 'bg-rose-600 text-white hover:bg-rose-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedCause === charity.ein ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charity Details Modal */}
      {selectedCauseDetails && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCauseDetails.name}</h2>
                  <p className="mt-1 text-gray-500">{selectedCauseDetails.city}, {selectedCauseDetails.state}</p>
                </div>
                <button
                  onClick={() => setSelectedCauseDetails(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {selectedCauseDetails.organization && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Organization Details</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">EIN</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {selectedCauseDetails.ein}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Category</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {selectedCauseDetails.category}
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedCauseDetails.organization.mission && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Mission</h3>
                        <p className="mt-2 text-gray-600">{selectedCauseDetails.organization.mission}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
