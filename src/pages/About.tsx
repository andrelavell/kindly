import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { getBrowserInfo } from '../utils/browserDetection';
import { GetStaticProps } from 'next';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export default function about() {
  const stats = [
    { number: '500+', label: 'Supported Charities' },
    { number: '$2.5M+', label: 'Impact Generated' },
    { number: '100K+', label: 'Active Users' },
    { number: '5000+', label: 'Partner Stores' }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Compassion First",
      description: "We believe in the power of empathy and kindness to transform lives. Every decision we make starts with asking how we can help others."
    },
    {
      icon: <Globe className="w-6 h-6 text-rose-500" />,
      title: "Global Impact",
      description: "Our vision extends beyond borders. We're building a worldwide community of givers who believe in the power of collective action."
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: "Community Driven",
      description: "We're powered by people who care. Our community of users, partners, and charities work together to create meaningful change."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-rose-500" />,
      title: "Innovation for Good",
      description: "We leverage technology to make giving effortless and impactful. Innovation drives our mission to transform everyday actions into forces for good."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000" 
            alt="People helping"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transforming Shopping into a Force for Good
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                We're on a mission to make every purchase matter by connecting 
                conscious consumers with causes they care about.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Kindly was born from a simple yet powerful idea: what if we could 
                  transform the billions spent on everyday shopping into a force for 
                  positive change?
                </p>
                <p>
                  We saw a world where people wanted to make a difference but often 
                  struggled to find the time or resources. Meanwhile, billions of 
                  dollars in retail profits were flowing without purpose.
                </p>
                <p>
                  That's when we created Kindly — a platform that seamlessly 
                  connects shopping with giving, making it effortless for anyone to 
                  support causes they care about through their everyday purchases.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000" 
                alt="Impactful charity work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-rose-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              These core principles guide everything we do, from the features we build 
              to the partners we choose and the impact we create.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Thousands of Causes, One Mission
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We've partnered with over 2,500 verified charities and nonprofits worldwide, 
              supporting causes across every category imaginable. From local community initiatives 
              to global humanitarian efforts, your impact knows no bounds.
            </p>
            <p className="text-lg text-gray-600">
              Here are just a few examples of the many cause categories you can support through Kindly:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800" 
                alt="Education"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-gray-200">
                    Supporting 500+ education initiatives from early childhood programs to adult learning.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800" 
                alt="Environment"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">Environment</h3>
                  <p className="text-gray-200">
                    Partnered with 400+ environmental organizations fighting climate change.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800" 
                alt="Healthcare"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
                  <p className="text-gray-200">
                    Supporting 600+ healthcare initiatives from medical research to patient care.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-6">
              And many more categories including animal welfare, arts & culture, disaster relief, 
              hunger & poverty, mental health, veterans' support, and youth development.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="inline-flex items-center"
            >
              Explore All Causes <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Every purchase has the power to change lives. Start making your shopping count today.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              className="inline-flex items-center"
            >
              Add to {getBrowserInfo().name} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
