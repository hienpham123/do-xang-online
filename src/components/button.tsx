import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow';
    case 'secondary':
      return 'bg-slate-800 hover:bg-slate-700 text-slate-100';
    case 'ghost':
      return 'bg-transparent hover:bg-slate-800 text-slate-100';
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
};

const getSizeClasses = (size: ButtonSize): string => {
  switch (size) {
    case 'sm':
      return 'px-3 py-2 text-sm';
    case 'md':
      return 'px-4 py-2.5 text-sm';
    case 'lg':
      return 'px-5 py-3 text-base';
    default: {
      const _exhaustive: never = size;
      return _exhaustive;
    }
  }
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition',
        'focus:outline-none focus:ring-2 focus:ring-cyan-400/70',
        'disabled:cursor-not-allowed disabled:opacity-60',
        getVariantClasses(variant),
        getSizeClasses(size),
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
};

export default Button;

