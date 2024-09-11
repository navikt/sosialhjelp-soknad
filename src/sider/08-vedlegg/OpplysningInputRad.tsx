import {Control, Controller} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {TextField} from "@navikt/ds-react";
import {OpplysningInputType} from "../../lib/opplysninger";
import {LinkButton} from "../../lib/components/LinkButton";
import cx from "classnames";
import {VedleggRadFrontendForm} from "../../lib/hooks/dokumentasjon/useOpplysning";
import {VedleggFrontendType} from "../../generated/model";
import {DigisosLanguageKey} from "../../lib/i18n";
import {useOpplysningContext} from "../../lib/OpplysningContextProvider.tsx";

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

    const {state, dispatch} = useOpplysningContext();
    const rader = state?.rader ?? [];

    const handleChange = (fieldName: string, value: string | number) => {
        const updatedRow = {...rader[index], [fieldName]: value};
        const updatedRader = rader.map((row, i) => (i === index ? updatedRow : row));
        dispatch({type: "SET_RADER", payload: updatedRader});
    };

    return (
        <li className={className}>
            {fields.map((fieldName) => (
                <Controller
                    key={fieldName}
                    control={control}
                    name={`rader.${index}.${fieldName}`}
                    render={({field}) => (
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
                            autoComplete={"off"}
                            value={field.value || ""}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange(fieldName, e.target.value);
                            }}
                            htmlSize={fieldName === "beskrivelse" ? 32 : 20}
                        />
                    )}
                />
            ))}
            {onDelete && <LinkButton onClick={() => onDelete(index)}>{t("opplysninger.fjern")}</LinkButton>}
        </li>
    );
};
