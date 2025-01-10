import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Eye, Database, Cookie, Trash2 } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
} as const;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,228,230,0.1),_transparent_50%)]" />
        </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,249,250,0.1),_transparent_50%)]" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 brand mb-6"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <Shield className="w-4 h-4" />
              <span>Privacy Policy</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Your Privacy, Our Priority
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-300 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We collect only what's necessary, protect it rigorously, and never sell it. Here's exactly how we handle your data.
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
                {/* Quick Summary */}
                <div className="bg-brand/5 p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Summary</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand/10 rounded-lg">
                        <Eye className="w-5 h-5 brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">What We Track</h3>
                        <p className="text-gray-600">Only shopping activity on supported stores to enable donations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand/10 rounded-lg">
                        <Database className="w-5 h-5 brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Data Storage</h3>
                        <p className="text-gray-600">Encrypted and secured on servers in the United States</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand/10 rounded-lg">
                        <Cookie className="w-5 h-5 brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Cookie Policy</h3>
                        <p className="text-gray-600">We respect creator cookies and only use essential ones</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-brand/10 rounded-lg">
                        <Trash2 className="w-5 h-5 brand" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Data Deletion</h3>
                        <p className="text-gray-600">Request complete deletion of your data at any time</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What We Collect */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Data and How We Use It</h2>
                  <p className="text-gray-600 mb-6">
                    We believe in collecting only the data that's absolutely necessary to make Kindly work effectively. 
                    When you use Kindly, we collect and process certain information to help you support causes you care about.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Information We Collect</h3>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li><strong>Shopping Activity:</strong> We only track visits to supported stores and completed purchases. We don't 
                    collect product details, pricing information, or your complete browsing history.</li>
                    <li><strong>Donation Preferences:</strong> Your chosen charities and causes</li>
                    <li><strong>Account Info:</strong> Name and email address</li>
                    <li><strong>Impact Metrics:</strong> Donation amounts and charitable impact</li>
                  </ul>

                  <p className="text-gray-600 mb-6">
                    We use this information to process your donations, track your impact, and provide you with relevant updates 
                    about the causes you support. Your shopping data is only used to enable donations - we never track your 
                    browsing history outside of supported stores.
                  </p>
                </div>

                {/* Data Security */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Keeping Your Data Secure</h2>
                  <p className="text-gray-600 mb-6">
                    Your data's security is our top priority. We use industry-leading encryption (AES-256) to protect your information 
                    at every stage - whether it's being transmitted or stored. Our security measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li>End-to-end encryption for all data transmission</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Strict access controls for sensitive data</li>
                    <li>Continuous monitoring for suspicious activity</li>
                  </ul>
                  <p className="text-gray-600">
                    We regularly review and update our security practices to stay ahead of potential vulnerabilities. Access to 
                    sensitive data is restricted to authorized personnel only, and all access is logged and monitored.
                  </p>
                </div>

                {/* Data Retention */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How Long We Keep Your Data</h2>
                  <p className="text-gray-600 mb-6">
                    We keep your data only for as long as necessary. Here's exactly how long we retain different types of information:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li><strong>Account Data:</strong> Kept while your account is active, deleted within 30 days of account closure</li>
                    <li><strong>Shopping Activity:</strong> Stored for 30 days to ensure donation tracking</li>
                    <li><strong>Donation Records:</strong> Kept for 7 years to comply with tax requirements</li>
                    <li><strong>Usage Analytics:</strong> Anonymized after 90 days</li>
                  </ul>
                  <p className="text-gray-600">
                    When you delete your account, we permanently remove your personal data within 30 days, except where we're 
                    legally required to retain certain information, such as donation records for tax purposes.
                  </p>
                </div>

                {/* Cookie Policy */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Cookies</h2>
                  <p className="text-gray-600 mb-6">
                    We use cookies thoughtfully and transparently. Importantly, we respect existing affiliate cookies - if a website 
                    already has an affiliate cookie, we won't override it without your explicit permission.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li><strong>Essential Cookies:</strong> Required for basic functionality like keeping you logged in</li>
                    <li><strong>Preference Cookies:</strong> Remember your chosen charities and settings</li>
                    <li><strong>Analytics Cookies:</strong> Help us improve our service (optional)</li>
                  </ul>
                  <p className="text-gray-600 mb-6">
                    You can manage your cookie preferences anytime through your <a href="/settings" className="brand hover:opacity-90">account settings</a>. 
                    We'll always respect your choices about cookie usage.
                  </p>
                </div>

                {/* Data Protection */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Protecting Your Privacy</h2>
                  <p className="text-gray-600 mb-6">
                    Your privacy is our top priority. We use industry-standard security measures to protect your data from 
                    unauthorized access, disclosure, or misuse. All data is encrypted in transit and at rest, and we regularly 
                    review our security practices to ensure they meet the highest standards.
                  </p>
                  
                  <p className="text-gray-600 mb-6">
                    We retain your data only for as long as necessary to provide our service and comply with legal requirements. 
                    For most data, this means we keep it only while you have an active account. Some information may be retained 
                    longer for legal or audit purposes.
                  </p>
                </div>

                {/* Data Sharing */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">When We Share Your Data</h2>
                  <p className="text-gray-600 mb-6">
                    We never sell your personal information. Period. We only share your data when absolutely necessary to provide 
                    our service or when required by law. Here's exactly when and why we might share your information:
                  </p>

                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li><strong>With Charities:</strong> To process your donations and verify impact</li>
                    <li><strong>With Service Providers:</strong> To help us operate Kindly (e.g., payment processing)</li>
                    <li><strong>For Legal Requirements:</strong> When required by law or to protect rights</li>
                  </ul>

                  <p className="text-gray-600 mb-6">
                    All our partners are carefully vetted and bound by strict confidentiality agreements. They can only use your 
                    data for the specific purposes we've authorized, nothing more.
                  </p>
                </div>

                {/* Your Rights */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
                  <p className="text-gray-600 mb-6">
                    You have complete control over your personal data. We make it easy to exercise your privacy rights, whether 
                    you're in the EU, California, or anywhere else in the world. You can:
                  </p>

                  <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
                    <li>Access all data we have about you</li>
                    <li>Download your data in a portable format</li>
                    <li>Correct any inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Opt-out of data processing</li>
                  </ul>

                  <p className="text-gray-600 mb-6">
                    To exercise any of these rights, just visit your account settings or contact our privacy team. We'll handle 
                    your request promptly - typically within 30 days or less.
                  </p>
                </div>

                {/* International Data */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">International Data Transfers</h2>
                  <p className="text-gray-600 mb-6">
                    Kindly operates globally, which means your data may be processed in different countries. We ensure your data 
                    is protected to the same high standards no matter where it's processed. For EU users, we comply with GDPR 
                    requirements for international transfers using approved safeguards like Standard Contractual Clauses.
                  </p>
                </div>

                {/* Children's Privacy */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
                  <p className="text-gray-600 mb-6">
                    Kindly is designed for users aged 16 and older. We never knowingly collect data from anyone under 16. If we 
                    discover we've inadvertently collected information from a user under 16, we'll promptly delete it. If you're 
                    a parent or guardian and believe your child has provided us with personal information, please contact us 
                    immediately.
                  </p>
                </div>

                {/* Updates to Policy */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy Updates</h2>
                  <p className="text-gray-600 mb-6">
                    As Kindly grows and evolves, we may need to update this privacy policy. When we do, we'll notify you through 
                    the extension and via email for significant changes. We'll always give you time to review changes before they 
                    take effect, and we'll never change our core commitment to protecting your privacy.
                  </p>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Your Data?</h3>
                  <p className="text-gray-600 mb-6">
                    We're committed to transparency. If you have any questions about how we handle your data:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Contact Our Privacy Team
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
