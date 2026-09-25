import React from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {ApplicationSpinner} from "../../../lib/components/animasjoner/ApplicationSpinner";
import {Alert, BodyShort, Box, VStack} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import useSituasjon from "../../../lib/hooks/data/kort/useSituasjon.ts";
import {useNavigate} from "react-router";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useAnalyticsContext} from "../../../lib/providers/useAnalyticsContext.ts";
import {useBegrunnelse} from "../../../lib/hooks/data/useBegrunnelse.tsx";
import BehovForm, {FormValues} from "./BehovForm.tsx";
import {useNewUploadEnabled} from "../../../lib/hooks/featureToggles/useNewUploadEnabled.ts";
import {DokumentasjonDtoType} from "../../../generated/model";
import {useCurrentSoknadIsKort} from "../../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../../app/umami.ts";
import {DocumentProvider} from "../../../lib/upload/new/DocumentContext.tsx";
import {UploadByKategori} from "../../../lib/upload/new/UploadByKategori.tsx";

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
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();

    const goto = async (page: number) => {
        umamiTrack("Skjemasteg fullført", {
            steg: "2",
            isKortSoknad: isKortSoknad,
            soknadId: soknadId,
        });
        invalidateSituasjon();
        invalidateBegrunnelse();
        navigate(`../${page}`);
    };

    const isLoading = isBegrunnelseLoading || isSituasjonLoading;

    const onSubmit = (formValues: FormValues) => {
        const situasjonEndret = formValues.hvaErEndret?.trim() ? "Ja" : "Ikke utfylt";
        const hvaErEndret = formValues.hvaErEndret ?? undefined;

        setAnalyticsData({situasjonEndret});
        updateBegrunnelse({hvaSokesOm: formValues.hvaSokesOm ?? ""});
        updateSituasjonsendring({
            hvaErEndret: hvaErEndret,
            endring: !!hvaErEndret && hvaErEndret.trim() !== "",
        });
    };

    const newUploadEnabled = useNewUploadEnabled();

    const contextId = `${soknadId}-${DokumentasjonDtoType.UTGIFTER_ANDRE_UTGIFTER}-behov`;
    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={2} onStepChange={goto} />
            <VStack gap="space-16">
                <Alert variant="info">
                    <BodyShort>{t("arbeidOgFamilie.alert")}</BodyShort>
                </Alert>
                <SkjemaStegBlock className={"lg:space-y-12"}>
                    <SkjemaStegTitle title={t(KortSkjemaHeadings[2].tittel)} icon={KortSkjemaHeadings[2].ikon} />
                    {isLoading ? (
                        <ApplicationSpinner />
                    ) : (
                        <VStack gap={{sm: "space-48", lg: "space-64"}}>
                            <BehovForm
                                hvaErEndret={data?.hvaErEndret ?? undefined}
                                onSubmit={onSubmit}
                                hvaSokesOm={begrunnelse?.hvaSokesOm}
                            />
                            {newUploadEnabled ? (
                                <Box borderRadius="16" padding={"space-16"} className={"bg-ax-bg-info-soft"}>
                                    <DocumentProvider contextId={contextId}>
                                        <UploadByKategori
                                            contextId={contextId}
                                            kategori={DokumentasjonDtoType.UTGIFTER_ANDRE_UTGIFTER}
                                            soknadId={soknadId}
                                            hideAlreadyUploaded
                                            label={t("begrunnelse.kort.behov.dokumentasjon.utgifterTittel")}
                                            description={
                                                <BodyShort>
                                                    {t("begrunnelse.kort.behov.dokumentasjon.utgifterBeskrivelse")}
                                                </BodyShort>
                                            }
                                            fileListHeadingLevel={"3"}
                                        />
                                    </DocumentProvider>
                                </Box>
                            ) : (
                                <FileUploadBox
                                    sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                                    undertekst="begrunnelse.kort.behov.dokumentasjon.beskrivelse"
                                    liste="begrunnelse.kort.behov.dokumentasjon.liste"
                                />
                            )}
                        </VStack>
                    )}
                    <SkjemaStegButtons onPrevious={async () => navigate("../1")} onNext={async () => goto(3)} />
                </SkjemaStegBlock>
            </VStack>
        </SkjemaSteg>
    );
};

export default Behov;
