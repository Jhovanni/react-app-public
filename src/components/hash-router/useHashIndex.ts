import { Page } from "./HashRouter";
import { useCallback, useEffect, useState } from "react";

/**
 * Returns the stateful index of a page, whose hash field correlates with the browser's hash
 */
export default function useHashIndex(pages: Page[]): number {
  /**
   * Returns the index of the page whose hash = window.location.hash,
   * 0 if no match is found
   */
  const getHashIndex = useCallback((): number => {
    const hash = window.location.hash;
    let hashIndex = pages.findIndex((page) => `#${page.hash}` === hash);
    if (hashIndex < 0) {
      hashIndex = 0;
    }
    return hashIndex;
  }, [pages]);

  const [hashIndex, setHashIndex] = useState(getHashIndex());

  /**
   * Register/remove a hashchange listener on mount/unmount
   */
  useEffect(() => {
    const handleHashchange = () => setHashIndex(getHashIndex());

    window.addEventListener("hashchange", handleHashchange);
    return () => window.removeEventListener("hashchange", handleHashchange);
  }, [getHashIndex]);

  return hashIndex;
}
