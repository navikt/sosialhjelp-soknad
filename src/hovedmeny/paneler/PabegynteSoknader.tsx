import {FileContent} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard, Label, LinkPanel} from "@navikt/ds-react";
import React from "react";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {addDays, formatDistance} from "date-fns";
import {basePath} from "../../configuration";
import TextPlaceholder from "../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../generated/informasjon-ressurs/informasjon-ressurs";
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
                className={"!p-4 group !text-[#222] hover:!text-[#000]"}
            >
                <LinkPanel.Title
                    className={
                        "flex flex-col !text-[#222] group-hover:!text-[#000] lg:flex-row align-center !no-underline"
                    }
                >
                    <Label style={{marginRight: "1rem"}}>
                        {t("applikasjon.paabegynt.soknad.sist.oppdatert")} <LocalizedDate date={sistOppdatert} />
                    </Label>
                    <BodyShort className={"!active:no-underline"}>
                        {t("applikasjon.paabegynt.soknad.slettes")}{" "}
                        {formatDistance(expiryDate, new Date(), {locale: getDateFnLocale(), addSuffix: true})}
                    </BodyShort>
                </LinkPanel.Title>
            </LinkPanel>
        </li>
    );
};

const PabegynteSoknaderCount = () => {
    const {data: session} = useGetSessionInfo();
    const num = session?.open?.length;

    const {t} = useTranslation("skjema");

    if (num === undefined) return <TextPlaceholder lines={1} />;

    if (num === 0) return null;

    return (
        <span className={"opacity-70 font-normal"}>
            {num === 1
                ? `1 ${t("applikasjon.paabegynt.soknad")}`
                : `${num} ${t("applikasjon.paabegynt.soknad.flertall")}`}
        </span>
    );
};

export const PabegynteSoknaderPanel = () => {
    const {data: session} = useGetSessionInfo();
    const openSoknader = session?.open;

    const {t} = useTranslation("skjema");

    if (!openSoknader?.length) return null;

    return (
        <ExpansionCard aria-label={t("applikasjon.fortsett.soknad")}>
            <ExpansionCard.Header className={"!border-0"}>
                <ExpansionCard.Title className={"flex flex-row items-center gap-6 pb-2"}>
                    <div
                        className={
                            "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                        }
                    >
                        <FileContent className={"w-6 h-6"} aria-hidden="true" />
                    </div>
                    <div>
                        {t("applikasjon.fortsett.soknad")}
                        <br />
                        <PabegynteSoknaderCount />
                    </div>
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={"!border-0"}>
                <BodyShort className={"pb-4"}>
                    {t("applikasjon.paabegynt.soknad.informasjon", {
                        DAYS_BEFORE_DELETION,
                    })}
                </BodyShort>
                <ul className={"space-y-4"}>
                    {openSoknader?.map(({behandlingsId, sistOppdatert}) => (
                        <PabegyntSoknad
                            key={behandlingsId}
                            behandlingsId={behandlingsId}
                            sistOppdatert={sistOppdatert}
                            antallPabegynteSoknader={openSoknader.length}
                        />
                    ))}
                </ul>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
