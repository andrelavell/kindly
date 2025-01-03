import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Regular Donor",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "I love how Kindly makes giving back effortless. Every time I shop online, I know I'm making a difference without spending extra.",
      rating: 5
    },
    {
      name: "Michael Torres",
      role: "Active Member",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      quote: "The impact tracking is incredible. Being able to see exactly how my shopping helps various causes keeps me motivated to use it.",
      rating: 5
    },
    {
      name: "Emma Watson",
      role: "Community Leader",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      quote: "As someone who's passionate about social impact, Kindly is a game-changer. It's transformed how I think about online shopping.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-medium text-rose-500 mb-4">What Our Community Says</h2>
            <h3 className="text-5xl font-bold text-gray-900">
              Join Thousands Making Impact
            </h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <blockquote>
                <p className="text-gray-600 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-gray-50 rounded-full">
            <div className="flex -space-x-4">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${i + 4}.jpg`}
                  alt="Community member"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">2,000+</span> happy users
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
