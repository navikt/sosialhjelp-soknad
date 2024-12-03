import * as React from "react";
import {Alert, BodyShort} from "@navikt/ds-react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
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
import {TranslatedError} from "../../lib/components/TranslatedError.tsx";
import {begrunnelseSchema, FormValues, MAX_LEN_HVA, MAX_LEN_HVORFOR} from "./schema.ts";

export const Begrunnelse = () => {
    const {get: defaultValues} = useBegrunnelse();
    const {t} = useTranslation("skjema");
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
                        {isError && <Alert variant={"error"}>{t("skjema.navigering.feil")}</Alert>}
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
                                id={"hvaSokesOm"}
                                maxLength={MAX_LEN_HVA}
                                error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                                label={t("begrunnelse.hva.label")}
                                description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                            />
                        )}
                        <LocalizedTextArea
                            {...register("hvorforSoke")}
                            id={"hvorforSoke"}
                            error={errors.hvorforSoke && <TranslatedError error={errors.hvorforSoke} />}
                            label={t("begrunnelse.hvorfor.label")}
                            maxLength={MAX_LEN_HVORFOR}
                            description={<BodyShort>{t("begrunnelse.hvorfor.description")}</BodyShort>}
                        />
                    </form>
                )}
                <SkjemaStegButtons onPrevious={async () => navigate("../1")} onNext={async () => await goto(3)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Begrunnelse;
