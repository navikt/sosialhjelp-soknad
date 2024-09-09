import { redirect } from "next/navigation";
import { BASE_PATH } from "../../lib/constants";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const gotoParam = searchParams.get("goto");
        const redirectTo = gotoParam && isValidUrl(gotoParam) ? gotoParam : BASE_PATH;

        redirect(redirectTo);
    } catch (error) {
        console.error("Redirection error:", error);
        redirect(BASE_PATH);
    }
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
