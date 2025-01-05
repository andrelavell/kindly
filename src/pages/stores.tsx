import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star } from 'lucide-react';
import { stores as storesList, categories, searchStores, getStoreLogo } from '../data/stores';
import { Store } from '../types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useDebouncedCallback } from 'use-debounce';
import { useInView } from 'react-intersection-observer';

const INITIAL_VISIBLE_STORES = 50;
const LOAD_MORE_INCREMENT = 50;
const LOGO_BATCH_SIZE = 20;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export default function stores() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [visibleStores, setVisibleStores] = React.useState(INITIAL_VISIBLE_STORES);
  const [storeLogo, setStoreLogo] = React.useState<{ [key: string]: string | null }>({});
  const loadingLogosRef = useRef<Set<string>>(new Set());

  // Intersection Observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    delay: 100,
  });

  // Debounced search
  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setVisibleStores(INITIAL_VISIBLE_STORES);
  }, 300);

  // Memoized filtered stores
  const filteredStores = useMemo(() => {
    return searchStores(debouncedQuery, selectedCategory);
  }, [debouncedQuery, selectedCategory]);

  // Load more stores when scrolling
  useEffect(() => {
    if (inView && visibleStores < filteredStores.length) {
      setVisibleStores(prev => Math.min(prev + LOAD_MORE_INCREMENT, filteredStores.length));
    }
  }, [inView, filteredStores.length]);

  // Load logos in batches
  const loadStoreLogo = useCallback(async (store: Store) => {
    if (storeLogo[store.name] !== undefined || loadingLogosRef.current.has(store.name)) {
      return;
    }

    loadingLogosRef.current.add(store.name);
    try {
      const logo = await getStoreLogo(store);
      setStoreLogo(prev => ({ ...prev, [store.name]: logo }));
    } finally {
      loadingLogosRef.current.delete(store.name);
    }
  }, []);

  // Load logos for visible stores
  useEffect(() => {
    const visibleStoresList = filteredStores.slice(0, visibleStores);
    let isMounted = true;

    const loadLogosInBatches = async () => {
      for (let i = 0; i < visibleStoresList.length; i += LOGO_BATCH_SIZE) {
        if (!isMounted) break;
        
        const batch = visibleStoresList.slice(i, i + LOGO_BATCH_SIZE);
        await Promise.all(batch.map(store => loadStoreLogo(store)));
      }
    };

    loadLogosInBatches();
    return () => { isMounted = false; };
  }, [filteredStores, visibleStores, loadStoreLogo]);

  const visibleStoresList = filteredStores.slice(0, visibleStores);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Supported Stores - Kindly</title>
        <meta name="description" content="Browse over 48,500 supported stores where you can shop and make a difference with Kindly." />
      </Head>

      {/* Hero Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 whitespace-nowrap">Supported Stores</h1>
              <p className="text-xl text-gray-600 mb-6 whitespace-nowrap">We support over 48,500 stores worldwide to help you make a difference.</p>
              <p className="text-lg text-gray-500 mb-12 whitespace-nowrap">Below are some of our most popular stores. Use the search to find any supported store that isn't listed.</p>

              {/* Search and Filter */}
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        debouncedSetQuery(e.target.value);
                      }}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Search all 48,500+ supported stores..."
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setVisibleStores(INITIAL_VISIBLE_STORES);
                      }}
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
            <>
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {visibleStoresList.map((store, index) => (
                  <motion.div
                    key={store.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 1) }}
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
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                            <span className="text-lg font-medium text-gray-500">
                              {store.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-rose-600 transition-colors">
                        {store.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {store.category}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(visibleStoresList.length * 0.05, 1) }}
                  className="relative col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 bg-rose-50/50 rounded-xl border border-rose-100 p-8 text-center"
                >
                  <p className="text-xl text-gray-900 font-medium">
                    Plus {(48500 - storesList.length).toLocaleString()} more stores available!
                  </p>
                  <p className="text-gray-600 mt-2">
                    Can't find what you're looking for? Try searching above – your favorite store is probably supported
                  </p>
                </motion.div>
              </motion.div>
              {visibleStores < filteredStores.length && (
                <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
                  <div className="animate-pulse text-gray-400">Loading more stores...</div>
                </div>
              )}
            </>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No stores found matching your search criteria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
