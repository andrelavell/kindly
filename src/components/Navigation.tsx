import React, { useState, useRef } from 'react';
import { Heart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { Button } from './Button';
import { getBrowserInfo } from '../utils/browserDetection';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const browserInfo = getBrowserInfo();
  const ref = useRef(null);
  const router = useRouter();
  const { user, userProfile } = useAuth();
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

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
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-gray-600 hover:text-rose-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{userProfile?.first_name || 'Account'}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    className="text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="md">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}

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
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-rose-500 transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}

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