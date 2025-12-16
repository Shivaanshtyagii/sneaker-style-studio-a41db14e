import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  label: string;
}

const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Electric Blue', hex: '#00a8ff' },
  { name: 'Neon Green', hex: '#39ff14' },
  { name: 'Hot Pink', hex: '#ff69b4' },
  { name: 'Orange', hex: '#ff6b35' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Gold', hex: '#fbbf24' },
  { name: 'Teal', hex: '#14b8a6' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Gray', hex: '#6b7280' },
];

export const ColorPicker = ({ selectedColor, onColorSelect, label }: ColorPickerProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <div className="grid grid-cols-6 gap-2">
        {COLORS.map((color) => {
          const isSelected = selectedColor.toLowerCase() === color.hex.toLowerCase();
          const isLight = ['#ffffff', '#fbbf24', '#39ff14'].includes(color.hex);
          
          return (
            <motion.button
              key={color.hex}
              onClick={() => onColorSelect(color.hex)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative w-10 h-10 rounded-lg transition-all duration-200
                ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:ring-1 hover:ring-muted-foreground/50'}
              `}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check 
                    className={`w-5 h-5 ${isLight ? 'text-black' : 'text-white'}`} 
                    strokeWidth={3}
                  />
                </motion.div>
              )}
              {color.hex === '#ffffff' && (
                <span className="absolute inset-0 rounded-lg border border-border" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
