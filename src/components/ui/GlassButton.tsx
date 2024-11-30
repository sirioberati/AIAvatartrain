import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function GlassButton({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className,
  ...props 
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'glass-button rounded-full font-medium relative overflow-hidden group',
        'transition-all duration-500 ease-out',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3',
        size === 'lg' && 'px-8 py-4 text-lg',
        variant === 'primary' && [
          'bg-gradient-to-r from-vision-primary to-vision-accent',
          'hover:from-vision-primary/90 hover:to-vision-accent/90',
          'text-white shadow-lg shadow-vision-accent/20',
        ],
        variant === 'secondary' && [
          'bg-white/5 hover:bg-white/10',
          'text-white/80 hover:text-white',
        ],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[200%] group-hover:translate-x-[-200%] transition-transform duration-1000" />
    </motion.button>
  );
}