import React from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {FieldError, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import useKategorier, {SelectableCategory} from "../../../lib/hooks/data/useKategorier";
import KategorierChips from "../../../lib/components/KategorierChips";
import {SkjemaStegErrorSummary} from "../../../lib/components/SkjemaSteg/SkjemaStegErrorSummary.tsx";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {DigisosLanguageKey} from "../../../lib/i18n/common.ts";
import useSituasjon from "../../../lib/hooks/data/kort/useSituasjon.ts";
import LocalizedTextArea from "../../../lib/components/LocalizedTextArea.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {useAnalyticsContext} from "../../../lib/providers/useAnalyticsContext.ts";
import {useContextFeatureToggles} from "../../../lib/providers/useContextFeatureToggles.ts";

const MAX_LEN_HVA_ER_ENDRET = 500;
const MAX_LEN_HVA_SOKES_OM = 500;

const behovSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA_SOKES_OM, "validering.maksLengde").nullable().optional(),
    hvaErEndret: z.string().max(MAX_LEN_HVA_ER_ENDRET, "validering.maksLengde").nullable(),
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

const mapToTextOrSubcategoriesText = ({subCategories, text}: SelectableCategory) => {
    if (text === "Nødhjelp" && subCategories?.length) {
        const selectedSubCategories = subCategories
            .filter(({selected}) => selected)
            .map((subCategory) => subCategory.text);

        if (selectedSubCategories.length) return `${text}: ${JSON.stringify(selectedSubCategories)}`;
    }

    return text;
};

const Behov = () => {
    const {t} = useTranslation("skjema");

    const featureFlagData = useContextFeatureToggles();
    const isKategorierEnabled = featureFlagData?.["sosialhjelp.soknad.kategorier"] ?? false;

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
        reset,
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
    } = useKategorier(setValue, getValues);
    const {setAnalyticsData} = useAnalyticsContext();
    const navigate = useNavigate();

    const goto = async (page: number) =>
        await handleSubmit(async (formValues) => {
            const selectedKategorier: string[] = reducer
                .filter(({selected}) => selected)
                .map(mapToTextOrSubcategoriesText)
                .filter((categoryText): categoryText is string => !!categoryText);

            const situasjonEndret = formValues.hvaErEndret?.trim() ? "Ja" : "Ikke utfylt";
            const hvaErEndret = formValues.hvaErEndret ?? undefined;

            setAnalyticsData({selectedKategorier, situasjonEndret});

            await putSituasjon({...formValues, hvaErEndret});
            await putKategorier({hvaSokesOm: formValues.hvaSokesOm});
            reset({hvaSokesOm: null, hvaErEndret: null});
            await logAmplitudeSkjemaStegFullfort(2);
            navigate(`../${page}`);
        })();

    const isPending = kategorierPending || situasjonPending;
    const isError = kategorierError || situasjonError;

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={2} onStepChange={goto} />
            <VStack gap="4">
                <Alert variant="info">
                    <BodyShort>{t("arbeidOgFamilie.alert")}</BodyShort>
                </Alert>
                <SkjemaStegBlock className={"lg:space-y-12"}>
                    <SkjemaStegTitle
                        className={"lg:mb-12"}
                        title={t(KortSkjemaHeadings[2].tittel)}
                        icon={KortSkjemaHeadings[2].ikon}
                    />
                    <SkjemaStegErrorSummary errors={errors} />
                    {isPending ? (
                        <ApplicationSpinner />
                    ) : (
                        <form className={"space-y-12"} onSubmit={(e) => e.preventDefault()}>
                            {isError && <Feilmelding />}
                            {isKategorierEnabled ? (
                                <KategorierChips
                                    errors={errors}
                                    toggle={toggle}
                                    register={register}
                                    categories={reducer}
                                    hvaSokesOm={watch("hvaSokesOm")}
                                />
                            ) : (
                                <LocalizedTextArea
                                    {...register("hvaSokesOm")}
                                    id="hvaSokesOm"
                                    maxLength={MAX_LEN_HVA_SOKES_OM}
                                    error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                                    label={t("begrunnelse.kategorier.label")}
                                    description={<BodyShort>{t("begrunnelse.kort.behov.description")}</BodyShort>}
                                />
                            )}
                            <LocalizedTextArea
                                {...register("hvaErEndret")}
                                id={"hvaErEndret"}
                                maxLength={MAX_LEN_HVA_ER_ENDRET}
                                error={errors.hvaErEndret && <TranslatedError error={errors.hvaErEndret} />}
                                label={t("situasjon.kort.hvaErEndret.label")}
                                description={<BodyShort>{t("situasjon.kort.hvaErEndret.description")}</BodyShort>}
                            />
                            <FileUploadBox
                                sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                                undertekst="begrunnelse.kort.behov.dokumentasjon.beskrivelse"
                                liste="begrunnelse.kort.behov.dokumentasjon.liste"
                                dokumentasjonType={"kort|behov"}
                            />
                        </form>
                    )}
                    <SkjemaStegButtons onPrevious={async () => navigate("../1")} onNext={async () => goto(3)} />
                </SkjemaStegBlock>
            </VStack>
        </SkjemaSteg>
    );
};

export default Behov;
