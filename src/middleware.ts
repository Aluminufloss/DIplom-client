import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: "/tasks/:path*",
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
