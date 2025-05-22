"use client";
import {FileContent} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard} from "@navikt/ds-react";
import React from "react";
import {useTranslations} from "next-intl";
import {PabegyntSoknadView} from "./PabegyntSoknadView.tsx";
import {EXPANSION_CARD_BORDER_STYLE_HACK, HovedmenyCardHeader} from "./HovedmenyCardHeader.tsx";
import {useContextSessionInfo} from "../../lib/providers/useContextSessionInfo.ts";
import {PabegyntSoknad} from "../../generated/model";

export const DAYS_BEFORE_DELETION = 14;

export const PabegynteSoknaderPanel = () => {
    const {open} = useContextSessionInfo();
    const count = open?.length;

    const t = useTranslations("PabegynteSoknaderPanel");

    if (!count) return null;

    return (
        <ExpansionCard style={EXPANSION_CARD_BORDER_STYLE_HACK} aria-labelledby={"pabegyntesoknader-title"}>
            <HovedmenyCardHeader icon={<FileContent className={"w-6 h-6"} />}>
                <ExpansionCard.Title id={"pabegyntesoknader-title"} as={"h2"} className={"m-0!"} size={"small"}>
                    {t("title")}
                </ExpansionCard.Title>
                <ExpansionCard.Description className={"opacity-70 m-0!"}>
                    {t("pabegynte", {count})}
                </ExpansionCard.Description>
            </HovedmenyCardHeader>
            <ExpansionCard.Content
                className={"border-0!"}
                aria-describedby={"pabegynt-description"}
                aria-label={t("pabegynte", {count})}
            >
                <BodyShort id={"pabegynt-description"} className={"pb-4"}>
                    {t("slettesEtter", {count: DAYS_BEFORE_DELETION.toString()})}
                </BodyShort>
                <div className={"flex gap-2 flex-col"}>
                    {/*
                        Midlertidig hack for å gjøre backend fri til å migrere til "soknadId".
                        Når back-end er ajour, kan dette forenkles til
                        {open?.map(({soknadId, sistOppdatert, isKort}) => <PabegyntSoknadView ... />)}
                    */}
                    {open?.map((pabegyntSoknad: PabegyntSoknad & {soknadId?: string}) => {
                        const {sistOppdatert, isKort} = pabegyntSoknad;
                        const soknadId = pabegyntSoknad.soknadId;

                        return (
                            <PabegyntSoknadView
                                key={soknadId}
                                soknadId={soknadId}
                                sistOppdatert={sistOppdatert}
                                isKort={isKort}
                                antallPabegynteSoknader={open.length}
                            />
                        );
                    })}
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
