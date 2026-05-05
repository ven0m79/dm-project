import React from "react";
import classNames from "classnames";
import Skeleton from "../../components/atoms/loader/Skeleton";
import styles from "./Sub-catalog.module.css";

export default function CatalogSkeleton() {
  return (
    <div className="flex flex-wrap justify-around self-center mt-4 mb-4 items-center w-full">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className={classNames(
            "mb-5 flex flex-col justify-center items-center gap-1",
            styles.headSubCatalogBlock,
          )}
          style={{ minWidth: 220, maxWidth: 260 }}
        >
          <Skeleton height={32} width={120} className="mb-2 mt-4" />
          <Skeleton height={200} width={200} className="mb-2" />
          <Skeleton height={24} width={180} className="mb-2" />
          <Skeleton height={24} width={120} className="mb-2" />
        </div>
      ))}
    </div>
  );
}
