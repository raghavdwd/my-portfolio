import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextRollerProps {
  words: string[];
  className?: string;
}

export const TextRoller: React.FC<TextRollerProps> = ({
  words,
  className = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div
      className={`relative h-[1.5em] overflow-hidden inline-flex items-center align-bottom ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="absolute top-0 left-0 h-[1.5em] flex items-center whitespace-nowrap"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
      {/* invisible placeholder to maintain width based on the longest word */}
      <span className="opacity-0 pointer-events-none h-[1.5em] flex items-center">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </div>
  );
};
