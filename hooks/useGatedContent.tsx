import { useState } from "react";

import Construction from "~/components/construction";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useGatedContent(content: any) {
  let [render, setRender] = useState(<Construction />);

  useIsomorphicLayoutEffect(() => {
    if (
      (typeof window !== "undefined" && !(window as any).ENV.IS_DEV) ||
      [
        "http://localhost:3000/",
        "http://localhost:3000/companies",
        "https://worksponsor.nl/",
        "https://www.worksponsor.nl/",
      ].some((url) => url === (window as any).ENV.URL)
    ) {
      setRender(content);
    }
  }, []);

  return render;
}
