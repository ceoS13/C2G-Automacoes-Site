import React, { useEffect, useRef, useState } from 'react';

interface HyperTextProps {
  text: string;
  className?: string;
}

export const HyperText: React.FC<HyperTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterations = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&";

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    iterations.current = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsScrambling(false);
      }

      iterations.current += 1 / 3;
    }, 30);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={`inline-block cursor-default ${className}`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};