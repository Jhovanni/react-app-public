import { useEffect, useRef, useState } from "react";
import { useViewport, Viewport } from "./useViewport";

export interface IntersectObject {
  /**
   * Current element being tracked for intersection with the viewport
   */
  target: Element | undefined;
  /**
   * Whether the current target is intersecting with the viewport
   */
  intersecting: boolean;
  /**
   * Change element to track intersection with the viewport
   * @param el new element to track or undefined to clear it
   */
  setIntersectTarget: (el: Element | undefined) => void;
}

/**
 * Tracks intersecting state between an element and the viewport
 * @param percentage percentage amount that the target needs to intersect with the viewport
 */
export const useIntersect = (percentage: number = 1): IntersectObject => {
  const [intersecting, setIntersecting] = useState(false);
  const [target, setTarget] = useState<Element>();
  const viewport = useViewport();
  const observer = useRef<IntersectionObserver>();

  /**
   * Whenever the target, viewport or intersect percentage changes,
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

  return { target, intersecting, setIntersectTarget: setTarget };
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
