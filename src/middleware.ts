import {configureLogger} from "@navikt/next-logger";
import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing.ts";
import {NextRequest} from "next/server";

configureLogger({basePath: "/sosialhjelp/soknad", apiPath: "/sosialhjelp/soknad/api"});

export default async function middleware(request: NextRequest) {
    return createMiddleware(routing)(request);
}

export const config = {
    matcher: ["/", "/(nb|nn|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
