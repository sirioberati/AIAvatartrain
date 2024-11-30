import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { TrainedModel } from '../../data/demoModels';

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: TrainedModel[];
  placeholder?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export function Dropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select a model...',
  onOpenChange
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedModel = options.find(model => model.id === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-white/80 mb-1.5">
        {label}
      </label>
      
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        className={cn(
          "relative w-full px-2.5 py-2 rounded-lg",
          "flex items-center justify-between",
          "bg-black/90 backdrop-blur-xl",
          "border border-white/10",
          "text-left transition-all duration-300",
          "hover:bg-black/95",
          isOpen && "ring-1 ring-vision-accent/30 bg-black/95"
        )}
      >
        <div className="flex items-center gap-2">
          {selectedModel ? (
            <>
              <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                <img
                  src={selectedModel.thumbnail}
                  alt={selectedModel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-white">{selectedModel.name}</span>
            </>
          ) : (
            <span className="text-sm text-white/50">{placeholder}</span>
          )}
        </div>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-white/50 transition-transform duration-300",
            isOpen && "transform rotate-180"
          )} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1"
          >
            <div className="rounded-lg overflow-hidden backdrop-blur-xl border border-white/10 bg-black/95 shadow-xl">
              <div className="max-h-[120px] overflow-y-auto py-1">
                {options.map((model) => (
                  <motion.button
                    key={model.id}
                    onClick={() => {
                      onChange(model.id);
                      setIsOpen(false);
                      onOpenChange?.(false);
                    }}
                    className={cn(
                      "w-full px-2.5 py-1.5 flex items-center gap-2",
                      "transition-colors duration-200",
                      "hover:bg-white/5",
                      model.id === value && "bg-black/40"
                    )}
                  >
                    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                      <img
                        src={model.thumbnail}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-white">{model.name}</span>
                      <p className="text-xs text-white/40">@{model.triggerWord}</p>
                    </div>
                    {model.id === value && (
                      <Check className="w-3.5 h-3.5 text-vision-accent" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}