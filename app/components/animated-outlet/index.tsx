import type { Location } from "history";
import { useLocation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedOutlet({ outlet }: any) {
  const location = useLocation();
  const prevLocation = useRef<Location | null>(null);

  useEffect(() => {
    if (prevLocation.current?.pathname === location.pathname) {
      console.log("loading");
    } else {
      console.log("done");
    }

    prevLocation.current = location;
  }, [location]);

  return (
    <AnimatePresence exitBeforeEnter initial>
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
