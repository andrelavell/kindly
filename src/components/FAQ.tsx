import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Heart } from 'lucide-react';

const faqs = [
  {
    question: "Does it cost me anything extra to shop with Kindly?",
    answer: "Not at all. When you shop with Kindly, the prices at your favorite stores remain exactly the same. The donations come from the commission we earn when you make a purchase. Merchants pay us a small percentage of the sale for referring you to their store, and we use this commission to make charitable contributions—at no additional cost to you."
  },
  {
    question: "How does Kindly make money?",
    answer: "Kindly retains a small portion of the commission we earn to keep the platform free, grow our network of partner stores, and maximize the impact of your donations. The majority of the commission—typically 1-5% of your purchase amount—is donated to the charity or cause you choose. This balance allows us to sustain Kindly while driving meaningful contributions to the community."
  },
  {
    question: "How do I know my donations are going to the right places?",
    answer: "We work exclusively with verified and registered nonprofit organizations to ensure your donations are making a real impact. Once donations are distributed, we provide updates, success stories, and progress reports to keep you informed about the good you're helping to create."
  },
  {
    question: "Is my personal data safe with Kindly?",
    answer: "Absolutely. Protecting your data is a top priority for us. We only collect the information necessary to facilitate the donation process, and we never sell or share your personal data with third parties. For more details, please review our Privacy Policy."
  },
  {
    question: "Which stores are partnered with Kindly?",
    answer: "Kindly partners with over 50,000 online stores, including popular retailers like Amazon, Target, and Walmart. We are constantly expanding our network to give you more shopping options while making an impact. You can view a list of some of our participating stores here."
  },
  {
    question: "Can I choose where my donations go?",
    answer: "Yes! When you sign up, you can select a cause or charity that matters most to you. Whether you're passionate about education, environmental conservation, animal welfare, or local food banks, we ensure your donations are directed toward your chosen cause."
  },
  {
    question: "How do I know Kindly won't slow down my online shopping experience?",
    answer: "Kindly is designed to run seamlessly in the background without interfering with your shopping experience. Our lightweight browser extension is optimized for speed and performance, ensuring that your browsing remains smooth and uninterrupted."
  },
  {
    question: "Will I always know how much is being donated?",
    answer: "Yes! When you shop with Kindly, you'll see the percentage of your purchase that will be donated. The specific donation amount depends on the retailer's commission structure, but every contribution helps make a difference."
  },
  {
    question: "Why doesn't Kindly donate 100% of the commission?",
    answer: "While we donate the majority of the commission to the cause you choose, we retain a small portion to cover operational costs, keep Kindly free for users, and grow the platform to maximize charitable giving. This approach ensures long-term sustainability and greater impact for the community."
  },
  {
    question: "How do I take a break from Kindly if I need to?",
    answer: "If you'd like to pause Kindly temporarily, you can easily disable the browser extension without uninstalling it. When you're ready to make an impact again, simply re-enable it. No hassle, no commitment—just kindness at your pace."
  },
  {
    question: "What if my favorite cause isn't listed?",
    answer: "Kindly continuously adds new nonprofit partners based on user feedback and community needs. If there's a cause you'd love to support, let us know! We're always working to expand our network of charities."
  },
  {
    question: "Does Kindly work on mobile?",
    answer: "Currently, Kindly is available as a browser extension for desktop and laptop devices. We are exploring ways to bring Kindly to mobile platforms in the future, so stay tuned!"
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-rose-50/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,228,230,0.2),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(240,249,250,0.2),_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="w-8 h-8 text-rose-500" />
              <span className="text-rose-500 font-medium">Got Questions?</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Let's Chat About{' '}
              <span className="relative inline-block">
                Kindly
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-rose-500/30" />
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions about how Kindly works, our impact, and how you can make a difference while you shop.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-6">{faq.question}</span>
                  <div className={`flex-shrink-0 p-2 rounded-full bg-rose-50 text-rose-500 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <a href="/contact" className="inline-flex items-center justify-center gap-2 text-rose-500 font-medium hover:text-rose-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span>Still have questions? We're here to help!</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
