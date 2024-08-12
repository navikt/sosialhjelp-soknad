import {NextResponse, NextRequest} from "next/server";
import {getSessionInfoSsr} from "./generated/server/informasjon-ressurs/informasjon-ressurs.ts";
import {isAxiosError} from "axios";
import {BASE_PATH, LINK_PAGE_PATH} from "./lib/constants.ts";
import {getGotoParameter} from "./lib/api/auth/getGotoParameter.ts";
import {NextURL} from "next/dist/server/web/next-url";

async function verifyOrRedirectToLogin(nextUrl: NextURL): Promise<NextResponse> {
    try {
        // FIXME: Find better way to verify session validity; this is relatively expensive
        await getSessionInfoSsr();
        // If session is valid, continue with the request
        return NextResponse.next();
    } catch (error: any) {
        if (!isAxiosError(error) || error.response?.status !== 401 || !error.response?.data.loginUrl) throw error;

        // Note that we don't correctly URL-encode the goto-parameter here, because login-api does not handle this correctly.
        const redirectQuery = `?redirect=${nextUrl.origin}${LINK_PAGE_PATH}?goto=${BASE_PATH}${getGotoParameter(nextUrl)}`;

        return NextResponse.redirect(new URL(error.response.data.loginUrl + redirectQuery));
    }
}

export async function middleware({nextUrl}: NextRequest) {
    return await verifyOrRedirectToLogin(nextUrl);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
