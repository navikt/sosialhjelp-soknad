import React, {useEffect, useState} from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {BodyShort, VStack} from "@navikt/ds-react";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {NavYtelser} from "../../06-inntektFormue/navytelser";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox.tsx";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useFormue} from "../../../lib/hooks/data/useFormue.tsx";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {KortDokumentasjon} from "./KortDokumentasjon.tsx";
import {useCurrentSoknadIsKort} from "../../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../../app/umami.ts";
import {useNewUploadEnabled} from "../../../lib/hooks/featureToggles/useNewUploadEnabled.ts";
import {DocumentProvider} from "../../../lib/upload/new/DocumentContext.tsx";
import {UploadByKategori} from "../../../lib/upload/new/UploadByKategori.tsx";

const Inntekt = () => {
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();
    const newUploadEnabled = useNewUploadEnabled();

    const gotoPage = async (page: number) => {
        umamiTrack("Skjemasteg fullført", {
            steg: "4",
            isKortSoknad: isKortSoknad,
            soknadId: soknadId,
        });
        navigate(`../${page}`);
    };
    const {setFormue, formue} = useFormue();
    const [hasInitialized, setHasInitialized] = useState(false);

    /**
       TODO: Dette er unnødvendig innvikla og bør bli gjort i backend,
                    eller finne en bedre måte å gjør dette på i frontend.
                    Kanskje dette kan bli gjort i backend ved kort transition i stedet?
                    Denne eksistere på grunn av en 404 feil når søker skriver verdi
                    i inputeltet, og pga. så må hasSparing legges til fordi ellers
                    får man 404 feil når søker velger kontooversikt (FORMUE_ANNET)
     */

    useEffect(() => {
        if (!hasInitialized && formue && !formue.hasBrukskonto) {
            setFormue(["hasBrukskonto", "hasSparing"]);
            setHasInitialized(true);
        }
    }, [formue, hasInitialized, setFormue]);

    const contextId = `${soknadId}-${DokumentasjonDtoType.UTGIFTER_ANDRE_UTGIFTER}-inntekt`;
    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={4} onStepChange={gotoPage} />
            <SkjemaStegBlock className={"lg:space-y-12"}>
                <VStack gap={{sm: "space-48", lg: "space-64"}}>
                    <SkjemaStegTitle title={t(KortSkjemaHeadings[4].tittel)} icon={KortSkjemaHeadings[4].ikon} />
                    <SkattbarInntekt legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v1")} />
                    <Bostotte hideHeading skipFirstStep hideSamtykkeDescription />
                    <NavYtelser />
                    <KortDokumentasjon opplysningstype={DokumentasjonDtoType.FORMUE_BRUKSKONTO} />
                    {newUploadEnabled ? (
                        <DocumentProvider contextId={contextId}>
                            <UploadByKategori
                                contextId={contextId}
                                kategori={DokumentasjonDtoType.UTGIFTER_ANDRE_UTGIFTER}
                                soknadId={soknadId}
                                hideAlreadyUploaded
                                label={t("situasjon.kort.dokumentasjon.inntekterTittel")}
                                description={
                                    <BodyShort>{t("situasjon.kort.dokumentasjon.inntekterBeskrivelse")}</BodyShort>
                                }
                            />
                        </DocumentProvider>
                    ) : (
                        <FileUploadBox
                            sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                            undertekst="situasjon.kort.dokumentasjon.description"
                            liste="situasjon.kort.dokumentasjon.liste"
                        />
                    )}
                </VStack>
                <SkjemaStegButtons onPrevious={async () => navigate("../3")} onNext={async () => await gotoPage(5)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Inntekt;
