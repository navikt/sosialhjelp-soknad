import React from "react";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import Accordion from "@navikt/ds-react/esm/accordion/Accordion";
import {NySoknad} from "./oversikt/NySoknad";
import {SendDokumentasjon} from "./oversikt/SendDokumentasjon";
import {PabegynteSoknader} from "./oversikt/PabegynteSoknader";

export const Soknadsoversikt = () => {
    return (
        <SkjemaContent style={{marginTop: "5rem"}}>
            <Accordion>
                <NySoknad />
                <PabegynteSoknader />
                <SendDokumentasjon />
            </Accordion>
        </SkjemaContent>
    );
};
