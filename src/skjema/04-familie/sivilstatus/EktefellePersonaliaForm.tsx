import * as React from "react";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {useTranslation} from "react-i18next";
import {Button, Heading, Panel, TextField} from "@navikt/ds-react";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";
import {z} from "zod";
import {format, parse} from "date-fns";
import {isValidDate} from "@navikt/ds-react/esm/date/utils";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EktefelleFrontend, SivilstatusFrontend} from "../../../generated/model";

const SivilstatusSchema = z.object({
    ektefelle: z.object({
        navn: z.object({
            fornavn: z.string().optional(),
            mellomnavn: z.string().optional(),
            etternavn: z.string().optional(),
        }),
        fodselsdato: z.coerce
            .string()
            .optional()
            .transform((str) => (str?.length ? parse(str, "ddMMyyyy", 0) : undefined))
            .refine((date) => (date ? isValidDate(date) : true), ValideringsFeilKode.ER_FDATO)
            .transform((date) => date && format(date, "yyyy-MM-dd")),
        personnummer: z.string().optional(),
    }),
    borSammenMed: z.boolean({invalid_type_error: "validering.pakrevd"}),
});

// Transforms dato from yyyy-MM-dd to ddMMYYYY
const reformatEktefelleDato = (fodselsdato: string) => {
    const parsed = parse(fodselsdato, "yyyy-MM-dd", new Date());
    return isValidDate(parsed) ? format(parsed, "ddMMyyyy") : "";
};

const EktefellePersonaliaForm = ({
    sivilstatus,
    setEktefelle,
}: {
    sivilstatus: SivilstatusFrontend | undefined;
    setEktefelle: (ektefelle: EktefelleFrontend, borSammenMed: boolean) => Promise<void>;
}) => {
    const {t} = useTranslation("skjema");
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<z.infer<typeof SivilstatusSchema>>({
        resolver: zodResolver(SivilstatusSchema),
        defaultValues: {
            ...sivilstatus,
            ektefelle: {
                ...sivilstatus?.ektefelle,
                fodselsdato: reformatEktefelleDato(sivilstatus?.ektefelle?.fodselsdato ?? ""),
            },
        },
    });
    if (!sivilstatus) return null;
    return (
        <Panel className={"!bg-gray-100"}>
            <form
                onSubmit={handleSubmit(
                    (sivilstatus) => setEktefelle(sivilstatus.ektefelle, sivilstatus.borSammenMed),
                    console.error
                )}
            >
                <div className="space-y-4 pb-4">
                    <Heading size={"small"} level={"3"} spacing>
                        {t("familie.sivilstatus.gift.ektefelle.sporsmal")}
                    </Heading>
                    <TextField
                        maxLength={100}
                        {...register("ektefelle.navn.fornavn")}
                        label={t("familie.sivilstatus.gift.ektefelle.fornavn.label")}
                        required={false}
                    />
                    <TextField
                        maxLength={100}
                        label={t("familie.sivilstatus.gift.ektefelle.mellomnavn.label")}
                        {...register("ektefelle.navn.mellomnavn")}
                        required={false}
                    />
                    <TextField
                        className="pb-4"
                        maxLength={100}
                        label={t("familie.sivilstatus.gift.ektefelle.etternavn.label")}
                        {...register("ektefelle.navn.etternavn")}
                        required={false}
                    />
                    <TextField
                        maxLength={8}
                        minLength={8}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        style={{width: "140px"}}
                        error={
                            errors.ektefelle?.fodselsdato?.message &&
                            t(errors.ektefelle?.fodselsdato.message.toString())
                        }
                        {...register("ektefelle.fodselsdato")}
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
                        {...register("ektefelle.personnummer")}
                        required={false}
                    />
                    <YesNoInput
                        legend={t("familie.sivilstatus.gift.ektefelle.borsammen.sporsmal")}
                        error={errors.borSammenMed?.message && t(errors.borSammenMed.message.toString())}
                        name={"borSammenMed"}
                        defaultValue={
                            typeof sivilstatus?.borSammenMed === "boolean" ? sivilstatus?.borSammenMed : undefined
                        }
                        onChange={(e) => setValue("borSammenMed", e)}
                    />
                </div>

                <Button variant={"primary"} type={"submit"}>
                    {t("lagreEndring")}
                </Button>
            </form>
        </Panel>
    );
};

export default EktefellePersonaliaForm;
