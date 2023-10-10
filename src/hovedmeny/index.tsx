import * as React from "react";
import {getIntlTextOrKey, isLocalhost} from "../nav-soknad/utils";
import {PersonbeskyttelseFeilmelding} from "./PersonbeskyttelseFeilmelding";
import AppBanner from "../nav-soknad/components/appHeader/AppHeader";
import {useTitle} from "../lib/hooks/useTitle";
import {NedetidPanel} from "../components/common/NedetidPanel";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../generated/informasjon-ressurs/informasjon-ressurs";
import {useAlgebraic} from "../lib/hooks/useAlgebraic";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {logInfo} from "../nav-soknad/utils/loggerUtils";
import {DeveloperToolkit} from "../nav-soknad/components/appHeader/DeveloperToolkit";

const Informasjon = () => {
    const {expectOK} = useAlgebraic(useGetSessionInfo());
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
    //  <div className={"bg-gradient-to-b from-digisosGronnBakgrunnTop to-digisosGronnBakgrunnBottom grow"}>
    return expectOK(({userBlocked}) =>
        userBlocked ? (
            <PersonbeskyttelseFeilmelding />
        ) : (
            <div className={"bg-digisosGronnLys grow"}>
                <NedetidPanel varselType={"infoside"} />
                {false && isLocalhost(window.location.href) && <DeveloperToolkit />}
                <div className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 max-lg:px-2 py-6 lg:gap-16 lg:py-16 flex flex-col grow">
                    <AppBanner className={"bg-transparent lg:!text-heading-xlarge !w-full !p-0 !text-left"} />

                    <div className={"space-y-5"}>
                        <NySoknadPanel />
                        <PabegynteSoknaderPanel />
                        <EttersendDokuPanel />
                    </div>
                </div>
            </div>
        )
    );
};

export default Informasjon;
