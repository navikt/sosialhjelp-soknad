import * as React from "react";
import {Heading, Radio, RadioGroup, ReadMore} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {FieldErrors, useForm} from "react-hook-form";
import {ArbeidsforholdResponse, UtdanningFrontend} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ArbeidsforholdListe} from "./ArbeidsforholdListe";
import {TranslatedError} from "../02-begrunnelse";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {UnmountClosed} from "react-collapse";
import {faro} from "@grafana/faro-react";
import {useArbeidOgUtdanning} from "../../lib/hooks/data/useArbeidOgUtdanning";
import {SkjemaStegErrorSummary} from "../../lib/components/SkjemaSteg/ny/SkjemaStegErrorSummary.tsx";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import LocalizedTextarea from "../../lib/components/LocalizedTextArea.tsx";
import {SkjemaStegStepperV2} from "../../lib/components/SkjemaSteg/ny/SkjemaStegStepperV2.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../01-personalia/logAmplitudeSkjemaStegFullfort.tsx";

const MAX_LENGTH = 500;

const ArbeidOgUtdanningSchema = z.object({
    arbeid: z.object({kommentarTilArbeidsforhold: z.string().max(MAX_LENGTH, "validering.maksLengde").nullable()}),
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
    const navigate = useNavigate();

    const goto = (page: number) =>
        handleSubmit(async (data: ArbeidOgUtdanningType) => {
            try {
                await mutate(data);
                await logAmplitudeSkjemaStegFullfort(3);
                navigate(`../${page}`);
            } catch (e: any) {
                faro.api.pushError(e);
                setError(true);
            }
        })();

    return (
        <SkjemaSteg page={3}>
            <SkjemaStegStepperV2 page={3} onStepChange={goto} />
            <SkjemaContent>
                <SkjemaStegTitle title={t(SkjemaHeadings[3].tittel)} icon={SkjemaHeadings[3].ikon} />
                <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
                    <SkjemaStegErrorSummary errors={errors.arbeid as FieldErrors} />

                    <div className={"space-y-6"}>
                        <Heading size="medium" spacing>
                            {t("arbeidsforhold.sporsmal")}
                        </Heading>
                        <ArbeidsforholdListe />
                        <LocalizedTextarea
                            {...register("arbeid.kommentarTilArbeidsforhold")}
                            id={"arbeid.kommentarTilArbeidsforhold"}
                            maxLength={MAX_LENGTH}
                            description={t("opplysninger.arbeidsituasjon.kommentarer.description")}
                            label={t("opplysninger.arbeidsituasjon.kommentarer.label")}
                            error={
                                errors.arbeid?.kommentarTilArbeidsforhold && (
                                    <TranslatedError error={errors.arbeid?.kommentarTilArbeidsforhold} />
                                )
                            }
                            className={"!mt-8"}
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
                            description={
                                <ReadMore header={t("dinsituasjon.studerer.mer.info.tittel")}>
                                    {t("dinsituasjon.studerer.mer.info.forklaring")}
                                </ReadMore>
                            }
                        />
                        <UnmountClosed isOpened={watch("utdanning.erStudent") === true}>
                            <RadioGroup
                                legend={t("dinsituasjon.studerer.grad.sporsmal")}
                                defaultValue={getValues("utdanning.studengradErHeltid")?.toString() ?? null}
                                onChange={(value: string) => setValue("utdanning.studengradErHeltid", value === "true")}
                                className={"!mt-8"}
                            >
                                <Radio value={"true"}>{t("dinsituasjon.studerer.grad.heltid")}</Radio>
                                <Radio value={"false"}>{t("dinsituasjon.studerer.grad.deltid")}</Radio>
                            </RadioGroup>
                        </UnmountClosed>
                    </div>
                    {error && <div>{t("skjema.navigering.feil")}</div>}
                    <SkjemaStegButtons onPrevious={async () => navigate("../2")} onNext={async () => await goto(4)} />
                </form>
            </SkjemaContent>
        </SkjemaSteg>
    );
};

export const ArbeidOgUtdanning = () => {
    const {data} = useArbeidOgUtdanning();

    if (!data) return null;

    return <ArbeidOgUtdanningForm data={data} />;
};
export default ArbeidOgUtdanning;
