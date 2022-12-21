import { useEffect } from "react";
import { useIntersect } from "./useIntersect";

export function useScrollTo(): {
  scrolling: boolean;
  scrollTo: (el: Element | undefined) => void;
} {
  const { target, intersecting, setIntersectTarget } = useIntersect(0.1);

  /**
   * Once target is intersecting, clear it
   */
  useEffect(() => {
    if (intersecting) {
      setIntersectTarget(undefined);
    }
  }, [intersecting]);

  /**
   * Sets scroll target
   * @param el element to scroll to, clears the target if provided value is null
   */
  function scrollTo(el: Element | undefined) {
    setIntersectTarget(el);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return { scrolling: target !== undefined, scrollTo: scrollTo };
}
