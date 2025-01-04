import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

// Import navigation links from Navigation component
const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Stores', href: '/stores' },
  { name: 'Ambassadors', href: '/ambassadors' },
  { name: 'Press', href: '/press' },
  { name: 'Charity Directory', href: '/charity-directory' },
];

const supportLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Contact Us', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-rose-500" />
                <span className="text-xl font-bold">Kindly</span>
              </div>
              <p className="mt-4 text-gray-400">
                Shop at your favorite stores and support causes you care about.
              </p>
            </div>
            
            {/* Navigation Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kindly. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}