import {FileContent} from "@navikt/ds-icons";
import {Accordion, BodyShort, Heading, Label, LinkPanel} from "@navikt/ds-react";
import React from "react";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {format, formatDistance} from "date-fns";
import {nb} from "date-fns/locale";
import {basePath} from "../../configuration";
import {DAYS_BEFORE_DELETION, usePabegynteSoknader} from "../usePabegynteSoknader";
import TextPlaceholder from "../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";

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
    const onPabegyntSoknadClick = (event: React.SyntheticEvent, href: string) => {
        event.preventDefault();
        logAmplitudeEvent("Klikk på påbegynt søknad", {
            antallPabegynteSoknader,
        });
        window.location.href = href;
    };

    return (
        <li>
            <LinkPanel
                href={`${basePath}/skjema/${behandlingsId}/1`}
                onClick={(event) => onPabegyntSoknadClick(event, `${basePath}/skjema/${behandlingsId}/1`)}
                border
                className={"!p-4"}
            >
                <LinkPanel.Title className={"flex flex-col lg:flex-row align-center"}>
                    <Label style={{marginRight: "1rem"}}>
                        Sist oppdatert {format(lastUpdatedDate, "d. MMMM H  HH:mm", {locale: nb})}
                    </Label>
                    <BodyShort>Slettes om {formatDistance(deleteDate, currentDate, {locale: nb})}</BodyShort>
                </LinkPanel.Title>
            </LinkPanel>
        </li>
    );
};

const PabegynteSoknaderCount = () => {
    const num = usePabegynteSoknader()?.length;

    if (num === undefined) return <TextPlaceholder lines={1} />;

    if (num === 0) return null;

    return (
        <span className={"opacity-70 lg:pl-4 font-normal"}>
            {num === 1 ? `1 påbegynt søknad` : `${num} påbegynte søknader`}
        </span>
    );
};

export const PabegynteSoknaderPanel = () => {
    const pabegynteSoknader = usePabegynteSoknader();

    if (!pabegynteSoknader?.length) return null;

    return (
        <Accordion>
            <Accordion.Item className={"bg-white rounded-md"}>
                <Accordion.Header className={"!items-center !border-0 !py-6 !px-8 rounded-t-md"}>
                    <div className={"flex flex-row items-center gap-8"}>
                        <div
                            className={
                                "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                            }
                        >
                            <FileContent className={"w-6 h-6"} aria-hidden="true" />
                        </div>
                        <Heading level="2" size="small" className={"flex flex-col lg:flex-row"}>
                            Fortsett på en påbegynt søknad
                            <PabegynteSoknaderCount />
                        </Heading>
                    </div>
                </Accordion.Header>
                <Accordion.Content className={"!px-0 !border-0"}>
                    <div className={"p-8 lg:pl-24"}>
                        <BodyShort className={"pb-4"}>
                            Vær oppmerksom på at påbegynte søknader slettes etter {DAYS_BEFORE_DELETION} dager.
                        </BodyShort>
                        <ul className={"space-y-4"}>
                            {pabegynteSoknader?.map(({lastUpdatedDate, deleteDate, behandlingsId}) => (
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
