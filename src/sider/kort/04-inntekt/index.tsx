import React, {useEffect, useState} from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {NavYtelser} from "../../06-inntektFormue/navytelser";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox.tsx";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {useFormue} from "../../../lib/hooks/data/useFormue.tsx";
import {DokumentasjonDtoType} from "../../../generated/new/model";
import {KortDokumentasjon} from "./KortDokumentasjon.tsx";

const Inntekt = () => {
    const {t} = useTranslation("skjema");
    const {setFormue, formue} = useFormue();
    const [hasInitialized, setHasInitialized] = useState(false);

    // TODO: Gjør dette i backend ved kort transition i stedet
    useEffect(() => {
        if (!hasInitialized && formue && !formue.hasBrukskonto) {
            setFormue(["hasBrukskonto"]);
            setHasInitialized(true);
        }
    }, [formue, hasInitialized]);

    const navigate = useNavigate();
    const gotoPage = async (page: number) => {
        await logAmplitudeSkjemaStegFullfort(4);
        navigate(`../${page}`);
    };

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={4} onStepChange={gotoPage} />
            <SkjemaStegBlock className={"lg:space-y-12"}>
                <SkjemaStegTitle
                    className={"lg:mb-16"}
                    title={t(KortSkjemaHeadings[4].tittel)}
                    icon={KortSkjemaHeadings[4].ikon}
                />
                <SkattbarInntekt legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v1")} />
                <Bostotte hideHeading skipFirstStep hideSamtykkeDescription />
                <NavYtelser />
                <KortDokumentasjon opplysningstype={DokumentasjonDtoType.FORMUE_BRUKSKONTO} />
                <FileUploadBox
                    sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                    undertekst="situasjon.kort.dokumentasjon.description"
                    liste="situasjon.kort.dokumentasjon.liste"
                    dokumentasjonType={"UTGIFTER_ANDRE_UTGIFTER"}
                />
                <SkjemaStegButtons onPrevious={async () => navigate("../3")} onNext={async () => await gotoPage(5)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Inntekt;
