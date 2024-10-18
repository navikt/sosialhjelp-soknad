import {FieldErrors} from "react-hook-form";
import {ErrorSummary} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {DigisosLanguageKey} from "../../i18n.ts";

export const SkjemaStegErrorSummary = ({errors}: {errors?: FieldErrors}) => {
    const {t} = useTranslation("skjema");
    if (!errors || !Object.keys(errors).length) return null;

    return (
        <ErrorSummary heading={t("validering.tittel")}>
            {Object.entries(errors).map(([key, value], index) => (
                <ErrorSummary.Item key={index} href={`#${key}`}>
                    {t(value?.message?.toString() as DigisosLanguageKey)}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};
