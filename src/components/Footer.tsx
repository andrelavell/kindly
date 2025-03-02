import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

// Import navigation links from Navigation component
const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Supported Stores', href: '/stores' },
  { name: 'For Creators', href: '/creators' },
  { name: 'Press', href: '/press' },
];

const supportLinks = [
  { name: 'FAQ', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Contact Us', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <Heart className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <span className="logo text-3xl text-white">kindly</span>
              </Link>
              <p className="mt-4 text-gray-400">
                Shop at your favorite stores and support causes you care about.
              </p>
            </div>
            
            {/* Navigation Links */}
            <nav aria-label="Company navigation">
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={`Go to ${link.name}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Support Links */}
            <nav aria-label="Support navigation">
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={`Go to ${link.name}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center" role="contentinfo">
              &copy; {new Date().getFullYear()} Kindly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}