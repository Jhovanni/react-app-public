import { useEffect } from "react";
import { useIntersect } from "./useIntersect";

interface ScrollObject {
  /**
   * Stateful value of scrolling state to element target
   */
  scrolling: boolean;
  /**
   * Set scroll's target
   * @param el element to scroll to, or undefined to clear it
   */
  scrollTo: (el: Element | undefined) => void;
}

/**
 * Scrolls into one element at a time and notify when scrolling ends
 */
export function useScrollTo(): ScrollObject {
  const { target, intersecting, setIntersectTarget } = useIntersect(0.1);

  /**
   * Once a target is set, scroll to it
   */
  useEffect(() => {
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [target]);

  /**
   * Once target is intersecting, clear it
   */
  useEffect(() => {
    if (intersecting) {
      setIntersectTarget(undefined);
    }
  }, [intersecting, setIntersectTarget]);

  return { scrolling: target !== undefined, scrollTo: setIntersectTarget };
}
