import React from 'react';
import { Chrome, Heart, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export function CallToAction() {
  return (
    <section className="bg-brand py-12 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 bg-brand/20 backdrop-blur-sm rounded-full mb-6">
            <div className="flex items-center gap-2 px-3 py-1">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Join 50,000+ Kindly Users</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make Shopping More Meaningful?
          </h2>
          
          <p className="text-white text-lg mb-8">
            Add Kindly to your browser and start making a difference with every purchase
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button variant="secondary" size="lg" icon={Chrome} className="relative group">
              <span>Add to Chrome</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <span className="text-white text-sm">It's free!</span>
          </div>
        </div>
      </div>
    </section>
  );
}