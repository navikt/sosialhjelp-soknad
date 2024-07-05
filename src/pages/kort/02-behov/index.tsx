import React from "react";
import {SkjemaSteg, inhibitNavigation} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldError, useForm} from "react-hook-form";
import {BegrunnelseFrontend} from "../../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useBegrunnelse} from "../../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import {DigisosLanguageKey} from "../../../lib/i18n";

const MAX_LEN_HVA = 500;

const behovSchema = z.object({
    hvaSokesOm: z.string().max(MAX_LEN_HVA, "validering.maksLengde"),
});

const TranslatedError = ({error}: {error: Pick<FieldError, "message">}) => {
    const {t} = useTranslation("skjema");

    if (!error?.message) return null;

    return <>{t(error.message as DigisosLanguageKey)}</>;
};

const Feilmelding = () => {
    const {t} = useTranslation("skjema");
    return <Alert variant={"error"}>{t("skjema.navigering.feil")}</Alert>;
};

const Behov = (): React.JSX.Element => {
    const {t} = useTranslation("skjema");
    const {get: defaultValues, put, isPending, isError} = useBegrunnelse();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<BegrunnelseFrontend>({
        defaultValues,
        resolver: zodResolver(behovSchema),
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
                            label={t("begrunnelse.hva.label")}
                            description={<BodyShort>{t("begrunnelse.hva.description")}</BodyShort>}
                        />
                        <FileUploadBox
                            sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                            undertekst={t("begrunnelse.kort.behov.dokumentasjon.beskrivelse")}
                        />
                    </form>
                )}
                <SkjemaSteg.Buttons loading={isPending} />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default Behov;
