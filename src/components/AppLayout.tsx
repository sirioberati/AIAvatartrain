import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Wand2, Image as ImageIcon, X, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { demoGenerations } from '../data/demoGenerations';
import { GlassButton } from './ui/GlassButton';
import { Switch } from './ui/Switch';

export function AppLayout() {
  const location = useLocation();
  const [showGallery, setShowGallery] = useState(false);
  const [nsfwMode, setNsfwMode] = useState(false);
  const [showNsfwWarning, setShowNsfwWarning] = useState(false);

  const handleNsfwToggle = () => {
    if (!nsfwMode) {
      setShowNsfwWarning(true);
    } else {
      setNsfwMode(false);
    }
  };

  const confirmNsfwMode = () => {
    setNsfwMode(true);
    setShowNsfwWarning(false);
  };

  return (
    <motion.div
      animate={{
        backgroundColor: nsfwMode ? '#000000' : 'rgb(0, 0, 0)',
        backgroundImage: nsfwMode 
          ? 'none'
          : 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.03), transparent), radial-gradient(circle at top right, rgba(128, 128, 255, 0.03), transparent), radial-gradient(at bottom left, rgba(255, 128, 128, 0.03), transparent)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="min-h-screen relative"
    >
      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Background Overlay */}
      <motion.div
        animate={{
          opacity: nsfwMode ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

      <div className="relative z-10 backdrop-blur-3xl">
        <nav className="glass-panel backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-8">
                <NavLink
                  to="/train"
                  className={({ isActive }) =>
                    cn(
                      'px-6 py-4 inline-flex items-center space-x-2 rounded-full transition-all duration-300',
                      isActive
                        ? 'text-vision-accent bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    )
                  }
                >
                  <Brain className="w-5 h-5" />
                  <span>Train</span>
                </NavLink>
                
                <NavLink
                  to="/generate"
                  className={({ isActive }) =>
                    cn(
                      'px-6 py-4 inline-flex items-center space-x-2 rounded-full transition-all duration-300',
                      isActive
                        ? 'text-vision-accent bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    )
                  }
                >
                  <Wand2 className="w-5 h-5" />
                  <span>Generate</span>
                </NavLink>
              </div>

              <div className="flex items-center space-x-6">
                {/* NSFW Toggle */}
                <div className="flex items-center space-x-3">
                  <span className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    nsfwMode ? "text-red-500" : "text-white/70"
                  )}>
                    NSFW
                  </span>
                  <Switch
                    checked={nsfwMode}
                    onCheckedChange={handleNsfwToggle}
                  />
                </div>

                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowGallery(!showGallery)}
                  className="relative"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Gallery</span>
                  {demoGenerations.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-vision-accent rounded-full text-xs flex items-center justify-center">
                      {demoGenerations.length}
                    </span>
                  )}
                </GlassButton>
              </div>
            </div>
          </div>
        </nav>

        {/* NSFW Warning Modal */}
        <AnimatePresence>
          {showNsfwWarning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-panel max-w-md mx-auto p-6 rounded-2xl space-y-6"
              >
                <div className="flex items-center space-x-4 text-red-500">
                  <AlertTriangle className="w-8 h-8" />
                  <h2 className="text-xl font-bold">NSFW Content Warning</h2>
                </div>
                
                <p className="text-white/80">
                  You are about to enable NSFW content generation. This mode allows the creation of adult-oriented content. 
                  Please ensure you are of legal age and comply with all applicable laws and regulations.
                </p>

                <div className="flex justify-end space-x-4">
                  <GlassButton
                    variant="secondary"
                    onClick={() => setShowNsfwWarning(false)}
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    onClick={confirmNsfwMode}
                    className="!bg-red-500 hover:!bg-red-600"
                  >
                    I Understand
                  </GlassButton>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Overlay */}
        <AnimatePresence>
          {showGallery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            >
              <div className="relative h-full">
                <div className="absolute top-4 right-4">
                  <GlassButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowGallery(false)}
                  >
                    <X className="w-5 h-5" />
                  </GlassButton>
                </div>

                <div className="container mx-auto px-6 py-12">
                  <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold mb-8 text-white"
                  >
                    Your Gallery
                  </motion.h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {demoGenerations.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={image.url}
                          alt={image.prompt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-sm text-white line-clamp-2">{image.prompt}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-white/60">{image.model}</span>
                              <span className="text-xs text-vision-accent">#{image.seed}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="py-12 px-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
}