import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star } from 'lucide-react';
import { stores, categories, searchStores, getStoreLogo } from '../data/stores';

export function Stores() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredStores, setFilteredStores] = useState(stores);
  const [storeLogo, setStoreLogo] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    setFilteredStores(searchStores(searchQuery, selectedCategory));
  }, [searchQuery, selectedCategory]);

  // Load store logos
  useEffect(() => {
    const loadLogos = async () => {
      const logoPromises = filteredStores.map(async (store) => {
        if (storeLogo[store.name] === undefined) {
          const logo = await getStoreLogo(store);
          setStoreLogo(prev => ({ ...prev, [store.name]: logo }));
        }
      });
      await Promise.all(logoPromises);
    };
    loadLogos();
  }, [filteredStores]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Supported Stores
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Shop at thousands of your favorite stores while making a difference.
                Every purchase helps support the causes you care about.
              </p>

              {/* Search and Filter */}
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search stores..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-12 pr-8 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none appearance-none bg-white cursor-pointer transition-all"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {filteredStores.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filteredStores.map((store, index) => (
                <motion.div
                  key={store.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative bg-white rounded-xl border border-gray-200 p-4 hover:border-rose-200 hover:bg-rose-50/30 transition-all duration-300 group"
                >
                  {store.popular && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-4 h-4 text-rose-400" fill="currentColor" />
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 mb-3 relative">
                      {storeLogo[store.name] ? (
                        <img
                          src={storeLogo[store.name]!}
                          alt={`${store.name} logo`}
                          className="w-full h-full object-contain rounded-md filter group-hover:brightness-110 transition-all"
                          onError={() => setStoreLogo(prev => ({ ...prev, [store.name]: null }))}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                          <span className="text-lg font-semibold text-gray-400">
                            {store.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-gray-900 font-medium group-hover:text-rose-500 transition-colors text-center">
                      {store.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {store.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">No stores found matching your search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
