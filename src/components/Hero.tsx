import React from 'react';
import { Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { CommunityFeed } from './CommunityFeed';
import { getBrowserInfo } from '../utils/browserDetection';

export function Hero() {
  const browserInfo = getBrowserInfo();

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >            
            <h2 className="text-lg font-medium text-[#222] mb-4">Make Every Purchase Matter</h2>
            
            <h1 className="text-5xl font-bold mb-6 text-[rgb(244,63,94)] leading-tight">
            Turn Everyday Shopping Into Life-Changing Acts of Kindness            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every time you shop online, you could be helping a child get education, 
              saving endangered species, or providing medical care to those in need — 
              <span className="font-medium text-gray-900">all without spending an extra penny</span>.
            </p>

            <div className="flex items-center space-x-6">
              <Button size="lg" variant="primary" icon={browserInfo.icon}>
                {browserInfo.actionText} – It's Free
              </Button>
             
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <CommunityFeed inHero={true} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}