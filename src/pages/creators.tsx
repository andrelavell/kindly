import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, CheckCircle2, XCircle, ArrowRight, Youtube, Instagram, Camera, EyeOff, Ban, Check, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
} as const;

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

export default function CreatorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
            alt="Creators working together"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-300 text-sm font-medium">
                <Heart className="w-4 h-4" fill="currentColor" />
                Built for Creators
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            >
              Your Hard Work Deserves Protection
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              We understand the value of your affiliate partnerships. That's why we've built Kindly differently—putting creator revenue protection at the heart of our platform.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a 
                href="#learn-more" 
                className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-rose-600 transition-colors"
              >
                Learn How We Protect You
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#technical" 
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Technical Details
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Creator Types Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supporting Creators of All Types
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a content creator, influencer, or blogger, we've got your back
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* YouTuber Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 rounded-2xl opacity-60" />
              <Image
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80"
                alt="YouTuber creating content"
                width={400}
                height={500}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 text-white mb-2">
                  <Youtube className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">YouTubers</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Keep earning from your thoughtfully curated product recommendations
                </p>
              </div>
            </div>

            {/* Influencer Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 rounded-2xl opacity-60" />
              <Image
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80"
                alt="Social media influencer"
                width={400}
                height={500}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 text-white mb-2">
                  <Instagram className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Influencers</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Maintain your brand partnerships and affiliate relationships
                </p>
              </div>
            </div>

            {/* Content Creator Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 rounded-2xl opacity-60" />
              <Image
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
                alt="Blogger writing content"
                width={400}
                height={500}
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 text-white mb-2">
                  <Camera className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Content Creators</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Focus on creating while we protect your revenue streams
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-24 bg-gray-50" id="learn-more">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Commitment to Creators
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  We've seen how other platforms have handled creator partnerships, and we knew there had to be a better way. That's why we built Kindly with creator protection as our foundation.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Your Revenue, Protected
                      </h3>
                      <p className="text-gray-600">
                        Unlike others who automatically override affiliate links, we never touch your links without explicit user consent. Your revenue streams stay intact.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        User Choice Matters
                      </h3>
                      <p className="text-gray-600">
                        We believe in transparency. Users must actively choose between supporting you or donating to charity. No hidden overrides, no surprises.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview of Affiliate Detection */}
              <div className="flex items-center justify-center">
                <div className="relative p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
                  <div className="text-center">
                    <div className="mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto text-rose-500">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">We've detected another affiliate</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We've detected another affiliate connected to your purchase, <strong>AnnasRecipes</strong>. This might support a website or creator you recently visited.
                    </p>
                    <div className="flex gap-3 justify-center mb-4">
                      <button className="px-4 py-2 bg-white text-gray-600 border border-rose-500 rounded-lg font-medium">
                        Support Creator
                      </button>
                      <button className="px-4 py-2 bg-rose-500 text-white border-none rounded-lg font-medium">
                        Donate to Charity
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      If you choose to donate to charity, the affiliate commission from your purchase will be received by Kindly and donated to your selected cause.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 skew-y-3 transform origin-top-right" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Traditional Extensions */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-20 h-20 bg-red-500/10 rounded-full blur-2xl" />
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-500/10 rounded-full blur-2xl" />
              <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 relative">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-500" />
                  Traditional Extensions
                </h3>
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-start gap-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:border-red-500/50 hover:bg-gray-800/80">
                      <div>
                        <h4 className="font-semibold text-xl text-red-400 mb-2 group-hover:text-red-300">Automatic Override</h4>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">Automatically replace all affiliate links without user knowledge or consent</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:border-red-500/50 hover:bg-gray-800/80">
                      <div>
                        <h4 className="font-semibold text-xl text-red-400 mb-2 group-hover:text-red-300">Hidden Process</h4>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">No transparency about how affiliate links are handled</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:border-red-500/50 hover:bg-gray-800/80">
                      <div>
                        <h4 className="font-semibold text-xl text-red-400 mb-2 group-hover:text-red-300">Lost Revenue</h4>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">Creators lose attribution and commission without knowing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Kindly Approach */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-emerald-500 fill-emerald-500" />
                  The Kindly Approach
                </h3>
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:border-emerald-500/50 hover:bg-white">
                      <div>
                        <h4 className="font-semibold text-xl text-emerald-700 mb-2 group-hover:text-emerald-600">Respect First</h4>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-900">Your affiliate links remain active by default. We never override without explicit user choice.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:border-emerald-500/50 hover:bg-white">
                      <div>
                        <h4 className="font-semibold text-xl text-emerald-700 mb-2 group-hover:text-emerald-600">Clear Choice</h4>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-900">Users see a transparent prompt explaining their options: support you or donate to charity.</p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all duration-300 hover:border-emerald-500/50 hover:bg-white">
                      <div>
                        <h4 className="font-semibold text-xl text-emerald-700 mb-2 group-hover:text-emerald-600">Protected Revenue</h4>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-900">Your affiliate tracking remains intact unless users actively choose otherwise.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Technical Implementation</h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-gray-700 mb-6">When a user visits a supported store with your affiliate link:</p>
              <ul className="space-y-4">
                {[
                  'Your affiliate cookie is preserved in its original state',
                  'We detect the presence of your affiliate parameters',
                  'Users see a clear prompt explaining their options',
                  'If no choice is made, your affiliate link remains active',
                  'Only upon explicit user choice to donate is any change made',
                  'All actions are logged for transparency'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-blue-100 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-700">
                This approach ensures complete protection of your affiliate revenue while giving users the freedom to choose how they want to make an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Have Questions? Let's Talk
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're here to address any concerns and show you exactly how we protect creator revenue
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-rose-600 transition-colors"
              >
                Schedule a Chat
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/faq#creators" 
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
