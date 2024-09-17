import React from "react";
import {inhibitNavigation, SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldError, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import useKategorier from "../../../lib/hooks/data/useKategorier";
import KategorierChips from "../../../lib/components/KategorierChips";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaStegErrorSummary} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegErrorSummary.tsx";
import {SkjemaContent} from "../../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {DigisosLanguageKey} from "../../../lib/i18n.ts";
import useSituasjon from "../../../lib/hooks/data/kort/useSituasjon.ts";
import {useForsorgerplikt} from "../../../lib/hooks/data/useForsorgerplikt.tsx";

const MAX_LEN_HVA = 150;

const behovSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "validering.maksLengde").nullable().optional(),
    hvaErEndret: z.string().max(500, "validering.maksLengde").nullable(),
});

interface FormValues {
    hvaSokesOm?: string | null;
    hvaErEndret?: string | null;
}

const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};

const Feilmelding = () => {
    const {t} = useTranslation("skjema");
    return <Alert variant={"error"}>{t("skjema.navigering.feil")}</Alert>;
};

const Behov = (): React.JSX.Element => {
    const {t} = useTranslation("skjema");

    const {forsorgerplikt} = useForsorgerplikt();

    const {
        get: defaultValues,
        put: putSituasjon,
        isError: situasjonError,
        isPending: situasjonPending,
    } = useSituasjon();

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        watch,
    } = useForm<FormValues>({
        resolver: zodResolver(behovSchema),
        mode: "onChange",
        defaultValues,
    });

    const {
        put: putKategorier,
        isPending: kategorierPending,
        isError: kategorierError,
        reducer,
        toggle,
    } = useKategorier(!!forsorgerplikt?.harForsorgerplikt, setValue, getValues);

    const onSubmit = (formValues: FormValues) => {
        putSituasjon({...formValues, hvaErEndret: formValues.hvaErEndret ?? undefined});
        putKategorier({hvaSokesOm: formValues.hvaSokesOm});
    };

    const isPending = kategorierPending || situasjonPending;
    const isError = kategorierError || situasjonError;

    return (
        <SkjemaSteg page={2} onRequestNavigation={handleSubmit(onSubmit, inhibitNavigation)}>
            <SkjemaContent className={"lg:space-y-12"}>
                <SkjemaStegTitle className={"lg:mb-12"} />
                <SkjemaStegErrorSummary errors={errors} />
                {isPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}
                        <KategorierChips
                            errors={errors}
                            toggle={toggle}
                            register={register}
                            categories={reducer}
                            hvaSokesOm={watch("hvaSokesOm")}
                        />
                        <Textarea
                            {...register("hvaErEndret")}
                            id={"hvaErEndret"}
                            error={errors.hvaErEndret && <TranslatedError error={errors.hvaErEndret} />}
                            label={t("situasjon.kort.hvaErEndret.label")}
                            description={<BodyShort>{t("situasjon.kort.hvaErEndret.description")}</BodyShort>}
                        />
                        <FileUploadBox
                            sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                            undertekst={t("begrunnelse.kort.behov.dokumentasjon.beskrivelse")}
                            dokumentasjonType={"kort|behov"}
                        />
                    </form>
                )}
                <SkjemaStegButtons loading={isPending} includeNextArrow />
            </SkjemaContent>
        </SkjemaSteg>
    );
};

export default Behov;
