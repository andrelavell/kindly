import React from 'react';
import { Users, DollarSign, Building } from 'lucide-react';

const stats = [
  { 
    value: "$1M+", 
    label: "Donated to Charities",
    icon: <DollarSign className="h-5 w-5 text-white" />,
    gradient: "from-rose-500 to-rose-600"
  },
  { 
    value: "500+", 
    label: "Partner Charities",
    icon: <Building className="h-5 w-5 text-white" />,
    gradient: "from-blue-500 to-blue-600"
  },
  { 
    value: "100K+", 
    label: "Active Users",
    icon: <Users className="h-5 w-5 text-white" />,
    gradient: "from-green-500 to-green-600"
  }
];

export function ImpactSection() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Impact</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg p-6`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white/90">{stat.label}</p>
                    <div className="p-2 bg-white/10 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                <div 
                  className="absolute inset-0 bg-gradient-to-br opacity-10"
                  style={{ 
                    backgroundImage: `radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)`
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}