import type { NextConfig } from "next";

// This branch is deployed only as a Vercel visual review. The production site
// continues to use its Cloudflare worker bindings and the Vinext build.
const isDaiLongVercelPreview =
  process.env.VERCEL === "1" &&
  process.env.VERCEL_GIT_COMMIT_REF === "codex/dai-long-feedback-refresh";

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
