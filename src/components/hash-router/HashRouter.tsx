import React from "react";

export interface Page {
  content: React.ReactNode;
}

type Props = {
  pages: Page[];
};

export default function HashRouter({ pages }: Props) {
  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory">
      {pages.map((page, index) => (
        <section key={index} className="snap-start">
          {page.content}
        </section>
      ))}
    </main>
  );
}
