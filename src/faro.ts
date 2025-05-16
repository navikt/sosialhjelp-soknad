import {createRoutesFromChildren, matchRoutes, Routes, useLocation, useNavigationType} from "react-router";

import {
    // ConsoleInstrumentation,
    getWebInstrumentations,
    initializeFaro,
    // LogLevel,
    ReactIntegration,
    ReactRouterVersion,
} from "@grafana/faro-react";
import {TracingInstrumentation} from "@grafana/faro-web-tracing";
import digisosConfig from "./lib/config";
import {logger} from "@navikt/next-logger";
let userHasBeenToldFaroIsDisabled = false;

if (!digisosConfig.faro) {
    if (!userHasBeenToldFaroIsDisabled) {
        logger.debug("faro is disabled!");
        userHasBeenToldFaroIsDisabled = true;
    }
} else
    initializeFaro({
        url: digisosConfig.faro.url,
        app: {
            name: "sosialhjelp-soknad",
            version: "1.0.0",
        },
        instrumentations: [
            // Load the default Web instrumentations
            ...getWebInstrumentations(),

            // Tracing Instrumentation is needed if you want to use the React Profiler
            new TracingInstrumentation(),

            // Har disablet denne til fordel for next-logger sin capture av console.log
            // new ConsoleInstrumentation({disabledLevels: [LogLevel.TRACE]}),

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
