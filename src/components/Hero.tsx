import React, { useState, useRef, useEffect } from 'react';
import { Chrome } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Button } from './Button';
import { CommunityFeed } from './CommunityFeed';
import { getBrowserInfo } from '../utils/browserDetection';
import { heroConfig } from '../config/heroConfig';

export function Hero() {
  const browserInfo = getBrowserInfo();
  const { showVideo = false } = heroConfig;
  const roughRef = useRef(null);
  const isInView = useInView(roughRef, { once: true });

  return (
    <section className="relative min-h-[600px] bg-[#F5F8FA]">
      {/* Left side - Image */}
      <div className="absolute left-0 top-0 w-[40%] h-full overflow-hidden hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop"
          alt="People volunteering and helping others"
          className="object-cover w-full h-full"
          style={{
            objectPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-black/10" /> {/* Subtle overlay */}
      </div>

      {/* Right side - Content */}
      <div className="container mx-auto px-4 relative z-[2]">
        <div className="flex min-h-[600px] items-center">
          <div className="ml-auto w-full md:w-[60%] md:pl-12 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[640px] mx-auto md:mx-0"
            >
              <h1 className="text-[2.75rem] leading-[1.2] font-bold text-[#0B2742] mb-6">
                Turn Everyday Shopping Into Life-Changing Acts of Kindness
              </h1>
              <p className="text-xl text-[#536B7D] mb-8">
                Imagine changing lives while you shop. Your everyday purchases could give a child their first book, protect endangered wildlife, or bring vital medicine to those in need—without costing you a single penny more.
              </p>
              <div className="flex items-center gap-8">
                <Button size="lg" variant="primary" className="bg-[#E07C52] hover:bg-[#c86c46] text-white px-8">
                  <Chrome className="w-5 h-5 mr-2" />
                  Add to Chrome – It's Free
                </Button>
                <div className="text-sm text-[#536B7D]">
                  <div className="flex items-center">
                    ★★★★★ <span className="ml-2">141,786</span>
                  </div>
                  <div>Chrome Store reviews</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}