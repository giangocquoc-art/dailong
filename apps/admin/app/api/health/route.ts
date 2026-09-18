import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "gomsudailong-admin",
      version: "0.4.1",
      architecture: "standalone-admin + puck-builder + upstream-api-bridge",
      storage: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase-configured" : "supabase-pending",
      upstream: process.env.UPSTREAM_ADMIN_ORIGIN || "https://gomsudailong.vn",
      timestamp: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
