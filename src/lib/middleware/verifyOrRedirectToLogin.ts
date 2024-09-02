import {NextRequest, NextResponse} from "next/server";
import digisosConfig from "../config.ts";
import {LINK_PAGE_PATH} from "../constants.ts";
import {getGotoParameter} from "../api/auth/getGotoParameter.ts";
import {RequestCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {headers} from "next/headers";

function getHeadersFromCookies(cookies: RequestCookies): Headers {
    const cookie = Object.values(cookies.getAll())
        .map(({name, value}) => `${name}=${value}`)
        .join("; ");

    return new Headers({cookie});
}

export async function canaryRequest(cookies: RequestCookies): Promise<Response> {
    try {
        return await fetch(`${digisosConfig.baseURL}informasjon/session`, {headers: getHeadersFromCookies(cookies)});
    } catch (e) {
        throw new Error("Failed to verify session with canary request", {cause: e});
    }
}

export async function verifyOrRedirectToLogin({
    url,
    cookies,
    retries = 5,
}: Pick<NextRequest, "url" | "cookies"> & {retries?: number}): Promise<NextResponse> {
    const origin = headers().get("x-forwarded-host") ?? headers().get("host");

    if (!origin) return NextResponse.next();

    // FIXME: Find better way to verify session validity; this is relatively expensive
    // Because middleware runs on the Edge runtime, we can't use Axios here.
    const res = await canaryRequest(cookies);

    if (res.ok) {
        if (retries != 5) console.log("Lyktes etter " + (5 - retries) + " forsøk");
        return NextResponse.next();
    } else if (res.status === 401) {
        if (retries != 5) console.log("Lyktes etter " + (5 - retries) + " forsøk");
        const responseBody = await res.json();
        const nextUrl = new URL(url);

        const scheme = process.env.NEXT_PUBLIC_DIGISOS_ENV === "localhost" ? "http" : "https";
        const redirect = `${scheme}://${origin}${LINK_PAGE_PATH}`;
        const redirectQuery = `?redirect=${redirect}?goto=${getGotoParameter(nextUrl)}`;

        return NextResponse.redirect(new URL(responseBody.loginUrl + redirectQuery));
    } else {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            console.warn("Retrying session verification", {retries});
            return verifyOrRedirectToLogin({url, cookies, retries: retries - 1});
        } else {
            throw new Error("Failed to verify session", {cause: res});
        }
    }
}
