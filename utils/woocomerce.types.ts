export type WoocomerceCategoryType = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: null | string;
  menu_order: number;
  count: number;
  _links?: {
    up?: { href: string }[];
    self?: { href: string }[];
    collection?: { href: string }[];
  };
  translations?: {
    ua?: number;
    en?: number;
  };
  yoast_head_json: YoastHeadJson;
  schema_json: string;
  custom_seo_description: string;
};

export type YoastHeadJson = {
  title: string;
  description: string;
}

export type ImageType = {
  alt: string;
  id: number;
  name: string;
  src: string;
};

export type TagType = {
  id: number;
  name: string;
  slug: string;
};

export type MetaDataType = {
  id: number;
  name: string;
  value: string;
};

export type SingleProductDetails = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  average_rating: string;
  images: ImageType[];
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  tags: TagType[];
  sku: string;
  price: string;
  regular_price: string;
  downloadable: boolean;
  downloads: DownloadsType[];
  dimensions: DimentionType[];
  parent_id: number;
  categories: CategoriesType[];
  attributes: AttributesType[];
  lang: string;
  stock_status: string;
  brands: BrandsType[];
  translations: Record<string, number>[];
  cross_sell_ids: CrossSellIds[];
  parentCategory: string;
  meta_data: MetaDataType[];
};
export type CrossSellIds = {
  id: number;
};

export type BrandsType = {
  id: number;
  name: string;
  slug: string;
};
export type DownloadsType = {
  id: number;
  name: string;
  file: string;
};
export type DimentionType = {
  length: string;
  width: string;
  height: string;
};
export type CategoriesType = {
  id: number;
  name: string;
  slug: string;
};
export type AttributesType = {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
};
export type SingleProductTitles = {
  id: number;
  name: string;
  search: string;
};
