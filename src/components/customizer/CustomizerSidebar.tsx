import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Save, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Added Input import
import { ColorPicker } from './ColorPicker';
import { MaterialToggle } from './MaterialToggle';
import { AIDesignerDialog } from './AIDesignerDialog';
import { SaveDesignDialog } from './SaveDesignDialog';
import { useCustomizerStore, SneakerConfig } from '@/stores/customizerStore';
import { useToast } from '@/hooks/use-toast';

type PartKey = 'sole' | 'upper' | 'laces' | 'logo';

const PARTS: { key: PartKey; label: string }[] = [
  { key: 'sole', label: 'Sole' },
  { key: 'upper', label: 'Upper' },
  { key: 'laces', label: 'Laces' },
  { key: 'logo', label: 'Logo' },
];

export const CustomizerSidebar = () => {
  const { config, setConfig, resetConfig } = useCustomizerStore();
  const [expandedPart, setExpandedPart] = useState<PartKey | null>('upper');
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleColorChange = (part: PartKey, color: string) => {
    // Validation: Prevent black text on black upper
    if (part === 'logo' && color === '#000000' && config.upper === '#000000') {
      toast({
        title: 'Invalid combination',
        description: 'Cannot use black logo on black upper - it won\'t be visible!',
        variant: 'destructive',
      });
      return;
    }
    if (part === 'upper' && color === '#000000' && config.logo === '#000000') {
      toast({
        title: 'Invalid combination',
        description: 'Cannot use black upper with black logo - logo won\'t be visible!',
        variant: 'destructive',
      });
      return;
    }

    setConfig({ [part]: color });
  };

  return (
    <motion.aside
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full lg:w-96 bg-card border-l border-border p-6 overflow-y-auto h-full"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Customize</h2>
          <p className="text-muted-foreground text-sm">
            Select each part and pick your colors
          </p>
        </div>

        {/* AI Designer Button */}
        <Button
          onClick={() => setAiDialogOpen(true)}
          className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-primary-foreground"
          size="lg"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Ask AI Designer
        </Button>

        {/* Parts Accordion */}
        <div className="space-y-2">
          {PARTS.map((part) => (
            <div key={part.key} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedPart(expandedPart === part.key ? null : part.key)}
                className="w-full px-4 py-3 flex items-center justify-between bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full border border-border"
                    style={{ backgroundColor: config[part.key] }}
                  />
                  <span className="font-medium">{part.label}</span>
                </div>
                <motion.div
                  animate={{ rotate: expandedPart === part.key ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedPart === part.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4 bg-background/50">
                      <ColorPicker
                        selectedColor={config[part.key]}
                        onColorSelect={(color) => handleColorChange(part.key, color)}
                        label="Color"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Personalize Section (New) */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Personalize
          </label>
          <Input
            placeholder="Enter text (e.g. YOUR NAME)"
            maxLength={10}
            value={config.customText || ''}
            onChange={(e) => setConfig({ customText: e.target.value })}
            className="bg-secondary border-border"
          />
        </div>

        {/* Material Toggle */}
        <div className="pt-4 border-t border-border">
          <MaterialToggle
            material={config.material}
            onMaterialChange={(material) => setConfig({ material })}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={resetConfig}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={() => setSaveDialogOpen(true)}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Design
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <AIDesignerDialog open={aiDialogOpen} onOpenChange={setAiDialogOpen} />
      <SaveDesignDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen} />
    </motion.aside>
  );
};