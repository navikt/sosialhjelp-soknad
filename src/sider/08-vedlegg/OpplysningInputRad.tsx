import {Control, Controller} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {OpplysningInputType} from "../../lib/opplysninger";
import {LinkButton} from "../../lib/components/LinkButton";
import cx from "classnames";
import {VedleggRadFrontendForm} from "../../lib/hooks/dokumentasjon/useOpplysning";
import {VedleggFrontendType} from "../../generated/model";
import {DigisosLanguageKey} from "../../lib/i18n";

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
    textKey: VedleggFrontendType;
    onDelete?: (index: number) => void;
    className?: string;
}) => {
    const {t} = useTranslation();
    const {t: tDok} = useTranslation("dokumentasjon");

    return (
        <li className={className}>
            {fields.map((fieldName) => (
                <Controller
                    key={fieldName}
                    render={({field, fieldState}) => (
                        <>
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
                                className={cx("pb-2")}
                                error={
                                    fieldState.isTouched &&
                                    fieldState.error?.message &&
                                    t(fieldState.error.message as DigisosLanguageKey)
                                }
                                autoComplete={"off"}
                                {...field}
                                // To avoid value === null
                                value={field.value || ""}
                                htmlSize={fieldName === "beskrivelse" ? 32 : 20}
                            />
                        </>
                    )}
                    name={`rader.${index}.${fieldName}`}
                    control={control}
                />
            ))}
            {onDelete && <LinkButton onClick={() => onDelete(index)}>{t("opplysninger.fjern")}</LinkButton>}
        </li>
    );
};
