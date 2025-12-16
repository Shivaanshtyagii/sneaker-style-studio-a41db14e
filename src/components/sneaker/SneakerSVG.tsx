import { motion } from 'framer-motion';
import { SneakerConfig } from '@/stores/customizerStore';

interface SneakerSVGProps {
  config: SneakerConfig;
  className?: string;
  animate?: boolean;
}

export const SneakerSVG = ({ config, className = '', animate = true }: SneakerSVGProps) => {
  const { sole, upper, laces, logo, material } = config;
  const isShiny = material === 'shiny';

  return (
    <div className={`relative ${isShiny ? 'sneaker-material-shiny' : ''} ${className}`}>
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Sole */}
        <motion.path
          d="M40 160 C40 160, 60 175, 200 175 C340 175, 360 160, 360 160 L360 150 C360 150, 340 165, 200 165 C60 165, 40 150, 40 150 Z"
          fill={sole}
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animate ? { duration: 0.8 } : undefined}
        />
        
        {/* Upper */}
        <motion.path
          d="M50 150 C50 120, 70 80, 120 60 C170 40, 220 45, 280 55 C340 65, 360 90, 360 120 L360 150 C360 150, 340 160, 200 160 C60 160, 50 150, 50 150 Z"
          fill={upper}
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animate ? { duration: 0.8, delay: 0.1 } : undefined}
        />

        {/* Logo/Swoosh */}
        <motion.path
          d="M100 130 C130 115, 200 95, 280 85 C260 95, 200 110, 130 125 C115 128, 105 130, 100 130 Z"
          fill={logo}
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animate ? { duration: 0.8, delay: 0.2 } : undefined}
        />

        {/* Laces */}
        <g>
          {[
            "M85 98 L125 78",
            "M90 92 L128 73",
            "M95 86 L130 68",
            "M100 80 L132 63",
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={laces}
              strokeWidth="3"
              strokeLinecap="round"
              initial={animate ? { pathLength: 0 } : undefined}
              animate={animate ? { pathLength: 1 } : undefined}
              transition={animate ? { duration: 0.4, delay: 0.3 + i * 0.05 } : undefined}
            />
          ))}
        </g>

        {/* Eyelets */}
        <g fill={sole}>
          <circle cx="85" cy="98" r="3" />
          <circle cx="125" cy="78" r="3" />
          <circle cx="90" cy="92" r="3" />
          <circle cx="128" cy="73" r="3" />
        </g>

        {/* Tongue */}
        <motion.path
          d="M75 100 C70 85, 80 55, 115 45 L125 50 C95 60, 85 85, 88 98 Z"
          fill={upper}
          opacity="0.9"
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 0.9 } : undefined}
          transition={animate ? { duration: 0.5, delay: 0.4 } : undefined}
        />

        {/* Heel tab */}
        <motion.path
          d="M50 140 C50 130, 52 120, 55 115 L60 118 C58 123, 56 130, 56 138 Z"
          fill={logo}
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={animate ? { duration: 0.3, delay: 0.5 } : undefined}
        />

        {/* Shiny overlay */}
        {isShiny && (
          <>
            <defs>
              <linearGradient id="shinyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M50 150 C50 120, 70 80, 120 60 C170 40, 220 45, 280 55 C340 65, 360 90, 360 120 L360 150 C360 150, 340 160, 200 160 C60 160, 50 150, 50 150 Z"
              fill="url(#shinyGradient)"
            />
          </>
        )}
      </svg>
    </div>
  );
};
