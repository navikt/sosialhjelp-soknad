import * as React from "react";
import {Detail, Heading, Textarea} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import {useForm} from "react-hook-form";
import {ArbeidFrontend, UtdanningFrontend} from "../../generated/model";
import {zodResolver} from "@hookform/resolvers/zod";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {z} from "zod";
import {hentArbeid, useUpdateArbeid} from "../../generated/arbeid-ressurs/arbeid-ressurs";
import {ArbeidsforholdListe} from "./arbeid/ArbeidsforholdListe";
import {TranslatedError} from "../02-begrunnelse";
import {hentUtdanning, useUpdateUtdanning} from "../../generated/utdanning-ressurs/utdanning-ressurs";
import UtdanningInput from "./utdanning/Utdanning";

const ArbeidOgUtdanningSchema = z.object({
    arbeid: z.object({kommentarTilArbeidsforhold: z.string().max(500, "maksLengde").nullable()}),
    utdanning: z.object({erStudent: z.boolean().nullable(), studengradErHeltid: z.boolean().nullable()}),
});

export type ArbeidOgUtdanningType = {
    arbeid: ArbeidFrontend;
    utdanning: UtdanningFrontend;
};

const ArbeidOgUtdanning = () => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation("skjema");

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm<ArbeidOgUtdanningType>({
        defaultValues: async () => ({
            arbeid: await hentArbeid(behandlingsId),
            utdanning: await hentUtdanning(behandlingsId),
        }),
        resolver: zodResolver(ArbeidOgUtdanningSchema),
    });

    const {mutate: mutateArbeid, isError: isErrorArbeid} = useUpdateArbeid();
    const {mutate: mutateUtdanning, isError: isErrorUtdanning} = useUpdateUtdanning();

    const onRequestNavigation = () =>
        new Promise<void>((resolve, reject) => {
            handleSubmit((data) => {
                mutateArbeid(
                    {behandlingsId, data: data.arbeid},
                    {
                        onSuccess: () =>
                            mutateUtdanning(
                                {behandlingsId, data: data.utdanning},
                                {onSuccess: resolve, onError: reject}
                            ),
                        onError: reject,
                    }
                );
            }, reject)();
        });

    return (
        <SkjemaSteg page={3} onRequestNavigation={onRequestNavigation}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />
                <SkjemaSteg.ErrorSummary errors={errors} />
                <form className={"space-y-12 lg:space-y-24"} onSubmit={(e) => e.preventDefault()}>
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
                        <UtdanningInput control={control} />
                    </div>
                    {(isErrorArbeid || isErrorUtdanning) && (
                        <div>Beklager, et teknisk problem oppstod ved innsending. Prøv gjerne igjen.</div>
                    )}
                    <SkjemaSteg.Buttons />
                </form>
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};

export default ArbeidOgUtdanning;
