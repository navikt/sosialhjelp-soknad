import {Opplysning, opplysningSpec} from "../../lib/opplysninger";
import {BodyShort, Heading, TextField} from "@navikt/ds-react";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import {useFieldArray, useForm} from "react-hook-form";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";
import {useTranslation} from "react-i18next";
import {LinkButton} from "../../lib/components/LinkButton.tsx";
import cx from "classnames";
import useIsKort from "../../lib/hooks/data/useIsKort.ts";
import {FileUploadBoxNoStyle} from "../../lib/components/fileupload/FileUploadBox.tsx";
import React from "react";
import type {DokumentasjonDtoType} from "../../generated/new/model";
import {useGetOkonomiskeOpplysninger, useUpdateOkonomiskOpplysning} from "../../generated/new/okonomiske-opplysninger-controller/okonomiske-opplysninger-controller.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useOpplysning} from "../../lib/hooks/dokumentasjon/useOpplysning.ts";

export const Dokumentasjon = ({opplysning}: {opplysning: Opplysning}) => {
    const {sporsmal, undertekst} = useDokumentasjonTekster(opplysning.type);

    const {t} = useTranslation("skjema")

    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>

            <BodyShort spacing>{undertekst}</BodyShort>
            <SubBoio opplysning={opplysning} />
            <FileUploadBoxNoStyle
              bunntekst={t("utbetalinger.inntekt.skattbar.kort_saldo_lastOpp")}
              dokumentasjonType={opplysning.type}
            />
        </div>
    );
};

const SubBoio = ({opplysning}: {opplysning: Opplysning}) => {
    const abc = opplysningSpec[opplysning.type];
    switch (abc.componentDescription) {
        case "avdragRenter":
            return <AvdragRenter opplysningstype={opplysning.type} />;
        case "belopBeskrivelse":
            return <BelopBeskrivelse opplysningstype={opplysning.type} />;
        case "belopFlere":
            return <BelopBeskrivelse opplysningstype={opplysning.type} excludeBeskrivelse />;
        case "bruttonetto":
            return <BruttoNetto opplysningstype={opplysning.type} />;
        case "belopEn":
            return <BelopEn opplysningstype={opplysning.type} />;
        case "ingen":
            return null;
    }
};

interface AvdragRenterFormValues {
    avdragRenter: {
        renter: number | null;
        avdrag: number | null;
    }[];
}

interface AvdragRenterProps {
    opplysningstype: DokumentasjonDtoType;
    opplysning: Opplysning;
}

const AvdragRenter = ({opplysningstype, opplysning}: AvdragRenterProps) => {
    const {t} = useTranslation("dokumentasjon");
    const {t: tSkjema} = useTranslation("skjema");
    const {} = useOpplysning(opplysning)
    const {control, register} = useForm<AvdragRenterFormValues>({
        defaultValues: {avdragRenter: [{renter: null, avdrag: null}]},
    });
    const {fields, remove, append} = useFieldArray({name: "avdragRenter", control: control});
    const {leggtil} = useDokumentasjonTekster(opplysningstype);
    // TODO: Finn ut av om den her trengs
    const isKort = useIsKort();
    const queryClient = useQueryClient();
    const {mutate, variables, isPending} = useUpdateOkonomiskOpplysning({mutation: {onSettled: () => queryClient.invalidateQueries({queryKey: ['TODO']})}});
    return (
        <form>
            <ul>
                {fields.map((_, index) => {
                    return (
                        <li key={index}>
                            <TextField
                                {...register(`avdragRenter.${index}.renter`)}
                                className={cx("pb-2")}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningstype}.renter.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                            />
                            <TextField
                                {...register(`avdragRenter.${index}.avdrag`)}
                                className={cx("pb-2")}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningstype}.avdrag.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                            />
                            <LinkButton onClick={() => remove(index)}>{tSkjema("opplysninger.fjern")}</LinkButton>
                        </li>
                    );
                })}
                <li className={`pt-3 pb-4`}>
                    <LinkButton onClick={() => append({avdrag: null, renter: null})}>
                        <span aria-hidden={true}>+ </span>
                        {isKort.data ? tSkjema("utbetalinger.inntekt.skattbar.kort_saldo_leggTil") : leggtil}
                    </LinkButton>
                </li>
            </ul>
        </form>
    );
};

interface BelopBeskrivelseProps {
    opplysningstype: DokumentasjonDtoType;
    excludeBeskrivelse?: boolean;
}

interface BelopBeskrivelseFormValues {
    belopBeskrivelse: {
        belop: number | null;
        beskrivelse?: string | null;
    }[];
}

