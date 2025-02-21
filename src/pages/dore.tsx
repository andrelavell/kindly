import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

// Types for our beauty merchants
type BeautyMerchantProps = {
  merchants: BeautyMerchant[];
};

interface BeautyMerchant {
  name: string;
  category: string;
  domain: string;
}

const parseMerchants = (data: string): BeautyMerchant[] => {
  const merchants: BeautyMerchant[] = [];
  const sections = data.split('================================================================================');
  
  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const merchant: Partial<BeautyMerchant> = {};
    
    lines.forEach(line => {
      if (line.startsWith('Merchant:')) {
        // Remove text within parentheses
        merchant.name = line.replace('Merchant:', '').trim().replace(/\s*\([^)]*\)\s*/g, '');
      } else if (line.startsWith('Category:')) {
        merchant.category = line.replace('Category:', '').trim();
      } else if (line.startsWith('Domain:')) {
        merchant.domain = line.replace('Domain:', '').trim();
      }
    });
    
    if (merchant.name && merchant.category && merchant.domain) {
      merchants.push(merchant as BeautyMerchant);
    }
  });
  
  return merchants;
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const beautyData = fs.readFileSync(path.join(process.cwd(), 'src/data/beauty'), 'utf-8');
  const excludedMerchants = [
    '1-800 Contacts',
    'AKAR Affiliate Program',
    'Alpine Hearing Protection',
    'Allergy Test',
    'Branded Beauty Affiliate Programme',
    'Canadian Insulin',
    'Circle DNA',
    'Click Pharmacy',
    'Dunleath DE',
    'Grown Alchemist'
  ];

  const merchants = parseMerchants(beautyData).filter(merchant => !excludedMerchants.includes(merchant.name));

  return {
    props: {
      merchants,
    },
  };
}

export default function Dore({ merchants }: BeautyMerchantProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9F7] to-white">
      <Head>
        <title>Beauty Brands - Kindly</title>
        <meta name="description" content="Discover our curated collection of beauty and wellness brands where you can shop and make a difference with Kindly." />
      </Head>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#E11D48]/10 text-[#E11D48] text-lg font-medium">
            Hey Doré, you're in good company!
          </span>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Supported Beauty Brands
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our network of supported health and beauty merchants
          </p>
        </motion.div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {merchants.map((merchant, index) => (
            <motion.div
              key={merchant.domain}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.1, 2) }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 p-6 hover:shadow-lg hover:ring-[#3D8A76]/20 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#3D8A76] transition-colors">
                    {merchant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {merchant.category}
                  </p>
                  <Link
                    href={`https://${merchant.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-[#3D8A76] rounded-lg hover:bg-[#3D8A76]/90 transition-all duration-300 hover:shadow-md"
                  >
                    Visit Website →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
