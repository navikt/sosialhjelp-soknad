import * as React from "react";
import {Detail, Heading, Radio, RadioGroup, Textarea} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {DigisosValidationError, SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import {useForm} from "react-hook-form";
import {ArbeidFrontend, UtdanningFrontend} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {z} from "zod";
import {updateArbeid, useHentArbeid} from "../../generated/arbeid-ressurs/arbeid-ressurs";
import {ArbeidsforholdListe} from "./arbeid/ArbeidsforholdListe";
import {TranslatedError} from "../02-begrunnelse";
import {updateUtdanning, useHentUtdanning} from "../../generated/utdanning-ressurs/utdanning-ressurs";
import {YesNoInput} from "../../nav-soknad/components/form/YesNoInput";
import {UnmountClosed} from "react-collapse";
import {useQueryClient} from "@tanstack/react-query";
import {faro} from "@grafana/faro-react";

const ArbeidOgUtdanningSchema = z.object({
    arbeid: z.object({kommentarTilArbeidsforhold: z.string().max(500, "maksLengde").nullable()}),
    utdanning: z.object({
        erStudent: z.boolean().nullable().optional(),
        studengradErHeltid: z.boolean().nullable().optional(),
    }),
});

export type ArbeidOgUtdanningType = {
    arbeid: ArbeidFrontend;
    utdanning: UtdanningFrontend;
};

const useArbeidOgUtdanning = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: arbeid, isLoading: isLoadingArbeid, queryKey: arbeidKey} = useHentArbeid(behandlingsId);
    const {data: utdanning, isLoading: isLoadingUtdanning, queryKey: utdanningKey} = useHentUtdanning(behandlingsId);

    const data: ArbeidOgUtdanningType | undefined = arbeid && utdanning ? {arbeid, utdanning} : undefined;

    const mutate = async (data: ArbeidOgUtdanningType) => {
        await updateArbeid(behandlingsId, data.arbeid);
        queryClient.setQueryData(arbeidKey, data.arbeid);
        await updateUtdanning(behandlingsId, data.utdanning);
        queryClient.setQueryData(utdanningKey, data.utdanning);
    };

    return {data, mutate, isLoading: isLoadingUtdanning || isLoadingArbeid};
};

const ArbeidOgUtdanningForm = ({data}: {data: ArbeidOgUtdanningType}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
        watch,
    } = useForm<ArbeidOgUtdanningType>({
        defaultValues: data,
        resolver: zodResolver(ArbeidOgUtdanningSchema),
    });
    const {t} = useTranslation("skjema");
    const [error, setError] = React.useState<boolean>(false);
    const {mutate} = useArbeidOgUtdanning();

    const onRequestNavigation = async () =>
        handleSubmit(
            async (data: ArbeidOgUtdanningType) => {
                try {
                    await mutate(data);
                } catch (e) {
                    faro.api.pushError(e);
                    setError(true);
                    throw new DigisosValidationError();
                }
            },
            (errors) => {
                throw new DigisosValidationError();
            }
        )();

    return (
        <SkjemaSteg page={3} onRequestNavigation={onRequestNavigation}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                    <SkjemaSteg.ErrorSummary errors={errors} />

                    <div className={"space-y-6"}>
                        <Heading size="medium" spacing>
                            {t("arbeidsforhold.sporsmal")}
                        </Heading>
                        <Detail spacing>{t("arbeidsforhold.infotekst")}</Detail>
                        <ArbeidsforholdListe />
                        <Textarea
                            {...register("arbeid.kommentarTilArbeidsforhold")}
                            id={"arbeid.kommentarTilArbeidsforhold"}
                            placeholder={t("arbeidsforhold.kommentar.placeholder")}
                            description={t("opplysninger.arbeidsituasjon.kommentarer.description")}
                            label={t("opplysninger.arbeidsituasjon.kommentarer.label")}
                            error={
                                errors.arbeid?.kommentarTilArbeidsforhold && (
                                    <TranslatedError error={errors.arbeid?.kommentarTilArbeidsforhold} />
                                )
                            }
                        />
                    </div>

                    <div>
                        <Heading size="medium" spacing>
                            {t("arbeid.dinsituasjon.studerer.undertittel")}
                        </Heading>

                        <YesNoInput
                            defaultValue={getValues("utdanning.erStudent")}
                            onChange={(value: boolean) => setValue("utdanning.erStudent", value)}
                            legend={t("dinsituasjon.studerer.sporsmal")}
                        />
                        <UnmountClosed isOpened={watch("utdanning.erStudent") === true}>
                            <RadioGroup
                                legend={t("dinsituasjon.studerer.grad.sporsmal")}
                                defaultValue={getValues("utdanning.studengradErHeltid")?.toString() ?? null}
                                onChange={(value: string) => setValue("utdanning.studengradErHeltid", value === "true")}
                            >
                                <Radio value={"true"}>{t("dinsituasjon.studerer.grad.heltid")}</Radio>
                                <Radio value={"false"}>{t("dinsituasjon.studerer.grad.deltid")}</Radio>
                            </RadioGroup>
                        </UnmountClosed>
                    </div>
                    {error && <div>{t("skjema.navigering.feil")}</div>}
                    <SkjemaSteg.Buttons />
                </form>
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

const ArbeidOgUtdanning = () => {
    const {data} = useArbeidOgUtdanning();

    if (!data) return null;

    return <ArbeidOgUtdanningForm data={data} />;
};

export default ArbeidOgUtdanning;
