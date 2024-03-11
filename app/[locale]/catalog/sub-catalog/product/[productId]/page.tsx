"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWooCommerceProductDetails } from "../../../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import { MainLayout } from "@app/[locale]/components/templates";
import Leftsidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";

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

  return (
    <MainLayout>
      <Leftsidebar params={{
        locale: ""
      }} />
    <div>
      <h1 className="text-4xl text-stone-800">{details?.name}</h1>
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
    <Leftsidebar params={{
        locale: ""
      }} />
    </MainLayout>
  );
};

export default Page;
