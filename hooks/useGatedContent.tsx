import { useState, useLayoutEffect } from "react";

import Construction from "~/shared/construction";

export function useGatedContent(content: any) {
  let [render, setRender] = useState(<Construction />);

  useLayoutEffect(() => {
    if (
      (typeof window !== "undefined" && !(window as any).ENV.IS_DEV) ||
      [
        "http://localhost:3000/",
        "https://worksponsor.nl/",
        "https://www.worksponsor.nl/",
      ].some((url) => url === (window as any).ENV.URL)
    ) {
      setRender(content);
    }
  }, [content]);

  return render;
}
