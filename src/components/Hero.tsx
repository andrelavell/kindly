import React from 'react';
import { Chrome } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { CommunityFeed } from './CommunityFeed';
import { getBrowserInfo } from '../utils/browserDetection';

export function Hero() {
  const browserInfo = getBrowserInfo();

  return (
    <section className="relative bg-white md:bg-transparent">
      {/* Video Background - Hidden on mobile, shown from md up */}
      <div className="hidden md:block absolute top-0 left-0 w-1/2 h-full">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Content */}
            <motion.div 
              className="relative z-20 max-w-xl mx-auto md:mx-0 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >            
              <h2 className="text-base md:text-lg font-medium text-gray-900 md:text-white mb-4 md:drop-shadow-xl md:[text-shadow:0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]">Make Every Purchase Matter</h2>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 md:text-white leading-tight md:drop-shadow-2xl md:[text-shadow:0_4px_12px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.4)]">
                Turn Everyday Shopping Into <span className="relative">Life-Changing <div className="hidden md:block absolute -bottom-2 left-0 right-0 h-3 [mask-image:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjgiIHZpZXdCb3g9IjAgMCAyNDAgOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSA0LjVDMjAgMi41IDQwIDIuNSA2MCA0LjVDODAgNi41IDEwMCA2LjUgMTIwIDQuNUMxNDAgMi41IDE2MCAyLjUgMTgwIDQuNUMyMDAgNi41IDIyMCA2LjUgMjQwIDQuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] [mask-size:100%_100%] bg-rose-500"></div></span> Acts of Kindness
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 md:text-white mb-8 leading-relaxed md:drop-shadow-2xl md:[text-shadow:0_2px_4px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.4)]">
                Every time you shop online, you could be helping a child get education, 
                saving endangered species, or providing medical care to those in need — 
                <span className="font-medium text-gray-900 md:text-white">all without spending an extra penny</span>.
              </p>

              <div className="flex items-center justify-center md:justify-start space-x-6">
                <Button size="lg" variant="primary" icon={browserInfo.icon}>
                  {browserInfo.actionText} – It's Free
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <CommunityFeed inHero={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}