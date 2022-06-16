import type { ReactNode } from "react";

import styles from "./layout.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <div className="layout__main">{children}</div>
    </div>
  );
}
