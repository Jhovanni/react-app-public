import React, { useEffect, useRef } from "react";
import { Page } from "./HashRouter";
import { useIntersect } from "./useIntersect";

type Props = {
  className?: string;
  onIntersect: () => void;
  page: Page;
};

/**
 * Single {@link Page } section UI
 * @param className optional class(es) to apply to the section
 * @param onIntersect callback invoked when the section intersects with the viewport
 * @param page element to display inside the section
 */
export default function Section({ className = "", onIntersect, page }: Props) {
  const sectionRef = useRef(null);
  const { intersecting, setIntersectTarget } = useIntersect(0.9);

  /**
   * Set section as intersecting target
   */
  useEffect(() => {
    if (sectionRef.current) {
      setIntersectTarget(sectionRef.current);
    }
  }, [setIntersectTarget]);

  /**
   * When section is intersecting, notify the parent
   */
  useEffect(() => {
    if (intersecting) {
      onIntersect();
    }
  }, [intersecting, setIntersectTarget]);

  return (
    <section ref={sectionRef} className={className}>
      {page.content}
    </section>
  );
}
