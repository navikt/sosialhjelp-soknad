import {proxyRouteHandler} from "@navikt/next-api-proxy";
import {logger} from "@navikt/next-logger";

export const GET = proxyMyBackend;
export const POST = proxyMyBackend;
export const PUT = proxyMyBackend;
export const DELETE = proxyMyBackend;
export const OPTIONS = proxyMyBackend;

// Remember to export the HTTP verb you want Next to expose
async function proxyMyBackend(request: Request, {params}: {params: Promise<{path: string[]}>}): Promise<Response> {
    const path = `/sosialhjelp/soknad-api/${(await params).path.join("/")}`;
    const hostname = "sosialhjelp-soknad-api.teamdigisos";
    logger.info(`Proxying request to ${hostname}`);
    logger.info("Authorization: " + request.headers.get("Authorization"));
    logger.info("Path: " + path);

    return proxyRouteHandler(request, {
        hostname,
        path,
        bearerToken: `${request.headers.get("Authorization")?.split(" ")[1]}`,
        // use https: false if you are going through service discovery
        https: false,
    });
}
