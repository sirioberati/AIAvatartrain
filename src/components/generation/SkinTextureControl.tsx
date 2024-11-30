import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace } from 'lucide-react';
import { Switch } from '../ui/Switch';
import { Slider } from '../ui/Slider';

interface SkinTextureControlProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  strength: number;
  onStrengthChange: (strength: number) => void;
}

export function SkinTextureControl({
  enabled,
  onEnabledChange,
  strength,
  onStrengthChange
}: SkinTextureControlProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel rounded-xl p-4 space-y-4 relative overflow-hidden group"
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-vision-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <ScanFace className="w-5 h-5 text-vision-accent" />
              <h3 className="text-sm font-medium text-white">Realistic Skin Texture</h3>
            </div>
            <p className="mt-1 text-xs text-white/50">
              Enhance facial details and skin quality
            </p>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onEnabledChange}
          />
        </div>

        <AnimatePresence>
          {enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <Slider
                label="Texture Strength"
                min={0}
                max={1}
                step={0.05}
                value={strength}
                onChange={onStrengthChange}
                formatValue={(v) => `${Math.round(v * 100)}%`}
                className="px-2"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-vision-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-vision-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}