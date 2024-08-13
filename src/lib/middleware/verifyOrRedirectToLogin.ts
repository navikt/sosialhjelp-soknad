import {NextRequest, NextResponse} from "next/server";
import digisosConfig from "../config.ts";
import {BASE_PATH, LINK_PAGE_PATH} from "../constants.ts";
import {getGotoParameter} from "../api/auth/getGotoParameter.ts";
import {RequestCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {headers} from "next/headers";

async function canaryRequest(url: string, cookies: RequestCookies): Promise<Response> {
    const cookie = Object.values(cookies.getAll())
        .map(({name, value}) => `${name}=${value}`)
        .join("; ");
    const res = await fetch(url, {headers: {cookie}});

    if (res.ok) return res;

    if (res.status !== 401) throw new Error("Invalid response in middleware", {cause: res});

    return res;
}

export async function verifyOrRedirectToLogin({
    url,
    cookies,
}: Pick<NextRequest, "url" | "cookies">): Promise<NextResponse> {
    console.log(headers().get("host"));
    console.log(headers().get("x-forwarded-host"));

    try {
        // FIXME: Find better way to verify session validity; this is relatively expensive
        // Because middleware runs on the Edge runtime, we can't use Axios here.
        const res = await canaryRequest(`${digisosConfig.baseURL}informasjon/session`, cookies);

        if (res.ok) {
            return NextResponse.next();
        } else {
            const responseBody = await res.json();
            const nextUrl = new URL(url);
            const redirect = nextUrl.origin + LINK_PAGE_PATH;
            const goto = BASE_PATH + getGotoParameter(nextUrl);

            const redirectQuery = `?redirect=${redirect}?goto=${goto}`;

            return NextResponse.redirect(new URL(responseBody.loginUrl + redirectQuery));
        }
    } catch (e) {
        throw new Error("Failed to verify session", {cause: e});
    }
}
