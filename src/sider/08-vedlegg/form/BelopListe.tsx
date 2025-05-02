import React, {ReactNode} from "react";
import {UseControllerProps, useFieldArray} from "react-hook-form";
import {AvdragRenterFormValues} from "./AvdragRenterFormSchema.tsx";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {BelopInput} from "./BelopInput.tsx";
import {LinkButton} from "../../../lib/components/LinkButton.tsx";
import {useTranslation} from "react-i18next";

export const BelopListe = ({
    name,
    control,
    onSubmit,
}: {
    label: ReactNode;
    onSubmit: () => void;
} & UseControllerProps<AvdragRenterFormValues, "avdragRenter">) => {
    const {t} = useTranslation("skjema");
    const {fields, remove, append} = useFieldArray({name, control});
    const {leggtil, renter, avdrag} = useDokumentasjonTekster("UTGIFTER_BOLIGLAN" as const);
    const onRemove = (index: number) => {
        remove(index);
        // Må trigge submit manuelt her, da blur på formet ikke blir trigga
        onSubmit();
    };

    return (
        <ul>
            {fields.map(({id}, index) => (
                <li key={id}>
                    <BelopInput label={renter!.label!} name={`avdragRenter.${index}.renter`} control={control} />
                    <BelopInput label={avdrag!.label!} name={`avdragRenter.${index}.avdrag`} control={control} />
                    {!!index && <LinkButton onClick={() => onRemove(index)}>{t("opplysninger.fjern")}</LinkButton>}
                </li>
            ))}
            <li className={`pt-3 pb-4`}>
                <LinkButton onClick={() => append({})}>
                    <span aria-hidden={true}>+ </span>
                    {leggtil}
                </LinkButton>
            </li>
        </ul>
    );
};
