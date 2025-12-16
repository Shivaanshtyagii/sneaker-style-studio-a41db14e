import { motion } from 'framer-motion';
import { SneakerSVG } from '../sneaker/SneakerSVG';
import { useCustomizerStore } from '@/stores/customizerStore';

export const LivePreview = () => {
  const { config, productName, basePrice } = useCustomizerStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-background to-secondary/20"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5 pointer-events-none" />
      
      {/* Main Preview Area */}
      <div className="relative z-10 w-full max-w-3xl">
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
    </motion.div>
  );
};
