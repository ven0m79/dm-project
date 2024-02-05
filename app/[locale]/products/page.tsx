import React from "react";

import { MainLayout } from "@app/[locale]/components/templates";
import { unstable_setRequestLocale } from "next-intl/server";

const ProductsPage = ({params: {locale}}: {params: {locale: string}}) => {
  unstable_setRequestLocale(locale);
  return (
    <MainLayout>
      <div className="flex flex-1 justify-center items-center">
        <h1 className="text-6xl text-gray-900">Hello from products page</h1>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
