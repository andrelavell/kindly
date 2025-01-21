import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface SpotlightDonor {
  id: number;
  name: string;
  totalDonated: number;
  favoriteCause: string;
  impactDescription: string;
  donationsCount: number;
}

const causeColors: { [key: string]: { text: string; bg: string; border: string; hex: string } } = {
  'Environmental Conservation': {
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hex: '059669'  // emerald-600
  },
  'Education': {
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hex: '2563eb'  // blue-600
  },
  'Healthcare': {
    text: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    hex: '0284c7'  // sky-600
  },
  'Food Security': {
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hex: 'd97706'  // amber-600
  },
  'Community Development': {
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hex: '7c3aed'  // violet-600
  }
};

const spotlightDonors: SpotlightDonor[] = [
  {
    id: 1,
    name: "Sarah M.",
    totalDonated: 47,
    favoriteCause: "Austin, Texas",
    impactDescription: "Supporting environmental conservation",
    donationsCount: 24
  },
  {
    id: 2,
    name: "Michael R.",
    totalDonated: 68,
    favoriteCause: "Manchester, UK",
    impactDescription: "Helping fund youth education",
    donationsCount: 31
  },
  {
    id: 3,
    name: "Emily K.",
    totalDonated: 52,
    favoriteCause: "Vancouver, BC",
    impactDescription: "Helping provide medical care",
    donationsCount: 26
  },
  {
    id: 4,
    name: "David L.",
    totalDonated: 59,
    favoriteCause: "Portland, Oregon",
    impactDescription: "Supporting local food banks",
    donationsCount: 28
  },
  {
    id: 5,
    name: "Jessica W.",
    totalDonated: 43,
    favoriteCause: "San Francisco, CA",
    impactDescription: "Supporting community development",
    donationsCount: 22
  }
];

function getAvatarUrl(name: string, colors: { text: string; bg: string; border: string; hex: string }) {
  // Use UI Avatars to generate simple, initial-based avatars
  const background = colors.hex;
  const color = 'ffffff'; // white text
  const size = 44;
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=${size}&bold=true&format=svg`;
}

export function CommunitySpotlight() {
  const getCauseColors = (impact: string) => {
    if (impact.includes("environmental")) {
      return causeColors['Environmental Conservation'];
    } else if (impact.includes("education")) {
      return causeColors['Education'];
    } else if (impact.includes("medical")) {
      return causeColors['Healthcare'];
    } else if (impact.includes("food")) {
      return causeColors['Food Security'];
    } else if (impact.includes("community")) {
      return causeColors['Community Development'];
    }
    return { text: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-100', hex: '000000' };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden h-full flex flex-col">
      <div className="bg-brand px-6 py-6 sm:px-8 border-b border-gray-200/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <h3 className="text-xl font-bold leading-6 text-white">
            Community Impact Spotlight
          </h3>
        </div>
        <p className="mt-2 text-sm text-white/90 font-medium">
          Celebrating some of our amazing contributors making a difference
        </p>
      </div>
      
      <div className="divide-y divide-gray-200/50 flex-1">
        {spotlightDonors.map((donor, index) => {
          const colors = getCauseColors(donor.impactDescription);
          return (
            <div
              key={donor.id}
              className="relative px-6 py-6 sm:px-8 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 gap-x-5">
                  <div className="flex-none relative">
                    <div className={`absolute inset-0 bg-${colors.hex} rounded-full`} />
                    <Image
                      src={getAvatarUrl(donor.name, colors)}
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-full relative ring-2 ring-white shadow-sm"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-base font-semibold leading-6 text-gray-900 flex items-center gap-2">
                      {donor.name}
                      <Image 
                        src={`/images/flags/${donor.name.includes("Michael") ? "gb" : donor.name.includes("Emily") ? "ca" : "us"}.svg`}
                        alt=""
                        width={16}
                        height={12}
                        className="inline-block"
                      />
                    </p>
                    <p className="mt-2 text-sm leading-5 text-gray-500 font-medium">
                      {donor.favoriteCause}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold brand">
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
            </div>
          );
        })}
      </div>
      
      <div className="px-6 py-5 sm:px-8 bg-white border-t border-gray-200/50 flex items-center justify-center">
        <p className="text-sm text-center brand font-medium">
          Join our community of changemakers today
        </p>
      </div>
    </div>
  );
}
