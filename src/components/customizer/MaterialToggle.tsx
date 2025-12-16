import { motion } from 'framer-motion';
import { Sparkles, Circle } from 'lucide-react';

interface MaterialToggleProps {
  material: 'matte' | 'shiny';
  onMaterialChange: (material: 'matte' | 'shiny') => void;
}

export const MaterialToggle = ({ material, onMaterialChange }: MaterialToggleProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Material Finish
      </label>
      <div className="flex gap-3">
        <motion.button
          onClick={() => onMaterialChange('matte')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200
            ${material === 'matte' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }
          `}
        >
          <Circle className="w-4 h-4" />
          <span className="font-medium">Matte</span>
        </motion.button>
        
        <motion.button
          onClick={() => onMaterialChange('shiny')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200
            ${material === 'shiny' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }
          `}
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Shiny</span>
        </motion.button>
      </div>
    </div>
  );
};
