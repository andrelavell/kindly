import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SpotlightDonor {
  id: number;
  name: string;
  totalDonated: number;
  favoriteCause: string;
  impactDescription: string;
  donationsCount: number;
}

const causeColors: { [key: string]: { text: string; bg: string; border: string } } = {
  'Environmental Conservation': {
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100'
  },
  'Education': {
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100'
  },
  'Healthcare': {
    text: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-100'
  },
  'Food Security': {
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100'
  },
  'Community Development': {
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100'
  }
};

const spotlightDonors: SpotlightDonor[] = [
  {
    id: 1,
    name: "Sarah M.",
    totalDonated: 47,
    favoriteCause: "Environmental Conservation",
    impactDescription: "Supported environmental conservation",
    donationsCount: 24
  },
  {
    id: 2,
    name: "Michael R.",
    totalDonated: 68,
    favoriteCause: "Education",
    impactDescription: "Helped fund youth education",
    donationsCount: 31
  },
  {
    id: 3,
    name: "Emily K.",
    totalDonated: 52,
    favoriteCause: "Healthcare",
    impactDescription: "Helped provide medical care",
    donationsCount: 26
  },
  {
    id: 4,
    name: "David L.",
    totalDonated: 59,
    favoriteCause: "Food Security",
    impactDescription: "Supported local food banks",
    donationsCount: 28
  },
  {
    id: 5,
    name: "Jessica W.",
    totalDonated: 43,
    favoriteCause: "Community Development",
    impactDescription: "Supported community development",
    donationsCount: 22
  }
];

function getAvatarUrl(name: string) {
  // Use UI Avatars to generate simple, initial-based avatars
  const background = 'f43f5e'; // rose-500
  const color = 'ffffff'; // white text
  const size = 64; // we'll scale down in the UI
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=${size}&bold=true&format=svg`;
}

export function CommunitySpotlight() {
  const getCauseColors = (cause: string) => {
    return causeColors[cause] || { text: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-100' };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden h-full flex flex-col">
      <div className="bg-rose-500 px-6 py-6 sm:px-8 border-b border-gray-200/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-100" />
          <h3 className="text-xl font-bold leading-6 text-white">
            Community Impact Spotlight
          </h3>
        </div>
        <p className="mt-2 text-sm text-rose-100 font-medium">
          Celebrating some of our amazing contributors making a difference
        </p>
      </div>
      
      <div className="divide-y divide-gray-200/50 flex-1">
        {spotlightDonors.map((donor, index) => {
          const colors = getCauseColors(donor.favoriteCause);
          return (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative px-6 py-6 sm:px-8 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 gap-x-5">
                  <div className="flex-none relative">
                    <div className="absolute inset-0 bg-rose-200 rounded-full animate-pulse" />
                    <Image
                      src={getAvatarUrl(donor.name)}
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-full relative ring-2 ring-white shadow-sm"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-900">
                      {donor.name}
                    </p>
                    <p className="mt-2 text-sm leading-5 text-gray-500 font-medium">
                      {donor.favoriteCause}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-rose-500">
                    ${donor.totalDonated.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 font-medium">
                    {donor.donationsCount} donations
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className={`text-sm ${colors.text} ${colors.bg} rounded-full px-4 py-1.5 inline-block font-medium border ${colors.border} shadow-sm`}>
                  {donor.impactDescription}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="px-6 py-5 sm:px-8 bg-white border-t border-gray-200/50 flex items-center justify-center">
        <p className="text-sm text-center text-rose-500 font-medium">
          Join our community of changemakers today
        </p>
      </div>
    </div>
  );
}
