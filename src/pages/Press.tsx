import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowRight, Award, Newspaper, Image, FileText } from 'lucide-react';
import { Button } from '../components/Button';

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default function Press() {
  const pressHighlights = [
    {
      source: "TechCrunch",
      title: "Kindly Transforms Online Shopping into Charitable Giving",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800"
    },
    {
      source: "Forbes",
      title: "How Kindly is Revolutionizing Charitable Giving",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=800"
    },
    {
      source: "Business Insider",
      title: "The Future of Giving: Kindly's Innovative Approach",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800"
    }
  ];

  const resources = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Press Kit",
      description: "Download our comprehensive press kit including fact sheets, executive bios, and company overview.",
      action: "Download Press Kit"
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Brand Assets",
      description: "Access our logo files, brand guidelines, and approved imagery for media use.",
      action: "Download Assets"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Impact Report",
      description: "View our latest impact metrics, success stories, and charitable giving statistics.",
      action: "View Report"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000" 
            alt="Press and Media Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Press & Media
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Resources and information for journalists and media professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary"
                  size="lg"
                  className="inline-flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Press Kit
                </Button>
                <Button 
                  variant="secondary"
                  size="lg"
                  className="inline-flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Media Inquiries
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Recent Coverage
            </h2>
            <p className="text-lg text-gray-600">
              Featured stories about Kindly's mission to transform everyday shopping 
              into charitable impact.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pressHighlights.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.source}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-rose-500 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-rose-500 text-sm font-medium">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Media Resources
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to tell the Kindly story.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-2 bg-rose-50 rounded-lg w-fit mb-4">
                  <div className="text-rose-500">
                    {resource.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <Button 
                  variant="secondary"
                  size="sm"
                  className="w-full inline-flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {resource.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Media Contact
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              For press inquiries, interview requests, or additional information, 
              please contact our media relations team.
            </p>
            <div className="inline-flex flex-col items-center space-y-4">
              <Button 
                variant="primary" 
                size="lg"
                className="inline-flex items-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Media Team
              </Button>
              <p className="text-sm text-gray-500">
                Response time: Within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
