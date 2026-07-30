'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Full display value e.g. "50+", "10+", "20" — numeric part is animated, rest preserved */
  value: string;
  duration?: number;
  className?: string;
}

/** Splits "50+" into { number: 50, prefix: '', suffix: '+' } */
function parseValue(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { prefix: '', number: 0, suffix: value, decimals: 0 };
  const numStr = match[2];
  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
  };
}

/**
 * Animated number counter that triggers once it scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve for a smooth,
 * Smooth count-up animation.
 */
export default function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const { prefix, number, suffix, decimals } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // easeOutExpo for a snappy settle
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setDisplay(number * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [number, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
