"use client";
import {FileContent} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard, Heading, Label, LinkPanel} from "@navikt/ds-react";
import React from "react";
import {addDays, formatDistance} from "date-fns";
import {useTranslation} from "react-i18next";
import cx from "classnames";
import {LocalizedDate} from "../../../lib/components/LocalizedDate";
import {getDateFnLocale} from "../../../lib/i18n";
import {useAlgebraic} from "../../../lib/hooks/common/useAlgebraic";
import {useGetSessionInfo} from "../../../generated/client/informasjon-ressurs/informasjon-ressurs";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {logAmplitudeEvent} from "../../../lib/amplitude/Amplitude";
import {logWarning} from "../../../lib/log/loggerUtils";
//import {useAmplitude} from "../../../lib/amplitude/useAmplitude";

export const DAYS_BEFORE_DELETION = 14;

interface Props {
    behandlingsId: string;
    sistOppdatert: string;
    antallPabegynteSoknader: number;
    isKort: boolean;
}

const PabegyntSoknad = ({behandlingsId, sistOppdatert, antallPabegynteSoknader, isKort}: Props) => {
    //const {logEvent} = useAmplitude();
    const {t} = useTranslation("skjema");
    const expiryDate = addDays(new Date(sistOppdatert), DAYS_BEFORE_DELETION);
    return (
        <li>
            <LinkPanel
                href={`/sosialhjelp/soknad/skjema${isKort ? "/kort" : ""}/${behandlingsId}/1`}
                onClick={() =>
                    logAmplitudeEvent("Klikk på påbegynt søknad", {antallPabegynteSoknader}).catch((e) =>
                        logWarning(`Amplitude error: ${e}`)
                    )
                }
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
                        {formatDistance(expiryDate, new Date(), {
                            locale: getDateFnLocale(),
                            addSuffix: true,
                        })}
                    </BodyShort>
                </LinkPanel.Title>
            </LinkPanel>
        </li>
    );
};

const PabegynteSoknaderCount = ({className}: {className?: string}) => {
    const {expectOK} = useAlgebraic(useGetSessionInfo(), <TextPlaceholder lines={1} />);
    const {t} = useTranslation("skjema");

    return expectOK(({open}) =>
        open.length ? (
            <span className={cx("opacity-70 font-normal", className)}>
                {open.length === 1
                    ? `1 ${t("applikasjon.paabegynt.soknad.stringValue")}`
                    : `${open.length} ${t("applikasjon.paabegynt.soknad.flertall")}`}
            </span>
        ) : null
    );
};

export const PabegynteSoknaderPanel = () => {
    const {data: session} = useGetSessionInfo();
    const openSoknader = session?.open;

    const {t} = useTranslation("skjema");

    if (!openSoknader?.length) return null;

    return (
        <ExpansionCard aria-label={t("applikasjon.fortsett.soknad")}>
            <ExpansionCard.Header className={"!border-0 [&>button]:my-auto"}>
                <div className={"flex flex-row items-center gap-6"}>
                    <div
                        className={
                            "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                        }
                    >
                        <FileContent className={"w-6 h-6"} aria-hidden="true" />
                    </div>
                    <div className={""}>
                        <Heading level={"2"} size={"small"}>
                            {t("applikasjon.fortsett.soknad")}
                        </Heading>
                        <PabegynteSoknaderCount />
                    </div>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={"!border-0"}>
                <BodyShort className={"pb-4"}>
                    {t("applikasjon.paabegynt.soknad.informasjon", {
                        DAYS_BEFORE_DELETION,
                    })}
                </BodyShort>
                <ul className={"space-y-4"}>
                    {openSoknader?.map(({behandlingsId, sistOppdatert, isKort}) => (
                        <PabegyntSoknad
                            key={behandlingsId}
                            behandlingsId={behandlingsId}
                            sistOppdatert={sistOppdatert}
                            isKort={isKort}
                            antallPabegynteSoknader={openSoknader.length}
                        />
                    ))}
                </ul>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
