import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SneakerSVG } from '@/components/sneaker/SneakerSVG';
import { useCustomizerStore, SneakerConfig } from '@/stores/customizerStore';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface SavedDesign {
  id: string;
  name: string;
  configuration: SneakerConfig;
  tags: string[];
  created_at: string;
  product_id: string;
}

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { setFullConfig, setProduct } = useCustomizerStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: designs = [], isLoading } = useQuery({
    queryKey: ['saved-designs'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('saved_designs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SavedDesign[];
    },
  });

  const filteredDesigns = designs.filter((design) => {
    const query = searchQuery.toLowerCase();
    return (
      design.name.toLowerCase().includes(query) ||
      design.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const handleLoadDesign = async (design: SavedDesign) => {
    setFullConfig(design.configuration);
    
    // Get product info
    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('id', design.product_id)
      .single();
    
    if (product) {
      setProduct(product.id, product.name, Number(product.base_price), design.configuration);
    }
    
    navigate('/customizer');
  };

  const handleDeleteDesign = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('saved_designs')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      toast({
        title: 'Design deleted',
        description: 'Your design has been removed.',
      });

      queryClient.invalidateQueries({ queryKey: ['saved-designs'] });
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'Could not delete design. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Designs</h1>
            <p className="text-muted-foreground">
              {designs.length} design{designs.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search designs or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredDesigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg mb-4">
              {searchQuery ? 'No designs match your search.' : 'No saved designs yet.'}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate('/customizer')}>
                Create Your First Design
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover-lift"
                >
                  {/* Preview */}
                  <div className="p-6 bg-secondary/30">
                    <SneakerSVG
                      config={design.configuration}
                      animate={false}
                      className="w-full h-32 object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg truncate">{design.name}</h3>
                    
                    {design.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {design.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {design.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{design.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Created {new Date(design.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleLoadDesign(design)}
                      className="h-8 w-8"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setDeleteId(design.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Design?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your saved design.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDesign}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};
