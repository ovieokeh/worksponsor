import type { FunctionComponent, ReactNode } from "react";
import { cloneElement, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Animate: FunctionComponent<{
  animation: "ltr" | "rtl" | "ttb" | "btt";
  duration?: number;
  delay?: number;
  children: ReactNode;
}> = ({ animation, children, duration = 0.5, delay = 0 }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

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
  };

  console.log({ ref, inView });

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variantMapping[animation]}
      transition={{ duration, delay }}
    >
      {cloneElement(children as React.ReactElement<any>, {
        ref,
      })}
    </motion.div>
  );
};
export default Animate;
