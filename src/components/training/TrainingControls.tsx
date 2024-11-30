import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '../ui/Slider';
import { GlassInput } from '../ui/GlassInput';
import { generateSlug } from '../../lib/utils';

interface TrainingControlsProps {
  triggerWord: string;
  setTriggerWord: (value: string) => void;
  modelName: string;
  setModelName: (value: string) => void;
  trainingSteps: number;
  setTrainingSteps: (value: number) => void;
  learningRate: number;
  setLearningRate: (value: number) => void;
  slug: string;
  setSlug: (value: string) => void;
  showAdvanced: boolean;
}

export function TrainingControls({
  triggerWord,
  setTriggerWord,
  modelName,
  setModelName,
  trainingSteps,
  setTrainingSteps,
  learningRate,
  setLearningRate,
  slug,
  setSlug,
  showAdvanced
}: TrainingControlsProps) {
  useEffect(() => {
    if (modelName) {
      setSlug(generateSlug(modelName));
    }
  }, [modelName, setSlug]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassInput
          label="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="Name your model"
          helperText="Give your model a memorable name"
        />
        
        <GlassInput
          label="Trigger Word"
          value={triggerWord}
          onChange={(e) => setTriggerWord(e.target.value)}
          placeholder="Enter a unique identifier"
          helperText="This word will activate your custom style"
        />
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Slider
                label="Training Steps"
                min={1000}
                max={5000}
                step={100}
                value={trainingSteps}
                onChange={setTrainingSteps}
                helperText="More steps = better quality, longer training"
              />
              
              <Slider
                label="Learning Rate"
                min={0.0001}
                max={0.01}
                step={0.0001}
                value={learningRate}
                onChange={setLearningRate}
                helperText="Lower = more stable, higher = faster learning"
                formatValue={(value) => value.toFixed(4)}
              />
            </div>

            <GlassInput
              label="URL Slug"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              placeholder="url-friendly-name"
              helperText="Used in URLs for sharing your model"
              disabled
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}