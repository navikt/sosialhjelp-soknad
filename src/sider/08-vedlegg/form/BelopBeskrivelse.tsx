import {BelopDto, DokumentasjonDtoType, type GenericOkonomiInput} from "../../../generated/new/model";
import {useTranslation} from "react-i18next";
import {useFieldArray, useForm} from "react-hook-form";
import {useDokumentasjonTekster} from "../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import {LinkButton} from "../../../lib/components/LinkButton.tsx";
import React, {ReactNode} from "react";
import {z} from "zod";
import {ValideringsFeilKode} from "../../../lib/validering.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import belopTekstfeltPreprocessor from "./zodUtils/BeloptekstfeltPreprocessor.ts";
import OpplysningTextField from "./textfield/OpplysningTextField.tsx";

interface Props {
    opplysningstype: DokumentasjonDtoType;
    excludeBeskrivelse?: boolean;
    mutate: (data: GenericOkonomiInput) => void;
    opplysning: BelopDto[] | undefined;
    belopLabel?: ReactNode;
    leggTilTekst?: string;
}

interface FormValues {
    belopBeskrivelse: {
        belop: number | null;
        beskrivelse?: string | null;
    }[];
}

const schema = z.object({
    belopBeskrivelse: z.array(
        z.object({
            belop: z.preprocess(
                belopTekstfeltPreprocessor,
                z.number({invalid_type_error: ValideringsFeilKode.ER_TALL}).safe(ValideringsFeilKode.ER_TALL).nullable()
            ),
            beskrivelse: z.string().max(100, ValideringsFeilKode.MAX_LENGDE).nullable().optional(),
        })
    ),
});

const BelopBeskrivelse = ({
    opplysningstype,
    excludeBeskrivelse,
    opplysning,
    mutate,
    belopLabel,
    leggTilTekst,
}: Props) => {
    const {t} = useTranslation("skjema");
    const {t: tDok} = useTranslation("dokumentasjon");
    const tomDefaultEntry = {belop: null, beskrivelse: excludeBeskrivelse ? undefined : null};
    const {register, formState, control, handleSubmit, getValues} = useForm<FormValues>({
        mode: "onBlur",
        shouldFocusError: false,
        resolver: zodResolver(schema),
        defaultValues: {
            belopBeskrivelse:
                (opplysning?.length ?? 0) > 0
                    ? opplysning?.map((belopDto) => ({belop: belopDto.belop, beskrivelse: belopDto.beskrivelse}))
                    : [tomDefaultEntry],
        },
    });
    const {fields, append, remove} = useFieldArray({control, name: "belopBeskrivelse"});
    const {leggtil} = useDokumentasjonTekster(opplysningstype);
    const onSubmit = (formValues: FormValues) => {
        const inputIsEmpty = formValues.belopBeskrivelse.every(
            (belopBeskrivelse) => !belopBeskrivelse.belop && !belopBeskrivelse.beskrivelse
        );
        if (inputIsEmpty) {
            return;
        }
        const input: GenericOkonomiInput = {
            type: opplysningstype,
            detaljer: (formValues as FormValues).belopBeskrivelse
                .filter((entry) => entry.belop || entry.beskrivelse)
                .map(
                    (entry) =>
                        ({
                            belop: entry.belop ?? undefined,
                            beskrivelse: entry.beskrivelse ?? undefined,
                            type: "BelopDto",
                        }) satisfies BelopDto
                ),
            _type: "GenericOkonomiInput",
        };
        mutate(input);
    };
    return (
        <form onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()} id={"abc"}>
            <ul>
                {fields.map((_, index) => (
                    <li key={index}>
                        <OpplysningTextField
                            registered={register(`belopBeskrivelse.${index}.belop`)}
                            label={
                                belopLabel ? (
                                    belopLabel
                                ) : (
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            tDok(
                                                `${opplysningstype}.belop.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                )
                            }
                            error={
                                formState.touchedFields?.belopBeskrivelse?.[index]?.belop &&
                                formState.errors.belopBeskrivelse?.[index]?.belop?.message &&
                                t(formState.errors.belopBeskrivelse[index]?.belop?.message as DigisosLanguageKey)
                            }
                        />
                        {!excludeBeskrivelse && (
                            <OpplysningTextField
                                registered={register(`belopBeskrivelse.${index}.beskrivelse`)}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            tDok(
                                                `${opplysningstype}.beskrivelse.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                                error={
                                    formState.touchedFields?.belopBeskrivelse?.[index]?.beskrivelse &&
                                    formState.errors.belopBeskrivelse?.[index]?.beskrivelse?.message &&
                                    t(
                                        formState.errors.belopBeskrivelse[index]?.beskrivelse
                                            ?.message as DigisosLanguageKey
                                    )
                                }
                            />
                        )}
                        {index > 0 && (
                            <LinkButton
                                onClick={() => {
                                    remove(index);
                                    // Må trigge submit manuelt her, da blur på formet ikke blir trigga ikke trigges
                                    onSubmit(getValues());
                                }}
                            >
                                {t("opplysninger.fjern")}
                            </LinkButton>
                        )}
                    </li>
                ))}
                <li className={`pt-3 pb-4`}>
                    <LinkButton onClick={() => append(tomDefaultEntry)}>
                        <span aria-hidden={true}>+ </span>
                        {leggTilTekst ? leggTilTekst : leggtil}
                    </LinkButton>
                </li>
            </ul>
        </form>
    );
};

export default BelopBeskrivelse;
