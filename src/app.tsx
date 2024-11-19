"use client";

import {Suspense} from "react";
import {BrowserRouter, Navigate, redirect, Route, Routes, useLocation} from "react-router-dom";
import {ApplicationSpinner} from "./lib/components/animasjoner/ApplicationSpinner";
import Personopplysninger from "./sider/01-personalia";
import Begrunnelse from "./sider/02-begrunnelse";
import ArbeidOgUtdanning from "./sider/03-arbeidUtdanning";
import Familie from "./sider/04-familie";
import Bosituasjon from "./sider/05-bosituasjon";
import InntektFormue from "./sider/06-inntektFormue";
import UtgifterGjeld from "./sider/07-utgifterGjeld";
import OkonomiskeOpplysningerView from "./sider/08-vedlegg";
import Oppsummering from "./sider/09-oppsummering/Oppsummering";
import ServerFeil from "./sider/feilsider/ServerFeil";
import SideIkkeFunnet from "./sider/feilsider/SideIkkeFunnet";
import Informasjon from "./sider/hovedmeny";
import Behov from "./sider/kort/02-behov";
import ArbeidOgFamilie from "./sider/kort/03-arbeid-og-familie";
import {SwitchSoknadType} from "./SwitchSoknadType.tsx";
import Inntekt from "./sider/kort/04-inntekt";
import {BASE_PATH} from "./lib/constants";
import {configureLogger} from "@navikt/next-logger";
import "./faro";
import "./lib/i18n/reacti18Next.ts";
import {initAmplitude} from "./lib/amplitude/Amplitude.tsx";
import {getPathPrefixIncludingLocale} from "./getPathPrefixIncludingLocale.ts";
import {onLanguageSelect, setParams} from "@navikt/nav-dekoratoren-moduler";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

configureLogger({basePath: BASE_PATH});
const queryClient = new QueryClient();

const RedirectToStandard = () => {
    const location = useLocation();
    return <Navigate to={location.pathname.replace("skjema/kort/", "skjema/")} replace />;
};

export default function App() {
    initAmplitude();

    // @ts-expect-error Polyfill for react-pdf, se https://github.com/wojtekmaj/react-pdf/issues/1831
    if (typeof Promise.withResolvers === "undefined") {
        // @ts-expect-error this is expected to not work
        Promise.withResolvers = function () {
            let resolve, reject;
            const promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return {promise, resolve, reject};
        };
    }

    const [basename, path] = getPathPrefixIncludingLocale();

    onLanguageSelect(({locale: language, url}) =>
        setParams({language}).then(() => window.location.assign(`${url}${path}`))
    );

    return (
        <Suspense fallback={<ApplicationSpinner />}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter basename={basename}>
                    <Routes>
                        <Route errorElement={<SideIkkeFunnet />}>
                            <Route index path={`/`} element={<Informasjon />} />
                            <Route path={`informasjon`} loader={() => redirect("/", 301)} />
                            <Route path={`feil`} element={<ServerFeil />} />
                            <Route path={"skjema"}>
                                <Route path="kort/:behandlingsId">
                                    <Route element={<SwitchSoknadType />}>
                                        <Route path="1" element={<RedirectToStandard />} />
                                        <Route path="2" element={<Behov />} />
                                        <Route path="3" element={<ArbeidOgFamilie />} />
                                        <Route path="4" element={<Inntekt />} />
                                        <Route path="5" element={<Oppsummering />} />
                                    </Route>
                                </Route>
                                <Route path=":behandlingsId">
                                    <Route index path="1" element={<Personopplysninger shortSpacing />} />
                                    <Route element={<SwitchSoknadType />}>
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
                        </Route>
                    </Routes>
                </BrowserRouter>
                <div aria-hidden={"true"}>
                    <ReactQueryDevtools initialIsOpen={false} />
                </div>
            </QueryClientProvider>
        </Suspense>
    );
}
