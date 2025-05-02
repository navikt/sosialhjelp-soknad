import {Alert, BodyShort} from "@navikt/ds-react";
import LocalizedTextArea from "../../lib/components/LocalizedTextArea.tsx";
import {BegrunnelseSchema, MAX_LEN_HVA, MAX_LEN_HVORFOR} from "./schema.ts";
import {TranslatedError} from "../../lib/components/TranslatedError.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BegrunnelseDto} from "../../generated/new/model/index.ts";
import {useTranslation} from "react-i18next";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/SkjemaStegErrorSummary.tsx";
import {z} from "zod";

const BegrunnelseForm = ({
    isError,
    begrunnelse,
    onSubmit,
}: {
    begrunnelse?: BegrunnelseDto;
    isError?: boolean;
    onSubmit: (formValues: z.infer<typeof BegrunnelseSchema>) => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: begrunnelse,
        resolver: zodResolver(BegrunnelseSchema),
        mode: "onChange",
    });
    const {t} = useTranslation("skjema");
    return (
        <>
            <SkjemaStegErrorSummary errors={errors} />
            <form
                onBlur={handleSubmit(onSubmit)}
                className={"space-y-12 lg:space-y-24"}
                onSubmit={(e) => e.preventDefault()}
            >
                {isError && <Alert variant={"error"}>{t("skjema.navigering.feil")}</Alert>}
                <LocalizedTextArea
                    {...register("hvaSokesOm")}
                    id={"hvaSokesOm"}
                    maxLength={MAX_LEN_HVA}
                    error={errors.hvaSokesOm && <TranslatedError error={errors.hvaSokesOm} />}
                    label={t("begrunnelse.hva.label")}
                    description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                />
                <LocalizedTextArea
                    {...register("hvorforSoke")}
                    id={"hvorforSoke"}
                    error={errors.hvorforSoke && <TranslatedError error={errors.hvorforSoke} />}
                    label={t("begrunnelse.hvorfor.label")}
                    maxLength={MAX_LEN_HVORFOR}
                    description={<BodyShort>{t("begrunnelse.hvorfor.description")}</BodyShort>}
                />
            </form>
        </>
    );
};
export default BegrunnelseForm;
