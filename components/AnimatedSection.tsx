import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  // controls animation direction: up, down, left, right, or scale
  direction?: "up" | "down" | "left" | "right" | "scale";
}

// animation variants based on direction
const getVariants = (direction: string): Variants => {
  const distance = 30;

  const variants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -distance },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -distance },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: distance },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return variants[direction] || variants.up;
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  id,
  delay = 0,
  direction = "up",
}) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={getVariants(direction)}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // custom easing for smooth feel
      }}
    >
      {children}
    </motion.section>
  );
};

// stagger container for animating children sequentially
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  staggerDelay = 0.1,
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// stagger item to be used inside StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
