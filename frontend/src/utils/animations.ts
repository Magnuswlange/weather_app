import type { Variants } from "motion/react";

export const parentVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, //   staggerChildren is the delay per child.
      delayChildren: 0.3, // delayChildren is the delay before animating children. if cards grow/shrink with 0.2s transition, +0.1, thus 0.3s feels snappy but fluent.
    },
  },
};

export const childVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.25,
    },
  },
};
