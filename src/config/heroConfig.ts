export type HeroStyle = 'video' | 'simple';

export const heroConfig = {
  // Change this to 'simple' for the plain style
  style: 'simple' as HeroStyle,

  // Video background styles
  videoStyles: {
    heading: 'text-base md:text-lg font-medium text-gray-900 md:text-white mb-4 md:drop-shadow-xl md:[text-shadow:0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]',
    title: 'text-4xl md:text-5xl font-bold mb-6 text-gray-900 md:text-white leading-tight md:drop-shadow-2xl md:[text-shadow:0_4px_12px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.4)]',
    description: 'text-base md:text-lg text-gray-600 md:text-white mb-8 leading-relaxed md:drop-shadow-2xl md:[text-shadow:0_2px_4px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.4)]',
    emphasis: 'font-medium text-gray-900 md:text-white',
    section: 'relative bg-white md:bg-transparent',
  },

  // Simple background styles
  simpleStyles: {
    heading: 'text-base md:text-lg font-medium text-gray-600 mb-4',
    title: 'text-4xl md:text-5xl font-bold mb-6 text-rose-500 leading-tight',
    description: 'text-base md:text-lg text-gray-600 mb-8 leading-relaxed',
    emphasis: 'font-medium text-rose-500',
    section: 'relative bg-white',
  }
};
