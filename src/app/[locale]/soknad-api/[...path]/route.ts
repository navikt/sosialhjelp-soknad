import {proxyRouteHandler} from "@navikt/next-api-proxy";
import digisosConfig from "../../../../lib/config.ts";

type RouteHandlerProxyTarget = {hostname: string; path: string; https: boolean; bearerToken?: string};
type ProxyRequestContext = {params: Promise<{path: string[]}>};
type ProxyRequestHandler = (request: Request, context: ProxyRequestContext) => Promise<Response>;

const getRouteHandlerProxyTarget = (headers: Headers, requestPath: string[]): RouteHandlerProxyTarget => {
    if (!digisosConfig.proxy) throw new Error("Proxy not configured");
    const {hostname, basePath, https} = digisosConfig.proxy;
    const path = `${basePath}/${requestPath.join("/")}`;
    const bearerToken = `${headers.get("Authorization")?.split(" ")[1]}`;
    return {hostname, path, bearerToken, https};
};

const soknadApiProxy: ProxyRequestHandler = async (request, {params}): Promise<Response> =>
    proxyRouteHandler(request, getRouteHandlerProxyTarget(request.headers, (await params).path));

export const DELETE = soknadApiProxy;
export const GET = soknadApiProxy;
export const OPTIONS = soknadApiProxy;
export const POST = soknadApiProxy;
export const PUT = soknadApiProxy;
