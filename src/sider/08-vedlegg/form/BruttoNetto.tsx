import {DokumentasjonDtoType, LonnsInntektDto, type LonnsInput} from "../../../generated/new/model";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import belopTekstfeltPreprocessor from "./zodUtils/BeloptekstfeltPreprocessor.ts";
import {ValideringsFeilKode} from "../../../lib/validering.ts";
import OpplysningTextField from "./textfield/OpplysningTextField.tsx";

interface BruttoNettoProps {
    opplysningstype: DokumentasjonDtoType;
    mutate: (data: LonnsInput) => void;
    opplysning: LonnsInntektDto | undefined;
}

interface BruttoNettoFormValues {
    brutto: number | null;
    netto: number | null;
}

const schema = z.object({
    brutto: z.preprocess(
        belopTekstfeltPreprocessor,
        z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).safe(ValideringsFeilKode.ER_TALL).nullable()
    ),
    netto: z.preprocess(
        belopTekstfeltPreprocessor,
        z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).safe(ValideringsFeilKode.ER_TALL).nullable()
    ),
});

const BruttoNetto = ({opplysningstype, mutate, opplysning}: BruttoNettoProps) => {
    const {t} = useTranslation("dokumentasjon");
    const {t: tSkjema} = useTranslation("skjema");
    const {register, handleSubmit, formState} = useForm<BruttoNettoFormValues>({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(schema),
        defaultValues: {brutto: opplysning?.brutto, netto: opplysning?.netto},
    });
    const onSubmit = (formValues: BruttoNettoFormValues) => {
        const input: LonnsInput = {
            type: opplysningstype,
            detalj: {
                brutto: (formValues as BruttoNettoFormValues).brutto ?? 0,
                netto: (formValues as BruttoNettoFormValues).netto ?? undefined,
                type: "LonnsInntektDto",
            } satisfies LonnsInntektDto,
            _type: "LonnsInput",
        };
        mutate(input);
    };
    return (
        <form onBlur={handleSubmit(onSubmit)}>
            <OpplysningTextField
                registered={register(`brutto`)}
                label={
                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                        {t(`${opplysningstype}.brutto.label` as DigisosLanguageKey<"dokumentasjon">) as string}
                    </span>
                }
                error={
                    formState.touchedFields.brutto &&
                    formState.errors.brutto?.message &&
                    tSkjema(formState.errors.brutto?.message as DigisosLanguageKey)
                }
            />
            <OpplysningTextField
                registered={register(`netto`)}
                label={
                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                        {t(`${opplysningstype}.netto.label` as DigisosLanguageKey<"dokumentasjon">) as string}
                    </span>
                }
                error={
                    formState.touchedFields.netto &&
                    formState.errors.netto?.message &&
                    tSkjema(formState.errors.netto?.message as DigisosLanguageKey)
                }
            />
        </form>
    );
};

export default BruttoNetto;
