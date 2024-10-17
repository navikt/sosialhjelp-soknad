import React from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {NavYtelser} from "../../06-inntektFormue/navytelser";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox.tsx";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../../lib/logAmplitudeSkjemaStegFullfort.ts";

const Inntekt = () => {
    const {t} = useTranslation("skjema");

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
                <FileUploadBox
                    sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                    undertekst={t("situasjon.kort.dokumentasjon.description")}
                    dokumentasjonType={"annet|annet"}
                />
                <SkjemaStegButtons onPrevious={async () => navigate("../3")} onNext={async () => await gotoPage(5)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Inntekt;
