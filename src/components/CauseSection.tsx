import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Image from 'next/image';
import { Search, Heart, ArrowRight } from 'lucide-react';
import debounce from 'lodash/debounce';
import type { Charity } from '../types/firebase';

const FEATURED_CHARITIES = [
  {
    name: "National Multiple Sclerosis Society",
    description: "We will cure MS while empowering people affected by MS to live their best lives",
    imageUrl: "https://images.givefreely.com/images/n_m7s0sWVLQDJrC5EgobLQlQTS.png",
    ein: "131914609"
  },
  {
    name: "charity: water",
    description: "charity: water is a global nonprofit organization working to end the water crisis by bringing clean and safe water to people around the world.",
    imageUrl: "https://images.givefreely.com/images/n_CuFkDAkszvOsCmTmrK1k63Bv.png",
    ein: "223936753"
  },
  {
    name: "Susan G Komen Breast Cancer Foundation",
    description: "Save lives by meeting the most critical needs in our communities and investing in breakthrough research to prevent and cure breast cancer.",
    imageUrl: "https://images.givefreely.com/images/n_gPcsHH0z3PN9ONqL8yRzhpnq.png",
    ein: "751835298"
  },
  {
    name: "Michael J Fox Foundation For Parkinsons Research",
    description: "The MJF Foundation is dedicated to finding a cure for Parkinson's disease through an aggressively funded research agenda.",
    imageUrl: "https://images.givefreely.com/images/n_uJg726cbLm4xvzLRcZ9c3Qri.png",
    ein: "134141945"
  },
  {
    name: "Autism Speaks",
    description: "Autism Speaks is dedicated to promoting solutions, across the spectrum and throughout the life span, for the needs of people with autism and their families.",
    imageUrl: "https://images.givefreely.com/images/n_VKk3VQ7NZM9M7CrbMHuVqItt.png",
    ein: "202329938"
  },
  {
    name: "March Of Dimes",
    description: "March of Dimes is dedicated to leading the fight for the health of all moms and babies.",
    imageUrl: "https://images.givefreely.com/images/n_v611sGGe9Dmzs0v9vDGEzqLv.png",
    ein: "131846366"
  },
  {
    name: "Unicef USA",
    description: "UNICEF USA relentlessly pursues an equitable world for every child by increasing UNICEF's global impact through fundraising, advocacy, and education.",
    imageUrl: "https://images.givefreely.com/images/n_AalD8toz3ASoAjH4eIblTit5.png",
    ein: "131760110"
  },
  {
    name: "International Development Enterprises",
    description: "iDE creates income and livelihood opportunities for poor, rural households.",
    imageUrl: "https://images.givefreely.com/images/n_GKTCf6hUaiDwwrZOydmSKVda.png",
    ein: "237069110"
  },
  {
    name: "Neuroendocrine Tumor Research Foundation",
    description: "The mission of the Neuroendocrine Tumor Research Foundation is to fund research to discover cures and more effective treatments.",
    imageUrl: "https://images.givefreely.com/images/n_YKzC8v5rE8KFIhq0JTpVVMPg.png",
    ein: "201945347"
  }
];

