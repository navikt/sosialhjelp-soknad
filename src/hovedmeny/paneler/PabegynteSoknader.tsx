import {FileContent} from "@navikt/ds-icons";
import {Accordion, BodyShort, Heading, Label, LinkPanel} from "@navikt/ds-react";
import React from "react";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {addDays, formatDistance} from "date-fns";
import {basePath} from "../../configuration";
import TextPlaceholder from "../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {useTranslation} from "react-i18next";
import {useHentPabegynteSoknader} from "../../generated/informasjon-ressurs/informasjon-ressurs";
import {LocalizedDate} from "../../components/LocalizedDate";
import {getDateFnLocale} from "../../i18n";

export const DAYS_BEFORE_DELETION = 14;

const PabegyntSoknad = ({
    behandlingsId,
    sistOppdatert,
    antallPabegynteSoknader,
}: {
    behandlingsId: string;
    sistOppdatert: string;
    antallPabegynteSoknader: number;
}) => {
    const {t} = useTranslation("skjema");
    const lastUpdate = new Date(sistOppdatert);
    const expiryDate = addDays(lastUpdate, DAYS_BEFORE_DELETION);
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
                        {t("applikasjon.paabegynt.soknad.sist.oppdatert")} <LocalizedDate date={sistOppdatert} />
                    </Label>
                    <BodyShort>
                        {t("applikasjon.paabegynt.soknad.slettes")}{" "}
                        {formatDistance(expiryDate, new Date(), {locale: getDateFnLocale(), addSuffix: true})}
                    </BodyShort>
                </LinkPanel.Title>
            </LinkPanel>
        </li>
    );
};

const PabegynteSoknaderCount = () => {
    const {data: pabegynteSoknader} = useHentPabegynteSoknader();
    const num = pabegynteSoknader?.length;

    const {t} = useTranslation("skjema");

    if (num === undefined) return <TextPlaceholder lines={1} />;

    if (num === 0) return null;

    return (
        <span className={"opacity-70 lg:pl-4 font-normal"}>
            {num === 1
                ? `1 ${t("applikasjon.paabegynt.soknad")}`
                : `${num} ${t("applikasjon.paabegynt.soknad.flertall")}`}
        </span>
    );
};

export const PabegynteSoknaderPanel = () => {
    const {data: pabegynteSoknaderResponse} = useHentPabegynteSoknader();

    const {t} = useTranslation("skjema");

    if (!pabegynteSoknaderResponse?.length) return null;

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
                            {t("applikasjon.fortsett.soknad")}
                            <PabegynteSoknaderCount />
                        </Heading>
                    </div>
                </Accordion.Header>
                <Accordion.Content className={"!px-0 !border-0"}>
                    <div className={"p-8 lg:pl-24"}>
                        <BodyShort className={"pb-4"}>
                            {t("applikasjon.paabegynt.soknad.informasjon", {
                                DAYS_BEFORE_DELETION,
                            })}
                        </BodyShort>
                        <ul className={"space-y-4"}>
                            {pabegynteSoknaderResponse?.map(({behandlingsId, sistOppdatert}) => (
                                <PabegyntSoknad
                                    key={behandlingsId}
                                    behandlingsId={behandlingsId}
                                    sistOppdatert={sistOppdatert}
                                    antallPabegynteSoknader={pabegynteSoknaderResponse.length}
                                />
                            ))}
                        </ul>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
