import React, { useState, useRef } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const browserInfo = getBrowserInfo();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: false,
    amount: 0.5
  });

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Supported Stores', href: '/stores' },
    { name: 'For Creators', href: '/creators' },
    { name: 'Charity Directory', href: '/charity-directory' },
    { name: 'Press', href: '/press' },
  ];

  return (
    <nav className="relative z-50 py-4 border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative" ref={ref}>
                <Heart className="w-8 h-8 text-rose-500" />
                <motion.div 
                  className="absolute inset-0"
                  animate={inView ? { 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1]
                  } : { scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 2,
                    repeat: inView ? Infinity : 0,
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
              <Link href="/about" className="text-gray-600 hover:text-rose-500 transition-colors">
                About
              </Link>
              <Link href="/stores" className="text-gray-600 hover:text-rose-500 transition-colors">
                Supported Stores
              </Link>
              <Link href="/creators" className="text-gray-600 hover:text-rose-500 transition-colors">
                For Creators
              </Link>
              <Link href="/charity-directory" className="text-gray-600 hover:text-rose-500 transition-colors">
                Charity Directory
              </Link>
              <Link href="/press" className="text-gray-600 hover:text-rose-500 transition-colors">
                Press
              </Link>
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
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors">
                About
              </Link>
              <Link href="/stores" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors">
                Supported Stores
              </Link>
              <Link href="/creators" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors">
                For Creators
              </Link>
              <Link href="/charity-directory" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors">
                Charity Directory
              </Link>
              <Link href="/press" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors">
                Press
              </Link>
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