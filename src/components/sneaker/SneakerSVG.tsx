import { motion } from 'framer-motion';
import { SneakerConfig } from '@/stores/customizerStore';

interface SneakerSVGProps {
  config: SneakerConfig;
  className?: string;
  animate?: boolean;
}

export const SneakerSVG = ({ config, className = '', animate = true }: SneakerSVGProps) => {
  const { sole, upper, laces, logo, material, customText } = config;
  const isShiny = material === 'shiny';

  // Helper for gradients to make it look 3D
  const getGradientId = (part: string) => `grad-${part}`;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* 1. Leather Texture Filter */}
          <filter id="leatherNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" /> {/* Reduces opacity of noise */}
            </feComponentTransfer>
          </filter>

          {/* 2. 3D Lighting Gradients */}
          {/* Upper Gradient (Roundness) */}
          <linearGradient id="upperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Sole Gradient (Ground shadow) */}
          <linearGradient id="soleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>

          {/* Shiny Material Highlight */}
          <linearGradient id="shinyReflect" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="30%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="70%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- MAIN SHOE SHAPE (Air Force 1 Style) --- */}

        {/* 1. SOLE (Thick rubber style) */}
        <motion.path
          d="M45 280 
             C45 280, 40 330, 160 335 
             C280 340, 420 335, 540 330 
             C560 329, 570 320, 570 300 
             L570 270 
             C570 270, 500 275, 300 275 
             C100 275, 45 280, 45 280 Z"
          fill={sole}
          stroke="#000" strokeWidth="1" strokeOpacity="0.1"
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
        />
        {/* Sole Texture/Gradient Overlay */}
        <path d="M45 280 C45 280, 40 330, 160 335 C280 340, 420 335, 540 330 C560 329, 570 320, 570 300 L570 270 C570 270, 500 275, 300 275 C100 275, 45 280, 45 280 Z" fill="url(#soleGrad)" pointerEvents="none" />
        {/* Sole Stitching Line */}
        <path d="M50 285 C100 280, 500 280, 565 275" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.2" />

        {/* 2. UPPER BASE (Main leather body) */}
        <motion.path
          d="M50 275 
             C50 200, 90 130, 180 110 
             C240 95, 320 100, 400 120 
             L460 270 
             C400 275, 100 275, 50 275 Z"
          fill={upper}
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
        />
        {/* Upper Texture Overlay */}
        <path 
          d="M50 275 C50 200, 90 130, 180 110 C240 95, 320 100, 400 120 L460 270 C400 275, 100 275, 50 275 Z" 
          fill={isShiny ? "url(#shinyReflect)" : "url(#upperGrad)"} 
          pointerEvents="none" 
        />
        {/* Perforations (The little dots on the toe) */}
        <g fill="black" fillOpacity="0.1">
           <circle cx="100" cy="250" r="2" /> <circle cx="110" cy="255" r="2" /> <circle cx="120" cy="260" r="2" />
           <circle cx="95" cy="240" r="2" />  <circle cx="105" cy="245" r="2" /> <circle cx="115" cy="250" r="2" />
        </g>

        {/* 3. HEEL PANEL (Back of shoe) */}
        <motion.path
          d="M400 120 
             C450 130, 530 140, 570 180 
             L570 270 
             L460 270 
             L400 120 Z"
          fill={upper} // Can be same or different color
          stroke="black" strokeWidth="1" strokeOpacity="0.1"
        />
        {/* Heel Gradient */}
        <path d="M400 120 C450 130, 530 140, 570 180 L570 270 L460 270 L400 120 Z" fill="url(#upperGrad)" pointerEvents="none"/>

        {/* 4. SWOOSH LOGO (Nike Style) */}
        <motion.path
          d="M220 220 
             C300 220, 400 190, 560 160 
             L565 190 
             C450 230, 320 280, 220 260 
             C190 255, 180 230, 220 220 Z"
          fill={logo}
          stroke="black" strokeWidth="1" strokeOpacity="0.1"
          filter="drop-shadow(2px 4px 6px rgba(0,0,0,0.2))" // Adds realistic depth shadow
          initial={animate ? { x: -10, opacity: 0 } : undefined}
          animate={animate ? { x: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.2 }}
        />

        {/* 5. LACES & TONGUE AREA */}
        {/* Tongue */}
        <path d="M170 115 C160 90, 180 50, 240 40 L260 50 C220 70, 200 100, 210 120 Z" fill={upper} stroke="black" strokeWidth="0.5" strokeOpacity="0.2"/>
        
        {/* Laces (Criss-cross pattern) */}
        <g stroke={laces} strokeWidth="8" strokeLinecap="round">
          <motion.line x1="180" y1="120" x2="220" y2="120" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
          <motion.line x1="185" y1="140" x2="225" y2="140" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1 }} />
          <motion.line x1="190" y1="160" x2="235" y2="160" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 }} />
          <motion.line x1="195" y1="180" x2="245" y2="180" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3 }} />
        </g>

        {/* 6. TEXT ENGRAVING (Realistic placement on Heel) */}
        {customText && (
          <g>
            {/* Small box for text */}
            {/* <rect x="480" y="220" width="80" height="25" fill="none" /> */}
            <motion.text
              x="520"
              y="240"
              fill={sole === '#ffffff' ? '#000000' : sole} // Intelligent contrast color
              fontSize="12"
              fontWeight="bold"
              fontFamily="Arial Black, sans-serif"
              textAnchor="middle"
              style={{ 
                letterSpacing: '1px',
                filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.2))' 
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {customText.toUpperCase()}
            </motion.text>
          </g>
        )}

      </svg>
    </div>
  );
};