import {useController, UseControllerProps} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {formatKontonummer} from "@fremtind/jkl-formatters-util";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import {KontonummerFormValues} from "./KontonummerFormSchema.ts";

export const KontonummerInputField = (props: UseControllerProps<KontonummerFormValues, "kontonummerBruker">) => {
    const {field, fieldState} = useController(props);
    const {t} = useTranslation("skjema");

    return (
        <TextField
            {...field}
            // add spaces when displaying
            value={formatKontonummer(field.value ?? "", {partial: true})}
            label={t("kontakt.kontonummer.label")}
            inputMode="numeric"
            hideLabel={true}
            htmlSize={13}
            autoComplete="off"
            required={false}
            maxLength={13}
            error={fieldState.error?.message && t(fieldState.error.message as DigisosLanguageKey)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.form?.requestSubmit();
                }
            }}
        />
    );
};
