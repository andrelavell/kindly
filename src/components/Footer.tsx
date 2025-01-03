import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="w-6 h-6 text-rose-500" />
            <span className="text-xl font-bold text-gray-800">Kindly</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          © {new Date().getFullYear()} Kindly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}