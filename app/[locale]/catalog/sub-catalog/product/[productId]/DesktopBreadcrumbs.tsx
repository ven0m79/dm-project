"use client";

import Link from "next/link";
import classNames from "classnames";
import styles from "./Product.module.css";

interface Breadcrumb {
  id: string | number;
  name: string;
  url: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
  isIOS: boolean;
  router: any;
}

export default function DesktopBreadcrumbs({ breadcrumbs, isIOS, router }: Props) {
  return (
    <nav aria-label="Breadcrumb" className={classNames("flex", styles.breadcrumbs)}>
      <ol className="flex flex-wrap gap-1">
        {breadcrumbs.map((el, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={el.id} className="flex items-center gap-1">
              {isLast ? (
                <span>{el.name}</span>
              ) : isIOS ? (
                <span
                  onClick={() => router.push(el.url)}
                  className="hover:underline cursor-pointer text-blue-600 active:text-blue-800"
                >
                  {el.name}
                </span>
              ) : (
                <Link href={el.url} className="hover:underline">
                  {el.name}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && "/"}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
