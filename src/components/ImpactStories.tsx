import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function ImpactStories() {
  const stories = [
    {
      category: "Education",
      title: "Providing Education to 1000+ Children",
      quote: "Thanks to donors like you, I can finally go to school and chase my dreams.",
      location: "Rural India",
      image: "/images/impact/education.jpg",
      className: "col-span-2 row-span-2"
    },
    {
      category: "Healthcare",
      title: "Emergency Medical Care for Communities",
      quote: "The medical supplies funded by shoppers like you saved many lives in our village.",
      location: "Kenya",
      image: "/images/impact/healthcare.jpg",
      className: "col-span-1 row-span-1"
    },
    {
      category: "Environment",
      title: "Protecting Wildlife Habitats",
      quote: "Your contributions help us preserve these endangered species for future generations.",
      location: "Amazon Rainforest",
      image: "/images/impact/wildlife.jpg",
      className: "col-span-1 row-span-1"
    },
    {
      category: "Women Empowerment",
      title: "Supporting Women Entrepreneurs",
      quote: "With this microloan, I was able to start my own business and support my family.",
      location: "Bangladesh",
      image: "/images/impact/women-entrepreneurs.jpg",
      className: "col-span-1 row-span-1"
    },
    {
      category: "Veterans Support",
      title: "Helping Veterans Transition",
      quote: "The job training program gave me the skills I needed to start my civilian career.",
      location: "United States",
      image: "/images/impact/veterans.jpg",
      className: "col-span-1 row-span-1"
    },
    {
      category: "Clean Water",
      title: "Providing Clean Water Access",
      quote: "Our village now has access to clean drinking water, improving health for everyone.",
      location: "Ethiopia",
      image: "/images/impact/clean-water.jpg",
      className: "col-span-1 row-span-1"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white to-teal-50/50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-2xl mb-16">
            <motion.span 
              className="text-rose-500 font-medium block mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Real Impact Stories
            </motion.span>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              See How Your Shopping{' '}
              <span className="relative inline-block">
                Changes Lives
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-rose-500/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Every purchase you make contributes to real stories of transformation
              around the world
            </motion.p>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={story.title}
                className={`group relative overflow-hidden rounded-3xl ${story.className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-rose-300 font-medium text-sm mb-2">
                    {story.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {story.title}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">
                    "{story.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      {story.location}
                    </span>
                    <button className="text-white flex items-center gap-1 text-sm group/btn">
                      Read More 
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
