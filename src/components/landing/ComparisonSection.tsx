import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ScanFace } from 'lucide-react';

export function ComparisonSection() {
  const comparisons = [
    {
      original: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=90",
      ai: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&q=90",
      label: "Ultra-Realistic",
      description: "Advanced skin texture preservation for natural results",
      features: ["Pore details", "Skin texture", "Natural lighting"]
    },
    {
      original: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=90",
      ai: "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?w=800&q=90",
      label: "Perfect Lighting",
      description: "Professional studio-quality lighting in every shot",
      features: ["Soft shadows", "Balanced exposure", "Depth"]
    },
    {
      original: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800&q=90",
      ai: "https://images.unsplash.com/photo-1642479755015-60f8bbb27d2d?w=800&q=90",
      label: "Enhanced Details",
      description: "Preserve and enhance your unique features",
      features: ["Eye clarity", "Facial features", "Expression"]
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-black/40 to-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-vision-accent/50" />
            <div className="flex items-center gap-2 text-vision-accent font-medium">
              <ScanFace className="w-5 h-5" />
              <span>ULTRA-REALISTIC RESULTS</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-vision-accent/50" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-vision-accent"
          >
            Unmatched Realism
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Our advanced AI preserves intricate skin textures and facial features while enhancing photo quality
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="relative mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="relative aspect-[3/4] rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <img 
                      src={comparison.original} 
                      alt="Original" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 text-sm font-medium bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                      Original
                    </div>
                  </motion.div>

                  <motion.div 
                    className="relative aspect-[3/4] rounded-xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <img 
                      src={comparison.ai} 
                      alt="AI Generated" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3 text-sm font-medium bg-vision-accent/30 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-vision-accent/20">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Enhanced</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-full bg-vision-accent/20 backdrop-blur-xl border border-vision-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-6 h-6 text-vision-accent" />
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-vision-accent/80">
                  {comparison.label}
                </h3>
                <p className="text-white/60">{comparison.description}</p>
                <div className="flex flex-wrap gap-2">
                  {comparison.features.map((feature, i) => (
                    <div 
                      key={i}
                      className="px-3 py-1 rounded-full bg-vision-accent/10 border border-vision-accent/20 text-vision-accent text-sm"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}