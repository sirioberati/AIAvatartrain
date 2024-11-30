import React from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Copy, Hash } from 'lucide-react';
import type { GeneratedImage } from '../data/demoGenerations';
import { GlassButton } from './ui/GlassButton';

interface GenerationCardProps {
  image: GeneratedImage;
}

export function GenerationCard({ image }: GenerationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-xl overflow-hidden group"
    >
      <div className="aspect-square relative">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Seed Badge */}
        <div className="absolute top-3 right-3 glass-panel rounded-full px-3 py-1.5 backdrop-blur-xl flex items-center gap-2 text-sm">
          <Hash className="w-3.5 h-3.5 text-vision-accent" />
          <span className="text-white/90">{image.seed}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigator.clipboard.writeText(image.seed.toString())}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <Copy className="w-3 h-3 text-white/70" />
          </motion.button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <p className="text-sm text-white line-clamp-2">{image.prompt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">{image.model}</span>
              <div className="flex space-x-2">
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {}}
                  className="!p-1.5"
                >
                  <Share2 className="w-4 h-4" />
                </GlassButton>
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {}}
                  className="!p-1.5"
                >
                  <Download className="w-4 h-4" />
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}