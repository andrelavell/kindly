import React from 'react';
import { Stats } from './Stats';

export function ImpactSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20">
            Our Growing <span className="text-rose-500">Impact</span>
          </h2>
          <Stats 
            stats={[
              { value: "$1M+", label: "Donated to Charities", color: "bg-gradient-to-r from-rose-400 to-rose-500" },
              { value: "500+", label: "Partner Charities", color: "bg-gradient-to-r from-blue-400 to-blue-500" },
              { value: "100K+", label: "Active Users", color: "bg-gradient-to-r from-green-400 to-green-500" }
            ]}
          />
        </div>
      </div>
    </section>
  );
}