import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LivePreview } from '@/components/customizer/LivePreview';
import { CustomizerSidebar } from '@/components/customizer/CustomizerSidebar';
import { useCustomizerStore } from '@/stores/customizerStore';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const Customizer = () => {
  const { setProduct } = useCustomizerStore();

  // Fetch default product
  const { data: product } = useQuery({
    queryKey: ['default-product'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (product) {
      const defaultConfig = product.default_config as {
        sole: string;
        upper: string;
        laces: string;
        logo: string;
        material: 'matte' | 'shiny';
      };
      setProduct(product.id, product.name, Number(product.base_price), defaultConfig);
    }
  }, [product, setProduct]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-16 flex flex-col lg:flex-row"
    >
      {/* Main Preview Area */}
      <LivePreview />

      {/* Sidebar */}
      <CustomizerSidebar />
    </motion.div>
  );
};
