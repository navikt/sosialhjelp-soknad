import * as React from "react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../generated/model";
import {Textarea} from "@navikt/ds-react";
import {hentBegrunnelse, useUpdateBegrunnelse} from "../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {FieldError, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFeatureFlags} from "../../lib/featureFlags";
import {SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";

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

const Begrunnelse = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "begrunnelse"});
    const behandlingsId = useBehandlingsId();
    const {mutate, isError} = useUpdateBegrunnelse();
    const {begrunnelseNyTekst} = useFeatureFlags();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<BegrunnelseFrontend>({
        defaultValues: async () => hentBegrunnelse(behandlingsId),
        resolver: zodResolver(begrunnelseSchema),
        mode: "onChange",
    });

    const onRequestNavigation = () =>
        new Promise<void>((resolve, reject) => {
            handleSubmit(
                (data) => mutate({behandlingsId, data}, {onSuccess: resolve, onError: reject}),
                () => reject()
            )();
        });

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
                {isError && <div>Beklager, et teknisk problem oppstod ved innsending. Prøv gjerne igjen.</div>}
                <SkjemaSteg.Buttons />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default Begrunnelse;
