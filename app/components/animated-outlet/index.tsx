import { useLocation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnimatedOutlet({ outlet }: any) {
  const location = useLocation();

  return (
    <AnimatePresence initial>
      <motion.main
        key={location.key}
        initial={{ x: "15%", opacity: 0 }}
        animate={{ x: "0", opacity: 1 }}
        exit={{ x: "-30%", opacity: 0 }}
      >
        {outlet}
      </motion.main>
    </AnimatePresence>
  );
}
