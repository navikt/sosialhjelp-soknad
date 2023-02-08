import * as React from "react";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {useTitle} from "../../nav-soknad/hooks/useTitle";
import {NedetidPanel} from "../../components/common/NedetidPanel";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useTranslation} from "react-i18next";
import {useGetUtslagskriterier} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {useAlgebraic} from "../../lib/hooks/useAlgebraic";

const Informasjon = () => {
    const {expectOK} = useAlgebraic(useGetUtslagskriterier());
    const {t} = useTranslation();
    useTitle(getIntlTextOrKey(t, "applikasjon.sidetittel"));

    return expectOK(({harTilgang}) => {
        if (!harTilgang) return <IkkeTilgang />;

        return (
            <div className={"bg-green-500/20 flex flex-col"}>
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
