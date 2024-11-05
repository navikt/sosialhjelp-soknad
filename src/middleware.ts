import {type NextRequest, NextResponse} from "next/server";
import {verifyOrRedirectToLogin} from "./lib/middleware/verifyOrRedirectToLogin.ts";
import {configureLogger} from "@navikt/next-logger";

import {logger} from "@navikt/next-logger";

configureLogger({basePath: "/sosialhjelp/soknad", apiPath: "/sosialhjelp/soknad/api"});

export async function middleware({url, cookies}: NextRequest) {
    if (process.env.NEXT_PUBLIC_DIGISOS_ENV === "preprod") {
        logger.warn("Running in preprod, skipping auth check");
        return NextResponse.next();
    }
    try {
        return await verifyOrRedirectToLogin({url, cookies});
    } catch (e: any) {
        // It's not a big deal if the above fails, because we do the same
        // redirect on the client side. so we set this up fail-safe.
        logger.warn("Could not check auth on server side, falling back to client", e);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [`/((?!api|internal|_next/static|_next/image|favicon.ico).*)`, "/"],
};
