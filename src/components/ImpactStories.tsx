import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { impactStories } from '../utils/impactStories';

const storyVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function ImpactStories() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background gradient with hardware acceleration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-brand/5 via-white to-teal-50/50"
        style={{ willChange: 'transform' }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-2xl mb-16">
            <motion.span 
              className="brand font-medium text-sm block mb-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={storyVariants}
            >
              Real Impact Stories
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={storyVariants}
            >
              See How Your Shopping{' '}
              <span className="relative inline-block">
                Changes Lives
                <motion.span
                  className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-brand opacity-30"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={storyVariants}
              transition={{ delay: 0.2 }}
            >
              Every purchase you make contributes to real stories of transformation around the world
            </motion.p>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {impactStories.map((story, index) => {
              // First item spans 2 columns
              // Items 2-3 go in their own columns
              // Items 4-5 go in the first two columns of the last row
              // Last item goes in the last column of the last row
              const gridClass = index === 0 
                ? 'md:col-span-2' 
                : index >= 4 
                  ? `md:col-start-${(index - 3)}`
                  : '';
              
              return (
                <motion.div
                  key={story.title}
                  className={`group ${gridClass}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={storyVariants}
                  transition={{ delay: index * 0.1 }}
                  style={{ willChange: 'transform' }}
                >
                  {/* Image Container */}
                  <div className="rounded-2xl overflow-hidden mb-4">
                    <div className={`relative ${
                      index === 0 ? 'aspect-[16/9]' : 'aspect-square'
                    }`}>
                      <Image 
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes={index === 0 
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        }
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                        style={{ willChange: 'transform' }}
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <span className="brand opacity-75 font-medium text-xs mb-2 block">
                      {story.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3  line-clamp-3">
                      "{story.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        {story.location}
                      </span>
                      
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
