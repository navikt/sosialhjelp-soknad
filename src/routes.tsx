import {
    createBrowserRouter,
    createRoutesFromChildren,
    matchRoutes,
    Navigate,
    Outlet,
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
import useIsKort from "./lib/hooks/data/useIsKort";

const Informasjon = React.lazy(() => import("./pages/hovedmeny"));
const SideIkkeFunnet = React.lazy(() => import("./pages/feilsider/SideIkkeFunnet"));
const ServerFeil = React.lazy(() => import("./pages/feilsider/ServerFeil"));
const ExceptionThrower = React.lazy(() => import("./pages/feilsider/ExceptionThrower"));
const Personopplysninger = React.lazy(() => import("./pages/01-personalia"));
const Begrunnelse = React.lazy(() => import("./pages/02-begrunnelse"));
const Behov = React.lazy(() => import("./pages/kort/02-behov"));
const ArbeidOgUtdanning = React.lazy(() => import("./pages/03-arbeidUtdanning"));
const Situasjonsendring = React.lazy(() => import("./pages/kort/03-situasjon"));
const Familie = React.lazy(() => import("./pages/04-familie"));
const Bosituasjon = React.lazy(() => import("./pages/05-bosituasjon"));
const InntektFormue = React.lazy(() => import("./pages/06-inntektFormue"));
const UtgifterGjeld = React.lazy(() => import("./pages/07-utgifterGjeld"));
const OkonomiskeOpplysningerView = React.lazy(() => import("./pages/08-vedlegg"));
const Oppsummering = React.lazy(() => import("./pages/09-oppsummering/Oppsummering"));

const RedirectFromKort = () => {
    const {data: isKortSoknad, isError, isLoading} = useIsKort();

    const location = useLocation();

    if (isError || (location.pathname?.includes("/kort") && !isLoading && !isKortSoknad)) {
        return <Navigate to={`${location.pathname.replace("/kort", "")}`} replace></Navigate>;
    }
    return <Outlet />;
};

const routes = (
    <Route errorElement={<SideIkkeFunnet />}>
        <Route index path={`/`} element={<Informasjon />} />
        <Route path={`informasjon`} loader={() => redirect("/", 301)} />
        <Route path={`feil`} element={<ServerFeil />} />
        <Route path={`link`} loader={redirectToGotoSearchParameter} />
        <Route path={`kastException`} element={<ExceptionThrower />} />
        <Route path={"skjema"}>
            <Route path="kort/:behandlingsId">
                <Route element={<RedirectFromKort />}>
                    <Route index path="1" element={<Personopplysninger />} />
                    <Route path="2" element={<Behov />} />
                    <Route path="3" element={<Situasjonsendring />} />
                    <Route path="4" element={<Oppsummering />} />
                </Route>
            </Route>
            <Route path=":behandlingsId">
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
    </Route>
);

export const router = createBrowserRouter(createRoutesFromChildren(routes), {basename: basePath});

initializeFaro({
    url: process.env.NODE_ENV !== "development" ? config.faro.url : undefined,
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
