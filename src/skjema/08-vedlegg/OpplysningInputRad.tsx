import {OpplysningInputType} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {Control, Controller} from "react-hook-form";
import {VedleggRadFrontendForm} from "./useOpplysning";
import {useTranslation} from "react-i18next";
import {TextField, TextFieldProps} from "@navikt/ds-react";
import * as React from "react";
import {RefAttributes} from "react";

export const OpplysningInputRad = ({
    fields,
    index,
    control,
    textKey,
}: {
    fields: OpplysningInputType[];
    index: number;
    control: Control<VedleggRadFrontendForm>;
    textKey: string;
}) => {
    const {t} = useTranslation();

    return (
        <div>
            {fields.map((fieldName) => (
                <Controller
                    key={fieldName}
                    render={({field, fieldState}) => {
                        const formatSpecifier: Partial<TextFieldProps & RefAttributes<HTMLInputElement>> =
                            fieldName === `beskrivelse`
                                ? {
                                      maxLength: 100,
                                      type: "text",
                                      htmlSize: 40,
                                  }
                                : {
                                      type: "text",
                                      inputMode: "numeric",
                                      pattern: "[0-9]*",
                                      maxLength: 8,
                                      htmlSize: 14,
                                  };

                        return (
                            <TextField
                                className={"pb-2"}
                                label={t(`${textKey}.${fieldName}.label`)}
                                error={fieldState.error?.message && t(fieldState.error.message)}
                                {...formatSpecifier}
                                {...field}
                                // To avoid value === null
                                value={field.value || undefined}
                            />
                        );
                    }}
                    name={`rader.${index}.${fieldName}`}
                    control={control}
                />
            ))}
        </div>
    );
};
