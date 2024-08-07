import {
    createBrowserRouter,
    createRoutesFromChildren,
    matchRoutes,
    Routes,
    useLocation,
    useNavigationType,
} from "react-router-dom";

import {
    ConsoleInstrumentation,
    getWebInstrumentations,
    initializeFaro,
    LogLevel,
    ReactIntegration,
    ReactRouterVersion,
} from "@grafana/faro-react";
import {TracingInstrumentation} from "@grafana/faro-web-tracing";
import digisosConfig from "./lib/config";
import {BASE_PATH} from "./lib/constants";


    const routes = (

);

export const router = createBrowserRouter(createRoutesFromChildren(routes), {basename: BASE_PATH});

initializeFaro({
    url: process.env.NODE_ENV !== "development" ? digisosConfig.faro.url : undefined,
    app: {
        name: "sosialhjelp-soknad",
        version: "1.0.0",
    },
    instrumentations: [
        // Load the default Web instrumentations
        ...getWebInstrumentations(),

        // Tracing Instrumentation is needed if you want to use the React Profiler
        new TracingInstrumentation(),

        new ConsoleInstrumentation({disabledLevels: [LogLevel.TRACE]}),

        new ReactIntegration({
            // Only needed if you want to use the React Router instrumentation
            router: {
                version: ReactRouterVersion.V6,
                dependencies: {
                    createRoutesFromChildren,
                    matchRoutes,
                    Routes,
                    useLocation,
                    useNavigationType,
                },
            },
        }),
    ],
});
