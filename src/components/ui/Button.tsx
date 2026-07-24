'use client';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg',
  outline:
    'border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-semibold',
  ghost:
    'text-white hover:bg-white/10 font-medium',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-full transition-all duration-200 cursor-pointer inline-flex items-center gap-2',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
