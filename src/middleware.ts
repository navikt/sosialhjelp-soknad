import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing.ts";
import {NextRequest} from "next/server";

export default async function middleware(request: NextRequest) {
    console.log(request.nextUrl.href);
    return createMiddleware(routing)(request);
}

export const config = {
    matcher: ["/", "/(nb|nn|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
