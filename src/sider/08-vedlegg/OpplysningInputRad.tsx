import {Control, Controller} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {OpplysningInputType} from "../../lib/opplysninger";
import {LinkButton} from "../../lib/components/LinkButton";
import {VedleggRadFrontendForm} from "../../lib/hooks/dokumentasjon/vedleggRadFormSchema.ts";
import {VedleggFrontendType} from "../../generated/model";
import {DigisosLanguageKey} from "../../lib/i18n";

export const OpplysningInputRad = ({
    fields,
    index,
    control,
    textKey,
    onDelete,
}: {
    fields: OpplysningInputType[];
    index: number;
    control: Control<VedleggRadFrontendForm>;
    textKey: VedleggFrontendType;
    onDelete?: (index: number) => void;
    className?: string;
}) => {
    const {t} = useTranslation();
    const {t: tDok} = useTranslation("dokumentasjon");

    return (
        <li className={"first:mb-6 odd:mt-5 even:mt-5"}>
            {fields.map((fieldName) => (
                <Controller
                    key={fieldName}
                    render={({field, fieldState}) => (
                        <div className={"first:mt-0 mt-3"}>
                            <TextField
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            tDok(
                                                `${textKey}.${fieldName}.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                                error={
                                    fieldState.isTouched &&
                                    fieldState.error?.message &&
                                    t(fieldState.error.message as DigisosLanguageKey)
                                }
                                autoComplete={"off"}
                                {...field}
                                // Ensure the correct value is shown and persisted
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                    }
                                }}
                                htmlSize={fieldName === "beskrivelse" ? 32 : 20}
                            />
                        </div>
                    )}
                    name={`rader.${index}.${fieldName}`}
                    control={control}
                />
            ))}
            {onDelete && <LinkButton onClick={() => onDelete(index)}>{t("opplysninger.fjern")}</LinkButton>}
        </li>
    );
};
