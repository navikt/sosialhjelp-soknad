import * as React from "react";
import {useSelector} from "react-redux";
import {useIntl} from "react-intl";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {State} from "../redux/reducers";
import {useTitle} from "../../nav-soknad/hooks/useTitle";
import {NedetidPanel} from "../../components/common/NedetidPanel";
import {NySoknadPanel} from "./paneler/NySoknad";
import {PabegynteSoknaderPanel} from "./paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "./paneler/EttersendDokuPanel";
import {filterAndSortPabegynteSoknader} from "./paneler/pabegynteSoknaderUtils";

const Informasjon = () => {
    const harTilgang: boolean = !!useSelector((state: State) => state.soknad.tilgang?.harTilgang);
    useTitle(getIntlTextOrKey(useIntl(), "applikasjon.sidetittel"));
    const pabegynteSoknader = filterAndSortPabegynteSoknader(
        useSelector((state: State) => state.soknad.pabegynteSoknader),
        new Date()
    );

    React.useEffect(() => {
        skjulToppMeny();
    }, []);

    if (!harTilgang) return <IkkeTilgang />;

    return (
        <div className={"bg-green-500/20"}>
            <AppBanner />
            <NedetidPanel />
            <div className="max-w-3xl mx-auto space-y-5 lg:py-24">
                <NySoknadPanel antallPabegynteSoknader={pabegynteSoknader.length} />
                <PabegynteSoknaderPanel pabegynteSoknader={pabegynteSoknader} />
                <EttersendDokuPanel />
            </div>
        </div>
    );
};

export default Informasjon;
