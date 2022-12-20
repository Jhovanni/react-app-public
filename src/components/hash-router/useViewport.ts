import { useEffect, useState } from "react";

export interface Viewport {
  width: number;
  height: number;
}

const getViewport = (): Viewport => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/**
 * Returns viewport stateful value
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = useState(getViewport);

  /**
   * Listen to window's resize event, to set viewport value
   */
  useEffect(() => {
    const handleResize = () => setViewport(getViewport());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return viewport;
}
