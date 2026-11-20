import React, {useEffect, useState} from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {BodyShort, Box} from "@navikt/ds-react";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {NavYtelser} from "../../06-inntektFormue/navytelser";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useFormue} from "../../../lib/hooks/data/useFormue.tsx";
import {DokumentasjonDtoType} from "../../../generated/model";
import {KortDokumentasjon} from "./KortDokumentasjon.tsx";
import {useCurrentSoknadIsKort} from "../../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../../app/umami.ts";
import {DocumentProvider} from "../../../lib/upload/DocumentContext.tsx";
import {UploadByKategori} from "../../../lib/upload/UploadByKategori.tsx";
import {useUploadMode} from "../../../lib/hooks/featureToggles/useUploadMode.ts";

const Inntekt = () => {
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();
    const uploadMode = useUploadMode();

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
            // TODO: react-hooks/set-state-in-effect - bruk useRef som engangs-vakt i stedet for useState. Se fix/react-compiler-lint-regler
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHasInitialized(true);
        }
    }, [formue, hasInitialized, setFormue]);

    const contextId = `${soknadId}-${DokumentasjonDtoType.UTGIFTER_ANDRE_UTGIFTER}-inntekt`;
    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={4} onStepChange={gotoPage} />
            <SkjemaStegTitle title={t(KortSkjemaHeadings[4].tittel)} />
            <SkattbarInntekt isKortSoknad />
            <Bostotte hideHeading skipFirstStep hideSamtykkeDescription />
            <NavYtelser isKortSoknad />
            <KortDokumentasjon opplysningstype={DokumentasjonDtoType.FORMUE_BRUKSKONTO} />
            <Box borderRadius="16" padding={"space-16"} className={"bg-ax-bg-info-soft"}>
                <DocumentProvider contextId={contextId} mode={uploadMode}>
                    <UploadByKategori
                        contextId={contextId}
                        kategori={DokumentasjonDtoType.UTGIFTER_ANDRE_UTGIFTER}
                        soknadId={soknadId}
                        hideAlreadyUploaded
                        label={t("situasjon.kort.dokumentasjon.inntekterTittel")}
                        description={<BodyShort>{t("situasjon.kort.dokumentasjon.inntekterBeskrivelse")}</BodyShort>}
                        fileListHeadingLevel={"3"}
                    />
                </DocumentProvider>
            </Box>
            <SkjemaStegButtons onPrevious={async () => navigate("../3")} onNext={async () => await gotoPage(5)} />
        </SkjemaSteg>
    );
};

export default Inntekt;
