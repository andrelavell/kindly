import React from 'react';
import { Heart, Sprout, Droplets, GraduationCap, UtensilsCrossed, Globe2 } from 'lucide-react';

export function CommunityImpact() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden">
      <div className="px-6 py-6 sm:px-8 border-b border-gray-200/50">
        <h3 className="text-xl font-bold leading-6 text-gray-900">
          Choose Your Impact
        </h3>
        <p className="mt-2 text-base text-gray-600">
          Supporting any cause that matters to you
        </p>
      </div>

      <div className="px-6 py-8 sm:px-8 space-y-8">
        <p className="text-base text-gray-600">
          Here are just a few examples of how our community creates change. With Kindly, you can support any registered nonprofit or cause that resonates with you.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <Sprout className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900">Environmental Conservation</h4>
              <p className="mt-2 text-base text-gray-600">
                From planting trees to cleaning oceans, support initiatives that protect our planet's natural resources.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <Droplets className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900">Clean Water Access</h4>
              <p className="mt-2 text-base text-gray-600">
                Help bring clean water to communities worldwide, improving health and transforming lives.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-violet-500" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900">Education Empowerment</h4>
              <p className="mt-2 text-base text-gray-600">
                Support education initiatives that provide learning opportunities to students who need them most.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <UtensilsCrossed className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900">Food Security</h4>
              <p className="mt-2 text-base text-gray-600">
                Help provide nutritious meals to families in need through local food banks and hunger relief programs.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0">
              <Globe2 className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900">Thousands More Causes</h4>
              <p className="mt-2 text-base text-gray-600">
                From animal welfare to medical research, arts to disaster relief – support any registered nonprofit that aligns with your values.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200/50"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-3">
              <Heart className="h-5 w-5 brand" />
            </div>
          </div>
        </div>

        <p className="text-base text-center text-gray-600">
          Every purchase through Kindly lets you choose exactly where your impact goes, 
          making real change happen with every click.
        </p>
      </div>
    </div>
  );
}
