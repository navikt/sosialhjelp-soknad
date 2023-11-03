import {FieldErrors} from "react-hook-form";
import {ErrorSummary} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

export const SkjemaStegErrorSummary = ({errors}: {errors?: FieldErrors}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "validering"});
    if (!errors || !Object.keys(errors).length) return null;

    return (
        <ErrorSummary heading={t("tittel")}>
            {Object.entries(errors).map(([key, value], index) => (
                <ErrorSummary.Item key={index} href={`#${key}`}>
                    {t(value?.message?.toString() ?? "")}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};
