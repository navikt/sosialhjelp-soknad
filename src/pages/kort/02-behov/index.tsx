import React from "react";
import {SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldError, useForm} from "react-hook-form";
import {BegrunnelseFrontend} from "../../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import {DigisosLanguageKey} from "../../../lib/i18n";
import {useFeatureToggles} from "../../../generated/feature-toggle-ressurs/feature-toggle-ressurs";
import useKategorier from "../../../lib/hooks/data/useKategorier";
import KategorierChips from "../../../lib/components/KategorierChips";

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
        getValues,
    } = useForm<BegrunnelseFrontend>({
        resolver: zodResolver(behovSchema),
        mode: "onChange",
    });

    const {onSubmit, isPending, isError, reducer, toggle} = useKategorier(setValue, handleSubmit, getValues);

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
                        {isKategorierEnabled && (
                            <KategorierChips errors={errors} toggle={toggle} register={register} categories={reducer} />
                        )}
                        {!isKategorierEnabled ? (
                            <Textarea
                                {...register("hvaSokesOm")}
                                id={"kategorier"}
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
