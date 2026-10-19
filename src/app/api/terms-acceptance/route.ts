import { NextResponse } from "next/server";

import {
  createTermsAcceptanceValue,
  CURRENT_TERMS_VERSION,
  TERMS_ACCEPTANCE_COOKIE,
} from "@/lib/terms";

export const runtime = "nodejs";

export async function POST() {
  const acceptedAt = Date.now();
  const response = NextResponse.json(
    {
      accepted: true,
      termsVersion: CURRENT_TERMS_VERSION,
      acceptedAt: new Date(acceptedAt).toISOString(),
    },
    { status: 200 },
  );

  response.headers.set("Cache-Control", "no-store");
  response.cookies.set({
    name: TERMS_ACCEPTANCE_COOKIE,
    value: createTermsAcceptanceValue(acceptedAt),
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
