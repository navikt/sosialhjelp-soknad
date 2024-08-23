import {type NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {getGotoParameter} from "./lib/api/auth/getGotoParameter.ts";
import {LINK_PAGE_PATH} from "./lib/constants.ts";
import {canaryRequest} from "./lib/middleware/verifyOrRedirectToLogin.ts";

export async function middleware({url, cookies}: NextRequest) {
    // return await verifyOrRedirectToLogin({url, cookies});
    console.log("x-forwarded-host", headers().get("x-forwarded-host"));
    console.log("host", headers().get("host"));
    try {
        const res = await canaryRequest(cookies);
        if (res.status === 401) {
            console.log("401 status");
            console.log("Url: ", url);
            const responseBody = await res.json();
            console.log("Response body: ", responseBody);
            const nextUrl = new URL(url);

            const redirect = nextUrl.protocol + "//" + origin + LINK_PAGE_PATH;
            const redirectQuery = `?redirect=${redirect}?goto=${getGotoParameter(nextUrl)}`;

            console.log("Redirect URL: ", new URL(responseBody.loginUrl + redirectQuery).toString());
        }
    } catch (e) {
        console.error(e);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`, "/"],
};
