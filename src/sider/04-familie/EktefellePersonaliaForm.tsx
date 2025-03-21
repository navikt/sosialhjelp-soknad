import * as React from "react";

import {useTranslation} from "react-i18next";
import {Button, Heading, Panel, TextField} from "@navikt/ds-react";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {z} from "zod";
import {format, isValid, parse} from "date-fns";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {ValideringsFeilKode} from "../../lib/validering";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";
import {EktefelleDto, EktefelleInput, SivilstandDtoSivilstatus} from "../../generated/new/model";

const SivilstatusSchema = z.object({
    navn: z.object({
        fornavn: z.string().optional(),
        mellomnavn: z.string().optional(),
        etternavn: z.string().optional(),
    }),
    fodselsdato: z.coerce
        .string()
        .optional()
        .transform((str) => (str?.length ? parse(str, "ddMMyyyy", 0) : undefined))
        .refine((date) => (date ? isValid(date) : true), ValideringsFeilKode.ER_FDATO)
        .transform((date) => date && format(date, "yyyy-MM-dd")),
    personnummer: z.string().optional(),
    borSammen: z.boolean({invalid_type_error: "validering.pakrevd"}),
});

// Transforms dato from yyyy-MM-dd to ddMMYYYY
const reformatEktefelleDato = (fodselsdato: string) => {
    const parsed = parse(fodselsdato, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? format(parsed, "ddMMyyyy") : "";
};

interface Props {
    sivilstatus: SivilstandDtoSivilstatus | undefined;
    ektefelle: EktefelleDto | (Partial<EktefelleInput> & {kildeErSystem: false}) | undefined;
    setEktefelle: (ektefelle: EktefelleInput) => void;
}
export const EktefellePersonaliaForm = ({sivilstatus, ektefelle, setEktefelle}: Props) => {
    const {t} = useTranslation("skjema");
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<z.infer<typeof SivilstatusSchema>>({
        resolver: zodResolver(SivilstatusSchema),
        defaultValues: {
            ...ektefelle,
            fodselsdato: reformatEktefelleDato(ektefelle?.fodselsdato ?? ""),
        },
    });
    if (!sivilstatus) return null;
    return (
        <Panel className={"!bg-gray-100 mb-4"}>
            <form onSubmit={handleSubmit(setEktefelle, console.error)}>
                <div className="space-y-4 pb-4">
                    <Heading size={"small"} level={"3"} spacing>
                        {t("familie.sivilstatus.gift.ektefelle.sporsmal")}
                    </Heading>
                    <TextField
                        maxLength={100}
                        {...register("navn.fornavn")}
                        label={t("familie.sivilstatus.gift.ektefelle.fornavn.label")}
                        required={false}
                    />
                    <TextField
                        maxLength={100}
                        label={t("familie.sivilstatus.gift.ektefelle.mellomnavn.label")}
                        {...register("navn.mellomnavn")}
                        required={false}
                    />
                    <TextField
                        className="pb-4"
                        maxLength={100}
                        label={t("familie.sivilstatus.gift.ektefelle.etternavn.label")}
                        {...register("navn.etternavn")}
                        required={false}
                    />
                    <TextField
                        maxLength={8}
                        minLength={8}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        style={{width: "140px"}}
                        error={
                            errors.fodselsdato?.message &&
                            t(errors.fodselsdato.message.toString() as DigisosLanguageKey)
                        }
                        {...register("fodselsdato")}
                        label={t("familie.sivilstatus.gift.ektefelle.fnr.label")}
                        required={false}
                    />
                    <TextField
                        maxLength={5}
                        minLength={5}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        style={{width: "140px"}}
                        label={t("familie.sivilstatus.gift.ektefelle.pnr.label")}
                        {...register("personnummer")}
                        required={false}
                    />
                    <YesNoInput
                        legend={t("familie.sivilstatus.gift.ektefelle.borsammen.sporsmal")}
                        error={
                            errors.borSammen?.message && t(errors.borSammen.message.toString() as DigisosLanguageKey)
                        }
                        name={"borSammen"}
                        defaultValue={typeof ektefelle?.borSammen === "boolean" ? ektefelle?.borSammen : undefined}
                        onChange={(e) => setValue("borSammen", e)}
                    />
                </div>

                <Button variant={"primary"} type={"submit"}>
                    {t("lagreEndring")}
                </Button>
            </form>
        </Panel>
    );
};
