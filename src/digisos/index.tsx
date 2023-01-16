import {
    createRoutesFromChildren,
    matchRoutes,
    Route,
    useLocation,
    useNavigationType,
    createBrowserRouter,
    createRoutesFromElements,
    redirect,
} from "react-router-dom";
import SideIkkeFunnet from "../nav-soknad/feilsider/SideIkkeFunnet";
import Informasjon from "./hovedmeny";
import {isLocalhost, isMockAlt} from "../nav-soknad/utils";
import {basePath} from "../configuration";
import * as React from "react";
import Ettersendelse from "./skjema/ettersendelse";
import Steg1 from "./skjema/personopplysninger";
import Steg2 from "./skjema/begrunnelse";
import Steg3 from "./skjema/arbeidUtdanning";
import Steg4 from "./skjema/familie";
import Steg5 from "./skjema/bosituasjon";
import Steg6 from "./skjema/inntektFormue";
import Steg7 from "./skjema/utgifterGjeld";
import Steg8 from "./skjema/okonomiskeOpplysninger";
import NyOppsummering from "./skjema/ny-oppsummering/Oppsummering";
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";

const redirectFromLogin = async () => {
    const url = window.location.href;
    const match = url.match(/goto=\/sosialhjelp\/soknad(.+?)(&login_id.*$|$)/);
    const destination = match?.[1] ? match[1] : "/informasjon";
    return redirect(destination);
};

const Routes = (
    <Route errorElement={<SideIkkeFunnet />}>
        <Route index path={`/`} loader={() => redirect("/informasjon")} />
        <Route path={`/informasjon`} element={<Informasjon />} />
        <Route path={`/link`} loader={redirectFromLogin} />
        {!isMockAlt(window.location.origin) && !isLocalhost(window.location.origin) && (
            <Route path={`/mock-login`} loader={redirectFromLogin} />
        )}
        <Route path={"/skjema/:behandlingsId/*"}>
            <Route index path="1" element={<Steg1 />} />
            <Route path="2" element={<Steg2 />} />
            <Route path="3" element={<Steg3 />} />
            <Route path="4" element={<Steg4 />} />
            <Route path="5" element={<Steg5 />} />
            <Route path="6" element={<Steg6 />} />
            <Route path="7" element={<Steg7 />} />
            <Route path="8" element={<Steg8 />} />
            <Route path="9" element={<NyOppsummering />} />
            <Route path="ettersendelse" element={<Ettersendelse />} />
            <Route element={<SideIkkeFunnet />} />
        </Route>
        <Route element={<SideIkkeFunnet />} />
    </Route>
);

Sentry.init({
    dsn: "https://e81d69cb0fb645068f8b9329fd3a138a@sentry.gc.nav.no/99",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                React.useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromChildren,
                matchRoutes
            ),
        }),
    ],
    environment: process.env.REACT_APP_ENVIRONMENT,
    tracesSampleRate: 1.0,
});

const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

export const router = sentryCreateBrowserRouter(createRoutesFromElements(Routes), {basename: basePath});
