import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DocsLayoutProps {
  children: ReactNode;
}

export function DocsLayout({
  children,
}: DocsLayoutProps) {
  return (
    <div className="docs-shell">
      <Sidebar />

      <div className="docs-main">
        <Topbar />

        <main className="docs-content">
          {children}
        </main>
      </div>
    </div>
  );
}