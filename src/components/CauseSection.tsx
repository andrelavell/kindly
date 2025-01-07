import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { causes } from '../utils/causes';
import { Search, Filter, X } from 'lucide-react';
import debounce from 'lodash/debounce';

interface FilterState {
  categories: string[];
  ratings: {
    financial: string[];
    accountability: string[];
  };
  size: string[];
  state: string[];
}

type FilterCategory = 'categories' | 'size' | 'state';
type RatingCategory = 'financial' | 'accountability';
type SortOption = 'relevance' | 'financial' | 'accountability' | 'size' | 'name';

export function CauseSection() {
  const { user } = useAuth();
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [selectedCauseDetails, setSelectedCauseDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    ratings: {
      financial: [],
      accountability: []
    },
    size: [],
    state: []
  });
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  useEffect(() => {
    setFilters({
      categories: [],
      ratings: {
        financial: [],
        accountability: []
      },
      size: [],
      state: []
    });
    setSearchQuery('');
    setPage(1);
    setSortBy('relevance');
  }, []);

  // Filter options
  const filterOptions = {
    categories: [
      'Animals',
      'Arts, Culture, Humanities',
      'Education',
      'Environment',
      'Health',
      'Human Services',
      'International',
      'Research & Public Policy',
      'Religion'
    ],
    ratings: {
      financial: [
        { value: '90-100', label: 'Exceptional (90-100)' },
        { value: '80-89', label: 'Very Good (80-89)' },
        { value: '70-79', label: 'Good (70-79)' },
        { value: '55-69', label: 'Needs Improvement (55-69)' },
        { value: '0-54', label: 'Poor (0-54)' }
      ],
      accountability: [
        { value: '90-100', label: 'Exceptional (90-100)' },
        { value: '80-89', label: 'Very Good (80-89)' },
        { value: '70-79', label: 'Good (70-79)' },
        { value: '55-69', label: 'Needs Improvement (55-69)' },
        { value: '0-54', label: 'Poor (0-54)' }
      ]
    },
    size: [
      { value: 'large', label: 'Large ($13.5M+)' },
      { value: 'mid-to-large', label: 'Mid-to-Large ($3.5M-$13.5M)' },
      { value: 'mid-sized', label: '$1M-$3.5M' },
      { value: 'small', label: 'Small ($500K-$1M)' },
      { value: 'very-small', label: 'Very Small (Less than $500K)' }
    ],
    state: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
      'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
      'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
      'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
      'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ].sort()
  };

  // Sort options
  const sortOptions = [
    { value: 'relevance' as const, label: 'Most Relevant' },
    { value: 'financial' as const, label: 'Financial Rating' },
    { value: 'accountability' as const, label: 'Accountability Rating' },
    { value: 'size' as const, label: 'Organization Size' },
    { value: 'name' as const, label: 'Name' }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'profiles', user.uid));
        const userData = userDoc.data();
        setSelectedCause(userData?.selectedCause || null);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handleSearch = debounce((query: string) => {
    setSearchQuery(query.toLowerCase());
    setPage(1);
  }, 300);

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      const values = updatedFilters[category];
      
      if (values.includes(value)) {
        updatedFilters[category] = values.filter(v => v !== value);
      } else {
        updatedFilters[category] = [...values, value];
      }
      
      return updatedFilters;
    });
    setPage(1);
  };

  const handleRatingFilterChange = (type: RatingCategory, value: string) => {
    setFilters(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [type]: prev.ratings[type].includes(value)
          ? prev.ratings[type].filter(v => v !== value)
          : [...prev.ratings[type], value]
      }
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      ratings: {
        financial: [],
        accountability: []
      },
      size: [],
      state: []
    });
    setSearchQuery('');
    setSortBy('relevance');
    setPage(1);
  };

  const handleCauseSelect = async (causeId: string) => {
    if (user) {
      setSelectedCause(causeId);
      await updateDoc(doc(db, 'profiles', user.uid), {
        selectedCause: causeId
      });
    }
  };

  const formatPercentage = (value: number | undefined) => {
    return value ? `${value.toFixed(1)}%` : 'N/A';
  };

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to safely get nested object values
  const safeGet = <T,>(obj: any, path: string, defaultValue: T): T => {
    try {
      return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const cause = causes.find(c => c.id === selectedCauseDetails);

  const filteredCauses = causes.filter(cause => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(cause.category);
    const financialRatingMatch = filters.ratings.financial.length === 0 || filters.ratings.financial.includes(cause.financialRating.toString());
    const accountabilityRatingMatch = filters.ratings.accountability.length === 0 || filters.ratings.accountability.includes(cause.accountabilityRating.toString());
    const sizeMatch = filters.size.length === 0 || filters.size.includes(cause.size);
    const stateMatch = filters.state.length === 0 || filters.state.includes(cause.state);
    const searchMatch = cause.name.toLowerCase().includes(searchQuery.toLowerCase()) || cause.mission.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && financialRatingMatch && accountabilityRatingMatch && sizeMatch && stateMatch && searchMatch;
  });

  const sortedCauses = filteredCauses.sort((a, b) => {
    if (sortBy === 'relevance') {
      return b.relevance - a.relevance;
    } else if (sortBy === 'financial') {
      return b.financialRating - a.financialRating;
    } else if (sortBy === 'accountability') {
      return b.accountabilityRating - a.accountabilityRating;
    } else if (sortBy === 'size') {
      const sizeOrder = { 'very-small': 1, small: 2, 'mid-sized': 3, 'mid-to-large': 4, large: 5 };
      return (sizeOrder[b.size as keyof typeof sizeOrder] || 0) - (sizeOrder[a.size as keyof typeof sizeOrder] || 0);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });

  const paginatedCauses = sortedCauses.slice((page - 1) * 20, page * 20);

  return (
    <div className="space-y-8">
      {/* Search and Filter Header */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            placeholder="Search by charity name, mission, or location..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filter Toggle and Sort */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {(filters.categories.length > 0 || 
              filters.ratings.financial.length > 0 || 
              filters.ratings.accountability.length > 0 || 
              filters.size.length > 0 || 
              filters.state.length > 0) && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                {filters.categories.length + 
                 filters.ratings.financial.length + 
                 filters.ratings.accountability.length + 
                 filters.size.length + 
                 filters.state.length}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm rounded-md"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
                <div className="space-y-2">
                  {filterOptions.categories.map(category => (
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

              {/* Ratings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ratings</h4>
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Financial Rating</h5>
                  {filterOptions.ratings.financial.map(rating => (
                    <label key={rating.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.ratings.financial.includes(rating.value)}
                        onChange={() => handleRatingFilterChange('financial', rating.value)}
                        className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{rating.label}</span>
                    </label>
                  ))}
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Accountability Rating</h5>
                  {filterOptions.ratings.accountability.map(rating => (
                    <label key={rating.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.ratings.accountability.includes(rating.value)}
                        onChange={() => handleRatingFilterChange('accountability', rating.value)}
                        className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{rating.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Organization Size</h4>
                <div className="space-y-2">
                  {filterOptions.size.map(size => (
                    <label key={size.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.size.includes(size.value)}
                        onChange={() => handleFilterChange('size', size.value)}
                        className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">State</h4>
                <div className="space-y-2">
                  {filterOptions.state.map(state => (
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

        {/* Active Filters */}
        {Object.values(filters).some(f => f.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([category, values]) =>
              values.map(value => (
                <span
                  key={`${category}-${value}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {value}
                  <button
                    onClick={() => {
                      if (category === 'ratings') {
                        const type = category.split('.')[0];
                        handleRatingFilterChange(type as RatingCategory, value);
                      } else {
                        handleFilterChange(category as FilterCategory, value);
                      }
                    }}
                    className="ml-2 inline-flex items-center"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))
            )}
          </div>
        )}
      </div>

      {/* Results Count and Pagination Info */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>Showing results 1-20 of {filteredCauses.length}</div>
        <div>Page {page} of {Math.ceil(filteredCauses.length / 20)}</div>
      </div>

      {/* Cause Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCauses.map((cause) => (
          <div
            key={cause.id}
            className={`relative rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedCause === cause.id
                ? 'border-rose-500 bg-rose-50'
                : 'border-gray-200 hover:border-rose-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{cause.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{cause.mission}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCauseDetails(cause.id)}
                  className="flex-1 bg-white text-gray-700 px-4 py-2 rounded border border-gray-300 hover:bg-gray-50 text-sm font-medium"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleCauseSelect(cause.id)}
                  className={`flex-1 px-4 py-2 rounded text-sm font-medium ${
                    selectedCause === cause.id
                      ? 'bg-rose-600 text-white hover:bg-rose-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedCause === cause.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Charity Details Modal */}
      {selectedCauseDetails && cause && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{cause.name}</h2>
                  <p className="mt-1 text-gray-500">{cause.mission}</p>
                </div>
                <button
                  onClick={() => setSelectedCauseDetails(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* Mission */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Mission</h3>
                  <p className="mt-2 text-gray-600">{cause.mission}</p>
                </div>

                {/* Ratings */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Charity Navigator Ratings</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Overall Rating */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">Overall Rating</div>
                      <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{cause.overallRating}</div>
                        <div className="ml-1 text-sm text-gray-500">/4</div>
                      </div>
                    </div>

                    {/* Financial Rating */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">Financial Rating</div>
                      <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{cause.financialRating}</div>
                        <div className="ml-1 text-sm text-gray-500">/4</div>
                      </div>
                    </div>

                    {/* Accountability Rating */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-500">Accountability Rating</div>
                      <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{cause.accountabilityRating}</div>
                        <div className="ml-1 text-sm text-gray-500">/4</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Performance */}
                {cause.financialMetrics && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Financial Performance</h3>
                    <div className="mt-2 space-y-4">
                      {/* Key Metrics */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900">Key Metrics</h4>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                            <div className="mt-1 text-base font-medium text-gray-900">
                              {formatCurrency(cause.financialMetrics.totalRevenue)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Total Expenses</div>
                            <div className="mt-1 text-base font-medium text-gray-900">
                              {formatCurrency(cause.financialMetrics.totalExpenses)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Program Expenses</div>
                            <div className="mt-1 text-base font-medium text-gray-900">
                              {formatCurrency(cause.financialMetrics.programExpenses)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Admin Expenses</div>
                            <div className="mt-1 text-base font-medium text-gray-900">
                              {formatCurrency(cause.financialMetrics.adminExpenses)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Fundraising Expenses</div>
                            <div className="mt-1 text-base font-medium text-gray-900">
                              {formatCurrency(cause.financialMetrics.fundraisingExpenses)}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500">Program Expense Ratio</div>
                            <div className="mt-1 text-base font-medium text-gray-900">
                              {cause.financialMetrics.programExpenseRatio}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leadership & Accountability */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Leadership & Accountability</h3>
                  <div className="mt-2 space-y-4">
                    {/* Organization Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900">Organization</h4>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Founded</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.organization.founded}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Headquarters</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.organization.headquarters}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Employees</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.organization.employees}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Volunteers</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.organization.volunteers}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accountability Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900">Accountability</h4>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Board Members</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.accountability.boardMembers}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Meetings Per Year</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.accountability.meetingsPerYear}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Whistleblower Policy</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.accountability.hasWhistleblowerPolicy ? 'Yes' : 'No'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Conflict Policy</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.accountability.hasConflictPolicy ? 'Yes' : 'No'}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Diversity Score</div>
                          <div className="mt-1 text-base font-medium text-gray-900">
                            {cause.accountability.diversityScore}/10
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Email</div>
                        <div className="mt-1 text-base font-medium text-gray-900">
                          {cause.organization.contact.email}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Phone</div>
                        <div className="mt-1 text-base font-medium text-gray-900">
                          {cause.organization.contact.phone}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Address</div>
                        <div className="mt-1 text-base font-medium text-gray-900">
                          {cause.organization.contact.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
