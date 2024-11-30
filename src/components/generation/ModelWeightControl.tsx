import React from 'react';
import { motion } from 'framer-motion';
import { Sliders } from 'lucide-react';
import { Slider } from '../ui/Slider';

interface ModelWeightControlProps {
  weight: number;
  onWeightChange: (weight: number) => void;
}

export function ModelWeightControl({
  weight,
  onWeightChange
}: ModelWeightControlProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel rounded-xl p-2 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-vision-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-vision-primary" />
            <h3 className="text-sm font-medium text-white">Model Influence</h3>
          </div>
          <span className="text-sm text-vision-accent">{Math.round(weight * 100)}%</span>
        </div>

        <Slider
          label=""
          min={0}
          max={1}
          step={0.05}
          value={weight}
          onChange={onWeightChange}
          className="px-1"
        />
      </div>
    </motion.div>
  );
}