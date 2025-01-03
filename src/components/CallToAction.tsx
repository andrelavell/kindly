import React from 'react';
import { Chrome } from 'lucide-react';
import { Button } from './Button';

export function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEgLTFoMnYyaC0yeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-10" />
      <div className="container mx-auto px-6 text-center relative">
        <h2 className="text-4xl font-bold text-white mb-8">
          Ready to Make Shopping More Meaningful?
        </h2>
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-xl bg-white opacity-30" />
          <Button variant="white" size="lg" icon={Chrome} className="relative">
            Add Kindly to Chrome
          </Button>
        </div>
      </div>
    </section>
  );
}