"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { fetchWooCommerceProductDetails } from "../../../../../../utils/woocommerce.setup";
import { SingleProductDetails } from "../../../../../../utils/woocomerce.types";
import { MainLayout } from "@app/[locale]/components/templates";
import Sidebar from "@app/[locale]/components/molecules/leftSidebar/leftSidebar";
import { TransformedCategoriesType } from "../../helpers";
import { Anybody } from "next/font/google";
import Link from "next/link";
import styles from "./Product.module.css";
import classNames from "classnames";


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
      <div className="flex self-center flex-row w-[1400px]">
        <div className="w-[300px]">
          <Sidebar
            items={[categories?.[1] || []]}
            setSelectedProducts={setSelectedProducts} locale={""} />
        </div>
        <div className="flex flex-col bg-slate-000 p-1 w-full">


          <div className="flex flex-row">
            <div className={classNames("m-4", styles.imageRadius)}>
              <img
                src={details?.images[0].src}
                alt={details?.images[0].alt}
                width={300}
                height={311}
              />
            </div>
            <div className="p-4 w-auto">
              <h1 className={classNames("", styles.title)}>{details?.name}</h1>
              <br />
              <h2 className={classNames("", styles.brand)}>Бренд: {details?.brands[0]?.name}</h2>
              <br />
              <h2 className={classNames("", styles.available)}>В наявності: "Під заказ"</h2>
              <br />
              <div className="flex flex-row justify-between mt-10">
                <div className={classNames("", styles.downloadable)}>
                  <Link
                    href={details?.downloads[0]?.file || ""}
                  ><img
                    src="/download-pdf.png"
                    width={36}
                    className="float-left" >
                    </img>Завантажити документацію</Link>
                </div>
                <div
                  className={styles.yerSubmit}
                ><Link
                  href={"../../../../services"}>
                    Замовити зараз</Link></div>
              </div>
            </div>
          </div>
          <div className={styles.stroke}></div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: details?.description || "" }}
          />

        </div>
        <div className="w-[300px]">
          <Sidebar
            items={[categories?.[0] || []]}
            setSelectedProducts={setSelectedProducts} locale={""} />
        </div>
      </div>
    </MainLayout>

  );
};

export default Page;
