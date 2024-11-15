"use client";
import {FileContent} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard} from "@navikt/ds-react";
import React from "react";
import {useTranslation} from "react-i18next";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {PabegyntSoknad} from "./PabegyntSoknad.tsx";

export const DAYS_BEFORE_DELETION = 14;

export const PabegynteSoknaderPanel = () => {
    const {data: session} = useGetSessionInfo();
    const openSoknader = session?.open;
    const count = openSoknader?.length;

    const {t} = useTranslation("skjema");

    if (!count) return null;

    return (
        <ExpansionCard aria-label={t("applikasjon.fortsett.soknad")}>
            <ExpansionCard.Header className={"!border-0 [&>button]:my-auto"}>
                <div className={"flex flex-row items-center gap-6"}>
                    <div
                        className={
                            "rounded-full bg-green-500/40 w-11 h-11 justify-center items-center tw-hidden lg:flex"
                        }
                        aria-hidden="true"
                    >
                        <FileContent className={"w-6 h-6"} />
                    </div>
                    <div>
                        <ExpansionCard.Title as={"h2"} className={"!m-0"} size={"small"}>
                            {t("applikasjon.fortsett.soknad")}
                        </ExpansionCard.Title>
                        <ExpansionCard.Description className={"opacity-70"}>
                            {t("applikasjon.paabegynt.soknader", {count})}
                        </ExpansionCard.Description>
                    </div>
                </div>
            </ExpansionCard.Header>
            <ExpansionCard.Content
                className={"!border-0"}
                aria-describedby={"pabegynt-description"}
                aria-label={t("applikasjon.paabegynt.soknader", {count})}
            >
                <BodyShort id={"pabegynt-description"} className={"pb-4"}>
                    {t("applikasjon.paabegynt.informasjon", {DAYS_BEFORE_DELETION})}
                </BodyShort>
                <div className={"flex gap-2 flex-col"}>
                    {openSoknader?.map(({behandlingsId, sistOppdatert, isKort}) => (
                        <PabegyntSoknad
                            key={behandlingsId}
                            behandlingsId={behandlingsId}
                            sistOppdatert={sistOppdatert}
                            isKort={isKort}
                            antallPabegynteSoknader={openSoknader.length}
                        />
                    ))}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
