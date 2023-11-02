import {
    createRoutesFromChildren,
    matchRoutes,
    Route,
    useLocation,
    useNavigationType,
    createRoutesFromElements,
    redirect,
    createBrowserRouter,
    Routes,
} from "react-router-dom";
import SideIkkeFunnet from "../nav-soknad/feilsider/SideIkkeFunnet";
import Informasjon from "../hovedmeny";
import {isLocalhost, isMockAlt} from "../nav-soknad/utils";
import * as React from "react";
import Ettersendelse from "../skjema/ettersendelse";
import Steg1 from "../skjema/01-personalia";
import Steg2 from "../skjema/02-begrunnelse";
import Steg3 from "../skjema/03-arbeidUtdanning";
import Steg4 from "../skjema/04-familie";
import Steg5 from "../skjema/05-bosituasjon";
import {InntektFormue} from "../skjema/06-inntektFormue";
import Steg7 from "../skjema/07-utgifterGjeld";
import {OkonomiskeOpplysningerView} from "../skjema/08-vedlegg";
import NyOppsummering from "../skjema/09-oppsummering/Oppsummering";
import {ServerFeil} from "../nav-soknad/feilsider/ServerFeil";
import {
    ConsoleInstrumentation,
    getWebInstrumentations,
    initializeFaro,
    LogLevel,
    ReactIntegration,
    ReactRouterVersion,
} from "@grafana/faro-react";
import {TracingInstrumentation} from "@grafana/faro-web-tracing";
import config from "../lib/config";
import {basePath} from "../configuration";
const redirectFromLogin = async () => {
    const url = window.location.href;
    const match = url.match(/goto=\/sosialhjelp\/soknad(.+?)(&login_id.*$|$)/);
    const destination = match?.[1] ? match[1] : "/informasjon";
    return redirect(destination);
};

/** Midlertidig hack for å teste feilhåndtering i dev */
const ExceptionThrower = () => {
    throw new Error("Test");
};

const routes = (
    <Route errorElement={<SideIkkeFunnet />}>
        <Route index path={`/`} loader={() => redirect("/informasjon")} />
        <Route path={`/informasjon`} element={<Informasjon />} />
        <Route path={`/feil`} element={<ServerFeil />} />
        <Route path={`/link`} loader={redirectFromLogin} />
        {!isMockAlt(window.location.origin) && !isLocalhost(window.location.origin) && (
            <Route path={`/mock-login`} loader={redirectFromLogin} />
        )}
        <Route path={`/kastException`} element={<ExceptionThrower />} />
        <Route path={"/skjema/:behandlingsId/*"}>
            <Route index path="1" element={<Steg1 />} />
            <Route path="2" element={<Steg2 />} />
            <Route path="3" element={<Steg3 />} />
            <Route path="4" element={<Steg4 />} />
            <Route path="5" element={<Steg5 />} />
            <Route path="6" element={<InntektFormue />} />
            <Route path="7" element={<Steg7 />} />
            <Route path="8" element={<OkonomiskeOpplysningerView />} />
            <Route path="9" element={<NyOppsummering />} />
            <Route path="ettersendelse" element={<Ettersendelse />} />
            <Route element={<SideIkkeFunnet />} />
        </Route>
        <Route element={<SideIkkeFunnet />} />
    </Route>
);

export const router = createBrowserRouter(createRoutesFromElements(routes), {basename: basePath});

initializeFaro({
    url: config.faro.url,
    app: {
        name: "frontend",
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
