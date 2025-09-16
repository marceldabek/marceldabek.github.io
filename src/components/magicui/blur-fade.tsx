"use client";

import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

// Derive the margin type from the useInView hook to stay compatible with different framer-motion versions
type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>;
type DerivedMarginType = UseInViewOptions extends { margin?: infer M } ? M : string;

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  // Use derived margin type (previously string) to match framer-motion's internal typing
  inViewMargin?: DerivedMarginType;
  blur?: string;
}
const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) => {
  const ref = useRef(null);
  // Coerce provided margin to DerivedMarginType | undefined (if undefined, let framer-motion default)
  const marginOpt = (inViewMargin ?? undefined) as DerivedMarginType | undefined;
  const inViewResult = useInView(ref, { once: true, margin: marginOpt });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BlurFade;
