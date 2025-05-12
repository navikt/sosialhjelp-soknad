import {TextField, TextFieldProps} from "@navikt/ds-react";
import {useController, UseControllerProps} from "react-hook-form";
import {BelopBeskrivelseFormValues} from "../variants/belopBeskrivelse/BelopBeskrivelseFormSchema.ts";
import cx from "classnames";
import React from "react";
import {DigisosLanguageKey} from "../../../../lib/i18n/common.ts";
import {useTranslation} from "react-i18next";

export const OpplysningTextInput = ({
    label,
    ...rest
}: Pick<TextFieldProps, "label"> &
    UseControllerProps<BelopBeskrivelseFormValues, `belopBeskrivelse.${number}.beskrivelse`>) => {
    const {t} = useTranslation("skjema");

    const {field, fieldState} = useController(rest);

    const errorMessage = fieldState.error?.message as DigisosLanguageKey | undefined;

    return (
        <TextField
            {...field}
            value={field.value ?? ""}
            label={label}
            className={cx("pb-2")}
            autoComplete={"off"}
            htmlSize={20}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            error={fieldState.isTouched && errorMessage && t(errorMessage)}
        />
    );
};
