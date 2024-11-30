import React from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ImagePreview } from './ImagePreview';

interface ImageUploaderProps {
  files: File[];
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: (index: number) => void;
}

export function ImageUploader({ files, onDrop, onRemove }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/zip': ['.zip']
    }
  });

  return (
    <div className="space-y-6">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 border-dashed transition-colors",
          isDragActive 
            ? "border-vision-accent/50 bg-vision-accent/5" 
            : "border-white/20 hover:border-white/40"
        )}
      >
        <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <Upload className="h-12 w-12 text-white/40" />
          </motion.div>
          <p className="mt-4 text-sm text-white/60 text-center max-w-xs">
            {isDragActive ? (
              <span className="text-vision-accent">Drop your files here</span>
            ) : (
              "Drag & drop your images here or click to browse"
            )}
          </p>
          <p className="mt-2 text-xs text-white/40">
            Supports JPG, PNG, and ZIP files
          </p>
        </div>
        <input {...getInputProps()} />
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {files.map((file, index) => (
              <ImagePreview
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => onRemove(index)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}