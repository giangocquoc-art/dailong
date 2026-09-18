import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "gomsudailong-admin",
      version: "0.5.0",
      architecture: "standalone-admin + puck-drafts + existing-cms-backend",
      persistence: "existing-cms-backend",
      upstream: process.env.UPSTREAM_ADMIN_ORIGIN || "https://gomsudailong.vn",
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
