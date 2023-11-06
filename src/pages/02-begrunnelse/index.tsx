import * as React from "react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../generated/model";
import {Textarea} from "@navikt/ds-react";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFeatureFlags} from "../../lib/featureFlags";
import {DigisosValidationError, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";

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
    return <div>{t("skjema.navigering.feil")}</div>;
};

export const Begrunnelse = () => {
    const {hent, lagre, isError} = useBegrunnelse();
    const {t} = useTranslation("skjema", {keyPrefix: "begrunnelse"});
    const {begrunnelseNyTekst} = useFeatureFlags();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<BegrunnelseFrontend>({
        defaultValues: hent,
        resolver: zodResolver(begrunnelseSchema),
        mode: "onChange",
    });

    const onRequestNavigation = async () =>
        handleSubmit(
            (data) => lagre(data),
            () => new DigisosValidationError()
        )();

    return (
        <SkjemaSteg page={2} onRequestNavigation={onRequestNavigation}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <SkjemaSteg.ErrorSummary errors={errors} />
                <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
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
                {isError && <Feilmelding />}
                <SkjemaSteg.Buttons />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};
export default Begrunnelse;
