import * as React from "react";
import {getIntlTextOrKey} from "../nav-soknad/utils";
import {PersonbeskyttelseFeilmelding} from "./PersonbeskyttelseFeilmelding";
import AppBanner from "../nav-soknad/components/appHeader/AppHeader";
import {useTitle} from "../lib/hooks/useTitle";
import {NedetidPanel} from "../components/common/NedetidPanel";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useTranslation} from "react-i18next";
import {useGetUtslagskriterier} from "../generated/informasjon-ressurs/informasjon-ressurs";
import {useAlgebraic} from "../lib/hooks/useAlgebraic";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {logInfo} from "../nav-soknad/utils/loggerUtils";

const Informasjon = () => {
    const {expectOK} = useAlgebraic(useGetUtslagskriterier());
    const {t} = useTranslation();
    useTitle(getIntlTextOrKey(t, "applikasjon.sidetittel"));
    const [searchParams, setSearchParams] = useSearchParams();

    // Tanken her er at reason-parameteret i fremtiden vil kunne brukes for
    // logging og et panel som forklarer hvorfor brukere har endt opp her. Alt
    // vi gjør så langt er bare å fjerne parameteret om der Men det kan kanskje
    // bedre løses ved å logge før brukeren sendes videre...?
    useEffect(() => {
        const reason = searchParams.get("reason");
        if (!reason) return;
        logInfo(`Reached main page with reason, ${reason}`);
        setSearchParams({});
    }, [searchParams, setSearchParams]);

    return expectOK(({harTilgang}) =>
        harTilgang ? (
            <div className={"bg-digisosGronnBakgrunn flex flex-col"}>
                <AppBanner />
                <NedetidPanel varselType={"infoside"} />
                <div className="max-w-lg lg:max-w-3xl w-full mx-auto space-y-5 pt-12 lg:pt-24 pb-48">
                    <NySoknadPanel />
                    <PabegynteSoknaderPanel />
                    <EttersendDokuPanel />
                </div>
            </div>
        ) : (
            <PersonbeskyttelseFeilmelding />
        )
    );
};

export default Informasjon;
