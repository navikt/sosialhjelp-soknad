import * as React from "react";
import * as z from "zod";
import {Alert, BodyShort} from "@navikt/ds-react";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useConfigFeatureFlags} from "../../lib/config";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";
import useKategorier from "../../lib/hooks/data/useKategorier";
import KategorierChips from "../../lib/components/KategorierChips";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/SkjemaStegErrorSummary.tsx";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useForsorgerplikt} from "../../lib/hooks/data/useForsorgerplikt.tsx";
import LocalizedTextArea from "../../lib/components/LocalizedTextArea.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useNavigate} from "react-router";
import {logAmplitudeSkjemaStegFullfort} from "../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {useContextFeatureToggles} from "../../lib/providers/useContextFeatureToggles.ts";

const MAX_LEN_HVA = 500;
const MAX_LEN_HVORFOR = 600;

const feilmeldinger: Record<string, DigisosLanguageKey> = {
    maksLengde: "validering.maksLengde",
} as const;

export interface FormValues {
    hvaSokesOm?: string | null;
    hvorforSoke?: string | null;
}

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
    const {begrunnelseNyTekst} = useConfigFeatureFlags();
    const featureFlagData = useContextFeatureToggles();
    const isKategorierEnabled = featureFlagData?.["sosialhjelp.soknad.kategorier"] ?? false;
    const {forsorgerplikt} = useForsorgerplikt();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        watch,
        reset,
    } = useForm<FormValues>({
        defaultValues,
        resolver: zodResolver(begrunnelseSchema),
        mode: "onChange",
    });

    const {put, isPending, reducer, toggle, isError} = useKategorier(
        !!forsorgerplikt?.harForsorgerplikt,
        setValue,
        getValues
    );

    const navigate = useNavigate();

    const goto = (page: number) =>
        handleSubmit(async (values: FormValues) => {
            await put(values);
            reset({hvaSokesOm: null, hvorforSoke: null});
            await logAmplitudeSkjemaStegFullfort(2);
            navigate(`../${page}`);
        })();

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={2} onStepChange={goto} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[2].tittel)} icon={SkjemaHeadings[2].ikon} />
                <SkjemaStegErrorSummary errors={errors} />
                {isPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}
                        {isKategorierEnabled && (
                            <KategorierChips
                                errors={errors}
                                toggle={toggle}
                                register={register}
                                categories={reducer}
                                hvaSokesOm={watch("hvaSokesOm")}
                            />
                        )}
                        {!isKategorierEnabled && (
                            <LocalizedTextArea
                                {...register("hvaSokesOm")}
                                id={"hvaSokesOm"}
                                maxLength={MAX_LEN_HVA}
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
                        <LocalizedTextArea
                            {...register("hvorforSoke")}
                            id={"hvorforSoke"}
                            error={errors.hvorforSoke && <TranslatedError error={errors.hvorforSoke} />}
                            label={
                                begrunnelseNyTekst ? t("begrunnelse.hvorfor.label") : t("begrunnelse.hvorfor.labelOld")
                            }
                            maxLength={MAX_LEN_HVORFOR}
                            description={
                                begrunnelseNyTekst ? (
                                    <BodyShort>{t("begrunnelse.hvorfor.description")}</BodyShort>
                                ) : undefined
                            }
                        />
                    </form>
                )}
                <SkjemaStegButtons onPrevious={async () => navigate("../1")} onNext={async () => await goto(3)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Begrunnelse;
