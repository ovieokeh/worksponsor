import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState("");

  useIsomorphicLayoutEffect(() => {
    const themeModeToggleButton = document.querySelector(".btn-toggle");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const htmlElement = document.querySelector("html");

    if (htmlElement && themeModeToggleButton) {
      let theme = localStorage.getItem("theme");
      if (!theme) {
        theme = prefersDarkScheme.matches ? "dark" : "light";
      }

      htmlElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      setCurrentTheme(theme);

      const onThemeToggle = () => {
        const currentTheme = localStorage.getItem("theme");
        const newTheme = currentTheme == "dark" ? "light" : "dark";

        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setCurrentTheme(newTheme);
      };

      themeModeToggleButton.addEventListener("click", onThemeToggle);

      return () => {
        themeModeToggleButton.removeEventListener("click", onThemeToggle);
      };
    }
  }, []);

  return currentTheme;
}
