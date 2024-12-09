import {FieldError} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {DigisosLanguageKey} from "../i18n/common.ts";
import * as React from "react";

export const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};
