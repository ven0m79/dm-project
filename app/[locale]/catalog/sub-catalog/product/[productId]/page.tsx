import type { Metadata } from "next";

import ClientPage from "./client-page";

type Props = {
  params: { locale: string; productId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).productId;
  const product = await fetch(
    `https://api.dm-project.com.ua/wp-json/wc/v3/products/${id}?per_page=1&lang=${params.locale}&consumer_key=ck_8dee30956004b4c7f467a46247004a2f4cd650e5&consumer_secret=cs_1cf0a573275e5cafe5af6bddbb01f29b9592be20`,
  ).then((res) => res.json());

  return {
    title: product?.name,
    description: product?.short_description,
  };
}

export default function Page({ params }: Props) {
  return <ClientPage params={params} />;
}
