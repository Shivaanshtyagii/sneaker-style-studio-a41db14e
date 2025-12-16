import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCustomizerStore, SneakerConfig } from '@/stores/customizerStore';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIDesignerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUGGESTIONS = [
  'Give me a summer beach vibe',
  'Classic all-black stealth mode',
  'Retro 80s neon aesthetic',
  'Nature-inspired forest theme',
  'Cyberpunk futuristic look',
];

export const AIDesignerDialog = ({ open, onOpenChange }: AIDesignerDialogProps) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setConfig } = useCustomizerStore();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-designer', {
        body: { prompt: prompt.trim() }
      });

      if (error) throw error;

      if (data?.colors) {
        const newConfig: Partial<SneakerConfig> = {};
        if (data.colors.sole) newConfig.sole = data.colors.sole;
        if (data.colors.upper) newConfig.upper = data.colors.upper;
        if (data.colors.laces) newConfig.laces = data.colors.laces;
        if (data.colors.logo) newConfig.logo = data.colors.logo;
        
        setConfig(newConfig);
        
        toast({
          title: 'Design applied!',
          description: 'AI has updated your sneaker colors based on your mood.',
        });
        
        onOpenChange(false);
        setPrompt('');
      }
    } catch (error) {
      console.error('AI Designer error:', error);
      toast({
        title: 'AI Designer Error',
        description: 'Failed to generate design. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Designer
          </DialogTitle>
          <DialogDescription>
            Describe a mood, theme, or style and let AI create a unique color scheme for your sneakers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Textarea
            placeholder="e.g., Give me a summer sunset vibe with warm colors..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] bg-secondary border-border focus:border-primary"
          />

          {/* Quick Suggestions */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Quick ideas</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <motion.button
                  key={suggestion}
                  onClick={() => setPrompt(suggestion)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className="w-full bg-gradient-to-r from-primary to-purple-500"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Design
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
