import React from "react";
import {SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useTranslation} from "react-i18next";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";
import {SkjemaContent} from "../../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {NavYtelser} from "../../06-inntektFormue/navytelser";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt/index.tsx";
import FileUploadBox from "../../../lib/components/fileupload/FileUploadBox.tsx";

const Inntekt = (): React.JSX.Element => {
    const {t} = useTranslation("skjema");

    return (
        <SkjemaSteg page={4}>
            <SkjemaContent className={"lg:space-y-12"}>
                <SkjemaStegTitle className={"lg:mb-16"} />
                <SkattbarInntekt legend={t("utbetalinger.inntekt.skattbar.samtykke_sporsmal_v1")} />
                <Bostotte hideHeading skipFirstStep hideSamtykkeDescription />
                <NavYtelser />
                <FileUploadBox
                    sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                    undertekst={t("situasjon.kort.dokumentasjon.description")}
                    dokumentasjonType={"annet|annet"}
                />
                <SkjemaStegButtons includeNextArrow />
            </SkjemaContent>
        </SkjemaSteg>
    );
};

export default Inntekt;
