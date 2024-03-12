import { Attributes } from "react";

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
  _links: any;
};

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

export type SingleProductDetails = {
  id: number;
  name: string;
  slug:	string;
  permalink:	string;
  type:	string;
  status:	string;
  average_rating: string;
  images: ImageType[];
  featured:	boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  tags: TagType[];
  sku: string;
  price: string;
  downloadable: boolean;
  downloads: DownloadsType[];
  dimensions:	DimentionType[];
  parent_id: number;
  categories:	CategoriesType[];
  attributes: AttributesType[];
  lang: string; 
};
export type DownloadsType = {
  id: string;
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
