import * as React from "react";
import * as z from "zod";
import {BegrunnelseFrontend} from "../../../generated/model";
import {ErrorSummary, Textarea} from "@navikt/ds-react";
import {
    hentBegrunnelse,
    useHentBegrunnelse,
    useUpdateBegrunnelse,
} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {useBehandlingsId} from "../../../nav-soknad/hooks/useBehandlingsId";
import {FieldError, FieldErrors, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {zodResolver} from "@hookform/resolvers/zod";
import SkjemaSteg from "../../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {useState} from "react";
import {useFeatureFlags} from "../../../lib/features";

const MAX_LEN_HVA = 500;
const MAX_LEN_HVORFOR = 600;

const begrunnelseSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "maksLengde"),
    hvorforSoke: z.string().max(MAX_LEN_HVORFOR, "maksLengde"),
});

const SkjemaErrorSummary = ({errors}: {errors?: FieldErrors}) => {
    if (!errors || !Object.keys(errors).length) return null;

    return (
        <ErrorSummary heading="Du må fikse disse feilene før du kan gå videre.">
            {Object.entries(errors).map(([key, value]) => (
                <ErrorSummary.Item href={`#${key}`}>
                    <TranslatedError error={value!} />
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
};

const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "validering"});

    if (!error?.message) return null;

    return <>{t(error.message)}</>;
};

const Begrunnelse: React.FunctionComponent<{}> = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "begrunnelse"});
    const behandlingsId = useBehandlingsId();
    const {data: begrunnelse} = useHentBegrunnelse(behandlingsId);
    const {mutate} = useUpdateBegrunnelse();
    const [backendError, setBackendError] = useState<boolean>(false);
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

    if (!begrunnelse) return null;
    const onBeforeNavigate = () =>
        new Promise<void>((resolve, reject) => {
            handleSubmit(
                (data) =>
                    mutate(
                        {behandlingsId, data},
                        {
                            onSuccess: resolve,
                            onError: (e: any) => {
                                logError(`Feil ved PUT begrunnelse: ${e}`);
                                setBackendError(true);
                                reject();
                            },
                        }
                    ),
                (errors) => {
                    reject();
                }
            )();
        });

    return (
        <SkjemaSteg.Container steg={2} onBeforeNavigate={onBeforeNavigate}>
            <SkjemaSteg.Title steg={2} />
            <SkjemaErrorSummary errors={errors} />
            <form className={"space-y-12 lg:space-y-24"}>
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
            {backendError && <div>Beklager, et teknisk problem oppstod ved innsending. Prøv gjerne igjen.</div>}
        </SkjemaSteg.Container>
    );
};

export default Begrunnelse;
