import {useController, UseControllerProps} from "react-hook-form";
import * as z from "zod";
import {useTranslation} from "react-i18next";
import {AsYouType} from "libphonenumber-js";
import {TextField} from "@navikt/ds-react";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import * as React from "react";

import {TelefonnummerFormSchema} from "./TelefonnummerFormSchema.ts";

export const TelefonnummerField = (
    props: UseControllerProps<z.infer<typeof TelefonnummerFormSchema>, "phoneNumber">
) => {
    const {t} = useTranslation("skjema");
    const {field, fieldState} = useController(props);
    const asYouType = new AsYouType("NO");

    return (
        <div className={"flex gap-2 pb-2"}>
            <TextField
                {...field}
                value={asYouType.input(field.value ?? "")}
                maxLength={12}
                htmlSize={16}
                type={"tel"}
                className={"inline"}
                autoComplete={"tel"}
                label={t("kontakt.telefon.telefonnummerFelt")}
                hideLabel={true}
                error={fieldState.error && t(fieldState.error.message! as DigisosLanguageKey)}
            />
        </div>
    );
};
