import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, Upload, Sparkles, Settings } from 'lucide-react';
import { ImageUploader } from './training/ImageUploader';
import { TrainingControls } from './training/TrainingControls';
import { GlassCard } from './ui/GlassCard';
import { GlassButton } from './ui/GlassButton';

export function TrainingInterface() {
  const [files, setFiles] = useState<File[]>([]);
  const [triggerWord, setTriggerWord] = useState('');
  const [modelName, setModelName] = useState('');
  const [slug, setSlug] = useState('');
  const [trainingSteps, setTrainingSteps] = useState(2500);
  const [learningRate, setLearningRate] = useState(0.0001);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleStartTraining = () => {
    console.log('Starting training...', {
      modelName,
      slug,
      triggerWord,
      trainingSteps,
      learningRate,
      filesCount: files.length
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-vision-accent via-white to-vision-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Train Your AI Avatar
          </motion.h1>
        </div>

        <GlassCard>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Upload className="w-5 h-5 text-vision-accent" />
                <h2 className="text-xl font-semibold">Upload Images</h2>
              </div>
              <div className="flex items-center space-x-4">
                <div className="glass-panel rounded-xl px-4 py-2">
                  <p className="text-sm text-white/60">Images: <span className="text-vision-accent">{files.length}</span></p>
                </div>
                <div className="glass-panel rounded-xl px-4 py-2">
                  <p className="text-sm text-white/60">Est. Time: <span className="text-vision-accent">~{Math.round(trainingSteps / 100)}min</span></p>
                </div>
              </div>
            </div>
            
            <ImageUploader
              files={files}
              onDrop={onDrop}
              onRemove={removeFile}
            />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-vision-accent" />
                <h2 className="text-xl font-semibold">Training Configuration</h2>
              </div>
              <GlassButton
                variant="secondary"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Settings className="w-4 h-4" />
                <span>{showAdvanced ? 'Hide' : 'Show'} Advanced</span>
              </GlassButton>
            </div>
            
            <TrainingControls
              triggerWord={triggerWord}
              setTriggerWord={setTriggerWord}
              modelName={modelName}
              setModelName={setModelName}
              slug={slug}
              setSlug={setSlug}
              trainingSteps={trainingSteps}
              setTrainingSteps={setTrainingSteps}
              learningRate={learningRate}
              setLearningRate={setLearningRate}
              showAdvanced={showAdvanced}
            />

            <div className="flex justify-end">
              <GlassButton
                variant="primary"
                onClick={handleStartTraining}
                disabled={files.length === 0 || !triggerWord || !modelName}
              >
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Start Training</span>
                </div>
              </GlassButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}