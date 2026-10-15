import type { NextConfig } from "next";

// Vercel has no Cloudflare Worker bindings. Use the existing empty preview shim
// for all Vercel branches; the CMS recovery uses a separate read-only HTTP API.
const isDaiLongVercelPreview = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isDaiLongVercelPreview
    ? {
        typescript: { ignoreBuildErrors: true },
        turbopack: {
          resolveAlias: {
            "cloudflare:workers": "./lib/vercel-preview-workers.ts",
          },
        },
      }
    : {}),
};

export default nextConfig;
