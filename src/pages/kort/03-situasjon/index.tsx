import React from "react";
import {inhibitNavigation, SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import useSituasjon from "../../../lib/hooks/data/kort/useSituasjon";
import {Controller, FieldError, useForm} from "react-hook-form";
import {SituasjonsendringFrontend} from "../../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import * as z from "zod";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import {DigisosLanguageKey} from "../../../lib/i18n";

const situasjonsendringSchema = z.object({
    hvaErEndret: z.string().max(500, "validering.maksLengde").nullable(),
    endring: z.boolean().nullable(),
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

const DinSituasjon = (): React.JSX.Element => {
    const {t} = useTranslation("skjema", {keyPrefix: "situasjon"});
    const {get: defaultValues, put, isError, isPending} = useSituasjon();

    const onSubmit = (formValues: SituasjonsendringFrontend) => {
        put({...formValues, hvaErEndret: formValues.endring ? formValues.hvaErEndret : undefined});
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        watch,
    } = useForm<SituasjonsendringFrontend>({
        defaultValues,
        resolver: zodResolver(situasjonsendringSchema),
        mode: "onChange",
    });
    return (
        <SkjemaSteg page={3} onRequestNavigation={handleSubmit(onSubmit, inhibitNavigation)}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <SkjemaSteg.ErrorSummary errors={errors} />
                {isPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}

                        <Controller
                            name="endring"
                            control={control}
                            render={({field}) => {
                                return (
                                    <YesNoInput
                                        {...field}
                                        legend={t("kort.endring.legend")}
                                        onChange={(bool) => field.onChange(bool)}
                                        name="harNoeEndretSeg"
                                    />
                                );
                            }}
                        />

                        {watch("endring") && (
                            <Textarea
                                {...register("hvaErEndret")}
                                id={"hvaErEndret"}
                                error={errors.hvaErEndret && <TranslatedError error={errors.hvaErEndret} />}
                                label={t("kort.hvaErEndret.label")}
                                description={<BodyShort>{t("kort.hvaErEndret.description")}</BodyShort>}
                            />
                        )}
                    </form>
                )}
                <SkattbarInntekt />
                <FileUploadBox
                    sporsmal={t("kort.dokumentasjon.title")}
                    undertekst={t("kort.dokumentasjon.description")}
                />
                <SkjemaSteg.Buttons loading={isPending} />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default DinSituasjon;
