import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname; //ex : /products

    if (requireAuth.includes(pathName)) {
      const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
      }); //ex : token : {name: xxx, id:xxx, role:xxx}

      if (!token) {
        const url = new URL("/", req.url);
        //req.url : http://localhost:3000/products
        //url : http://localhost:3000/
        return NextResponse.redirect(url);
      }
    }
    return middleware(req, next);
  };
}
