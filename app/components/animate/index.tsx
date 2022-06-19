import type { FunctionComponent, ReactNode } from "react";
import { cloneElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Animate: FunctionComponent<{
  animation?: "ltr" | "rtl" | "ttb" | "btt" | "fade-in";
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  children: ReactNode;
}> = ({
  className = "",
  animation = "fade-in",
  children,
  duration = 0.5,
  delay = 0,
  threshold = 0.3,
}) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start("show");
  }, [controls, inView]);

  const variantMapping = {
    ltr: {
      hidden: { x: -100, opacity: 0 },
      show: { x: 0, opacity: 1 },
    },
    rtl: {
      hidden: { x: 100, opacity: 0 },
      show: { x: 0, opacity: 1 },
    },
    ttb: {
      hidden: { y: -100, opacity: 0 },
      show: { y: 0, opacity: 1 },
    },
    btt: {
      hidden: { y: 100, opacity: 0 },
      show: { y: 0, opacity: 1 },
    },
    "fade-in": {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
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
