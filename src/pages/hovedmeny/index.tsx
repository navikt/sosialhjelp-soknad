import * as React from "react";
import {PersonbeskyttelseFeilmelding} from "./PersonbeskyttelseFeilmelding";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {useTitle} from "../../lib/hooks/common/useTitle";
import {logInfo} from "../../lib/utils/loggerUtils";
import {NedetidPanel} from "../../lib/components/NedetidPanel";
import {isLocalhost} from "../../lib/utils";
import {DeveloperToolkit} from "../../lib/components/appHeader/DeveloperToolkit";
import {AppHeader} from "../../lib/components/appHeader/AppHeader";

export const Informasjon = () => {
    const {expectOK} = useAlgebraic(useGetSessionInfo());
    const {t} = useTranslation();
    useTitle(t("applikasjon.sidetittel"));
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

    return expectOK(({userBlocked, open}) =>
        userBlocked ? (
            <PersonbeskyttelseFeilmelding />
        ) : (
            <div className={"bg-digisosGronnBakgrunn grow"}>
                <NedetidPanel varselType={"infoside"} />
                {isLocalhost(window.location.href) && <DeveloperToolkit />}
                <div className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 max-lg:px-2 py-6 lg:gap-16 lg:py-16 flex flex-col grow">
                    <AppHeader className={"bg-transparent lg:!text-heading-xlarge !w-full !p-0 !text-left"} />
                    <div className={"space-y-5"}>
                        <NySoknadPanel defaultOpen={open?.length === 0} />
                        <PabegynteSoknaderPanel />
                        <EttersendDokuPanel />
                    </div>
                </div>
            </div>
        )
    );
};
export default Informasjon;
