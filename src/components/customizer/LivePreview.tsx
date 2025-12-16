import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { SneakerSVG } from '../sneaker/SneakerSVG';
import { useCustomizerStore } from '@/stores/customizerStore';

export const LivePreview = () => {
  const { config, productName, basePrice } = useCustomizerStore();

  const handleDownload = async () => {
    const element = document.getElementById('sneaker-preview-container');
    if (element) {
      try {
        // Generate the image from the DOM element
        const dataUrl = await toPng(element, { 
          cacheBust: true, 
          backgroundColor: '#ffffff',
          style: { padding: '20px' } // Add some padding to the exported image
        });
        
        // Create a fake link to trigger the download
        const link = document.createElement('a');
        link.download = `my-design-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image', err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background to-secondary/20 relative"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5 pointer-events-none" />
      
      {/* Main Preview Area - Wrapped with ID for capture */}
      <div 
        id="sneaker-preview-container" 
        className="relative z-10 w-full max-w-3xl p-8 rounded-xl"
      >
        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">{productName}</h1>
          <p className="text-2xl text-primary font-semibold">${basePrice.toFixed(2)}</p>
        </motion.div>

        {/* Sneaker Preview */}
        <motion.div
          key={JSON.stringify(config)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative"
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-3xl opacity-20 scale-90"
            style={{ backgroundColor: config.logo }}
          />
          
          {/* Main SVG */}
          <div className="relative animate-float">
            <SneakerSVG config={config} className="w-full" />
          </div>
        </motion.div>

        {/* Color Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-12"
        >
          {[
            { label: 'Sole', color: config.sole },
            { label: 'Upper', color: config.upper },
            { label: 'Laces', color: config.laces },
            { label: 'Logo', color: config.logo },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Material Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-6"
        >
          <span className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium capitalize">
            {config.material} Finish
          </span>
        </motion.div>
      </div>

      {/* Download Button Positioned at Bottom Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <Button 
          variant="outline" 
          onClick={handleDownload}
          className="bg-background/80 backdrop-blur-sm shadow-sm hover:bg-background"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Image
        </Button>
      </motion.div>
    </motion.div>
  );
};