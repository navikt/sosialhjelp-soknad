import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {ArbeidsforholdFrontend} from "../../generated/model";
import {useHentArbeid} from "../../generated/arbeid-ressurs/arbeid-ressurs";
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
    const {t} = useTranslation("skjema", {keyPrefix: "arbeidsforhold"});

    return (
        <Systeminfo>
            <BodyShort className={"pb-3"}>{t("infotekst_del1")}</BodyShort>
            <SysteminfoItem label={t("arbeidsgivernavn.label")}>{arbeidsgivernavn}</SysteminfoItem>
            <SysteminfoItem label={t("fom.label")}>
                <LocalizedDate date={fom} />
            </SysteminfoItem>
            {tom?.length && <SysteminfoItem label={t("tom.label")}>{tom}</SysteminfoItem>}
            <SysteminfoItem label={t("stillingsprosent.label")}>{stillingsprosent} %</SysteminfoItem>
            <BodyShort className={"pt-3"}>{t("infotekst_del2")}</BodyShort>
        </Systeminfo>
    );
};
