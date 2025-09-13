"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  id: number | string;
  name: string;
  url: string;
}

export default function Breadcrumbs({ trail }: { trail: BreadcrumbItem[] }) {
  if (!trail || !trail.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
      <ol className="flex flex-wrap gap-2">
        {trail.map((el, idx) => (
          <li key={el.id} className="flex items-center gap-2">
            {idx > 0 && <span>/</span>}
            <Link href={el.url} className="hover:underline">
              {el.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
