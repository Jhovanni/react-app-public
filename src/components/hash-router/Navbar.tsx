import React from "react";
import { Page } from "./HashRouter";
import useHashIndex from "./useHashIndex";

type Props = {
  className?: string;
  pages: Page[];
};
export default function Navbar({ className, pages }: Props) {
  const hashIndex = useHashIndex(pages);
  return (
    <nav className={`w-full h-14 fixed top-0 left-0 z-10 ${className}`}>
      <div className="container mx-auto h-full flex items-center px-2">
        <div>HashRouter</div>
        <div className="flex-1"></div>
        <ul className="flex gap-4">
          {pages.map((page, index) => (
            <a
              key={index}
              href={`#${page.hash}`}
              className={`${
                index === hashIndex ? `border-b-2` : ""
              } ${className}`}
            >
              {page.label}
            </a>
          ))}
        </ul>
      </div>
    </nav>
  );
}
