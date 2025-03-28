import {BelopDto, DokumentasjonDtoType, type GenericOkonomiInput} from "../../../generated/new/model";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import React from "react";
import {z} from "zod";
import belopTekstfeltPreprocessor from "./zodUtils/BeloptekstfeltPreprocessor.ts";
import {ValideringsFeilKode} from "../../../lib/validering.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import OpplysningTextField from "./textfield/OpplysningTextField.tsx";

interface BelopEnProps {
    opplysningstype: DokumentasjonDtoType;
    mutate: (data: GenericOkonomiInput) => void;
    opplysning: BelopDto | undefined;
}

interface BelopEnFormValues {
    belop: number | null;
}

const schema = z.object({
    belop: z.preprocess(
        belopTekstfeltPreprocessor,
        z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).safe(ValideringsFeilKode.ER_TALL).nullable()
    ),
});

const BelopEn = ({opplysningstype, mutate, opplysning}: BelopEnProps) => {
    const {t} = useTranslation("skjema");
    const {t: tDok} = useTranslation("dokumentasjon");
    const {register, formState, handleSubmit} = useForm<BelopEnFormValues>({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(schema),
        defaultValues: {belop: opplysning?.belop ?? null},
    });
    const onSubmit = (formValues: BelopEnFormValues) => {
        const input: GenericOkonomiInput = {
            type: opplysningstype,
            detaljer: [
                {
                    belop: (formValues as BelopEnFormValues).belop ?? undefined,
                    beskrivelse: undefined,
                    type: "BelopDto",
                } satisfies BelopDto,
            ],
            _type: "GenericOkonomiInput",
        };
        mutate(input);
    };
    return (
        <form onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
            <OpplysningTextField
                registered={register(`belop`)}
                label={
                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                        {tDok(`${opplysningstype}.belop.label` as DigisosLanguageKey<"dokumentasjon">) as string}
                    </span>
                }
                error={
                    formState.touchedFields.belop &&
                    formState.errors.belop?.message &&
                    t(formState.errors.belop?.message as DigisosLanguageKey)
                }
            />
        </form>
    );
};

export default BelopEn;
