import React, { useEffect, useRef } from "react";
import useHashIndex from "./useHashIndex";
import Section from "./Section";
import { useScrollTo } from "./useScrollTo";
import Navbar from "./Navbar";

/**
 * A page element to displayed via {@link HashRouter}
 */
export interface Page {
  /**
   * Label to use for links
   */
  label: string;
  /**
   * The page's anchor for hash navigation, without '#' character
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
  const intersectingIndex = useRef(0);
  const mainRef = useRef<HTMLElement>(null);
  const { scrolling, scrollTo } = useScrollTo();

  /**
   * Scroll to section hashIndex section if it is not visible already
   */
  useEffect(() => {
    if (intersectingIndex.current !== hashIndex) {
      scrollTo(mainRef.current?.children[hashIndex]);
    }
  }, [hashIndex]);

  function handleIntersect(index: number) {
    intersectingIndex.current = index;
    if (index !== hashIndex && !scrolling) {
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
