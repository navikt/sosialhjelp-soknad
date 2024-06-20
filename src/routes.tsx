import {
    createBrowserRouter,
    createRoutesFromChildren,
    matchRoutes,
    redirect,
    Route,
    Routes,
    useLocation,
    useNavigationType,
} from "react-router-dom";
import * as React from "react";

import {
    ConsoleInstrumentation,
    getWebInstrumentations,
    initializeFaro,
    LogLevel,
    ReactIntegration,
    ReactRouterVersion,
} from "@grafana/faro-react";
import {TracingInstrumentation} from "@grafana/faro-web-tracing";
import config, {basePath} from "./lib/config";
import {redirectToGotoSearchParameter} from "./lib/api/auth/redirectToGotoSearchParameter";

const Informasjon = React.lazy(() => import("./pages/hovedmeny"));
const SideIkkeFunnet = React.lazy(() => import("./pages/feilsider/SideIkkeFunnet"));
const ServerFeil = React.lazy(() => import("./pages/feilsider/ServerFeil"));
const ExceptionThrower = React.lazy(() => import("./pages/feilsider/ExceptionThrower"));
const Personopplysninger = React.lazy(() => import("./pages/01-personalia"));
const Begrunnelse = React.lazy(() => import("./pages/02-begrunnelse"));
const ArbeidOgUtdanning = React.lazy(() => import("./pages/03-arbeidUtdanning"));
const Familie = React.lazy(() => import("./pages/04-familie"));
const Bosituasjon = React.lazy(() => import("./pages/05-bosituasjon"));
const InntektFormue = React.lazy(() => import("./pages/06-inntektFormue"));
const UtgifterGjeld = React.lazy(() => import("./pages/07-utgifterGjeld"));
const OkonomiskeOpplysningerView = React.lazy(() => import("./pages/08-vedlegg"));
const Oppsummering = React.lazy(() => import("./pages/09-oppsummering/Oppsummering"));

const routes = (
    <Route errorElement={<SideIkkeFunnet />}>
        <Route index path={`/`} element={<Informasjon />} />
        <Route path={`informasjon`} loader={() => redirect("/", 301)} />
        <Route path={`feil`} element={<ServerFeil />} />
        <Route path={`link`} loader={redirectToGotoSearchParameter} />
        <Route path={`kastException`} element={<ExceptionThrower />} />
        <Route path={"skjema/:behandlingsId"}>
            <Route index path="1" element={<Personopplysninger />} />
            <Route path="2" element={<Begrunnelse />} />
            <Route path="3" element={<ArbeidOgUtdanning />} />
            <Route path="4" element={<Familie />} />
            <Route path="5" element={<Bosituasjon />} />
            <Route path="6" element={<InntektFormue />} />
            <Route path="7" element={<UtgifterGjeld />} />
            <Route path="8" element={<OkonomiskeOpplysningerView />} />
            <Route path="9" element={<Oppsummering />} />
            <Route element={<SideIkkeFunnet />} />
        </Route>
    </Route>
);

export const router = createBrowserRouter(createRoutesFromChildren(routes), {basename: basePath});

initializeFaro({
    url: config.faro.url,
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
