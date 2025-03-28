import {AvdragRenterDto, BoliglanInput, DokumentasjonDtoType} from "../../../generated/new/model";
import {useTranslation} from "react-i18next";
import {useFieldArray, useForm} from "react-hook-form";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import {LinkButton} from "../../../lib/components/LinkButton.tsx";
import React from "react";
import {z} from "zod";
import belopTekstfeltPreprocessor from "./zodUtils/BeloptekstfeltPreprocessor.ts";
import {ValideringsFeilKode} from "../../../lib/validering.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import OpplysningTextField from "./textfield/OpplysningTextField.tsx";

interface FormValues {
    avdragRenter: {
        renter: number | null;
        avdrag: number | null;
    }[];
}

interface Props {
    opplysningstype: DokumentasjonDtoType;
    mutate: (data: BoliglanInput) => void;
    opplysning: AvdragRenterDto[] | undefined;
}

const schema = z.object({
    avdragRenter: z.array(
        z.object({
            avdrag: z.preprocess(
                belopTekstfeltPreprocessor,
                z
                    .number({invalid_type_error: ValideringsFeilKode.ER_TALL})
                    .min(0, ValideringsFeilKode.ER_TALL)
                    .nullable()
            ),
            renter: z.preprocess(
                belopTekstfeltPreprocessor,
                z
                    .number({invalid_type_error: ValideringsFeilKode.ER_TALL})
                    .min(0, ValideringsFeilKode.ER_TALL)
                    .nullable()
            ),
        })
    ),
});

const AvdragRenter = ({opplysningstype, mutate, opplysning}: Props) => {
    const {t} = useTranslation("dokumentasjon");
    const {t: tSkjema} = useTranslation("skjema");
    const {control, register, handleSubmit, getValues, formState} = useForm<FormValues>({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(schema),
        defaultValues: {
            avdragRenter:
                (opplysning?.length ?? 0) > 0
                    ? opplysning?.map((opplysning) => ({
                          avdrag: opplysning.avdrag,
                          renter: opplysning.renter,
                      }))
                    : [{avdrag: null, renter: null}],
        },
    });
    const {fields, remove, append} = useFieldArray({name: "avdragRenter", control: control});
    const {leggtil} = useDokumentasjonTekster(opplysningstype);
    const onSubmit = (formValues: FormValues) => {
        const inputIsEmpty = formValues.avdragRenter.every(
            (avdragRenter) => !avdragRenter.avdrag && !avdragRenter.renter
        );
        if (inputIsEmpty) {
            return;
        }
        const input: BoliglanInput = {
            type: opplysningstype,
            detaljer: (formValues as FormValues).avdragRenter
                .filter((avdragRenter) => avdragRenter.renter || avdragRenter.avdrag)
                .map(
                    (entry) =>
                        ({
                            renter: entry.renter ?? undefined,
                            avdrag: entry.avdrag ?? undefined,
                            type: "AvdragRenterDto",
                        }) satisfies AvdragRenterDto
                ),
            _type: "BoliglanInput",
        };
        mutate(input);
    };
    return (
        <form onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
            <ul>
                {fields.map((_, index) => {
                    return (
                        <li key={index}>
                            <OpplysningTextField
                                registered={register(`avdragRenter.${index}.renter`)}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningstype}.renter.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                                error={
                                    formState.touchedFields?.avdragRenter?.[index]?.renter &&
                                    formState.errors.avdragRenter?.[index]?.renter?.message &&
                                    tSkjema(formState.errors.avdragRenter[index]?.renter?.message as DigisosLanguageKey)
                                }
                            />
                            <OpplysningTextField
                                registered={register(`avdragRenter.${index}.avdrag`)}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningstype}.avdrag.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                                error={
                                    formState.touchedFields?.avdragRenter?.[index]?.avdrag &&
                                    formState.errors.avdragRenter?.[index]?.avdrag?.message &&
                                    tSkjema(formState.errors.avdragRenter[index]?.avdrag?.message as DigisosLanguageKey)
                                }
                            />
                            {index > 0 && (
                                <LinkButton
                                    onClick={() => {
                                        remove(index);
                                        // Må trigge submit manuelt her, da blur på formet ikke blir trigga ikke trigges
                                        onSubmit(getValues());
                                    }}
                                >
                                    {tSkjema("opplysninger.fjern")}
                                </LinkButton>
                            )}
                        </li>
                    );
                })}
                <li className={`pt-3 pb-4`}>
                    <LinkButton onClick={() => append({avdrag: null, renter: null})}>
                        <span aria-hidden={true}>+ </span>
                        {leggtil}
                    </LinkButton>
                </li>
            </ul>
        </form>
    );
};

export default AvdragRenter;
