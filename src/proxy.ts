import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en", "de"] as const;
const DEFAULT_LOCALE = "en";

function isLocale(maybe: string): maybe is (typeof LOCALES)[number] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (LOCALES as readonly any[]).includes(maybe);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals and files with extensions.
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (/\.[a-z0-9]+$/i.test(pathname)) {
    return NextResponse.next();
  }

  const parts = pathname.split("/");
  const maybeLocale = parts[1];

  if (!maybeLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  if (!isLocale(maybeLocale)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-locale", maybeLocale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
