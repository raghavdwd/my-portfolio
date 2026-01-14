import React, { useEffect, useState } from "react";

interface TextRollerProps {
  words: string[];
  className?: string;
}

export const TextRoller: React.FC<TextRollerProps> = ({
  words,
  className = "",
}) => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 200);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className={`inline-block transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {words[index]}
    </span>
  );
};
