import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="relative z-50 py-4 border-b border-gray-100 bg-white">
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
            
            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="max-w-7xl mx-auto space-y-4">
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="primary" size="lg" icon={browserInfo.icon} className="w-full justify-center">
                    {browserInfo.actionText}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}