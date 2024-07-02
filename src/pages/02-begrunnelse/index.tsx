import * as React from "react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../generated/model";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFeatureFlags} from "../../lib/featureFlags";
import {inhibitNavigation, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {DigisosLanguageKey} from "../../lib/i18n";

const MAX_LEN_HVA = 500;
const MAX_LEN_HVORFOR = 600;

const feilmeldinger: Record<string, DigisosLanguageKey> = {
    maksLengde: "validering.maksLengde",
} as const;

const begrunnelseSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, feilmeldinger.maksLengde),
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
    const {get: defaultValues, put, isError, isPending} = useBegrunnelse();
    const {t} = useTranslation("skjema");
    // TODO: Avklare denne. Er det behov lenger?
    const {begrunnelseNyTekst} = useFeatureFlags();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<BegrunnelseFrontend>({
        defaultValues,
        resolver: zodResolver(begrunnelseSchema),
        mode: "onChange",
    });

    return (
        <SkjemaSteg page={2} onRequestNavigation={handleSubmit(put, inhibitNavigation)}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <SkjemaSteg.ErrorSummary errors={errors} />
                {isPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}
                        <Textarea
                            {...register("hvaSokesOm")}
                            id={"hvaSokesOm"}
                            error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                            label={
                                begrunnelseNyTekst
                                    ? t("begrunnelse.hva.label.stringValue")
                                    : t("begrunnelse.hva.label.old")
                            }
                            description={
                                begrunnelseNyTekst ? (
                                    <BodyShort>{t("begrunnelse.hva.description.stringValue")}</BodyShort>
                                ) : (
                                    <BodyShort>{t("begrunnelse.hva.description.old")}</BodyShort>
                                )
                            }
                        />
                        <Textarea
                            {...register("hvorforSoke")}
                            id={"hvorforSoke"}
                            error={errors.hvorforSoke && <TranslatedError error={errors.hvorforSoke} />}
                            label={
                                begrunnelseNyTekst
                                    ? t("begrunnelse.hvorfor.label.stringValue")
                                    : t("begrunnelse.hvorfor.label.old")
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
