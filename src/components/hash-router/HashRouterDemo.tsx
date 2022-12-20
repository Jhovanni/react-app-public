import React from "react";
import HashRouter, { Page } from "./HashRouter";

const pages: Page[] = [
  {
    hash: "intro",
    content: (
      <div className="h-screen bg-pink-700 text-white text-4xl p-10">
        Same height as the screen
      </div>
    ),
  },
  {
    hash: "larger",
    content: (
      <div className="h-[140vh] bg-violet-700 text-white text-4xl p-10">
        Larger than the screen's height
      </div>
    ),
  },
  {
    hash: "smaller",
    content: (
      <div className="min-h-[55vh] bg-cyan-700 text-white text-4xl p-10">
        Smaller than the screen's height
      </div>
    ),
  },
];

/**
 * Simple hash router demo with basic pages
 */
export default function HashRouterDemo() {
  return <HashRouter pages={pages} />;
}
