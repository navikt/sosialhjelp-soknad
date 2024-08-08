import React from "react";
import {inhibitNavigation, SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Textarea} from "@navikt/ds-react";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import useSituasjon from "../../../lib/hooks/data/kort/useSituasjon";
import {Controller, FieldError, useForm} from "react-hook-form";
import {SituasjonsendringFrontend} from "../../../generated/client/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import * as z from "zod";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import {YesNoInput} from "../../../lib/components/form/YesNoInput";
import {DigisosLanguageKey} from "../../../lib/i18n";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";

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
    const {t} = useTranslation("skjema");
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
    const isEndring = watch("endring");
    return (
        <SkjemaSteg page={3} onRequestNavigation={handleSubmit(onSubmit, inhibitNavigation)}>
            <SkjemaSteg.Content className={"lg:space-y-12"}>
                <SkjemaSteg.Title className={"lg:mb-16"} />
                <SkjemaSteg.ErrorSummary errors={errors} />
                {isPending ? (
                    <ApplicationSpinner />
                ) : (
                    <form className={"space-y-12"} onSubmit={(e) => e.preventDefault()}>
                        {isError && <Feilmelding />}

                        <Controller
                            name="endring"
                            control={control}
                            render={({field}) => {
                                return (
                                    <YesNoInput
                                        {...field}
                                        onBlur={handleSubmit(onSubmit)}
                                        legend={t("situasjon.kort.endring.legend")}
                                        description={t("situasjon.kort.endring.description")}
                                        onChange={(bool) => field.onChange(bool)}
                                        name="harNoeEndretSeg"
                                    />
                                );
                            }}
                        />

                        {isEndring && (
                            <Textarea
                                {...register("hvaErEndret")}
                                id={"hvaErEndret"}
                                error={errors.hvaErEndret && <TranslatedError error={errors.hvaErEndret} />}
                                label={t("situasjon.kort.hvaErEndret.label")}
                                description={<BodyShort>{t("situasjon.kort.hvaErEndret.description")}</BodyShort>}
                            />
                        )}
                    </form>
                )}
                {isEndring && (
                    <>
                        <SkattbarInntekt legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v1")} />
                        <Bostotte hideHeading skipFirstStep hideSamtykkeDescription />
                        <FileUploadBox
                            sporsmal={t("situasjon.kort.dokumentasjon.title")}
                            undertekst={t("situasjon.kort.dokumentasjon.description")}
                            dokumentasjonType={"kort|situasjonsendring"}
                        />
                    </>
                )}
                <SkjemaSteg.Buttons loading={isPending} includeNextArrow />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default DinSituasjon;
