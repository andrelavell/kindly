import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
  color: string;
}

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
        >
          <div className={`h-2 ${stat.color}`} />
          <div className="p-8">
            <div className={`text-5xl font-bold mb-2 ${stat.color.replace('bg-', 'text-')}`}>
              {stat.value}
            </div>
            <div className="text-gray-600 text-lg">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}