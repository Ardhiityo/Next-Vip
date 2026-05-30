import { NextResponse } from "next/server";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const onlyAdmin = ["/dashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname;

    if (requireAuth.includes(pathName)) {
      const token = await getToken({ req });

      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(url);
      } else {
        if (token?.role != "admin" && onlyAdmin.includes(pathName)) {
          const url = new URL("/", req.url);
          return NextResponse.redirect(url);
        }
      }
    }

    return middleware(req, next);
  };
}
