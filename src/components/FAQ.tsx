import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Heart, DollarSign, Shield, ShoppingBag, PieChart, Zap, Target, Power } from 'lucide-react';

const faqs = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    question: "Wait... so I don't pay anything extra? ",
    answer: "Nope! We work with stores behind the scenes - they share a small commission with us when you shop, and we give it to charity. You pay the same prices as always."
  },
  {
    icon: <PieChart className="w-5 h-5" />,
    question: "But how do you keep the lights on? ",
    answer: "Most of the store commissions go to charities, and we keep a small portion to run Kindly. Simple as that - and you never pay extra!"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    question: "How safe is my data? ",
    answer: "Super safe! We only activate when you're shopping to enable donations. No tracking, no personal data collection - we keep it minimal and secure."
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    question: "Which stores are in on this? ",
    answer: "Over 50,000 stores including Amazon, Walmart, and Target. Our extension automatically appears when you shop at supported stores."
  },
  {
    icon: <Heart className="w-5 h-5" />,
    question: "How do I know my kindness is reaching the right places? ",
    answer: "Every charity we work with is verified (501(c)(3) certified), and you can track your impact in real-time on your dashboard."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    question: "Will this slow down my shopping? ",
    answer: "Not at all! We work quietly in the background while you shop normally. Same speed, same experience - just with added impact."
  },
  {
    icon: <Target className="w-5 h-5" />,
    question: "Can I choose where my impact goes? ",
    answer: "Absolutely! Pick your favorite causes or spread your impact across multiple charities. Change your choices anytime you want."
  },
  {
    icon: <Power className="w-5 h-5" />,
    question: "Need a kindness break? ",
    answer: "Just click the extension icon to pause. Turn it back on whenever you're ready - it's that simple!"
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
          <div className="text-center mb-12">
            <span className="text-rose-500 font-medium block mb-4">
              Got Questions?
            </span>
            <h2 className="text-4xl font-bold">
              Let's Chat About{' '}
              <span className="relative inline-block">
                Kindly
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-rose-500/30" />
              </span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500">
                      {faq.icon}
                    </div>
                    <span className="font-medium text-left text-gray-900">{faq.question}</span>
                  </div>
                  <div className={`transform transition-transform duration-200 text-rose-500 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
