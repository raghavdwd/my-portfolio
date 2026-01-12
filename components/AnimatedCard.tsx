import React from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  // optional delay for staggered animations
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};

// skill badge with pop animation on hover
interface AnimatedBadgeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};

// floating animation for decorative elements
export const FloatingElement: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};
