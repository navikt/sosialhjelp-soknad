import * as React from "react";
import {getIntlTextOrKey} from "../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
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

    useEffect(() => {
        const reason = searchParams.get("reason");
        if (!reason) return;
        logInfo(`Reached main page with reason, ${reason}`);
        setSearchParams({});
    }, [searchParams]);

    return expectOK(({harTilgang}) => {
        if (!harTilgang) return <IkkeTilgang />;

        return (
            <div className={"bg-digisosGronnBakgrunn flex flex-col"}>
                <AppBanner />
                <NedetidPanel varselType={"infoside"} />
                <div className="max-w-lg lg:max-w-3xl w-full mx-auto space-y-5 pt-12 lg:pt-24 pb-48">
                    <NySoknadPanel />
                    <PabegynteSoknaderPanel />
                    <EttersendDokuPanel />
                </div>
            </div>
        );
    });
};

export default Informasjon;
