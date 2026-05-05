import {
  pgTable,
  integer,
  text,
  boolean,
  jsonb,
  timestamp,
  serial,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

export const wc_categories = pgTable(
  "wc_categories",
  {
    id: integer("id").notNull(),
    locale: text("locale").notNull(),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    parent_id: integer("parent_id").notNull().default(0),
    description: text("description"),
    image_url: text("image_url"),
    image_alt: text("image_alt"),
    count: integer("count").default(0),
    menu_order: integer("menu_order").default(0),
    yoast_head_json: jsonb("yoast_head_json"),
    schema_json: jsonb("schema_json"),
    synced_at: timestamp("synced_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.locale] }),
    index("wc_categories_locale_slug_idx").on(table.locale, table.slug),
    index("wc_categories_locale_parent_idx").on(table.locale, table.parent_id),
  ],
);

export const wc_products = pgTable(
  "wc_products",
  {
    id: integer("id").notNull(),
    locale: text("locale").notNull(),
    slug: text("slug"),
    name: text("name").notNull(),
    short_description: text("short_description"),
    description: text("description"),
    price: text("price"),
    regular_price: text("regular_price"),
    sale_price: text("sale_price"),
    stock_status: text("stock_status"),
    sku: text("sku"),
    featured: boolean("featured").default(false),
    menu_order: integer("menu_order").default(0),
    attributes: jsonb("attributes"),
    tags: jsonb("tags"),
    brands: jsonb("brands"),
    meta_data: jsonb("meta_data"),
    yoast_head_json: jsonb("yoast_head_json"),
    translation_ua_id: integer("translation_ua_id"),
    translation_en_id: integer("translation_en_id"),
    variations: jsonb("variations"),
    cross_sell_ids: jsonb("cross_sell_ids"),
    related_ids: jsonb("related_ids"),
    downloads: jsonb("downloads"),
    synced_at: timestamp("synced_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.locale] }),
    index("wc_products_locale_slug_idx").on(table.locale, table.slug),
  ],
);

export const wc_product_images = pgTable(
  "wc_product_images",
  {
    product_id: integer("product_id").notNull(),
    locale: text("locale").notNull(),
    position: integer("position").notNull(),
    src: text("src").notNull(),
    alt: text("alt"),
  },
  (table) => [
    primaryKey({ columns: [table.product_id, table.locale, table.position] }),
  ],
);

export const wc_product_categories = pgTable(
  "wc_product_categories",
  {
    product_id: integer("product_id").notNull(),
    locale: text("locale").notNull(),
    category_id: integer("category_id").notNull(),
    category_name: text("category_name"),
    category_slug: text("category_slug"),
  },
  (table) => [
    primaryKey({ columns: [table.product_id, table.locale, table.category_id] }),
    index("wc_product_categories_locale_cat_idx").on(table.locale, table.category_id),
  ],
);

export const wc_product_relations = pgTable(
  "wc_product_relations",
  {
    product_id: integer("product_id").notNull(),
    locale: text("locale").notNull(),
    related_id: integer("related_id").notNull(),
    kind: text("kind").notNull(), // 'cross_sell' | 'related' | 'upsell'
  },
  (table) => [
    primaryKey({ columns: [table.product_id, table.locale, table.related_id, table.kind] }),
  ],
);

export const wc_sync_runs = pgTable("wc_sync_runs", {
  id: serial("id").primaryKey(),
  started_at: timestamp("started_at", { withTimezone: true }).defaultNow(),
  finished_at: timestamp("finished_at", { withTimezone: true }),
  status: text("status"), // 'running' | 'success' | 'error'
  categories_count: integer("categories_count"),
  products_count: integer("products_count"),
  error: text("error"),
});
