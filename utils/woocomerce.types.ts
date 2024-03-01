export type WoocomerceCategoryType = {
  count: number;
  description: string;
  display: string;
  id: number;
  image: null | string;
  menu_order: number;
  name: string;
  parent: number;
  slug: string;
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
  average_rating: string;
  description: string;
  images: ImageType[];
  name: string;
  short_description: string;
  tags: TagType[];
  id: number;
};
