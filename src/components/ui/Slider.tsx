import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  helperText?: string;
  className?: string;
  formatValue?: (value: number) => string;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  helperText,
  className,
  formatValue = (v) => v.toString()
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderInteraction = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newValue = min + (max - min) * percentage;
    const steppedValue = Math.round(newValue / step) * step;
    const constrainedValue = Math.max(min, Math.min(max, steppedValue));
    
    onChange(constrainedValue);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    handleSliderInteraction(event.clientX);

    const handleMouseMove = (e: MouseEvent) => {
      handleSliderInteraction(e.clientX);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-white/80">{label}</label>
          <span className="text-sm text-vision-accent">{formatValue(value)}</span>
        </div>
      )}
      
      <div 
        className="relative h-12 flex items-center cursor-pointer" 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute h-2 w-full rounded-full bg-white/10">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-vision-accent/40 to-vision-accent/60"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div
          className="absolute h-5 w-5"
          style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute -inset-2">
            <div className="h-full w-full rounded-full bg-vision-accent shadow-lg shadow-vision-accent/20" />
          </div>
        </div>
      </div>

      {helperText && (
        <p className="text-xs text-white/50">{helperText}</p>
      )}
    </div>
  );
}