import React from 'react';
import Head from 'next/head';
import { MessageCircle, Mail, Send } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject');
    const message = formData.get('message');
    const email = formData.get('email');
    const name = formData.get('name');
    
    window.location.href = `mailto:hello@joinkindly.org?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  };

  return (
    <>
      <Head>
        <title>Contact Us - Kindly</title>
        <meta name="description" content="Get in touch with the Kindly team. We're here to help you make a difference while you shop." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-white to-brand/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,228,230,0.2),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,249,250,0.2),_transparent_70%)]" />

        <div className="relative">
          {/* Header Section */}
          <div className="pt-24 pb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 brand" />
              <span className="brand font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Let's Make a{' '}
              <span className="relative inline-block">
                Difference
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand opacity-30" />
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions about Kindly? Want to partner with us? We'd love to hear from you!
            </p>
          </div>

          <div className="container mx-auto px-4 pb-24">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Contact Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand text-white py-3 px-6 rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="lg:pt-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Ways to Connect</h3>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center brand">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Email Us</h4>
                            <p className="text-gray-600 mt-1">
                              For general inquiries:{' '}
                              <a href="mailto:hello@joinkindly.org" className="brand hover:opacity-90">
                                hello@joinkindly.org
                              </a>
                            </p>
                            <p className="text-gray-600">
                              For partnerships:{' '}
                              <a href="mailto:natalie@joinkindly.org" className="brand hover:opacity-90">
                                natalie@joinkindly.org
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-brand/5 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-3">Quick Response</h3>
                      <p className="text-gray-600">
                        We aim to respond to all inquiries within 24 hours during business days. For immediate assistance, check our{' '}
                        <a href="/faq" className="brand hover:opacity-90">
                          FAQ page
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
