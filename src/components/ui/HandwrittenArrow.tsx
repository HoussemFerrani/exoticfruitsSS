"use client";

import { motion } from "framer-motion";

interface HandwrittenArrowProps {
  className?: string;
  color?: string;
  size?: number;
  delay?: number;
  direction?: "right" | "left" | "down" | "up";
}

export default function HandwrittenArrow({
  className = "",
  color = "#FAB12F",
  size = 100,
  delay = 0,
  direction = "right"
}: HandwrittenArrowProps) {

  const getArrowPaths = () => {
    switch (direction) {
      case "right":
        return {
          shaft: "M10,50 Q30,40 50,50 Q70,60 85,50",
          arrowhead: "M65,35 L85,50 L65,65 L75,50 Z"
        };
      case "left":
        return {
          shaft: "M90,50 Q70,40 50,50 Q30,60 15,50",
          arrowhead: "M35,35 L15,50 L35,65 L25,50 Z"
        };
      case "down":
        return {
          shaft: "M50,10 Q40,30 50,50 Q60,70 50,85",
          arrowhead: "M35,65 L50,85 L65,65 L50,75 Z"
        };
      case "up":
        return {
          shaft: "M50,90 Q40,70 50,50 Q60,30 50,15",
          arrowhead: "M35,35 L50,15 L65,35 L50,25 Z"
        };
      default:
        return {
          shaft: "M10,50 Q30,40 50,50 Q70,60 85,50",
          arrowhead: "M65,35 L85,50 L65,65 L75,50 Z"
        };
    }
  };

  const arrows = getArrowPaths();

  const shaftVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.8,
          ease: "easeInOut",
          delay: delay
        },
        opacity: {
          duration: 0.2,
          delay: delay
        }
      }
    }
  };

  const arrowheadVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          duration: 0.4,
          ease: "easeInOut",
          delay: delay + 0.6
        },
        opacity: {
          duration: 0.2,
          delay: delay + 0.6
        }
      }
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`hand-drawn-arrow ${className}`}
      initial={{ scale: 0, rotate: -8 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.4,
        delay: delay,
        type: "spring",
        stiffness: 150
      }}
    >
      {/* Arrow shaft - draws first */}
      <motion.path
        d={arrows.shaft}
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.25))"
        }}
        variants={shaftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      />

      {/* Arrow head - draws second */}
      <motion.path
        d={arrows.arrowhead}
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.8"
        style={{
          filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.25))"
        }}
        variants={arrowheadVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      />

      {/* Handwritten texture overlay */}
      <motion.path
        d={arrows.shaft}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
        transform="translate(1,1)"
        variants={shaftVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: delay + 0.3 }}
      />

      <motion.path
        d={arrows.arrowhead}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
        transform="translate(1,1)"
        variants={arrowheadVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        transition={{ delay: delay + 0.9 }}
      />
    </motion.svg>
  );
}