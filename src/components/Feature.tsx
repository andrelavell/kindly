import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Feature({ icon: Icon, title, description, color, delay = 0 }: FeatureProps) {
  return (
    <motion.div 
      variants={item}
      className="relative group"
    >
      <div className="absolute inset-0 bg-white rounded-3xl shadow-xl shadow-gray-200/50 
        transition-transform duration-300 group-hover:scale-105" />
      
      <div className="relative p-8">
        <div className={`w-14 h-14 ${color} rounded-2xl mb-6 flex items-center justify-center 
          shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}