"use client";
import {FileContent} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard} from "@navikt/ds-react";
import React from "react";
import {useTranslations} from "next-intl";
import {useGetSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs";
import {PabegyntSoknad} from "./PabegyntSoknad.tsx";
import {HovedmenyCardHeader} from "./HovedmenyCardHeader.tsx";

export const DAYS_BEFORE_DELETION = 14;

export const PabegynteSoknaderPanel = () => {
    const {data: session} = useGetSessionInfo();
    const openSoknader = session?.open;
    const count = openSoknader?.length;

    const t = useTranslations("PabegynteSoknaderPanel");

    if (!count) return null;

    return (
        <ExpansionCard aria-labelledby={"pabegyntesoknader-title"}>
            <HovedmenyCardHeader icon={<FileContent className={"w-6 h-6"} />}>
                <ExpansionCard.Title id={"pabegyntesoknader-title"} as={"h2"} className={"!m-0"} size={"small"}>
                    {t("title")}
                </ExpansionCard.Title>
                <ExpansionCard.Description className={"opacity-70"}>
                    {t("pabegynte", {count})}
                </ExpansionCard.Description>
            </HovedmenyCardHeader>
            <ExpansionCard.Content
                className={"!border-0"}
                aria-describedby={"pabegynt-description"}
                aria-label={t("pabegynte", {count})}
            >
                <BodyShort id={"pabegynt-description"} className={"pb-4"}>
                    {t("slettesEtter", {DAYS_BEFORE_DELETION})}
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
