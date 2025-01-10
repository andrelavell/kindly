import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Heart, ArrowRight } from 'lucide-react';

const userFaqs = [
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

const creatorFaqs = [
  {
    question: "Does Kindly override existing affiliate links?",
    answer: "No, Kindly does not automatically override affiliate links. We give users the option to either support your affiliate link or donate to a charity. The choice is always up to the user."
  },
  {
    question: "How does Kindly ensure my affiliate revenue is protected?",
    answer: "When users shop, Kindly detects affiliate links and provides them with the option to either support the original affiliate (you) or donate to a charity. Your affiliate links will only be overridden if the user chooses to donate, ensuring that your revenue is protected as long as the user selects your link."
  },
  {
    question: "Will Kindly impact my affiliate earnings?",
    answer: "Kindly respects your affiliate links unless the user explicitly chooses to donate instead. We present users with an easy choice, so they can continue supporting your affiliate revenue while also having the option to donate to charity."
  },
  {
    question: "How does Kindly notify users about their options?",
    answer: "Before completing a purchase, Kindly notifies users if an affiliate link is detected. We clearly explain the impact of each choice—whether to support a creator or make a donation—so users can make an informed decision."
  },
  {
    question: "Can I opt-out of Kindly's tracking on my affiliate links?",
    answer: "Currently, creators cannot opt-out of Kindly's tracking, but we make sure to respect your links by allowing users to choose between supporting you or donating to charity. We aim to avoid conflicts and always give the user control."
  },
  {
    question: "How does Kindly ensure transparency with creators?",
    answer: "Kindly is committed to transparency. We provide clear reporting on how affiliate links are handled and ensure that users understand the options they have, giving both creators and users a fair and ethical experience."
  },
  {
    question: "How does Kindly address concerns about affiliate link conflicts?",
    answer: "Kindly works by giving users the option to either support your affiliate link or donate to charity, not by automatically overriding links. This ensures that your affiliate revenue is protected while also offering users the opportunity to contribute to a cause they care about."
  }
];

export function FAQ() {
  const [openUserIndex, setOpenUserIndex] = useState<number | null>(null);
  const [openCreatorIndex, setOpenCreatorIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-b from-white to-brand/5 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <MessageCircle className="w-8 h-8 brand" />
              <span className="brand font-medium">Got Questions?</span>
            </div>
            <h2 className="text-3xl font-bold relative inline-block mb-6">
              Let's Chat About{' '}
              <span className="relative inline-block">
                Kindly
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand opacity-30" />
              </span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about how Kindly works, our impact, and how you can make a difference while you shop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* For Users Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">For Users</h3>
            <div className="space-y-4">
              {userFaqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <button
                    onClick={() => setOpenUserIndex(openUserIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-6">{faq.question}</span>
                    <div className={`flex-shrink-0 p-2 rounded-full bg-brand/10 brand transform transition-transform duration-200 ${
                      openUserIndex === index ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  {openUserIndex === index && (
                    <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* For Creators Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">For Creators</h3>
            <div className="space-y-4">
              {creatorFaqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <button
                    onClick={() => setOpenCreatorIndex(openCreatorIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-6">{faq.question}</span>
                    <div className={`flex-shrink-0 p-2 rounded-full bg-brand/10 brand transform transition-transform duration-200 ${
                      openCreatorIndex === index ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  {openCreatorIndex === index && (
                    <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="/contact" className="inline-flex items-center justify-center gap-2 brand font-medium hover:opacity-90 transition-opacity">
            <Heart className="w-5 h-5" />
            <span>Still have questions? We're here to help!</span>
          </a>
        </div>
      </div>
    </section>
  );
}
