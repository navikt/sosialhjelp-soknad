"use client";

import {Suspense} from "react";
import {ValideringsContextProvider} from "./lib/valideringContextProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, redirect, Route, Routes} from "react-router-dom";
import {ApplicationSpinner} from "./lib/components/animasjoner/ApplicationSpinner";
import Personopplysninger from "./pages/01-personalia";
import Begrunnelse from "./pages/02-begrunnelse";
import ArbeidOgUtdanning from "./pages/03-arbeidUtdanning";
import Familie from "./pages/04-familie";
import Bosituasjon from "./pages/05-bosituasjon";
import InntektFormue from "./pages/06-inntektFormue";
import UtgifterGjeld from "./pages/07-utgifterGjeld";
import OkonomiskeOpplysningerView from "./pages/08-vedlegg";
import Oppsummering from "./pages/09-oppsummering/Oppsummering";
import ExceptionThrower from "./pages/feilsider/ExceptionThrower";
import ServerFeil from "./pages/feilsider/ServerFeil";
import SideIkkeFunnet from "./pages/feilsider/SideIkkeFunnet";
import Informasjon from "./pages/hovedmeny";
import Behov from "./pages/kort/02-behov";
import {RedirectFromKort} from "./RedirectFromKort";
import DinSituasjon from "./pages/kort/03-situasjon";
import {BASE_PATH} from "./lib/constants";

import {useLocalStorageLangSelector} from "./lib/useLocalStorageLangSelector.ts";
import {injectDecoratorClientSide} from "@navikt/nav-dekoratoren-moduler";

const queryClient = new QueryClient();

export default function App() {
    useLocalStorageLangSelector();
    // FIXME: Injeksjon av dekoratoren på klientsiden er ikke optimalt
    injectDecoratorClientSide({
        env: "dev",
        params: {
            availableLanguages: [
                {locale: "nb", url: BASE_PATH, handleInApp: true},
                {locale: "nn", url: BASE_PATH, handleInApp: true},
                {locale: "en", url: BASE_PATH, handleInApp: true},
            ],
            simple: true,
            feedback: false,
            chatbot: false,
            shareScreen: false,
            logoutWarning: true,
        },
    });

    return (
        <Suspense fallback={<ApplicationSpinner />}>
            <ValideringsContextProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter basename={BASE_PATH}>
                        <Routes>
                            <Route errorElement={<SideIkkeFunnet />}>
                                <Route index path={`/`} element={<Informasjon />} />
                                <Route path={`informasjon`} loader={() => redirect("/", 301)} />
                                <Route path={`feil`} element={<ServerFeil />} />
                                <Route path={`kastException`} element={<ExceptionThrower />} />
                                <Route path={"skjema"}>
                                    <Route path="kort/:behandlingsId">
                                        <Route element={<RedirectFromKort />}>
                                            <Route
                                                index
                                                path="1"
                                                element={<Personopplysninger shortSpacing includeNextArrow />}
                                            />
                                            <Route path="2" element={<Behov />} />
                                            <Route path="3" element={<DinSituasjon />} />
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
                            </Route>{" "}
                        </Routes>
                    </BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ValideringsContextProvider>
        </Suspense>
    );
}
