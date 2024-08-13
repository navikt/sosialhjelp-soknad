import {type NextRequest} from "next/server";
import {verifyOrRedirectToLogin} from "./lib/middleware/verifyOrRedirectToLogin.ts";

export async function middleware({nextUrl, cookies}: NextRequest) {
    return await verifyOrRedirectToLogin({nextUrl, cookies});
}

export const config = {
    matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`, "/"],
};
