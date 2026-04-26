import React from "react";
import Skeleton from "../../../../components/atoms/loader/Skeleton";
import styles from "./Product.module.css";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col w-full mb-8 px-2">
      {/* Two-column: gallery + info */}
      <div className="flex flex-wrap w-full gap-4">
        {/* Gallery column */}
        <div className="flex flex-col w-full sm:w-1/2 items-center gap-4">
          <Skeleton className="w-full aspect-square sm:aspect-4/3 rounded-lg" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} width={56} height={56} className="rounded-md" />
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className="flex flex-col w-full sm:w-1/2 gap-4 pt-4 sm:pt-10 px-4">
          <Skeleton height={28} className="w-3/4 rounded" />
          <Skeleton height={18} className="w-1/3 rounded" />
          <Skeleton height={24} className="w-1/4 rounded mt-4" />
          <div className="flex flex-col gap-3 mt-6">
            <Skeleton height={36} className="w-40 rounded-lg" />
            <Skeleton height={36} className="w-40 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.stroke} />

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} width={120} height={36} className="rounded-t-lg" />
        ))}
      </div>
      <Skeleton height={120} className="w-full rounded-lg" />

      {/* Related products */}
      <Skeleton height={24} className="w-40 rounded mt-8 mb-4" />
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="w-full aspect-square rounded-xl" />
            <Skeleton height={14} className="w-3/4 mx-auto rounded" />
            <Skeleton height={14} className="w-1/2 mx-auto rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
