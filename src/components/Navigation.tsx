import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Stores', href: '/stores' },
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
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative">
                  <Heart className="w-8 h-8 text-rose-500" />
                  <motion.div 
                    className="absolute inset-0"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-8 h-8 text-rose-500/30" />
                  </motion.div>
                </div>
                <span className="text-xl font-bold text-gray-900">Kindly</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href.startsWith('#') ? link.href : link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
              <Button>{browserInfo.actionText}</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -mr-1 text-gray-700"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href.startsWith('#') ? link.href : link.href}
                    className="text-base font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="w-full justify-center">
                  {browserInfo.actionText}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}