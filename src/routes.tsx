import {
    createBrowserRouter,
    createRoutesFromChildren,
    createRoutesFromElements,
    matchRoutes,
    redirect,
    Route,
    Routes,
    useLocation,
    useNavigationType,
} from "react-router-dom";
import {Informasjon} from "./pages/hovedmeny";
import {isLocalhost, isMockAlt} from "./lib/utils";
import * as React from "react";
import {Ettersendelse} from "./pages/ettersendelse";
import {Personopplysninger} from "./pages/01-personalia";
import {Begrunnelse} from "./pages/02-begrunnelse";
import {ArbeidOgUtdanning} from "./pages/03-arbeidUtdanning";
import {Familie} from "./pages/04-familie";
import {Bosituasjon} from "./pages/05-bosituasjon";
import {InntektFormue} from "./pages/06-inntektFormue";
import {UtgifterGjeld} from "./pages/07-utgifterGjeld";
import {OkonomiskeOpplysningerView} from "./pages/08-vedlegg";
import {Oppsummering} from "./pages/09-oppsummering/Oppsummering";
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
import SideIkkeFunnet from "./pages/feilsider/SideIkkeFunnet";
import {ServerFeil} from "./pages/feilsider/ServerFeil";
import {ExceptionThrower} from "./pages/feilsider/ExceptionThrower";

const redirectFromLogin = async () => {
    const url = window.location.href;
    const match = url.match(/goto=\/sosialhjelp\/soknad(.+?)(&login_id.*$|$)/);
    const destination = match?.[1] ? match[1] : "/informasjon";
    return redirect(destination);
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
            <Route index path="1" element={<Personopplysninger />} />
            <Route path="2" element={<Begrunnelse />} />
            <Route path="3" element={<ArbeidOgUtdanning />} />
            <Route path="4" element={<Familie />} />
            <Route path="5" element={<Bosituasjon />} />
            <Route path="6" element={<InntektFormue />} />
            <Route path="7" element={<UtgifterGjeld />} />
            <Route path="8" element={<OkonomiskeOpplysningerView />} />
            <Route path="9" element={<Oppsummering />} />
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
