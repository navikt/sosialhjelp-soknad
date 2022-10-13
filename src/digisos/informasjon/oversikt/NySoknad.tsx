import {filterAndSortPabegynteSoknader} from "../pabegynteSoknaderUtils";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import AccordionItem from "@navikt/ds-react/esm/accordion/AccordionItem";
import {Notes} from "@navikt/ds-icons";
import {Heading} from "@navikt/ds-react";
import AccordionContent from "@navikt/ds-react/esm/accordion/AccordionContent";
import {NySoknadInformasjonSide} from "../index";
import React from "react";
import {AccordionHeaderOversikt} from "./AccordionHeaderOversikt";

export const NySoknad = () => {
    const antallPabegynteSoknader = filterAndSortPabegynteSoknader(
        useSelector((state: State) => state.soknad.pabegynteSoknader),
        new Date()
    ).length;

    return (
        <AccordionItem>
            <AccordionHeaderOversikt ikon={<Notes style={{padding: ".15rem"}} />}>
                <Heading level="2" size="small">
                    Start en ny søknad
                </Heading>
            </AccordionHeaderOversikt>
            <AccordionContent>
                <NySoknadInformasjonSide antallPabegynteSoknader={antallPabegynteSoknader} />
            </AccordionContent>
        </AccordionItem>
    );
};
