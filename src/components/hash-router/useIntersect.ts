import { useEffect, useRef, useState } from "react";
import { useViewport, Viewport } from "./useViewport";

/**
 * Tracks intersecting state between an element and the viewport
 * @param percentage percentage amount that the target needs to intersect with the viewport
 * @return object with intersecting stateful value and a function to set/clear the target to track
 */
export const useIntersect = (
  percentage: number = 1
): {
  intersecting: boolean;
  setIntersectTarget: (el: Element | undefined) => void;
} => {
  const [intersecting, setIntersecting] = useState(false);
  const [target, setTarget] = useState<Element>();
  const viewport = useViewport();
  const observer = useRef<IntersectionObserver>();

  /**
   * Whenever the target, viewport dimensions or required intersect percentage changes,
   * set an observer for the target intersection with the viewport
   */
  useEffect(() => {
    if (target) {
      const threshold = maxIntersectThreshold(target, viewport) * percentage;
      observer.current = new IntersectionObserver(
        (entries) => setIntersecting(entries[0].isIntersecting),
        { threshold: threshold }
      );
      observer.current?.observe(target);
    }

    return () => {
      // clear observer and intersecting state
      if (observer.current) {
        observer.current.disconnect();
        observer.current = undefined;
      }
      setIntersecting(false);
    };
  }, [percentage, target, viewport]);

  return { intersecting, setIntersectTarget: setTarget };
};

/**
 * Calculates the maximum intersect threshold an element can have with the viewport height.
 * For elements with height <= viewport.height, the result will always be 1, since they can fit completely in the view
 * @param element element to calculate maximum intersect threshold
 * @param viewport viewport's dimensions
 */
function maxIntersectThreshold(element: Element, viewport: Viewport): number {
  let boundingClientRect = element.getBoundingClientRect();
  const elementHeight = boundingClientRect.bottom - boundingClientRect.top;
  return elementHeight > viewport.height ? viewport.height / elementHeight : 1;
}
