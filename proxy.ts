import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STAFF_AUTH_COOKIE, staffAuthToken } from "@/app/lib/auth";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(STAFF_AUTH_COOKIE)?.value;

  if (token !== staffAuthToken()) {
    const loginUrl = new URL("/staff-login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/weighing/:path*"],
};
