import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';

export function Navigation() {
  const navLinks = [
    { name: 'About', href: '#' },
    { name: 'Ambassadors', href: '#' },
    { name: 'Nonprofits', href: '#' },
    { name: 'News', href: '#' },
    { name: 'Nonprofit login', href: '#' },
    { name: 'Charity Directory', href: '#' },
  ];

  const browserInfo = getBrowserInfo();

  return (
    <nav className="py-4 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Heart className="w-8 h-8 text-rose-500" />
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-8 h-8 text-rose-500" />
                </motion.div>
              </div>
              <span className="text-2xl font-bold">Kindly</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button variant="primary" size="md" icon={browserInfo.icon}>
                {browserInfo.actionText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}