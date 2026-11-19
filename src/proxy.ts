import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing.ts";
import {NextRequest, NextResponse} from "next/server";
import {UNLEASH_COOKIE_NAME} from "./featuretoggles/toggles.ts";

const addUnleashCookie = (request: NextRequest, response: NextResponse) => {
    if (request.cookies.get(UNLEASH_COOKIE_NAME)?.value == null) {
        response.cookies.set(UNLEASH_COOKIE_NAME, crypto.randomUUID(), {
            httpOnly: true,
            secure: process.env.NEXT_PUBLIC_DIGISOS_ENV !== "localhost",
            sameSite: "lax",
            path: "/",
        });
    }
    return response;
};

export default async function proxy(request: NextRequest) {
    const response = createMiddleware(routing)(request);
    return addUnleashCookie(request, response);
}

export const config = {
    matcher: ["/", "/(nb|nn|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
