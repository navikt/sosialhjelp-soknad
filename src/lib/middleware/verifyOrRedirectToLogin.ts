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
        return await fetch(`${digisosConfig.baseURL}informasjon/session`, {
            headers: getHeadersFromCookies(cookies),
            signal: AbortSignal.timeout(1000),
        });
    } catch (e) {
        throw new Error("Failed to verify session with canary request", {cause: e});
    }
}

export async function verifyOrRedirectToLogin({
    url,
    cookies,
}: Pick<NextRequest, "url" | "cookies">): Promise<NextResponse> {
    const h = await headers();
    const origin = h.get("x-forwarded-host") ?? h.get("host");

    if (!origin) return NextResponse.next();

    // FIXME: Find better way to verify session validity; this is relatively expensive
    // Because middleware runs on the Edge runtime, we can't use Axios here.
    const res = await canaryRequest(cookies);

    if (res.ok) {
        return NextResponse.next();
    } else if (res.status === 401) {
        const responseBody = await res.json();
        const nextUrl = new URL(url);

        const scheme = process.env.NEXT_PUBLIC_DIGISOS_ENV === "localhost" ? "http" : "https";
        const redirect = `${scheme}://${origin}${LINK_PAGE_PATH}`;
        const redirectQuery = `?redirect=${redirect}?goto=${getGotoParameter(nextUrl)}`;

        return NextResponse.redirect(new URL(responseBody.loginUrl + redirectQuery));
    } else {
        throw new Error("Failed to verify session", {cause: res});
    }
}
