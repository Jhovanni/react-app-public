import React from "react";
import HashRouter, { Page } from "./HashRouter";
import Navbar from "./Navbar";

const pages: Page[] = [
  {
    label: "Intro",
    hash: "intro",
    content: (
      <div className="h-screen bg-pink-700 text-white text-4xl p-20">
        Same height as the screen
      </div>
    ),
  },
  {
    label: "Larger",
    hash: "larger",
    content: (
      <div className="h-[140vh] bg-violet-700 text-white text-4xl p-20">
        Larger than the screen's height
      </div>
    ),
  },
  {
    label: "Smaller",
    hash: "smaller",
    content: (
      <div className="min-h-[55vh] bg-cyan-700 text-white text-4xl p-20">
        Smaller than the screen's height
      </div>
    ),
  },
];

/**
 * Simple hash router demo with basic pages
 */
export default function HashRouterDemo() {
  return (
    <>
      <Navbar pages={pages} className="text-white" />
      <HashRouter pages={pages} />
    </>
  );
}
