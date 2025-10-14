import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const queryString = `?${request.nextUrl.searchParams.toString()}`;
  const newUrl = new URL(`/shadcn-themes${queryString}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: "/",
};
