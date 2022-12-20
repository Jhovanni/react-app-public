import React, { useEffect, useRef } from "react";
import useHashIndex from "./useHashIndex";

/**
 * A page element to displayed via {@link HashRouter}
 */
export interface Page {
  /**
   * string to link the page to the window's hash, without '#' character
   */
  hash: string;
  content: React.ReactNode;
}

type Props = {
  pages: Page[];
};

/**
 * Render a single page router with snap to section functionality
 */
export default function HashRouter({ pages }: Props) {
  const hashIndex = useHashIndex(pages);
  const mainRef = useRef<HTMLElement>(null);

  /**
   * Scroll to section whose index = hashIndex when it changes
   */
  useEffect(
    () =>
      mainRef.current?.children[hashIndex].scrollIntoView({
        behavior: "smooth",
      }),
    [hashIndex]
  );

  return (
    <main
      ref={mainRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
    >
      {pages.map((page, index) => (
        <section key={index} className="snap-start">
          {page.content}
        </section>
      ))}
    </main>
  );
}
