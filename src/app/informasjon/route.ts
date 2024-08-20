import {NextRequest, NextResponse} from "next/server";

export async function GET({nextUrl}: NextRequest) {
    // If there's an "axiosError" GET query parameter, we log an error.
    if (nextUrl.searchParams.has("axiosError")) {
        console.error("axiosError", nextUrl.searchParams.get("axiosError"));
    }

    return NextResponse.redirect("/");
}
