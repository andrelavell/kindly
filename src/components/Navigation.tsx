import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#' },
    { name: 'Stores', href: '/stores' },
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
            <Link to="/" className="flex items-center space-x-2">
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
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button variant="primary" size="md" icon={browserInfo.icon}>
                {browserInfo.actionText}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-rose-500 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            <div className="px-4 pt-2 pb-3 space-y-1 bg-white">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Button variant="primary" size="lg" icon={browserInfo.icon} className="w-full justify-center">
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