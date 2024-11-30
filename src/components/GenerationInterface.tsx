import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Image as ImageIcon, Settings, Loader2, Copy } from 'lucide-react';
import { Slider } from './ui/Slider';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';
import { GlassInput } from './ui/GlassInput';
import { Dropdown } from './ui/Dropdown';
import { GenerationCard } from './GenerationCard';
import { demoModels } from '../data/demoModels';
import { Switch } from './ui/Switch';
import { SkinTextureControl } from './generation/SkinTextureControl';
import { ModelWeightControl } from './generation/ModelWeightControl';

export function GenerationInterface() {
  const [selectedModel, setSelectedModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [inferenceSteps, setInferenceSteps] = useState(30);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [modelWeight, setModelWeight] = useState(0.8);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [enableSkinTexture, setEnableSkinTexture] = useState(false);
  const [skinTextureStrength, setSkinTextureStrength] = useState(0.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Array<{ url: string; seed: number }>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [seed, setSeed] = useState(-1);

  // Update prompt when model changes
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    const selectedModelData = demoModels.find(model => model.id === modelId);
    if (selectedModelData) {
      setPrompt(prev => {
        const existingPrompt = prev.replace(/@\w+\s*/, '').trim();
        return `@${selectedModelData.triggerWord} ${existingPrompt}`;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-vision-accent via-white to-vision-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Generate with AI
          </motion.h1>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Controls */}
          <div className="col-span-12 lg:col-span-5">
            <GlassCard>
              <div className="space-y-4">
                <div className="w-full">
                  <Dropdown
                    label="Select Model"
                    value={selectedModel}
                    onChange={handleModelChange}
                    options={demoModels}
                    onOpenChange={setIsDropdownOpen}
                  />
                </div>

                <motion.div
                  animate={{
                    marginTop: isDropdownOpen ? '140px' : '0px',
                    transition: { duration: 0.2 }
                  }}
                >
                  <GlassInput
                    label="Prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your image..."
                    className="min-h-[80px]"
                    as="textarea"
                  />
                </motion.div>

                {/* Basic Settings */}
                <div className="space-y-3">
                  <ModelWeightControl
                    weight={modelWeight}
                    onWeightChange={setModelWeight}
                  />

                  <SkinTextureControl
                    enabled={enableSkinTexture}
                    onEnabledChange={setEnableSkinTexture}
                    strength={skinTextureStrength}
                    onStrengthChange={setSkinTextureStrength}
                  />

                  <Slider
                    label="Number of Images"
                    min={1}
                    max={4}
                    step={1}
                    value={numImages}
                    onChange={setNumImages}
                  />

                  {/* Seed Control */}
                  <div className="glass-panel rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-white/80">Seed Number</label>
                      <div className="flex items-center gap-2">
                        <GlassButton
                          variant="secondary"
                          size="sm"
                          onClick={() => setSeed(Math.floor(Math.random() * 1000000))}
                          className="px-2 py-1"
                        >
                          <Sparkles className="w-3 h-3" />
                        </GlassButton>
                        <Switch
                          checked={seed !== -1}
                          onCheckedChange={(checked) => setSeed(checked ? Math.floor(Math.random() * 1000000) : -1)}
                        />
                      </div>
                    </div>
                    {seed !== -1 && (
                      <div className="flex items-center gap-2">
                        <GlassInput
                          value={seed}
                          onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
                          type="number"
                          className="text-sm"
                          label=""
                        />
                        <GlassButton
                          variant="secondary"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(seed.toString())}
                          className="px-2 py-1"
                        >
                          <Copy className="w-3 h-3" />
                        </GlassButton>
                      </div>
                    )}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <label className="text-sm font-medium text-white/80">
                        Advanced Settings
                      </label>
                      <p className="text-xs text-white/50">
                        Fine-tune generation parameters
                      </p>
                    </div>
                    <Switch
                      checked={showAdvanced}
                      onCheckedChange={setShowAdvanced}
                    />
                  </div>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <Slider
                          label="Inference Steps"
                          min={20}
                          max={50}
                          step={1}
                          value={inferenceSteps}
                          onChange={setInferenceSteps}
                          helperText="Higher = better quality, slower generation"
                        />

                        <Slider
                          label="Guidance Scale"
                          min={1}
                          max={20}
                          step={0.1}
                          value={guidanceScale}
                          onChange={setGuidanceScale}
                          helperText="How closely to follow the prompt"
                          formatValue={(v) => v.toFixed(1)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Generate Button */}
                <GlassButton
                  variant="primary"
                  className="w-full"
                  onClick={() => setIsGenerating(true)}
                  disabled={!selectedModel || !prompt || isGenerating}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        <span>Generate</span>
                      </>
                    )}
                  </div>
                </GlassButton>
              </div>
            </GlassCard>
          </div>

          {/* Right Column - Output Display */}
          <div className="col-span-12 lg:col-span-7">
            <GlassCard>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="w-5 h-5 text-vision-accent" />
                    <h2 className="text-xl font-semibold">Output</h2>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isGenerating || currentGeneration.length > 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {Array.from({ length: numImages }).map((_, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          {currentGeneration[index] ? (
                            <GenerationCard
                              image={{
                                id: `current-${index}`,
                                url: currentGeneration[index].url,
                                prompt,
                                model: demoModels.find(m => m.id === selectedModel)?.name || '',
                                createdAt: new Date().toISOString(),
                                seed: currentGeneration[index].seed
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                              <Loader2 className="w-8 h-8 text-vision-accent animate-spin" />
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="min-h-[400px] flex flex-col items-center justify-center text-white/40"
                    >
                      <Wand2 className="w-12 h-12 mb-4" />
                      <p>Your generated images will appear here</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}