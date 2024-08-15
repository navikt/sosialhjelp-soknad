import {type NextRequest} from "next/server";
import {verifyOrRedirectToLogin} from "./lib/middleware/verifyOrRedirectToLogin.ts";

export async function middleware({url, cookies}: NextRequest) {
    console.log("Request to", url);
    return await verifyOrRedirectToLogin({url, cookies});
}
//
// export const config = {
//     matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`, "/"],
// };
