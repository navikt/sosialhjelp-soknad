import {useTranslations} from "next-intl";
import {addDays, formatDistance} from "date-fns";
import {getDateFnLocale} from "../../lib/i18n/dateFns.ts";
import {Label, LinkPanel} from "@navikt/ds-react";
import {LocalizedDate} from "../../lib/components/LocalizedDate.tsx";
import React from "react";
import {DAYS_BEFORE_DELETION} from "./PabegynteSoknader.tsx";

const getTimeBeforeDeletion = (sistOppdatert: string) =>
    formatDistance(addDays(new Date(sistOppdatert), DAYS_BEFORE_DELETION), new Date(), {
        locale: getDateFnLocale(),
        addSuffix: true,
    });

const getSoknadUri = (soknadId: string, isKort: boolean) =>
    `/sosialhjelp/soknad/skjema${isKort ? "/kort" : ""}/${soknadId}/1`;

export const PabegyntSoknadView = ({
    soknadId,
    sistOppdatert,
    isKort,
}: {
    soknadId: string;
    sistOppdatert: string;
    isKort: boolean;
}) => {
    const t = useTranslations("PabegyntSoknadView");
    return (
        <LinkPanel
            href={getSoknadUri(soknadId, isKort)}
            border
            className={"p-4! group text-[#222]! hover:text-[#000]!"}
        >
            <LinkPanel.Title as={"h3"} className={"flex flex-col lg:flex-row align-center"}>
                <Label style={{marginRight: "1rem"}}>
                    {t("sistOppdatert")} <LocalizedDate date={sistOppdatert} />
                </Label>
            </LinkPanel.Title>
            <LinkPanel.Description>{`${t("slettes")} ${getTimeBeforeDeletion(sistOppdatert)}`}</LinkPanel.Description>
        </LinkPanel>
    );
};
