import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Shield, Heart, Users, Lock } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
} as const;

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,228,230,0.1),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,249,250,0.1),_transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-rose-300 mb-6"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <Scale className="w-5 h-5" />
              <span>Terms of Service</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Clear, Simple, and Transparent
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We believe in complete transparency. Here's exactly how Kindly works, in plain English.
            </motion.p>

            <motion.p
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Last Updated: January 6, 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="space-y-16">
                {/* Introduction */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Agreement</h2>
                  <p className="text-gray-600 mb-4">
                    By using Kindly, you agree to these terms. We've written them in plain English because we believe legal documents 
                    should be clear and understandable. These terms are a binding agreement between you and Kindly.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Please read these terms carefully. They explain your rights, our obligations, and how Kindly works.
                  </p>
                </div>

                {/* Key Points Summary */}
                <div className="bg-rose-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Points Summary</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Heart className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">Kindly transforms your everyday shopping into meaningful impact.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">Your shopping experience remains exactly the same - no extra cost.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">Users must be 16 or older to use Kindly.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lock className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">We collect minimal data and never sell your personal information.</p>
                    </div>
                  </div>
                </div>

                {/* Service Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">How Kindly Works</h3>
                  <p className="text-gray-600 mb-6">
                    Kindly is a browser extension that transforms your everyday shopping into meaningful impact. When you shop at any 
                    of our supported stores, we earn a commission from your purchase - typically between 1% and 5%. We donate the majority 
                    of this commission to your chosen charitable causes, keeping only a small portion to maintain and improve our service.
                  </p>
                  <p className="text-gray-600 mb-6">
                    The best part? Your shopping experience stays exactly the same. You don't pay anything extra, and there are no 
                    additional steps. Just shop as you normally would, and we'll handle turning that into positive impact.
                  </p>
                  <p className="text-gray-600">
                    We respect existing affiliate partnerships. If a store already has an affiliate relationship, we'll make it clear 
                    and give you the choice of supporting the original affiliate or your chosen charity. This transparency ensures 
                    fairness for all parties involved.
                  </p>
                </div>

                {/* Age Requirements */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Age Requirements</h3>
                  <p className="text-gray-600 mb-6">
                    You must be at least 16 years old to use Kindly. We set this age requirement because online shopping typically 
                    requires users to be 16 or older, and we need to ensure our users can make informed decisions about their donations 
                    and data. If we discover that a user is under 16, we'll need to close their account to comply with data protection 
                    regulations.
                  </p>
                </div>

                {/* Intellectual Property */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h3>
                  <p className="text-gray-600 mb-4">
                    While we believe in transparency, we also need to protect our brand and technology:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600">
                    <li>The Kindly name, logo, and extension are our intellectual property</li>
                    <li>You can share screenshots of your impact for personal use</li>
                    <li>Please don't modify, reverse engineer, or copy our extension</li>
                    <li>Contact us if you'd like to use our brand assets - we're usually happy to share!</li>
                  </ul>
                </div>

                {/* Service Availability */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Availability</h3>
                  <p className="text-gray-600 mb-6">
                    We work hard to keep Kindly running smoothly 24/7. However, like any online service, we occasionally need to 
                    perform maintenance or updates. We'll always try to schedule these during off-peak hours and give you advance 
                    notice when possible.
                  </p>
                  <p className="text-gray-600">
                    While we strive for perfect uptime, sometimes technical issues or store changes may cause temporary disruptions. 
                    Rest assured that any donations or trackable purchases you've already made will not be affected by these 
                    disruptions. We'll work to resolve any issues quickly and keep you informed of any significant outages.
                  </p>
                </div>

                {/* Third-Party Services */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Working with Our Partners</h3>
                  <p className="text-gray-600 mb-6">
                    To make Kindly work, we partner with various online stores, payment processors, and analytics providers. Each 
                    partner is carefully vetted to ensure they meet our security and privacy standards. Here's who we work with 
                    and why:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li>Online stores that provide our affiliate commissions</li>
                    <li>Payment processors that handle donations securely</li>
                    <li>Analytics providers that help us improve our service</li>
                  </ul>
                  <p className="text-gray-600">
                    All data shared with our partners is encrypted using industry-standard protocols, and we regularly audit their 
                    security practices to ensure your information stays protected.
                  </p>
                </div>

                {/* Dispute Resolution */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Resolving Disagreements</h3>
                  <p className="text-gray-600 mb-6">
                    We believe in handling any issues directly and fairly. If you ever have a problem, please reach out to our support 
                    team first. We'll work with you to find a solution that makes everyone happy.
                  </p>
                  <p className="text-gray-600 mb-6">
                    If we can't resolve an issue through direct discussion, we offer mediation as a faster, lower-cost alternative 
                    to court proceedings. This optional step can help us find a fair solution without the need for formal legal action.
                  </p>
                  <p className="text-gray-600">
                    If mediation isn't successful, these terms are governed by California law, and any legal proceedings must take 
                    place in California courts. We hope it never comes to that - we're always here to talk things through.
                  </p>
                </div>

                {/* Account Rules */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Rules</h3>
                  <p className="text-gray-600 mb-6">
                    We want Kindly to be a safe and positive platform for everyone. While we may need to suspend accounts that 
                    violate our terms, we believe in fairness and transparency. If your account is suspended, you can always 
                    contact our support team to appeal the decision or request clarification.
                  </p>
                  <p className="text-gray-600">
                    We'll provide clear reasons for any account actions and work with you to resolve any issues that led to the 
                    suspension. Our goal is to maintain a trustworthy platform while treating all users fairly.
                  </p>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Legal Protections</h3>
                  <p className="text-gray-600 mb-6">
                    While we're committed to providing the best possible service, we need to be clear about certain legal protections. 
                    We provide Kindly "as is," which means we can't guarantee it will always work perfectly or be error-free. We're 
                    not responsible for store prices, availability, or technical issues beyond our control.
                  </p>
                  <p className="text-gray-600">
                    If something goes wrong, our liability is limited to the amount you've donated through our platform. This helps 
                    us continue offering Kindly as a free service while protecting both you and us.
                  </p>
                </div>

                {/* Changes to Terms */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">When We Update These Terms</h3>
                  <p className="text-gray-600 mb-6">
                    As Kindly grows and evolves, we may need to update these terms. When we do, we'll notify you clearly through 
                    the extension and highlight exactly what's changing. Major changes will require your agreement before you 
                    continue using Kindly.
                  </p>
                  <p className="text-gray-600">
                    Rest assured, we'll never make changes that compromise our core values of transparency and user choice. All 
                    updates will be listed with their effective dates, and previous versions will remain available for reference.
                  </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h3>
                  <p className="text-gray-600 mb-6">
                    We're here to help! If anything in these terms is unclear or if you have questions:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/faq"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                      View FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
