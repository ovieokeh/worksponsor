import type { FunctionComponent, ReactNode } from "react";
import { cloneElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Animate: FunctionComponent<{
  animation?: "ltr" | "rtl" | "ttb" | "btt" | "fade-in";
  duration?: number;
  delay?: number;
  end?: {
    x?: number;
    y?: number;
    opacity?: number;
  };
  threshold?: number;
  className?: string;
  children: ReactNode;
}> = ({
  className = "",
  animation = "fade-in",
  children,
  duration = 0.5,
  delay = 0,
  end = { x: 0, y: 0, opacity: 1 },
  threshold = 0.3,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold });
  const { x = 0, y = 0, opacity = 1 } = end;

  useEffect(() => {
    if (inView) controls.start("show");
  }, [controls, inView]);

  const variantMapping = {
    ltr: {
      hidden: { x: -100, opacity: 0 },
      show: { x, opacity },
    },
    rtl: {
      hidden: { x: 100, opacity: 0 },
      show: { x, opacity },
    },
    ttb: {
      hidden: { y: -100, opacity: 0 },
      show: { y, opacity },
    },
    btt: {
      hidden: { y: 0, opacity: 0 },
      show: { y, opacity },
    },
    "fade-in": {
      hidden: { opacity: 0 },
      show: { opacity },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variantMapping[animation]}
      transition={{ duration, delay }}
      className={className}
    >
      {cloneElement(children as React.ReactElement<any>, {
        ref,
      })}
    </motion.div>
  );
};
export default Animate;
