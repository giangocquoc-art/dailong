import { env } from "cloudflare:workers";

/**
 * Keep the admin's first write path usable on existing D1 databases. These
 * additive, idempotent checks preserve existing rows and add only fields used
 * by product publishing and image galleries.
 */
export async function ensureAdminSchema() {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS admin_schema_versions (
    version TEXT PRIMARY KEY NOT NULL,
    applied_at INTEGER NOT NULL
  )`).run();
  const applied = await env.DB.prepare("SELECT version FROM admin_schema_versions WHERE version = ?")
    .bind("product-gallery-publishing-v1")
    .first<{ version: string }>();
  if (applied) return;

  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    code TEXT NOT NULL,
    material TEXT NOT NULL,
    dimensions TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL,
    gallery_json TEXT NOT NULL DEFAULT '[]',
    is_published INTEGER NOT NULL DEFAULT 1
  )`).run();

  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY NOT NULL,
    site_title TEXT NOT NULL,
    hero_kicker TEXT NOT NULL,
    hero_title TEXT NOT NULL,
    hero_description TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    about_text TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`).run();

  const additions = [
    "ALTER TABLE products ADD COLUMN gallery_json TEXT NOT NULL DEFAULT '[]'",
    "ALTER TABLE products ADD COLUMN is_published INTEGER NOT NULL DEFAULT 1",
  ];
  for (const statement of additions) {
    try { await env.DB.prepare(statement).run(); }
    catch (error) {
      if (!String(error).toLowerCase().includes("duplicate column name")) throw error;
    }
  }
  await env.DB.prepare("INSERT OR IGNORE INTO admin_schema_versions (version, applied_at) VALUES (?, ?)")
    .bind("product-gallery-publishing-v1", Date.now()).run();
}
