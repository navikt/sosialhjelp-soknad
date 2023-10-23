import * as React from "react";
import * as Sentry from "@sentry/react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../generated/model";
import {Textarea} from "@navikt/ds-react";
import {hentBegrunnelse, updateBegrunnelse} from "../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFeatureFlags} from "../../lib/featureFlags";
import {DigisosValidationError, SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import {logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {useEffect} from "react";

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

const useBegrunnelse = () => {
    const behandlingsId = useBehandlingsId();
    const {begrunnelseNyTekst} = useFeatureFlags();
    const [isError, setIsError] = React.useState(false);

    const hent = () => hentBegrunnelse(behandlingsId);
    const lagre = async (data: BegrunnelseFrontend) => {
        logAmplitudeEvent("begrunnelse fullført", {
            hvaLengde: (Math.round((data?.hvaSokesOm?.length ?? 0) / 20) - 1) * 20,
            hvorforLengde: (Math.round((data?.hvorforSoke?.length ?? 0) / 20) - 1) * 20,
            begrunnelseNyTekst,
        });

        try {
            await updateBegrunnelse(behandlingsId, data);
        } catch (e) {
            setIsError(true);
            Sentry.captureException(e);
        }
    };

    useEffect(() => {
        logAmplitudeEvent("begrunnelse åpnet", {begrunnelseNyTekst});
    }, [begrunnelseNyTekst]);

    return {
        hent,
        lagre,
        isError,
    };
};

const Feilmelding = () => {
    const {t} = useTranslation("skjema");
    return <div>{t("skjema.navigering.feil")}</div>;
};

const Begrunnelse = () => {
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
