"use client";

import { motion, type AnimationProps } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;
interface ShinyButtonProps {
  text: string;
  onClick?: () => void,
  className?: string;
  icon?: any
}
const ShinyButton = ({
  text = "shiny-button",
  className,
  icon,
  onClick
}: ShinyButtonProps) => {
  return (
    <motion.button
      {...animationProps}
      onClick={onClick}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-[box-shadow] duration-300 ease-in-out hover:shadow ",
        className,
      )}
    >
      <span
        className={icon ? "relative flex justify-start items-center gap-2 h-full w-full text-sm uppercase tracking-wide text-white dark:font-light" : 'relative flex justify-center items-center  h-full w-full text-sm uppercase tracking-wide text-white dark:font-light'}
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent 30%),hsl(var(--primary)) 100%))",
        }}
      >
        {icon} {text}
      </span>
    </motion.button>
  );
};

export default ShinyButton;
