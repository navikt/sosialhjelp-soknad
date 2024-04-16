import * as React from "react";
import {Heading, Radio, RadioGroup, Textarea} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {DigisosValidationError, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useForm} from "react-hook-form";
import {ArbeidsforholdResponse, UtdanningFrontend} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ArbeidsforholdListe} from "./ArbeidsforholdListe";
import {TranslatedError} from "../02-begrunnelse";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {UnmountClosed} from "react-collapse";
import {faro} from "@grafana/faro-react";
import {useArbeidOgUtdanning} from "../../lib/hooks/data/useArbeidOgUtdanning";

const ArbeidOgUtdanningSchema = z.object({
    arbeid: z.object({kommentarTilArbeidsforhold: z.string().max(500, "maksLengde").nullable()}),
    utdanning: z.object({
        erStudent: z.boolean().nullable().optional(),
        studengradErHeltid: z.boolean().nullable().optional(),
    }),
});

export type ArbeidOgUtdanningType = {
    arbeid: ArbeidsforholdResponse;
    utdanning: UtdanningFrontend;
};

export const ArbeidOgUtdanningForm = ({data}: {data: ArbeidOgUtdanningType}) => {
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
            (_) => {
                throw new DigisosValidationError();
            }
        )();

    return (
        <SkjemaSteg page={3} onRequestNavigation={onRequestNavigation}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                    <SkjemaSteg.ErrorSummary errors={errors} />

                    <div>
                        <Heading size="medium" className={"pb-2"}>
                            {t("arbeidsforhold.sporsmal")}
                        </Heading>
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
                            className={"pt-6"}
                        />
                    </div>

                    <div>
                        <Heading size="medium" spacing>
                            {t("arbeid.dinsituasjon.studerer.undertittel")}
                        </Heading>
                        <YesNoInput
                            name={"utdanning.erStudent"}
                            defaultValue={getValues("utdanning.erStudent")}
                            onChange={(checked) => setValue("utdanning.erStudent", checked)}
                            legend={t("dinsituasjon.studerer.sporsmal")}
                            moreInfoTittel={t("dinsituasjon.studerer.mer.info.tittel")}
                            moreInfoForklaring={t("dinsituasjon.studerer.mer.info.forklaring")}
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

export const ArbeidOgUtdanning = () => {
    const {data} = useArbeidOgUtdanning();

    if (!data) return null;

    return <ArbeidOgUtdanningForm data={data} />;
};
export default ArbeidOgUtdanning;
