"use client";

import React, { FC, useEffect } from "react";
import classNames from "classnames";
import MobileBreadcrumbs from "@app/[locale]/catalog/sub-catalog/product/[productId]/MobileBreadcrumbs";
import { isIOS } from "../../../../../utils/constants";
import DesktopBreadcrumbs from "@app/[locale]/catalog/sub-catalog/product/[productId]/DesktopBreadcrumbs";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@app/[locale]/components/hooks/useIsMobile";
import { useBreadcrumbs } from "@app/[locale]/components/atoms/breadcrumbs/breadcrumbs";

const Breadcrumbs: FC<{
  categoryId: number;
  locale: string;
}> = ({ categoryId, locale }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { breadcrumbs, buildCategoryTrail } = useBreadcrumbs();

  useEffect(() => {
    buildCategoryTrail([{ id: categoryId } as any], locale);
  }, [buildCategoryTrail, categoryId, locale]);

  return (
    <div
      className={classNames("mt-6 left-0 w-full", {
        "ml-0": isMobile,
        "ml-4": !isMobile,
      })}
    >
      {isMobile ? (
        <MobileBreadcrumbs
          breadcrumbs={breadcrumbs}
          isIOS={isIOS}
          router={router}
          detailsName={breadcrumbs[breadcrumbs.length - 1]?.name}
        />
      ) : (
        <>
          <h1 className="text-[22px] font-bold text-[#002766] mb-2 ml-2">
            {breadcrumbs[breadcrumbs.length - 1]?.name}
          </h1>
          <DesktopBreadcrumbs
            breadcrumbs={breadcrumbs}
            isIOS={isIOS}
            router={router}
          />
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
