import { motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  className?: string;
};

export default function Card({ title, children, className = "" }: Props) {
  return (
    <motion.div
      className={`flex flex-col min-h-0 h-full p-6 bg-primary text-primary-foreground squircle ${className}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: "var(--color-secondary)",
        color: "var(--color-secondary-foreground)",
        border: "2px solid var(--color-highlight)", // tailwind css zinc 950
        cursor: "pointer",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <h2 className="text-center font-semibold text-3xl mb-6">{title}</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="min-h-0 flex-1 overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
