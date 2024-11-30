import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { TrainedModel } from '../data/demoModels';
import { cn } from '../lib/utils';

interface ModelCardProps {
  model: TrainedModel;
  onClick?: () => void;
  selected?: boolean;
}

export function ModelCard({ model, onClick, selected }: ModelCardProps) {
  const statusIcon = {
    ready: <CheckCircle2 className="w-3 h-3 text-vision-success" />,
    training: <Loader2 className="w-3 h-3 text-vision-warning animate-spin" />,
    failed: <AlertCircle className="w-3 h-3 text-vision-error" />
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "glass-card rounded-lg overflow-hidden cursor-pointer w-full",
        "transition-all duration-300 flex items-center gap-3 p-2",
        selected && "ring-1 ring-vision-accent shadow-lg shadow-vision-accent/20"
      )}
    >
      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={model.thumbnail}
          alt={model.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-medium text-white truncate">{model.name}</h3>
          {statusIcon[model.status]}
        </div>
        <p className="text-xs text-white/60 truncate">@{model.triggerWord}</p>
      </div>
      
      {model.status === 'training' && (
        <div className="w-1 h-8 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-vision-warning"
            initial={{ height: 0 }}
            animate={{ height: `${model.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </motion.button>
  );
}