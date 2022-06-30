import { useState } from "react";

import Construction from "~/components/construction";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useGatedContent(content: any) {
  let [render, setRender] = useState(<Construction />);

  useIsomorphicLayoutEffect(() => {
    const allowedPages = [
      "http://localhost:3000/",
      "http://localhost:3000/guide",
      "http://localhost:3000/companies",
      "https://worksponsor.nl/",
      "https://www.worksponsor.nl/",
      "https://www.worksponsor.nl/guide",
      "https://www.worksponsor.nl/guide/work-in-nl-requirements",
    ];

    const shouldRender =
      typeof window !== "undefined" &&
      allowedPages.some((pageUrl) => pageUrl === window.location.href);

    if (shouldRender) {
      setRender(content);
    }
  }, []);

  return render;
}
