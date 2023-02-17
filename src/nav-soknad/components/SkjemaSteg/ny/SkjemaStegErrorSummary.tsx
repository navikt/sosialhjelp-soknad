import {FieldErrors} from "react-hook-form";
import {ErrorSummary} from "@navikt/ds-react";
import * as React from "react";
import {useTranslation} from "react-i18next";

export const SkjemaStegErrorSummary = ({errors}: {errors?: FieldErrors}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "validering"});
    if (!errors || !Object.keys(errors).length) return null;

    return (
        <ErrorSummary heading="Du må fikse disse feilene før du kan gå videre.">
            {Object.entries(errors).map(([key, value]) => (
                <ErrorSummary.Item href={`#${key}`}>{t(value?.message?.toString() ?? "")}</ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};
