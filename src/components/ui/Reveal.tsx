'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Scroll reveal: fade + directional slide with
 * Material easing. Single responsibility — wrap any element to animate
 * it into view once it enters the viewport.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 32,
  className,
  once = true,
}: RevealProps) {
  const offset = offsetFor(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1], // Material standard curve
      }}
    >
      {children}
    </motion.div>
  );
}
