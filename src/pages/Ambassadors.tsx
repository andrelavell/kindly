import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Instagram, Youtube, Twitter, ChevronRight, Users, Sparkles, DollarSign } from 'lucide-react';
import { Button } from '../components/Button';
import { GetStaticProps } from 'next';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}

export default function ambassadors() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    instagram: '',
    followers: '',
    niche: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will go here
    console.log('Form submitted:', formData);
  };

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Make a Real Impact",
      description: "Use your influence to drive positive change. Every follower you bring to Kindly helps support important causes worldwide."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-rose-500" />,
      title: "Earn While Giving Back",
      description: "Receive competitive commission rates and exclusive bonuses while helping your community make a difference."
    },
    {
      icon: <Users className="w-6 h-6 text-rose-500" />,
      title: "Join an Elite Community",
      description: "Connect with like-minded creators in our exclusive ambassador community. Share strategies, collaborate, and grow together."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-rose-500" />,
      title: "Premium Resources",
      description: "Get access to custom marketing materials, dedicated support, and early access to new features and campaigns."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Become a Kindly Ambassador
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our mission to transform everyday shopping into a force for good. 
                As a Kindly Ambassador, you’ll help create positive change while building 
                your personal brand.
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-2xl overflow-hidden h-[400px] group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800" 
                alt="Ambassador" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-lg font-semibold">Sarah Chen</p>
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">@sarahlifestyle</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[400px] group">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800" 
                alt="Ambassador"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-lg font-semibold">James Wilson</p>
                  <div className="flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    <span className="text-sm">@jameswilson</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-[400px] group">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800" 
                alt="Ambassador"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-lg font-semibold">Michael Chang</p>
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm">@michaelchangtech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Become an Ambassador?
            </h2>
            <p className="text-lg text-gray-600">
              Join a community of creators who are making a real difference in the world
              while growing their personal brand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="signup-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Apply to Be an Ambassador
              </h2>
              <p className="text-lg text-gray-600">
                Ready to make a difference? Fill out the form below and we'll get back to 
                you within 48 hours.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Followers
                  </label>
                  <select
                    id="followers"
                    name="followers"
                    value={formData.followers}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all appearance-none bg-white"
                    required
                  >
                    <option value="">Select range</option>
                    <option value="1000-5000">1,000 - 5,000</option>
                    <option value="5000-10000">5,000 - 10,000</option>
                    <option value="10000-50000">10,000 - 50,000</option>
                    <option value="50000-100000">50,000 - 100,000</option>
                    <option value="100000+">100,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="niche" className="block text-sm font-medium text-gray-700 mb-2">
                  Content Niche
                </label>
                <select
                  id="niche"
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all appearance-none bg-white"
                  required
                >
                  <option value="">Select your primary niche</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="fashion">Fashion & Beauty</option>
                  <option value="tech">Technology</option>
                  <option value="health">Health & Wellness</option>
                  <option value="travel">Travel</option>
                  <option value="food">Food & Cooking</option>
                  <option value="business">Business & Entrepreneurship</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to be a Kindly Ambassador?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
