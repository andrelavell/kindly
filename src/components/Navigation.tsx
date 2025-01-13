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
    { name: 'For Creators', href: '/creators' },
    { name: 'Charity Directory', href: '/charities' },
    { name: 'Test', href: 'https://sovrn.co/vn65tzv' }
  ];

  return (
    <nav className="relative z-50 py-4 border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative" ref={ref}>
                <Heart className="w-[1.6rem] h-[1.6rem] text-brand" aria-hidden="true" />
                <motion.div 
                  className="absolute inset-0"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={inView ? {
                    scale: [1, 1.2, 1],
                    opacity: [0, 1, 0]
                  } : {}}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <Heart className="w-[1.6rem] h-[1.6rem] text-brand" />
                </motion.div>
              </div>
              <Link href="/" className="logo text-[2rem] text-[#222222]">
                kindly
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                href={browserInfo.isChrome ? "https://chrome.google.com/webstore/detail/your-extension-id" : "#"}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="primary"
                icon={browserInfo.icon}
              >
                {browserInfo.isChrome ? `${browserInfo.actionText} – It's Free` : "Add to Chrome"}
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -mr-2 text-brand hover:opacity-75"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <div
              id="mobile-menu"
              className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
              role="navigation"
              aria-label="Mobile navigation"
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
                    size="lg"
                    variant="primary"
                    icon={browserInfo.icon}
                  >
                    {browserInfo.isChrome ? `${browserInfo.actionText} – It's Free` : "Add to Chrome"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}