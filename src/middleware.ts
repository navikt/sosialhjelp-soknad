import {type NextRequest, NextResponse} from "next/server";
import {verifyOrRedirectToLogin} from "./lib/middleware/verifyOrRedirectToLogin.ts";

export async function middleware({url, cookies}: NextRequest) {
    try {
        return await verifyOrRedirectToLogin({url, cookies});
    } catch (e: any) {
        // It's not a big deal if the above fails, because we do the same
        // redirect on the client side. so we set this up fail-safe.
        console.error("Harmless whoopsie-daisy in auth middleware:", e);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`, "/"],
};
