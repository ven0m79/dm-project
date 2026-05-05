import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback if .env.local doesn't exist

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL ?? "",
  },
} satisfies Config;
