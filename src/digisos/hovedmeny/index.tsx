import * as React from "react";
import {useSelector} from "react-redux";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {State} from "../redux/reducers";
import {useTitle} from "../../nav-soknad/hooks/useTitle";
import {NedetidPanel} from "../../components/common/NedetidPanel";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {useTranslation} from "react-i18next";

const Informasjon = () => {
    const harTilgang: boolean = !!useSelector((state: State) => state.soknad.tilgang?.harTilgang);
    useTitle(getIntlTextOrKey(useTranslation().t, "applikasjon.sidetittel"));

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
};

export default Informasjon;
