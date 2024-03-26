"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fetchWooCommerceProductDetails } from "../../../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import { MainLayout } from "@app/[locale]/components/templates";
import Sidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import { TransformedCategoriesType } from "../../helpers";



type Params = {
  productId: string;
};

const Page = () => {
  const { productId }: Params = useParams<any>();
  const [details, setDetails] = useState<SingleProductDetails | null>(null);

  const getCategoryDetails = useCallback(async () => {
    try {
      const data = await fetchWooCommerceProductDetails(Number(productId));

      if (data) {
        setDetails(data);
      }
    } catch (e) {
      console.warn({ e });
    }
  }, [productId]);

  useEffect(() => {
    getCategoryDetails();
  }, [getCategoryDetails]);

  //оце тут я почав косячити

  const searchParams = useSearchParams();
  const selectedCategory = searchParams?.get("category");
  const [categories, setCategories] = useState<TransformedCategoriesType[]>([]);

  function setSelectedProducts(v: any[]): void {
    throw new Error("Function not implemented.");
  }

  // а тут закінчив

  return (
    <MainLayout>
      <div className="flex self-center flex-row bg-slate-400 w-[1400px]">
        <Sidebar
          items={[categories?.[1] || []]}
          setSelectedProducts={setSelectedProducts} locale={""} />
        <div>
          <h1 className="text-4xl text-stone-800 text-bold">{details?.name}</h1>
          <div>
            <img
              src={details?.images[0].src}
              alt={details?.images[0].alt}
              width={250}
              height={300}
            />
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: details?.description || "" }}
          />
        </div>
        <Sidebar
          items={[categories?.[0] || []]}
          setSelectedProducts={setSelectedProducts} locale={""} />
      </div>
    </MainLayout>
  );
};

export default Page;
