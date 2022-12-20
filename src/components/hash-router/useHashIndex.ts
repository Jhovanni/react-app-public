import { Page } from "./HashRouter";
import { useEffect, useState } from "react";

/**
 * Returns the stateful index of a page, whose hash field correlates with the browser's hash
 */
export default function useHashIndex(pages: Page[]): number {
  const [hashIndex, setHashIndex] = useState(getHashIndex(pages));

  /**
   * Register/remove a hashchange listener on mount/unmount
   */
  useEffect(() => {
    const handleHashchange = () => setHashIndex(getHashIndex(pages));

    window.addEventListener("hashchange", handleHashchange);
    return () => window.removeEventListener("hashchange", handleHashchange);
  }, [pages]);

  return hashIndex;
}

/**
 * Returns the index of the page whose hash = window.location.hash, 0 if no match is found
 * @param pages set of pages to search for a matching hash
 */
function getHashIndex(pages: Page[]) {
  const hash = window.location.hash;
  const hashIndex = pages.findIndex((page) => `#${page.hash}` === hash);
  return hashIndex < 0 ? 0 : hashIndex;
}
