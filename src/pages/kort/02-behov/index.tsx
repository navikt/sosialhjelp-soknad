import React from "react";
import {SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldError, useForm} from "react-hook-form";
import {BegrunnelseFrontend} from "../../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Box, Checkbox, CheckboxGroup, HStack, Label, Textarea, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import {DigisosLanguageKey} from "../../../lib/i18n";
import {useFeatureToggles} from "../../../generated/feature-toggle-ressurs/feature-toggle-ressurs";
import useKategorier from "../../../lib/hooks/data/useKategorier";

const MAX_LEN_HVA = 500;

const behovSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "validering.maksLengde").nullable(),
});

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
    const {data: featureFlagData, isPending: featureFlagsPending} = useFeatureToggles();
    const isKategorierEnabled = featureFlagData?.["sosialhjelp.soknad.kategorier"] ?? false;
    const {t} = useTranslation("skjema");

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<BegrunnelseFrontend>({
        resolver: zodResolver(behovSchema),
        mode: "onChange",
    });

    const {onSubmit, isPending, isError, reducer, toggle} = useKategorier(setValue, handleSubmit);

    return (
        <SkjemaSteg page={2} onRequestNavigation={onSubmit}>
            <SkjemaSteg.Content className={"lg:space-y-12"}>
                <SkjemaSteg.Title className={"lg:mb-12"} />
                <SkjemaSteg.ErrorSummary errors={errors} />
                {isPending || featureFlagsPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}
                        <Label htmlFor={"kategorier"} id={"kategorier-label"}>
                            {t("begrunnelse.hva.label")}
                        </Label>
                        {isKategorierEnabled && (
                            <HStack align="start" gap="4" id={"kategorier"} aria-labelledby={"kategorier-label"}>
                                {reducer.map((category) => (
                                    <Box
                                        as={"button"}
                                        className={`flex rounded-lg ${category.selected ? (category.text === "Nødhjelp" ? "bg-surface-warning-subtle" : "bg-blue-200") : "bg-blue-50"} ${
                                            category.selected && ["Annet", "Bolig", "Nødhjelp"].includes(category.text)
                                                ? "w-full"
                                                : ""
                                        }`}
                                        key={category.text}
                                        onClick={() => toggle(category.text)}
                                    >
                                        <VStack gap="2" margin="4" className={`w-full`}>
                                            <HStack gap="2" align="center">
                                                {category.icons}
                                                {t(category.key)}
                                            </HStack>
                                            {category.subCategories && category.selected && (
                                                <CheckboxGroup
                                                    legend={"Bolig"}
                                                    hideLegend
                                                    onClick={(e) => e.stopPropagation()}
                                                    value={category.subCategories
                                                        .filter((subCat) => subCat.selected)
                                                        .map((subCat) => subCat.text)}
                                                >
                                                    {category.subCategories.map((subCat) => (
                                                        <Checkbox
                                                            value={subCat.text}
                                                            key={subCat.text}
                                                            onClick={(e) => {
                                                                toggle(category.text, e.currentTarget.value);
                                                            }}
                                                        >
                                                            {subCat.key}
                                                        </Checkbox>
                                                    ))}
                                                </CheckboxGroup>
                                            )}
                                            {category.text === "Annet" && category.selected && (
                                                <VStack className="w-full" align="start" gap="2">
                                                    <BodyShort>{t("begrunnelse.annet.beskrivelse")}</BodyShort>
                                                    <Textarea
                                                        {...register("hvaSokesOm")}
                                                        id={"hvaSokesOm"}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                        }}
                                                        className="w-full"
                                                        error={
                                                            errors.hvaSokesOm && (
                                                                <TranslatedError error={errors.hvaSokesOm} />
                                                            )
                                                        }
                                                        label={t("begrunnelse.hva.label")}
                                                        hideLabel
                                                        description={
                                                            <BodyShort>{t("begrunnelse.hva.description")}</BodyShort>
                                                        }
                                                    />
                                                </VStack>
                                            )}
                                        </VStack>
                                    </Box>
                                ))}
                            </HStack>
                        )}
                        {!isKategorierEnabled ? (
                            <Textarea
                                {...register("hvaSokesOm")}
                                id={"hvaSokesOm"}
                                error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                                label={t("begrunnelse.hva.label")}
                                description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                            />
                        ) : null}
                        <FileUploadBox
                            sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                            undertekst={t("begrunnelse.kort.behov.dokumentasjon.beskrivelse")}
                            dokumentasjonType={"kort|behov"}
                        />
                    </form>
                )}
                <SkjemaSteg.Buttons loading={isPending} includeNextArrow />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default Behov;
