import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <div className="layout__main">{children}</div>
    </div>
  );
}
