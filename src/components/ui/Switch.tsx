import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onCheckedChange, disabled }: SwitchProps) {
  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vision-accent focus-visible:ring-offset-2',
        checked ? 'bg-vision-accent' : 'bg-white/10',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform',
          'absolute left-[2px]'
        )}
        animate={{
          x: checked ? '24px' : '2px',
          scale: checked ? 1.1 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </motion.button>
  );
}