import {DAYS_BEFORE_DELETION, filterAndSortPabegynteSoknader} from "../filterAndSortPabegynteSoknader";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {useHistory} from "react-router";
import React from "react";
import {logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import AccordionItem from "@navikt/ds-react/esm/accordion/AccordionItem";
import {FileProgress} from "@navikt/ds-icons";
import {BodyShort, Heading, Label, LinkPanel} from "@navikt/ds-react";
import AccordionContent from "@navikt/ds-react/esm/accordion/AccordionContent";
import {format, formatDistance} from "date-fns";
import {nb} from "date-fns/locale";
import {AccordionHeaderOversikt} from "./AccordionHeaderOversikt";

interface PabegyntSoknadProps {
    soknad: {behandlingsId: string; sistOppdatert: Date; deleteDate: Date};
    onClick: (event: React.SyntheticEvent, href: string) => any;
}

const PabegyntSoknad = ({soknad: {sistOppdatert, deleteDate, behandlingsId}, onClick}: PabegyntSoknadProps) => (
    <LinkPanel
        href={`skjema/${behandlingsId}/1`}
        onClick={(event) => onClick(event, `skjema/${behandlingsId}/1`)}
        border
    >
        <LinkPanel.Title>
            <Label style={{display: "inline", marginRight: "1rem"}}>
                Sist oppdatert {format(sistOppdatert, "d MMM yyyy", {locale: nb})}
            </Label>
            <BodyShort style={{display: "inline"}}>
                Slettes om {formatDistance(deleteDate, new Date(), {locale: nb})}
            </BodyShort>
        </LinkPanel.Title>
    </LinkPanel>
);

export const PabegynteSoknader = () => {
    const pabegynteSoknader = filterAndSortPabegynteSoknader(
        useSelector((state: State) => state.soknad.pabegynteSoknader),
        new Date()
    );

    const history = useHistory();

    const onPabegyntSoknadClick = (event: React.SyntheticEvent, href: string) => {
        event.preventDefault();
        logAmplitudeEvent("Klikk på påbegynt søknad", {
            antallPabegynteSoknader: pabegynteSoknader.length,
        });
        history.push(href);
    };

    return (
        <AccordionItem>
            <AccordionHeaderOversikt ikon={<FileProgress />}>
                <Heading level="2" size="small">
                    Fortsett på en påbegynt søknad
                </Heading>
                <BodyShort>
                    Du har {pabegynteSoknader.length} påbegynte søknader. <br />
                    Vær oppmerksom på at disse slettes etter {DAYS_BEFORE_DELETION} dager.
                </BodyShort>
            </AccordionHeaderOversikt>
            <AccordionContent>
                {pabegynteSoknader.map((s) => (
                    <PabegyntSoknad key={s.behandlingsId} soknad={s} onClick={onPabegyntSoknadClick} />
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};
