"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchWooCommerceProductDetails } from "../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../utils/woocomerce.types";

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
    <div>
      <h1 className="text-4xl">{details?.name}</h1>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: details?.description || "" }}
      />
    </div>
  );
};

export default Page;
