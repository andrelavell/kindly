import React from 'react';

interface HeartDividerProps {
  className?: string;
}

export function HeartDivider({ className = '' }: HeartDividerProps) {
  const hearts = [
    { color: 'brand', delay: '0s' },
    { color: 'brand opacity-75', delay: '0.2s' },
    { color: 'brand opacity-50', delay: '0.4s' },
    { color: 'text-emerald-400', delay: '0.6s' },
    { color: 'text-sky-400', delay: '0.8s' },
  ];

  return (
    <div className={`flex items-center justify-center gap-4 py-12 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-200/80" />
      <div className="flex gap-3">
        {hearts.map(({ color, delay }, index) => (
          <div
            key={index}
            className={`${color} animate-bounce`}
            style={{ animationDelay: delay, animationDuration: '2s' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        ))}
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-200/80" />
    </div>
  );
}
