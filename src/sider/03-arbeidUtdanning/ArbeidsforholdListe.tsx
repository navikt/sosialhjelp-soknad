import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {BodyShort} from "@navikt/ds-react";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {ArbeidsforholdDto} from "../../generated/new/model";

interface Props {
    arbeidsforhold: ArbeidsforholdDto[];
}

export const ArbeidsforholdListe = ({arbeidsforhold}: Props) => {
    const {t} = useTranslation("skjema");

    return (
        <div>
            {arbeidsforhold?.length ? (
                arbeidsforhold.map((arbeidsforhold, i) => (
                    <ArbeidsforholdDetalj key={i} arbeidsforhold={arbeidsforhold} />
                ))
            ) : (
                <BodyShort spacing>{t("arbeidsforhold.ingen")}</BodyShort>
            )}
        </div>
    );
};

const ArbeidsforholdDetalj = ({arbeidsforhold}: {arbeidsforhold: ArbeidsforholdDto}) => {
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
