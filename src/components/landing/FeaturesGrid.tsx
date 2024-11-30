import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Palette, 
  Shield, 
  Download,
  Share2,
  Sliders
} from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Generation",
      description: "Create stunning AI avatars in seconds with our optimized pipeline"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Multiple Styles",
      description: "Choose from various artistic styles to match your preferences"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "Your photos are processed securely and never stored without consent"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Bulk Export",
      description: "Download all your generated images in high resolution"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share your AI avatars directly to social media"
    },
    {
      icon: <Sliders className="w-6 h-6" />,
      title: "Fine Control",
      description: "Adjust generation parameters for perfect results"
    }
  ];

  return (
    <div className="py-24 bg-black/40 backdrop-blur-3xl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-vision-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative glass-panel bg-black/60 hover:bg-black/70 transition-colors duration-300 p-6 rounded-2xl border-white/5">
                <div className="w-12 h-12 rounded-xl bg-vision-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-vision-accent">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}