import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

const charities = [
  { id: 1, name: "Save the Children", category: "Children" },
  { id: 2, name: "World Wildlife Fund", category: "Environment" },
  { id: 3, name: "Doctors Without Borders", category: "Healthcare" },
  { id: 4, name: "UNICEF", category: "Children" },
  { id: 5, name: "Red Cross", category: "Disaster Relief" }
];

export function CharitySelector() {
  const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <h3 className="text-2xl font-bold mb-6">Choose Your Cause</h3>
      <div className="space-y-3">
        {charities.map((charity) => (
          <motion.button
            key={charity.id}
            className={`w-full p-4 rounded-xl flex items-center justify-between ${
              selectedCharity === charity.id 
                ? 'bg-teal-50 border-2 border-teal-500' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCharity(charity.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <Heart className={`w-5 h-5 ${
                selectedCharity === charity.id ? 'text-teal-500' : 'text-gray-400'
              }`} />
              <div className="text-left">
                <div className="font-medium">{charity.name}</div>
                <div className="text-sm text-gray-500">{charity.category}</div>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 ${
              selectedCharity === charity.id ? 'text-teal-500' : 'text-gray-400'
            }`} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}