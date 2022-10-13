import * as React from "react";
import {useSelector} from "react-redux";
import IkkeTilgang from "./feilmld/IkkeTilgang";
import {State} from "../redux/reducers";
import {NedetidAlert} from "./feilmld/nedetidAlert";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import Accordion from "@navikt/ds-react/esm/accordion/Accordion";
import {NySoknad} from "./oversikt/NySoknad";
import {PabegynteSoknader} from "./oversikt/PabegynteSoknader";
import {SendDokumentasjon} from "./oversikt/SendDokumentasjon";

const Informasjon = () => {
    if (!useSelector((state: State) => state.soknad.tilgang?.harTilgang)) return <IkkeTilgang />;

    return (
        <SkjemaContent style={{marginTop: "5rem"}}>
            <NedetidAlert />
            <Accordion>
                <NySoknad />
                <PabegynteSoknader />
                <SendDokumentasjon />
            </Accordion>
        </SkjemaContent>
    );
};

export default Informasjon;
