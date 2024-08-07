import {redirect} from "next/navigation";
import {BASE_PATH} from "../../lib/constants";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const gotoParam = searchParams.get("goto");
    redirect(gotoParam ?? BASE_PATH);
}
