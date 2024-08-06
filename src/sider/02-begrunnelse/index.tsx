import * as React from "react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../generated/model";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFeatureFlags} from "../../lib/config";
import {SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {DigisosLanguageKey} from "../../lib/i18n";
import useKategorier from "../../lib/hooks/data/useKategorier";
import KategorierChips from "../../lib/components/KategorierChips";
import {useFeatureToggles} from "../../generated/feature-toggle-ressurs/feature-toggle-ressurs";

const MAX_LEN_HVA = 500;
const MAX_LEN_HVORFOR = 600;

const feilmeldinger: Record<string, DigisosLanguageKey> = {
    maksLengde: "validering.maksLengde",
} as const;

const begrunnelseSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, feilmeldinger.maksLengde).optional(),
    hvorforSoke: z.string().max(MAX_LEN_HVORFOR, feilmeldinger.maksLengde),
});

export const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};

const Feilmelding = () => {
    const {t} = useTranslation("skjema");
    return <Alert variant={"error"}>{t("skjema.navigering.feil")}</Alert>;
};

export const Begrunnelse = () => {
    const {get: defaultValues} = useBegrunnelse();
    const {t} = useTranslation("skjema");
    // TODO: Avklare denne. Er det behov lenger?
    const {begrunnelseNyTekst} = useFeatureFlags();
    const {data: featureFlagData, isPending: featureFlagsPending} = useFeatureToggles();
    const isKategorierEnabled = featureFlagData?.["sosialhjelp.soknad.kategorier"] ?? false;
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
    } = useForm<BegrunnelseFrontend>({
        defaultValues,
        resolver: zodResolver(begrunnelseSchema),
        mode: "onChange",
    });

    const {onSubmit, isPending, reducer, toggle, isError} = useKategorier(setValue, handleSubmit, getValues);

    return (
        <SkjemaSteg page={2} onRequestNavigation={onSubmit}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <SkjemaSteg.ErrorSummary errors={errors} />
                {isPending || featureFlagsPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}
                        {isKategorierEnabled && (
                            <KategorierChips errors={errors} toggle={toggle} register={register} categories={reducer} />
                        )}
                        {!isKategorierEnabled && (
                            <Textarea
                                {...register("hvaSokesOm")}
                                id={"hvaSokesOm"}
                                error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                                label={begrunnelseNyTekst ? t("begrunnelse.hva.label") : t("begrunnelse.hva.labelOld")}
                                description={
                                    begrunnelseNyTekst ? (
                                        <BodyShort>{t("begrunnelse.hva.description")}</BodyShort>
                                    ) : (
                                        <BodyShort>{t("begrunnelse.hva.descriptionOld")}</BodyShort>
                                    )
                                }
                            />
                        )}
                        <Textarea
                            {...register("hvorforSoke")}
                            id={"hvorforSoke"}
                            error={errors.hvorforSoke && <TranslatedError error={errors.hvorforSoke} />}
                            label={
                                begrunnelseNyTekst ? t("begrunnelse.hvorfor.label") : t("begrunnelse.hvorfor.labelOld")
                            }
                            description={
                                begrunnelseNyTekst ? (
                                    <BodyShort>{t("begrunnelse.hvorfor.description")}</BodyShort>
                                ) : undefined
                            }
                        />
                    </form>
                )}
                <SkjemaSteg.Buttons loading={isPending} />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default Begrunnelse;
