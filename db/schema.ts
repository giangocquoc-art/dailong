import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id").primaryKey(),
  siteTitle: text("site_title").notNull(),
  heroKicker: text("hero_kicker").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  heroImageUrl: text("hero_image_url").notNull(),
  aboutText: text("about_text").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  code: text("code").notNull(),
  material: text("material").notNull(),
  dimensions: text("dimensions").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: integer("featured").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: integer("updated_at").notNull(),
});
