import * as React from "react";
import {useTranslation} from "react-i18next";
import {BodyShort} from "@navikt/ds-react";
import {ArbeidsforholdDto} from "../../generated/new/model";
import {ArbeidsforholdDetalj} from "./ArbeidsforholdDetalj.tsx";

export const ArbeidsforholdListe = ({arbeidsforhold}: {arbeidsforhold: ArbeidsforholdDto[]}) => {
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
