import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

// Import navigation links from Navigation component
const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Stores', href: '/stores' },
  { name: 'Ambassadors', href: '/ambassadors' },
  { name: 'Press', href: '/press' },
  { name: 'Charity Directory', href: '#' },
];

const supportLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Contact Us', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-rose-500" />
              <h3 className="text-xl font-semibold">Kindly</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Transform everyday shopping into life-changing acts of kindness.
            </p>
          </div>
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
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
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kindly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}