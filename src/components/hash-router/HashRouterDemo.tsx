import React from "react";
import HashRouter, { Page } from "./HashRouter";

const pages: Page[] = [
  {
    content: (
      <div className="h-screen bg-pink-700 text-white text-4xl p-10">
        Same height as the screen
      </div>
    ),
  },
  {
    content: (
      <div className="h-[140vh] bg-violet-700 text-white text-4xl p-10">
        Larger than the screen's height
      </div>
    ),
  },
  {
    content: (
      <div className="min-h-[55vh] bg-cyan-700 text-white text-4xl p-10">
        Smaller than the screen's height
      </div>
    ),
  },
];

export default function HashRouterDemo() {
  return <HashRouter pages={pages} />;
}
