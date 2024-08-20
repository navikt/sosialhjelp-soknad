import {NextRequest, NextResponse} from "next/server";
import {BASE_PATH} from "../../lib/constants.ts";

export async function GET({nextUrl}: NextRequest) {
    // If there's an "axiosError" GET query parameter, we log an error.
    if (nextUrl.searchParams.has("axiosError")) {
        console.error("axiosError", nextUrl.searchParams.get("axiosError"));
    }

    nextUrl.pathname = BASE_PATH;
    return NextResponse.redirect(nextUrl);
}
