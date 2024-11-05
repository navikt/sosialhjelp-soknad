import {type NextRequest, NextResponse} from "next/server";
import {verifyOrRedirectToLogin} from "./lib/middleware/verifyOrRedirectToLogin.ts";
import {configureLogger} from "@navikt/next-logger";

import {logger} from "@navikt/next-logger";
import {getToken, parseIdportenToken, validateToken} from "@navikt/oasis";

configureLogger({basePath: "/sosialhjelp/soknad", apiPath: "/sosialhjelp/soknad/api"});

export async function middleware({url, cookies, headers}: NextRequest) {
    if (process.env.NEXT_PUBLIC_DIGISOS_ENV === "preprod") {
        logger.warn("Running in preprod, skipping auth check");
        logger.info("Auth header: ", headers.get("authorization"));
        const token = getToken(headers);
        if (!token) {
            logger.warn("No token found in headers");
            return NextResponse.next();
        }
        const validation = await validateToken(token);
        if (!validation.ok) {
            logger.warn("Token could not be validated");
            return NextResponse.next();
        }
        const parsed = parseIdportenToken(token);

        if (!parsed.ok) {
            logger.warn("Token could not be parsed");
            return NextResponse.next();
        }

        logger.info(JSON.stringify(parsed, null, 2));

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
