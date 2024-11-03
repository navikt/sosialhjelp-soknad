import {redirect} from "next/navigation";
import {getUrlFromGoto} from "./getUrlFromGoto.ts";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);

    redirect(getUrlFromGoto(searchParams.get("goto")));
}
