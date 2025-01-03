import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  onClick 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-base"
  };

  const getStyles = () => {
    const style: React.CSSProperties = {
      transition: 'all 0.2s ease',
    };

    if (variant === 'primary') {
      style.backgroundColor = '#10b981'; // emerald-500
      style.color = 'white';
      style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.25)'; // Subtle glow
    } else {
      style.backgroundColor = '#f3f4f6';
      style.color = '#111827';
    }

    return style;
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]}`}
      style={getStyles()}
      onMouseOver={(e) => {
        if (variant === 'primary') {
          (e.target as HTMLButtonElement).style.backgroundColor = '#059669'; // emerald-600
          (e.target as HTMLButtonElement).style.boxShadow = '0 4px 6px rgba(16, 185, 129, 0.3)'; // Enhanced glow on hover
        } else {
          (e.target as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
        }
      }}
      onMouseOut={(e) => {
        if (variant === 'primary') {
          (e.target as HTMLButtonElement).style.backgroundColor = '#10b981'; // emerald-500
          (e.target as HTMLButtonElement).style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.25)'; // Back to subtle glow
        } else {
          (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
        }
      }}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}