const BelopBeskrivelse = ({opplysningstype, excludeBeskrivelse}: BelopBeskrivelseProps) => {
    const {t} = useTranslation("skjema");
    const {t: tDok} = useTranslation("dokumentasjon");
    // TODO: Finn ut av om den her trengs
    const isKort = useIsKort();
    const tomDefaultEntry = {belop: null, beskrivelse: excludeBeskrivelse ? undefined : null};
    const {register, formState, control} = useForm<BelopBeskrivelseFormValues>({
        defaultValues: {belopBeskrivelse: [tomDefaultEntry]},
    });
    const {fields, append} = useFieldArray({control, name: "belopBeskrivelse"});
    const {leggtil} = useDokumentasjonTekster(opplysningstype);
    return (
        <form>
            <ul>
                {fields.map((_, index) => {
                    return (
                        <li>
                            <TextField
                                {...register(`belopBeskrivelse.${index}.belop`)}
                                label={
                                    isKort.data ? (
                                        <span style={{fontSize: 16, fontWeight: "normal"}}>
                                            {t("utbetalinger.inntekt.skattbar.kort_saldo_saldo")}
                                        </span>
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
                                className={cx("pb-2")}
                                error={
                                    formState.touchedFields.belopBeskrivelse?.[index].belop &&
                                    formState.errors.belopBeskrivelse?.[index]?.belop?.message &&
                                    t(formState.errors.belopBeskrivelse[index]?.belop?.message as DigisosLanguageKey)
                                }
                                autoComplete={"off"}
                                htmlSize={20}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {!excludeBeskrivelse && (
                                <TextField
                                    {...register(`belopBeskrivelse.${index}.beskrivelse`)}
                                    label={
                                        isKort.data ? (
                                            <span style={{fontSize: 16, fontWeight: "normal"}}>
                                                {t("utbetalinger.inntekt.skattbar.kort_saldo_saldo")}
                                            </span>
                                        ) : (
                                            <span style={{fontSize: 16, fontWeight: "normal"}}>
                                                {
                                                    tDok(
                                                        `${opplysningstype}.beskrivelse.label` as DigisosLanguageKey<"dokumentasjon">
                                                    ) as string
                                                }
                                            </span>
                                        )
                                    }
                                    className={cx("pb-2")}
                                    error={
                                        formState.touchedFields.belopBeskrivelse?.[index].beskrivelse &&
                                        formState.errors.belopBeskrivelse?.[index]?.beskrivelse?.message &&
                                        t(
                                            formState.errors.belopBeskrivelse[index]?.beskrivelse
                                                ?.message as DigisosLanguageKey
                                        )
                                    }
                                    autoComplete={"off"}
                                    htmlSize={32}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            )}
                        </li>
                    );
                })}
                <li className={`pt-3 pb-4`}>
                    <LinkButton onClick={() => append(tomDefaultEntry)}>
                        <span aria-hidden={true}>+ </span>
                        {isKort.data ? t("utbetalinger.inntekt.skattbar.kort_saldo_leggTil") : leggtil}
                    </LinkButton>
                </li>
            </ul>
        </form>
    );
};

interface BruttoNettoProps {
    opplysningstype: DokumentasjonDtoType;
}

interface BruttoNettoFormValues {
    bruttoNetto: {
        brutto: number | null;
        netto: number | null;
    }[];
}

const BruttoNetto = ({opplysningstype}: BruttoNettoProps) => {
    const {t} = useTranslation("dokumentasjon");
    const {t: tSkjema} = useTranslation("skjema");
    const tomDefaultEntry = {brutto: null, netto: null};
    const {control, register} = useForm<BruttoNettoFormValues>({
        defaultValues: {bruttoNetto: [tomDefaultEntry]},
    });
    const {fields, remove, append} = useFieldArray({name: "bruttoNetto", control: control});
    const {leggtil} = useDokumentasjonTekster(opplysningstype);
    // TODO: Finn ut av om den her trengs
    const isKort = useIsKort();
    return (
        <form>
            <ul>
                {fields.map((_, index) => {
                    return (
                        <li key={index}>
                            <TextField
                                {...register(`bruttoNetto.${index}.brutto`)}
                                className={cx("pb-2")}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningstype}.brutto.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                            />
                            <TextField
                                {...register(`bruttoNetto.${index}.netto`)}
                                className={cx("pb-2")}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningstype}.netto.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                            />
                            <LinkButton onClick={() => remove(index)}>{tSkjema("opplysninger.fjern")}</LinkButton>
                        </li>
                    );
                })}
                <li className={`pt-3 pb-4`}>
                    <LinkButton onClick={() => append(tomDefaultEntry)}>
                        <span aria-hidden={true}>+ </span>
                        {isKort.data ? tSkjema("utbetalinger.inntekt.skattbar.kort_saldo_leggTil") : leggtil}
                    </LinkButton>
                </li>
            </ul>
        </form>
    );
};

interface BelopEnProps {
    opplysningstype: DokumentasjonDtoType;
}

interface BelopEnFormValues {
    belop: number | null;
}

const BelopEn = ({opplysningstype}: BelopEnProps) => {
    const {t} = useTranslation("skjema");
    const {t: tDok} = useTranslation("dokumentasjon");
    // TODO: Finn ut av om den her trengs
    const isKort = useIsKort();
    const {register, formState} = useForm<BelopEnFormValues>({
        defaultValues: {belop: null},
    });
    return (
        <form>
            <TextField
                {...register(`belop`)}
                label={
                    isKort.data ? (
                        <span style={{fontSize: 16, fontWeight: "normal"}}>
                            {t("utbetalinger.inntekt.skattbar.kort_saldo_saldo")}
                        </span>
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
                className={cx("pb-2")}
                error={
                    formState.touchedFields.belop &&
                    formState.errors.belop?.message &&
                    t(formState.errors.belop?.message as DigisosLanguageKey)
                }
                autoComplete={"off"}
                htmlSize={20}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            />
        </form>
    );
};
