import React from 'react';
import { Stats } from './Stats';
import { Users, DollarSign, Building } from 'lucide-react';

export function ImpactSection() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Impact</h2>
        <div className="max-w-4xl mx-auto">
          <Stats
            stats={[
              { 
                value: "$1M+", 
                label: "Donated to Charities", 
                color: "text-white",
                gradient: "bg-gradient-to-br from-rose-500 to-rose-600",
                icon: <DollarSign className="h-5 w-5 text-white" />
              },
              { 
                value: "500+", 
                label: "Partner Charities", 
                color: "text-white",
                gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
                icon: <Building className="h-5 w-5 text-white" />
              },
              { 
                value: "100K+", 
                label: "Active Users", 
                color: "text-white",
                gradient: "bg-gradient-to-br from-green-500 to-green-600",
                icon: <Users className="h-5 w-5 text-white" />
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}