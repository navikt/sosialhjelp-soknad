import {NextRequest, NextResponse} from "next/server";
import {BASE_PATH} from "../../../lib/constants.ts";
import {logger} from "@navikt/next-logger";

export async function GET({nextUrl, headers}: NextRequest) {
    // If there's an "axiosError" GET query parameter, we log an error.
    // FIXME
    // if (nextUrl.searchParams.has("axiosError")) {
    //     console.error("axiosError", nextUrl.searchParams.get("axiosError"));
    // }

    const url = nextUrl.clone();
    url.pathname = BASE_PATH;
    url.host = headers.get("host") ?? url.host;
    url.port = process.env.NEXT_PUBLIC_DIGISOS_ENV === "localhost" ? "3001" : "";
    logger.info(`Redirecting from /informasjon to ${url.toString()}`);
    return NextResponse.redirect(url);
}
