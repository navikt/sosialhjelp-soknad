import {POSTLoggingRouteHandler} from "@navikt/next-logger";
import {NextRequest} from "next/server";

export const POST = (req: NextRequest) => POSTLoggingRouteHandler(req);
