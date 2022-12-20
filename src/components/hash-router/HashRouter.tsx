import React from "react";

/**
 * A page element to displayed via {@link HashRouter}
 */
export interface Page {
  content: React.ReactNode;
}

type Props = {
  pages: Page[];
};

/**
 * Render a single page router with snap to section functionality
 */
export default function HashRouter({ pages }: Props) {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory">
      {pages.map((page, index) => (
        <section key={index} className="snap-start">
          {page.content}
        </section>
      ))}
    </main>
  );
}
