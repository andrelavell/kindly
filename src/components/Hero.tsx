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
          src="https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto,w_1200/v1738625353/ksj3wihg6i8akuhqbd19.jpg"
          srcSet="https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto,w_800/v1738625353/ksj3wihg6i8akuhqbd19.jpg 800w,
                  https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto,w_1200/v1738625353/ksj3wihg6i8akuhqbd19.jpg 1200w,
                  https://res.cloudinary.com/de7o1yeyo/image/upload/f_auto,q_auto,w_1600/v1738625353/ksj3wihg6i8akuhqbd19.jpg 1600w"
          sizes="(max-width: 768px) 100vw, 40vw"
          alt="People volunteering and helping others"
          className="object-cover w-full h-full"
          loading="eager"
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
            <div
              className="max-w-[640px] mx-auto md:mx-0"
            >
              <h1 className="text-[2.75rem] leading-[1.1] font-bold text-[#0B2742] mb-6">
                Turn <span className="hidden md:inline">Your</span> Everyday Shopping Into Life-Changing Acts of Kindness
              </h1>
              <p className="text-xl text-[#536B7D] mb-8">
              Imagine changing lives while you shop. Your everyday purchases can support the causes you care about at no extra cost to you.
              </p>
              <div className="flex flex-col items-center md:items-start gap-4">
                <Button size="lg" variant="primary" className="bg-[#E07C52] hover:bg-[#c86c46] text-white px-8">
                  <Chrome className="w-5 h-5 mr-2" />
                  Add to Chrome – It's Free
                </Button>
                <div className="text-sm text-[#536B7D] flex items-center gap-2">
                  ★★★★★ <span>141,786</span> Chrome Store Reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}