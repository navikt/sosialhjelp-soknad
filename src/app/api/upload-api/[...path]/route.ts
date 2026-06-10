import {proxyRouteHandler} from "@navikt/next-api-proxy";
import digisosConfig from "../../../../lib/config.ts";

type RouteHandlerProxyTarget = {hostname: string; path: string; https: boolean; bearerToken?: string; port?: string};
type ProxyRequestContext = {params: Promise<{path: string[]}>};
type ProxyRequestHandler = (request: Request, context: ProxyRequestContext) => Promise<Response>;

const getRouteHandlerProxyTarget = (headers: Headers, requestPath: string[]): RouteHandlerProxyTarget => {
    if (!digisosConfig.uploadProxy) throw new Error("Proxy not configured");
    const {hostname, basePath, https, port} = digisosConfig.uploadProxy;
    const path = `${basePath}/${requestPath.join("/")}`;
    const bearerToken = `${headers.get("Authorization")?.split(" ")[1]}`;
    return {hostname, path: encodeURI(path), bearerToken, https, port};
};

const uploadApiProxy: ProxyRequestHandler = async (request, {params}): Promise<Response> =>
    proxyRouteHandler(request, getRouteHandlerProxyTarget(request.headers, (await params).path));

export const DELETE = uploadApiProxy;
export const PATCH = uploadApiProxy;
export const GET = uploadApiProxy;
export const OPTIONS = uploadApiProxy;
export const POST = uploadApiProxy;
export const PUT = uploadApiProxy;
