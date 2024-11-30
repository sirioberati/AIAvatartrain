import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, Wand2, Download, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Photos",
      description: "Select 10-20 high-quality photos of yourself"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Train Model",
      description: "Our AI learns your facial features"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Generate",
      description: "Create unlimited AI avatars in various styles"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Download",
      description: "Get your AI-generated avatars in high resolution"
    }
  ];

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-vision-primary/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-vision-accent/50" />
            <span className="text-vision-accent font-medium">Process</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-vision-accent/50" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-vision-accent"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-white/70"
          >
            Create your AI avatar in four simple steps
          </motion.p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-vision-accent/20 to-transparent backdrop-blur-xl border border-vision-accent/20 flex items-center justify-center mb-6 group-hover:border-vision-accent/40 transition-colors duration-300"
                  >
                    <div className="text-vision-accent">
                      {step.icon}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <motion.div 
                    className="absolute top-10 -right-4 z-10 hidden md:block"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-vision-accent/10 backdrop-blur-xl border border-vision-accent/20 flex items-center justify-center group-hover:border-vision-accent/40 transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 text-vision-accent" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </React.Fragment>
          ))}

          {/* Connecting Lines */}
          <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vision-accent/20 to-transparent hidden md:block" />
        </div>
      </div>
    </div>
  );
}