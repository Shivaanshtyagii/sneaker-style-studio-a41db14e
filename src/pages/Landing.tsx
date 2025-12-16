import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Sparkles, Save, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SneakerSVG } from '@/components/sneaker/SneakerSVG';

const features = [
  {
    icon: Palette,
    title: 'Custom Colors',
    description: 'Choose from a wide palette of colors for every part of your sneaker.',
  },
  {
    icon: Sparkles,
    title: 'AI Designer',
    description: 'Let AI generate unique color combinations based on your mood or style.',
  },
  {
    icon: Layers,
    title: 'Material Options',
    description: 'Switch between matte and shiny finishes for different looks.',
  },
  {
    icon: Save,
    title: 'Save & Share',
    description: 'Save your designs and access them anytime from your dashboard.',
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    Design Your Dream Sneakers
                  </span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Sneaker
                  <span className="block gradient-text">Style Studio</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Create unique, personalized sneaker designs with our powerful customizer. 
                  Use AI to generate stunning color combinations.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/auth">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    Start Designing
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Sneaker Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-2xl" />
              <div className="relative animate-float">
                <SneakerSVG
                  config={{
                    sole: '#1a1a1a',
                    upper: '#ffffff',
                    laces: '#000000',
                    logo: '#00a8ff',
                    material: 'shiny',
                  }}
                  className="w-full max-w-xl mx-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our powerful tools make it easy to create, customize, and save your perfect sneaker designs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-purple-500/10 border border-border overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Create Your Perfect Sneaker?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of designers creating unique sneaker designs every day.
              </p>
              <Link to="/auth">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Sneaker Style Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
