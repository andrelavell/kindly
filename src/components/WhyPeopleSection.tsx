import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Gift, Sparkles, Users } from 'lucide-react';

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
};

export function WhyPeopleSection() {
  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Turn Every Purchase into Purpose",
      description: "Transform your everyday shopping into meaningful change, at the stores you already love"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Champion Your Passion",
      description: "Support causes that move your heart, from saving rainforests to feeding families"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Effortless Kindness",
      description: "Make a difference without lifting a finger - your shopping becomes an act of love"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Multiply Your Joy",
      description: "Experience the happiness of giving while getting what you need - at no extra cost"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join a Movement of Good",
      description: "Be part of a community that's changing the world, one purchase at a time"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Watch Your Impact Bloom",
      description: "See how your everyday choices create ripples of positive change in real time"
    }
  ];

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-brand/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,228,230,0.3),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,249,250,0.3),_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span 
              className="brand font-medium block mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Community Love
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why People Love{' '}
              <span className="relative inline-block">
                Kindly
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-brand opacity-30"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </span>
            </motion.h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={featureVariants}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300"
                style={{ willChange: 'transform' }}
              >
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center brand mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
