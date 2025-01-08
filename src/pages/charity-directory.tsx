import { useState } from 'react';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '../utils/helpers';

export default function CharityDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [charities, setCharities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Search charities
  const searchCharities = async (query: string) => {
    if (!query.trim()) {
      setCharities([]);
      return;
    }

    setLoading(true);
    try {
      const charitiesRef = collection(db, 'charities');
      const nameQuery = query.toLowerCase();
      const q = query(charitiesRef, 
        where('searchName', '>=', nameQuery),
        where('searchName', '<=', nameQuery + '\uf8ff'),
        orderBy('searchName'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      
      const results = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      setCharities(results);
    } catch (error) {
      console.error('Error searching charities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900">Charity Directory</h1>
            <p className="mt-2 text-sm text-gray-500">
              Explore and learn more about various charitable organizations
            </p>
          </div>

          {/* Search */}
          <div className="p-6 border-b border-gray-200">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchCharities(e.target.value);
                  }}
                  placeholder="Search charities by name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-rose-500 focus:border-rose-500 text-lg"
                />
                {loading && (
                  <div className="absolute right-3 top-3">
                    <div className="animate-spin h-6 w-6 border-2 border-rose-500 rounded-full border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {charities.map((charity) => (
                <Link
                  key={charity.ein}
                  href={`/${slugify(charity.name)}-${charity.ein}`}
                  className="block group"
                >
                  <div className="h-full flex flex-col bg-white border rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                    {charity.logo && (
                      <div className="p-4 bg-gray-50 border-b">
                        <Image
                          src={charity.logo}
                          alt={`${charity.name} logo`}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain mx-auto"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-rose-600">
                        {charity.name}
                      </h3>
                      {charity.city && charity.state && (
                        <p className="mt-1 text-sm text-gray-500">
                          {charity.city}, {charity.state}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        EIN: {charity.ein}
                      </p>
                      {charity.categories && charity.categories.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {charity.categories.map((category: string) => (
                            <span
                              key={category}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {searchQuery && charities.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No charities found matching your search.</p>
              </div>
            )}

            {!searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-500">Start typing to search for charities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
