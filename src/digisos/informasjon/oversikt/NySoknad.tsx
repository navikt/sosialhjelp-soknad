import AccordionItem from "@navikt/ds-react/esm/accordion/AccordionItem";
import {Notes} from "@navikt/ds-icons";
import {Heading} from "@navikt/ds-react";
import AccordionContent from "@navikt/ds-react/esm/accordion/AccordionContent";
import React from "react";
import {AccordionHeaderOversikt} from "./AccordionHeaderOversikt";
import {NySoknadInformasjonSide} from "../NySoknadInformasjonSide";

export const NySoknad = () => (
    <AccordionItem>
        <AccordionHeaderOversikt ikon={<Notes style={{padding: ".15rem"}} />}>
            <Heading level="2" size="small">
                Start en ny søknad
            </Heading>
        </AccordionHeaderOversikt>
        <AccordionContent>
            <NySoknadInformasjonSide />
        </AccordionContent>
    </AccordionItem>
);
