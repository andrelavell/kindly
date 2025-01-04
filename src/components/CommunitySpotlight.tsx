import React from 'react';
import Image from 'next/image';

interface SpotlightDonor {
  id: number;
  name: string;
  totalDonated: number;
  favoriteCause: string;
  impactDescription: string;
  donationsCount: number;
}

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
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
      <div className="bg-rose-500 px-4 py-5 sm:px-6 border-b border-gray-200/50">
        <div>
          <h3 className="text-lg font-semibold leading-6 text-white">
            Community Impact Spotlight
          </h3>
          <p className="mt-1 text-sm text-rose-100">
            Showcasing some of our amazing contributors
          </p>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200/50">
        {spotlightDonors.map((donor) => (
          <div
            key={donor.id}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0 gap-x-4">
                <div className="flex-none">
                  <Image
                    src={getAvatarUrl(donor.name)}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {donor.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {donor.favoriteCause}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${donor.totalDonated.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {donor.donationsCount} donations
                </p>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-600 bg-gray-50 rounded-md px-2 py-1 inline-block">
                {donor.impactDescription}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200/50">
        <p className="text-xs text-center text-gray-500">
          Join our community and make your impact today
        </p>
      </div>
    </div>
  );
}
