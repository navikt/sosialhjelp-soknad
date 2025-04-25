import {BodyShort} from "@navikt/ds-react";
import LocalizedTextArea from "../../../lib/components/LocalizedTextArea.tsx";
import React from "react";
import {FieldError, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {MAX_LEN_HVA} from "../../02-begrunnelse/schema.ts";
import {useTranslation} from "react-i18next";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import {SkjemaStegErrorSummary} from "../../../lib/components/SkjemaSteg/SkjemaStegErrorSummary.tsx";

interface Props {
    hvaErEndret?: string;
    hvaSokesOm?: string;
    onSubmit: (formValues: FormValues) => void;
}

export interface FormValues {
    hvaErEndret: string | null;
    hvaSokesOm: string | null;
}

const MAX_LEN_HVA_ER_ENDRET = 500;

const behovSchema = z.object({
    hvaErEndret: z.string().max(MAX_LEN_HVA_ER_ENDRET, "validering.maksLengde").nullable(),
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "validering.maksLengde").nullable(),
});

const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};

const BehovForm = ({hvaErEndret, hvaSokesOm, onSubmit}: Props) => {
    const {t} = useTranslation("skjema");
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormValues>({
        resolver: zodResolver(behovSchema),
        mode: "onBlur",
        shouldFocusError: false,
        defaultValues: {hvaErEndret, hvaSokesOm},
    });

    return (
        <>
            <SkjemaStegErrorSummary errors={errors} />
            <form className={"space-y-12"} onBlur={handleSubmit(onSubmit)} onSubmit={(e) => e.preventDefault()}>
                <LocalizedTextArea
                    {...register("hvaSokesOm")}
                    id={"hvaSokesOm"}
                    maxLength={MAX_LEN_HVA}
                    error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                    label={t("begrunnelse.hva.label")}
                    description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                />
                <LocalizedTextArea
                    {...register("hvaErEndret")}
                    id={"hvaErEndret"}
                    maxLength={MAX_LEN_HVA_ER_ENDRET}
                    error={errors.hvaErEndret && <TranslatedError error={errors.hvaErEndret} />}
                    label={t("situasjon.kort.hvaErEndret.label")}
                    description={<BodyShort>{t("situasjon.kort.hvaErEndret.description")}</BodyShort>}
                />
            </form>
        </>
    );
};

export default BehovForm;