interface CauseSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CauseSection({ activeTab, onTabChange }: CauseSectionProps) {
  const { user } = useAuth();
  const [selectedCharity, setSelectedCharity] = useState<{name: string, ein: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    async function fetchSelectedCharity() {
      if (!user?.uid) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.selectedCharity) {
            setSelectedCharity({
              name: userData.selectedCharity.name,
              ein: userData.selectedCharity.ein
            });
          }
        }
      } catch (error) {
        console.error('Error fetching selected charity:', error);
      }
    }

    fetchSelectedCharity();
  }, [user?.uid]);

  const searchCharities = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const charitiesRef = collection(db, 'charities');
      const searchTermUpper = searchTerm.toUpperCase();
      
      const nameQuery = query(
        charitiesRef,
        where('name', '>=', searchTermUpper),
        where('name', '<=', searchTermUpper + '\uf8ff'),
        limit(10)
      );
      
      const nameSnap = await getDocs(nameQuery);
      const results = nameSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching charities:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value: string) => {
    searchCharities(value);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(true);
    debouncedSearch(value);
  };

  const handleSelectCharity = async (charity: any) => {
    if (!user?.uid) return;

    setSelectedCharity(charity);
    setSearchQuery('');
    setShowResults(false);

    try {
      const userRef = doc(db, 'users', user.uid);
      let retries = 3;
      
      while (retries > 0) {
        try {
          await updateDoc(userRef, {
            selectedCharity: {
              ein: charity.ein,
              name: charity.name,
              updatedAt: new Date().toISOString()
            }
          });
          break; 
        } catch (error: any) {
          console.error(`Error updating profile (${retries} retries left):`, error);
          if (error.code === 'resource-exhausted' && retries > 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            retries--;
          } else {
            throw error; 
          }
        }
      }
    } catch (error) {
      console.error('Error selecting charity:', error);
      setSelectedCharity(null);
    }
  };

  const handleClearSelection = async () => {
    if (!user?.uid) return;

    setSelectedCharity(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      let retries = 3;

      while (retries > 0) {
        try {
          await updateDoc(userRef, {
            selectedCharity: null
          });
          break; 
        } catch (error: any) {
          console.error(`Error clearing profile (${retries} retries left):`, error);
          if (error.code === 'resource-exhausted' && retries > 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            retries--;
          } else {
            throw error; 
          }
        }
      }
    } catch (error) {
      console.error('Error clearing selection:', error);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.selectedCharity) {
          setSelectedCharity({
            name: userData.selectedCharity.name,
            ein: userData.selectedCharity.ein
          });
        }
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center pt-16 pb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              Choose Your Impact
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">
              Select a Cause You Care About
            </h1>
            <p className="text-xl text-white/90 mb-12">
              Your donations will support the organization you choose
            </p>
            {/* Tabs */}
            <div className="inline-flex rounded-lg bg-white/10 p-1">
              <button
                onClick={() => onTabChange('cause')}
                className={`${
                  activeTab === 'cause'
                    ? 'bg-white text-rose-600'
                    : 'text-white hover:bg-white/10'
                } px-6 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Select Cause
              </button>
              <button
                onClick={() => onTabChange('stats')}
                className={`${
                  activeTab === 'stats'
                    ? 'bg-white text-rose-600'
                    : 'text-white hover:bg-white/10'
                } px-6 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Statistics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            {selectedCharity ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-rose-500 mb-2">{selectedCharity.name}</h3>
                    <p className="text-gray-500">EIN: {selectedCharity.ein}</p>
                  </div>
                  <button
                    onClick={handleClearSelection}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Your donations will support this organization
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search for a charitable organization..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-lg transition-all"
                  />
                </div>

                {loading && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-5 w-5 border-2 border-rose-500 rounded-full border-t-transparent"></div>
                  </div>
                )}

                {showResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden">
                    {searchResults.map((charity) => (
                      <div
                        key={charity.ein}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900 mb-1">{charity.name}</h3>
                              <p className="text-sm text-gray-500">
                                {charity.city}, {charity.state}
                              </p>
                              <p className="text-sm text-gray-500">EIN: {charity.ein}</p>
                            </div>
                            <button
                              onClick={() => handleSelectCharity(charity)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                              Select
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Featured Charities */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Featured Organizations</h2>
            <p className="text-gray-600 text-lg">
              Undecided? Here are some suggestions of terrific charities making real impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_CHARITIES.map((charity) => (
              <div
                key={charity.ein}
                onClick={() => handleSelectCharity(charity)}
                className={`bg-white rounded-xl shadow-sm transition-all ${
                  selectedCharity?.ein === charity.ein
                    ? 'ring-2 ring-rose-500'
                    : 'hover:shadow-md'
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 relative">
                      <Image
                        src={charity.imageUrl}
                        alt={`${charity.name} logo`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{charity.name}</h3>
                  </div>
                  <p className="text-gray-600 flex-grow">{charity.description}</p>
                  {selectedCharity?.ein === charity.ein && (
                    <div className="mt-4 pt-4 border-t border-gray-100 text-rose-600 text-sm font-medium flex items-center gap-2">
                      <Heart className="w-4 h-4" fill="currentColor" />
                      Selected Organization
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}