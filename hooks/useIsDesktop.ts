import { useEffect, useState } from "react";

import debounce from "../utils/debounce";

const DESKTOP_BREAK_POINT = "(min-width: 767px)";

/**
 * This hook determines whether the desktop view is to be rendered or not.
 * @function useIsDesktop
 *
 * It uses onWindowResize event to evaluate a boolean condition whether
 * the media query for desktop is satisfied. This boolean condition is updated
 * in state variable isDesktop and returned.
 *
 * The media query for desktop is managed in DESKTOP_BREAK_POINT constant.
 *
 * This hook also uses debounce.js to handle onWindowResize event trigger rate.
 *
 * @return {boolean}
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia(DESKTOP_BREAK_POINT).matches);

    const onWindowResize = debounce(
      () => setIsDesktop(window.matchMedia(DESKTOP_BREAK_POINT).matches),
      300
    );
    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  return isDesktop;
}
