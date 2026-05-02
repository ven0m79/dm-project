CREATE TABLE "wc_categories" (
	"id" integer NOT NULL,
	"locale" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"parent_id" integer DEFAULT 0 NOT NULL,
	"description" text,
	"image_url" text,
	"image_alt" text,
	"count" integer DEFAULT 0,
	"menu_order" integer DEFAULT 0,
	"yoast_head_json" jsonb,
	"schema_json" jsonb,
	"synced_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "wc_categories_id_locale_pk" PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE "wc_product_categories" (
	"product_id" integer NOT NULL,
	"locale" text NOT NULL,
	"category_id" integer NOT NULL,
	"category_name" text,
	"category_slug" text,
	CONSTRAINT "wc_product_categories_product_id_locale_category_id_pk" PRIMARY KEY("product_id","locale","category_id")
);
--> statement-breakpoint
CREATE TABLE "wc_product_images" (
	"product_id" integer NOT NULL,
	"locale" text NOT NULL,
	"position" integer NOT NULL,
	"src" text NOT NULL,
	"alt" text,
	CONSTRAINT "wc_product_images_product_id_locale_position_pk" PRIMARY KEY("product_id","locale","position")
);
--> statement-breakpoint
CREATE TABLE "wc_product_relations" (
	"product_id" integer NOT NULL,
	"locale" text NOT NULL,
	"related_id" integer NOT NULL,
	"kind" text NOT NULL,
	CONSTRAINT "wc_product_relations_product_id_locale_related_id_kind_pk" PRIMARY KEY("product_id","locale","related_id","kind")
);
--> statement-breakpoint
CREATE TABLE "wc_products" (
	"id" integer NOT NULL,
	"locale" text NOT NULL,
	"slug" text,
	"name" text NOT NULL,
	"short_description" text,
	"description" text,
	"price" text,
	"regular_price" text,
	"sale_price" text,
	"stock_status" text,
	"sku" text,
	"featured" boolean DEFAULT false,
	"menu_order" integer DEFAULT 0,
	"attributes" jsonb,
	"tags" jsonb,
	"brands" jsonb,
	"meta_data" jsonb,
	"yoast_head_json" jsonb,
	"translation_ua_id" integer,
	"translation_en_id" integer,
	"variations" jsonb,
	"cross_sell_ids" jsonb,
	"related_ids" jsonb,
	"downloads" jsonb,
	"synced_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "wc_products_id_locale_pk" PRIMARY KEY("id","locale")
);
--> statement-breakpoint
CREATE TABLE "wc_sync_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"started_at" timestamp with time zone DEFAULT now(),
	"finished_at" timestamp with time zone,
	"status" text,
	"categories_count" integer,
	"products_count" integer,
	"error" text
);
--> statement-breakpoint
CREATE INDEX "wc_categories_locale_slug_idx" ON "wc_categories" USING btree ("locale","slug");--> statement-breakpoint
CREATE INDEX "wc_categories_locale_parent_idx" ON "wc_categories" USING btree ("locale","parent_id");--> statement-breakpoint
CREATE INDEX "wc_product_categories_locale_cat_idx" ON "wc_product_categories" USING btree ("locale","category_id");--> statement-breakpoint
CREATE INDEX "wc_products_locale_slug_idx" ON "wc_products" USING btree ("locale","slug");