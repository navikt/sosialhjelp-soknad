import React from "react";
import {inhibitNavigation, SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldError, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, VStack} from "@navikt/ds-react";
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
import LocalizedTextArea from "../../../lib/components/LocalizedTextArea.tsx";
import {useProcessedData} from "../ProcessedDataContext.tsx";

const MAX_LEN_HVA = 150;
const MAX_LEN_HVA_ER_ENDRET = 500;

const behovSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "validering.maksLengde").nullable().optional(),
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
    } = useKategorier(!!forsorgerplikt?.harForsorgerplikt, setValue, getValues);

    const {setProcessedData} = useProcessedData();

    const onSubmit = (formValues: FormValues) => {
        const selectedKategorier: string[] = reducer
            .filter((category) => category.selected)
            .map((category) => {
                if (category.text === "Nødhjelp" && category.subCategories?.length) {
                    const selectedSubCategories = category.subCategories
                        .filter((subCategory) => subCategory.selected)
                        .map((subCategory) => subCategory.text);

                    if (selectedSubCategories.length > 0) {
                        return `${category.text}: ${JSON.stringify(selectedSubCategories)}`;
                    }
                }
                if (category.text === "Annet" && formValues.hvaSokesOm) {
                    return category.text;
                }
                return category.text;
            })
            .filter((categoryText): categoryText is string => !!categoryText);

        const situasjonEndret =
            formValues.hvaErEndret && formValues.hvaErEndret.trim().length > 0 ? "Ja" : "Ikke utfylt";

        setProcessedData({selectedKategorier, situasjonEndret});

        putSituasjon({...formValues, hvaErEndret: formValues.hvaErEndret ?? undefined});
        putKategorier({hvaSokesOm: formValues.hvaSokesOm});
        reset({hvaSokesOm: null, hvaErEndret: null});
    };

    const isPending = kategorierPending || situasjonPending;
    const isError = kategorierError || situasjonError;

    return (
        <SkjemaSteg page={2} onRequestNavigation={handleSubmit(onSubmit, inhibitNavigation)}>
            <VStack gap="4">
                <Alert variant="info">
                    <BodyShort>{t("arbeidOgFamilie.alert")}</BodyShort>
                </Alert>
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
                                undertekst={t("begrunnelse.kort.behov.dokumentasjon.beskrivelse")}
                                dokumentasjonType={"kort|behov"}
                            />
                        </form>
                    )}
                    <SkjemaStegButtons loading={isPending} includeNextArrow />
                </SkjemaContent>
            </VStack>
        </SkjemaSteg>
    );
};

export default Behov;
