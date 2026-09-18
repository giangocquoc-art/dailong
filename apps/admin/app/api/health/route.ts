import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "gomsudailong-admin",
      upstream: process.env.UPSTREAM_ADMIN_ORIGIN || "https://gomsudailong.vn",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
