import {Control, Controller} from "react-hook-form";
import {VedleggRadFrontendForm} from "./useOpplysning";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import * as React from "react";
import {OpplysningInputType} from "../../lib/opplysninger";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import cx from "classnames";

export const OpplysningInputRad = ({
    fields,
    index,
    control,
    textKey,
    onDelete,
    className,
}: {
    fields: OpplysningInputType[];
    index: number;
    control: Control<VedleggRadFrontendForm>;
    textKey: string;
    onDelete?: (index: number) => void;
    className?: string;
}) => {
    const {t} = useTranslation();

    return (
        <li className={className}>
            {fields.map((fieldName) => (
                <Controller
                    key={fieldName}
                    render={({field, fieldState}) => (
                        <TextField
                            className={cx("pb-2", {"w-32": fieldName !== "beskrivelse"})}
                            label={t(`${textKey}.${fieldName}.label`)}
                            error={fieldState.isTouched && fieldState.error?.message && t(fieldState.error.message)}
                            {...field}
                            // To avoid value === null
                            value={field.value || ""}
                        />
                    )}
                    name={`rader.${index}.${fieldName}`}
                    control={control}
                />
            ))}
            {onDelete && <LinkButton onClick={() => onDelete(index)}>{t("opplysninger.fjern")}</LinkButton>}
        </li>
    );
};
