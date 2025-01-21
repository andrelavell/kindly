import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { impactStories } from '../utils/impactStories';

export function ImpactStories() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
      }
    }, {
      threshold: 0.5,
    });
    return () => {
    };
  }, []);

  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-[#F5F8FA]">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Content */}
          <div className="max-w-[640px] mb-16">
            <h2 className="brand font-medium mb-4">Impact Stories</h2>
            <h3 className="text-[2.75rem] leading-[1.2] font-bold text-[#0B2742] mb-6">
              See How Your Shopping Changes Lives
            </h3>
            <p className="text-xl text-[#536B7D]">
              Every purchase you make contributes to real stories of transformation around the world
            </p>
          </div>

          {/* Stories Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStories.slice(0, 4).map((story, index) => (
              <div
                key={story.category}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="brand font-medium text-sm mb-2">{story.category}</div>
                    <h4 className="text-lg font-bold leading-snug">{story.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
