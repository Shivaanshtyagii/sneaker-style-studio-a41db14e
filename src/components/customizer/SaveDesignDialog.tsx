import { useState } from 'react';
import { Save, Loader2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useCustomizerStore } from '@/stores/customizerStore';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

interface SaveDesignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SaveDesignDialog = ({ open, onOpenChange }: SaveDesignDialogProps) => {
  const [name, setName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { config, productId } = useCustomizerStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please give your design a name.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get first product if no product selected
      let finalProductId = productId;
      if (!finalProductId) {
        const { data: products } = await supabase
          .from('products')
          .select('id')
          .limit(1)
          .single();
        finalProductId = products?.id;
      }

      const { error } = await supabase.from('saved_designs').insert([{
        user_id: user.id,
        product_id: finalProductId!,
        name: name.trim(),
        configuration: config as unknown as Record<string, unknown>,
        tags: tags,
      }]);

      if (error) throw error;

      toast({
        title: 'Design saved!',
        description: `"${name}" has been saved to your collection.`,
      });

      queryClient.invalidateQueries({ queryKey: ['saved-designs'] });
      onOpenChange(false);
      setName('');
      setTags([]);
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Save failed',
        description: 'Could not save design. Please try again.',
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
            <Save className="w-5 h-5 text-primary" />
            Save Design
          </DialogTitle>
          <DialogDescription>
            Give your design a name and add tags to organize your collection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Design Name</Label>
            <Input
              id="name"
              placeholder="My Awesome Sneaker"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Press Enter to add tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className="bg-secondary border-border focus:border-primary"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleSave}
            disabled={!name.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Design
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
