import { buildBreadcrumbTrailFromDb } from "../../../../../lib/db/queries";
import DesktopBreadcrumbs from "../../../catalog/sub-catalog/product/[productId]/DesktopBreadcrumbs";
import MobileBreadcrumbs from "../../../catalog/sub-catalog/product/[productId]/MobileBreadcrumbs";

interface Props {
  categorySlug: string;
  locale: string;
}

export default async function Breadcrumbs({ categorySlug, locale }: Props) {
  const breadcrumbs = await buildBreadcrumbTrailFromDb(locale, categorySlug);

  return (
    <div className="mt-6 left-0 w-full">
      <div className="hidden sm:block ml-4">
        <DesktopBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="sm:hidden ml-2">
        <MobileBreadcrumbs
          breadcrumbs={breadcrumbs}
          detailsName={breadcrumbs.at(-1)?.name}
        />
      </div>
    </div>
  );
}
