import React from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import useSituasjon from "../../../lib/hooks/data/kort/useSituasjon.ts";
import {useNavigate} from "react-router";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {useAnalyticsContext} from "../../../lib/providers/useAnalyticsContext.ts";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {useBegrunnelse} from "../../../lib/hooks/data/useBegrunnelse.tsx";
import BehovForm, {FormValues} from "./BehovForm.tsx";

const Behov = () => {
    const {t} = useTranslation("skjema");

    const {
        data,
        updateSituasjonsendring,
        isLoading: isSituasjonLoading,
        invalidate: invalidateSituasjon,
    } = useSituasjon();

    const {
        updateBegrunnelse,
        begrunnelse,
        isLoading: isBegrunnelseLoading,
        invalidate: invalidateBegrunnelse,
    } = useBegrunnelse();

    const {setAnalyticsData} = useAnalyticsContext();
    const navigate = useNavigate();

    const goto = async (page: number) => {
        await logAmplitudeSkjemaStegFullfort(2);
        invalidateSituasjon();
        invalidateBegrunnelse();
        navigate(`../${page}`);
    };

    const isLoading = isBegrunnelseLoading || isSituasjonLoading;

    const onSubmit = (formValues: FormValues) => {
        const situasjonEndret = formValues.hvaErEndret?.trim() ? "Ja" : "Ikke utfylt";
        const hvaErEndret = formValues.hvaErEndret ?? undefined;

        setAnalyticsData({situasjonEndret});
        // TODO: hvorforSoke finnes ikke i kort. Burde være nullable i backend
        updateBegrunnelse({hvaSokesOm: formValues.hvaSokesOm ?? "", hvorforSoke: ""});
        updateSituasjonsendring({
            hvaErEndret: hvaErEndret,
            endring: !hvaErEndret || hvaErEndret.trim() !== "",
        });
    };
    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={2} onStepChange={goto} />
            <VStack gap="4">
                <Alert variant="info">
                    <BodyShort>{t("arbeidOgFamilie.alert")}</BodyShort>
                </Alert>
                <SkjemaStegBlock className={"lg:space-y-12"}>
                    <SkjemaStegTitle
                        className={"lg:mb-12"}
                        title={t(KortSkjemaHeadings[2].tittel)}
                        icon={KortSkjemaHeadings[2].ikon}
                    />
                    {isLoading ? (
                        <ApplicationSpinner />
                    ) : (
                        <>
                            <BehovForm
                                hvaErEndret={data?.hvaErEndret}
                                onSubmit={onSubmit}
                                hvaSokesOm={begrunnelse?.hvaSokesOm}
                            />
                            <FileUploadBox
                                sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                                undertekst="begrunnelse.kort.behov.dokumentasjon.beskrivelse"
                                liste="begrunnelse.kort.behov.dokumentasjon.liste"
                                dokumentasjonType={DokumentasjonDtoType.BEHOV}
                            />
                        </>
                    )}
                    <SkjemaStegButtons onPrevious={async () => navigate("../1")} onNext={async () => goto(3)} />
                </SkjemaStegBlock>
            </VStack>
        </SkjemaSteg>
    );
};

export default Behov;
