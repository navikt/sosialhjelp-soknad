import {FileProgress} from "@navikt/ds-icons";
import {Accordion, BodyShort, Heading, Label, LinkPanel} from "@navikt/ds-react";
import React from "react";
import {DAYS_BEFORE_DELETION} from "./pabegynteSoknaderUtils";
import type {PabegyntSoknadData} from "./pabegynteSoknaderUtils";
import {useHistory} from "react-router";
import {logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {format, formatDistance} from "date-fns";
import {nb} from "date-fns/locale";

const PabegyntSoknad = ({
    behandlingsId,
    lastUpdatedDate,
    deleteDate,
    currentDate,
    antallPabegynteSoknader,
}: {
    behandlingsId: string;
    lastUpdatedDate: Date;
    currentDate: Date;
    deleteDate: Date;
    antallPabegynteSoknader: number;
}) => {
    const history = useHistory();

    const onPabegyntSoknadClick = (event: React.SyntheticEvent, href: string) => {
        event.preventDefault();
        logAmplitudeEvent("Klikk på påbegynt søknad", {
            antallPabegynteSoknader,
        });
        history.push(href);
    };

    return (
        <li>
            <LinkPanel
                href={`skjema/${behandlingsId}/1`}
                onClick={(event) => onPabegyntSoknadClick(event, `skjema/${behandlingsId}/1`)}
                border
                className={"!p-4"}
            >
                <LinkPanel.Title className={"flex flex-col lg:flex-row align-center"}>
                    <Label style={{marginRight: "1rem"}}>
                        Sist oppdatert {format(lastUpdatedDate, "d MMM yyyy", {locale: nb})}
                    </Label>
                    <BodyShort>Slettes om {formatDistance(deleteDate, currentDate, {locale: nb})}</BodyShort>
                </LinkPanel.Title>
            </LinkPanel>
        </li>
    );
};

const PabegynteSoknaderCount = ({num}: {num: number}) => {
    const className = "opacity-70 lg:pl-4 font-normal";

    if (!num) return null;

    if (num === 1) return <span className={className}>1 påbegynt søknad</span>;

    return <span className={className}>{num} påbegynte søknader</span>;
};

export const PabegynteSoknaderTitle = ({antallPabegynteSoknader}: {antallPabegynteSoknader: number}) => (
    <div className={"flex flex-row items-center px-4 py-2"}>
        <div className={"rounded-full bg-green-500/40 p-3 mr-5 tw-hidden lg:block"}>
            <FileProgress className={"w-9 h-9"} />
        </div>
        <Heading level="2" size="small" className={"flex flex-col lg:flex-row"}>
            Fortsett på en påbegynt søknad
            <PabegynteSoknaderCount num={antallPabegynteSoknader} />
        </Heading>
    </div>
);

export const PabegynteSoknaderPanel = ({pabegynteSoknader}: {pabegynteSoknader: PabegyntSoknadData[]}) => {
    return (
        <Accordion>
            <Accordion.Item className={"bg-white rounded-md border-[1px]"}>
                <Accordion.Header className={"!items-center !border-0"}>
                    <PabegynteSoknaderTitle antallPabegynteSoknader={pabegynteSoknader.length} />
                </Accordion.Header>
                <Accordion.Content className={"!px-0 !border-0"}>
                    <div className={"p-4 lg:pl-24"}>
                        <BodyShort className={"pb-4"}>
                            Vær oppmerksom på at påbegynte søknader slettes etter {DAYS_BEFORE_DELETION} dager.
                        </BodyShort>
                        <ul>
                            {pabegynteSoknader.map(({lastUpdatedDate, deleteDate, behandlingsId}) => (
                                <PabegyntSoknad
                                    key={behandlingsId}
                                    lastUpdatedDate={lastUpdatedDate}
                                    deleteDate={deleteDate}
                                    behandlingsId={behandlingsId}
                                    antallPabegynteSoknader={pabegynteSoknader.length}
                                    currentDate={new Date()}
                                />
                            ))}
                        </ul>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
