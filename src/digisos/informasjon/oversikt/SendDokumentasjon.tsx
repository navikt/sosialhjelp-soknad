import AccordionItem from "@navikt/ds-react/esm/accordion/AccordionItem";
import {Attachment} from "@navikt/ds-icons";
import {BodyShort, Heading, Link} from "@navikt/ds-react";
import AccordionContent from "@navikt/ds-react/esm/accordion/AccordionContent";
import {getInnsynUrl} from "../../../nav-soknad/utils/rest-utils";
import React from "react";
import {AccordionHeaderOversikt} from "./AccordionHeaderOversikt";

export const SendDokumentasjon = () => (
    <AccordionItem>
        <AccordionHeaderOversikt ikon={<Attachment />}>
            <Heading level="2" size="small">
                Send dokumentasjon til en innsendt søknad
            </Heading>
            <BodyShort>Dokumentasjon kan sendes til søknader du har sendt inn tidligere.</BodyShort>
        </AccordionHeaderOversikt>
        <AccordionContent>
            <ul>
                <li>
                    Gå til listen over <Link href={getInnsynUrl()}>dine sosialhjelpssøknader</Link>
                </li>
                <li>Åpne søknaden du ønsker å ettersende dokumenter til</li>
                <li>Last opp dokumentene du skal ettersende under “dine vedlegg”</li>
            </ul>
        </AccordionContent>
    </AccordionItem>
);
