import React, { useEffect, useRef } from "react";
import useHashIndex from "./useHashIndex";
import Section from "./Section";

/**
 * A page element to displayed via {@link HashRouter}
 */
export interface Page {
  /**
   * page's anchor for hash navigation, without '#' character
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

  function handleIntersect(index: number) {
    if (index !== hashIndex) {
      window.location.hash = pages[index].hash;
    }
  }

  return (
    <main
      ref={mainRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory"
    >
      {pages.map((page, index) => (
        <Section
          key={index}
          onIntersect={() => handleIntersect(index)}
          page={page}
          className="snap-start"
        />
      ))}
    </main>
  );
}
