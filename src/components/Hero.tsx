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
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          srcSet="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 800w,
                  https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1200w,
                  https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1600w"
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