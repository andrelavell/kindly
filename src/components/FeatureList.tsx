import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  "100% free to use forever",
  "Works with thousands of stores",
  "Choose from 500+ verified charities",
  "Real-time impact tracking",
  "Bank-level security",
  "100% of donations reach charities"
];

export function FeatureList() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why People Love <span className="text-rose-500">Kindly</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-4 p-6 rounded-xl hover:bg-rose-50 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle2 className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}