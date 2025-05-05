import {useController, UseControllerProps} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import {z} from "zod";
import {KontonummerSchema} from "./KontonummerSchema.tsx";

export const KontonummerInputField = (
    props: UseControllerProps<z.infer<typeof KontonummerSchema>, "kontonummerBruker">
) => {
    const {field, fieldState} = useController(props);
    const {t} = useTranslation("skjema");

    return (
        <TextField
            {...field}
            // add spaces when displaying
            value={formatKontonummer(field.value ?? "", {partial: true})}
            // remove them again when storing
            onChange={(e) => {
                const strippedSpaces = e.target.value.replace(/\s/g, "");
                field.onChange(strippedSpaces.length ? strippedSpaces : null);
            }}
            label={t("kontakt.kontonummer.label")}
            inputMode="numeric"
            hideLabel={true}
            htmlSize={13}
            autoComplete="off"
            required={false}
            maxLength={13}
            error={fieldState.error?.message && t(fieldState.error.message as DigisosLanguageKey)}
        />
    );
};
