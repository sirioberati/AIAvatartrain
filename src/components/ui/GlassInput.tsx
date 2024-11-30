import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  as?: 'input' | 'textarea';
}

export function GlassInput({ 
  label, 
  helperText, 
  className,
  as = 'input',
  value,
  onChange,
  ...props 
}: GlassInputProps) {
  // Handle trigger word styling if it's a textarea
  const processedValue = typeof value === 'string' && as === 'textarea' 
    ? value.replace(/(@\w+)/, '<span class="trigger-word">$1</span>')
    : value;

  const Component = as === 'textarea' ? 'div' : 'input';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-white/80">
        {label}
      </label>
      <Component
        {...(as === 'textarea' ? {
          contentEditable: true,
          dangerouslySetInnerHTML: { __html: processedValue as string },
          onInput: (e: React.FormEvent<HTMLDivElement>) => {
            const newValue = (e.target as HTMLDivElement).innerText;
            onChange?.({ target: { value: newValue } } as any);
          },
          role: "textbox",
        } : props)}
        className={cn(
          "glass-input w-full rounded-lg px-4 py-2.5 text-white",
          "placeholder:text-white/30",
          "focus:ring-2 focus:ring-vision-accent/20 focus:border-vision-accent/30",
          as === 'textarea' && "min-h-[80px] overflow-auto",
          "[&_.trigger-word]:inline-flex [&_.trigger-word]:items-center [&_.trigger-word]:bg-vision-accent/20 [&_.trigger-word]:text-vision-accent [&_.trigger-word]:px-1.5 [&_.trigger-word]:rounded-md [&_.trigger-word]:font-medium [&_.trigger-word]:border [&_.trigger-word]:border-vision-accent/30",
          className
        )}
      />
      {helperText && (
        <p className="text-xs text-white/50">{helperText}</p>
      )}
    </motion.div>
  );
}