import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {ArbeidsforholdFrontend} from "../../generated/client/model";
import {useHentArbeid} from "../../generated/client/arbeid-ressurs/arbeid-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {BodyShort} from "@navikt/ds-react";
import {LocalizedDate} from "../../lib/components/LocalizedDate";

export const ArbeidsforholdListe = () => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentArbeid(useBehandlingsId()));

    return expectOK(({arbeidsforhold}) => (
        <div>
            {arbeidsforhold?.length ? (
                arbeidsforhold.map((arbeidsforhold, i) => (
                    <ArbeidsforholdDetalj key={i} arbeidsforhold={arbeidsforhold} />
                ))
            ) : (
                <BodyShort spacing>{t("arbeidsforhold.ingen")}</BodyShort>
            )}
        </div>
    ));
};

const ArbeidsforholdDetalj = ({arbeidsforhold}: {arbeidsforhold: ArbeidsforholdFrontend}) => {
    const {arbeidsgivernavn, stillingsprosent, fom, tom} = arbeidsforhold;
    const {t} = useTranslation("skjema");

    return (
        <Systeminfo>
            <BodyShort className={"pb-3"}>{t("arbeidsforhold.infotekst_del1")}</BodyShort>
            <SysteminfoItem label={t("arbeidsforhold.arbeidsgivernavn.label")}>{arbeidsgivernavn}</SysteminfoItem>
            <SysteminfoItem label={t("arbeidsforhold.fom.label")}>
                <LocalizedDate date={fom} />
            </SysteminfoItem>
            {tom?.length && <SysteminfoItem label={t("arbeidsforhold.tom.label")}>{tom}</SysteminfoItem>}
            <SysteminfoItem label={t("arbeidsforhold.stillingsprosent.label")}>{stillingsprosent} %</SysteminfoItem>
            <BodyShort className={"pt-3"}>{t("arbeidsforhold.infotekst_del2")}</BodyShort>
        </Systeminfo>
    );
};
