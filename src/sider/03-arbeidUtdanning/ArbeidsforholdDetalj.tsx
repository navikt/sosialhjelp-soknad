import {useTranslation} from "react-i18next";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo.tsx";
import {BodyShort} from "@navikt/ds-react";
import {LocalizedDate} from "../../lib/components/LocalizedDate.tsx";
import * as React from "react";
import {ArbeidsforholdDto} from "../../generated/new/model/arbeidsforholdDto.ts";

export const ArbeidsforholdDetalj = ({arbeidsforhold}: {arbeidsforhold: ArbeidsforholdDto}) => {
    const {arbeidsgivernavn, fastStillingsprosent, start, slutt} = arbeidsforhold;
    const {t} = useTranslation("skjema");

    return (
        <Systeminfo>
            <BodyShort className={"pb-3"}>{t("arbeidsforhold.infotekst_del1")}</BodyShort>
            <SysteminfoItem as="div" label={t("arbeidsforhold.arbeidsgivernavn.label")}>
                {arbeidsgivernavn}
            </SysteminfoItem>
            <SysteminfoItem as="div" label={t("arbeidsforhold.fom.label")}>
                <LocalizedDate date={start} />
            </SysteminfoItem>
            {slutt?.length && (
                <SysteminfoItem as="div" label={t("arbeidsforhold.tom.label")}>
                    {slutt}
                </SysteminfoItem>
            )}
            <SysteminfoItem as="div" label={t("arbeidsforhold.stillingsprosent.label")}>
                {fastStillingsprosent} %
            </SysteminfoItem>
            <BodyShort className={"pt-3"}>{t("arbeidsforhold.infotekst_del2")}</BodyShort>
        </Systeminfo>
    );
};
