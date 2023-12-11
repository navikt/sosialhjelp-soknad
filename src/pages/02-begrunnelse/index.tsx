import * as React from "react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../generated/model";
import {Alert, Textarea} from "@navikt/ds-react";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFeatureFlags} from "../../lib/featureFlags";
import {inhibitNavigation, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";

const MAX_LEN_HVA = 500;
const MAX_LEN_HVORFOR = 600;

const begrunnelseSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "maksLengde"),
    hvorforSoke: z.string().max(MAX_LEN_HVORFOR, "maksLengde"),
});

export const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "validering"});

    if (!error?.message) return null;

    return <>{t(error.message)}</>;
};

const Feilmelding = () => {
    const {t} = useTranslation("skjema");
    return <Alert variant={"error"}>{t("skjema.navigering.feil")}</Alert>;
};

export const Begrunnelse = () => {
    const {get: defaultValues, put, isError, isPending} = useBegrunnelse();
    const {t} = useTranslation("skjema", {keyPrefix: "begrunnelse"});
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
                            label={begrunnelseNyTekst ? t("hva.label") : t("hva.label.old")}
                            description={begrunnelseNyTekst ? t("hva.description") : t("hva.description.old")}
                        />
                        <Textarea
                            {...register("hvorforSoke")}
                            id={"hvorforSoke"}
                            label={begrunnelseNyTekst ? t("hvorfor.label") : t("hvorfor.label.old")}
                            description={begrunnelseNyTekst ? t("hvorfor.description") : undefined}
                            error={errors.hvorforSoke && <TranslatedError error={errors.hvorforSoke} />}
                        />
                    </form>
                )}
                <SkjemaSteg.Buttons loading={isPending} />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};
export default Begrunnelse;
