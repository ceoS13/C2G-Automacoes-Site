import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

interface CountUpProps {
  value: string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ value, className, prefix = '', suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const motionValue = useMotionValue(0);
  
  // Extract numeric value (e.g. "R$ 1.499" -> 1499)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (isInView && isNumeric) {
      const controls = animate(motionValue, numericValue, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1], // Custom easing (cubic-bezier)
      });
      return () => controls.stop();
    }
  }, [isInView, isNumeric, numericValue, motionValue]);

  const displayValue = useTransform(motionValue, (latest) => {
    if (!isNumeric) return value;
    return `${prefix}${Math.round(latest).toLocaleString('pt-BR')}${suffix}`;
  });

  if (!isNumeric) {
    return <span className={className}>{value}</span>;
  }

  return <motion.span ref={ref} className={className}>{displayValue}</motion.span>;
};