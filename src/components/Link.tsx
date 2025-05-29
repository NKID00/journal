import React from "react";
import { ReactNode } from "react";

export function Link({
  href,
  title,
  description,
}: {
  href?: string;
  title?: string;
  description?: ReactNode;
}) {
  return (
    <div className="relative my-6">
      <div className="px-8 flex flex-col">
        <a
          href={href}
          className="before:absolute before:content-[] before:top-0 before:bottom-0 before:left-0 before:right-0"
        >
          <span className="text-2xl font-bold font-serif">{title}</span>
        </a>
        <span className="font-serif">{description}</span>
      </div>
    </div>
  );
}
