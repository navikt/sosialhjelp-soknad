import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import cx from "classnames";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";

export const BelopInput = <T extends FieldValues>({label, ...rest}: {label: ReactNode} & UseControllerProps<T>) => {
    const {t} = useTranslation("skjema");

    const {field, fieldState} = useController(rest);

    const errorMessage = fieldState.error?.message as DigisosLanguageKey | undefined;

    return (
        <TextField
            {...field}
            value={field.value ?? ""}
            onChange={({target: {value}}) => field.onChange(value.length ? value : null)}
            label={label}
            className={cx("pb-2")}
            error={fieldState.isTouched && errorMessage && t(errorMessage)}
            autoComplete={"off"}
            htmlSize={20}
            onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
            }}
        />
    );
};
