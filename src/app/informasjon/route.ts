import {NextRequest, NextResponse} from "next/server";
import {BASE_PATH} from "../../lib/constants.ts";

export async function GET({nextUrl, headers}: NextRequest) {
    // If there's an "axiosError" GET query parameter, we log an error.
    // FIXME
    // if (nextUrl.searchParams.has("axiosError")) {
    //     console.error("axiosError", nextUrl.searchParams.get("axiosError"));
    // }

    const url = nextUrl.clone();
    url.pathname = BASE_PATH;
    url.host = headers.get("host") ?? url.host;
    console.log(url.toString());
    return NextResponse.redirect(url);
}
