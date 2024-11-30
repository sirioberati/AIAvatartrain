import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { ArrowRight, Brain, Sparkles, Wand2, PlayCircle, ScanFace } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';
import { GlassInput } from './ui/GlassInput';
import { ComparisonSection } from './landing/ComparisonSection';
import { FeaturesGrid } from './landing/FeaturesGrid';
import { HowItWorks } from './landing/HowItWorks';

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  const floatingAnimation = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-20px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { tension: 50, friction: 10 },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-vision-primary/20 via-vision-bg to-vision-bg" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?w=1920&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-vision-accent via-white to-vision-primary">
                  Ultra-Realistic AI Avatars
                </span>
              </h1>
              
              <p className="text-xl text-white/70 leading-relaxed">
                Experience the next generation of AI avatars with unmatched realism. 
                Our advanced technology preserves your unique features while enhancing photo quality.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 text-white/60">
                  <ScanFace className="w-5 h-5 text-vision-accent" />
                  <span>Realistic Details</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Brain className="w-5 h-5 text-vision-accent" />
                  <span>Smart Enhancement</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Sparkles className="w-5 h-5 text-vision-accent" />
                  <span>Perfect Lighting</span>
                </div>
              </div>

              <div className="flex gap-4">
                <GlassButton
                  variant="primary"
                  size="lg"
                  onClick={onGetStarted}
                  className="group"
                >
                  <span>Create Your Avatar</span>
                  <ArrowRight className="w-5 h-5" />
                </GlassButton>

                <GlassButton
                  variant="secondary"
                  size="lg"
                  onClick={onGetStarted}
                  className="group"
                >
                  <PlayCircle className="w-5 h-5 text-vision-accent group-hover:text-white transition-colors" />
                  <span>Watch Demo</span>
                </GlassButton>
              </div>
            </motion.div>

            <div className="relative">
              <animated.div style={floatingAnimation}>
                <GlassCard className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-semibold text-white">Get Started</h2>
                      <p className="text-white/60 mt-2">Create your avatar in minutes</p>
                    </div>

                    <div className="space-y-4">
                      <GlassInput
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                      
                      <GlassInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                      />
                    </div>

                    <GlassButton
                      variant="primary"
                      className="w-full"
                      onClick={onGetStarted}
                      disabled={!email || !name}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Start Creating</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </GlassButton>

                    <p className="text-center text-xs text-white/40">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </motion.div>
                </GlassCard>
              </animated.div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-vision-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-vision-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <ComparisonSection />
        <HowItWorks />
        <FeaturesGrid />
      </div>
    </div>
  );
}