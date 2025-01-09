import React, { useState, useRef } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';
import { useRouter } from 'next/router';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const browserInfo = getBrowserInfo();
  const ref = useRef(null);
  const router = useRouter();
  const inView = useInView(ref, {
    once: false,
    amount: 0.5
  });

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Supported Stores', href: '/stores' },
    { name: 'Charity Directory', href: '/charities' },
    { name: 'For Creators', href: '/creators' }

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
                    transition: { 
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 2
                    }
                  } : {}}
                >
                  <Heart className="w-8 h-8 text-rose-500" />
                </motion.div>
              </div>
              <span className="text-xl font-bold text-gray-900">Kindly</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                href={browserInfo.isChrome ? "https://chrome.google.com/webstore/detail/your-extension-id" : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg"
              >
                {browserInfo.isChrome ? "Add to Chrome" : "Coming Soon"}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-600"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
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
              className="md:hidden"
            >
              <div className="pt-2 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 px-4">
                  <Button
                    href={browserInfo.isChrome ? "https://chrome.google.com/webstore/detail/your-extension-id" : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-center"
                  >
                    {browserInfo.isChrome ? "Add to Chrome" : "Coming Soon"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}