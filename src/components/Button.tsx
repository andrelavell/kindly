import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-pressed'?: boolean;
  role?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  onClick,
  className = '',
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  'aria-controls': ariaControls,
  'aria-pressed': ariaPressed,
  role,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-colors";
  
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
      style.backgroundColor = 'var(--brand-color)'; 
      style.color = 'white';
      style.boxShadow = '0 2px 4px rgba(var(--brand-color-rgb), 0.25)'; 
    } else {
      style.backgroundColor = '#f3f4f6';
      style.color = '#111827';
    }

    return style;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-pressed={ariaPressed}
      role={role}
      className={`${baseStyles} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={getStyles()}
      {...props}
    >
      {Icon && (
        <Icon 
          className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} ${children ? 'mr-2' : ''}`}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}