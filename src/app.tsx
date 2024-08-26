"use client";

import {Suspense} from "react";
import {ValideringsContextProvider} from "./lib/valideringContextProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, redirect, Route, Routes} from "react-router-dom";
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
import ExceptionThrower from "./sider/feilsider/ExceptionThrower";
import ServerFeil from "./sider/feilsider/ServerFeil";
import SideIkkeFunnet from "./sider/feilsider/SideIkkeFunnet";
import Informasjon from "./sider/hovedmeny";
import Behov from "./sider/kort/02-behov";
import {RedirectFromKort} from "./RedirectFromKort";
import DinSituasjon from "./sider/kort/03-situasjon";
import {BASE_PATH} from "./lib/constants";

import {useLocalStorageLangSelector} from "./lib/useLocalStorageLangSelector.ts";

const queryClient = new QueryClient();

export default function App() {
    useLocalStorageLangSelector();

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
