import {FieldErrors} from "react-hook-form";
import {ErrorSummary} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {DigisosLanguageKey} from "../../../i18n";

export const SkjemaStegErrorSummary = ({errors}: {errors?: FieldErrors}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "validering"});
    if (!errors || !Object.keys(errors).length) return null;

    return (
        <ErrorSummary heading={t("tittel")}>
            {Object.entries(errors).map(([key, value], index) => {
                const errorMessage = value?.message?.toString();
                if (!errorMessage) return null;
                const translated = t(errorMessage as DigisosLanguageKey<"skjema", "validering">);
                return (
                    <ErrorSummary.Item key={index} href={`#${key}`}>
                        {translated}
                    </ErrorSummary.Item>
                );
            })}
        </ErrorSummary>
    );
};
