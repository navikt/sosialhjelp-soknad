import React, {useEffect} from "react";
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
//import {VedleggFrontend} from "../../../generated/model";
//import {Dokumentasjon} from "../../08-vedlegg/Dokumentasjon.tsx";
//import {useOpplysning} from "../../../lib/hooks/dokumentasjon/useOpplysning.ts";
import {useOpplysninger} from "../../../lib/hooks/dokumentasjon/useOpplysninger.ts";
import {useFormue} from "../../../lib/hooks/data/useFormue.tsx";
import {Gruppe} from "../../08-vedlegg/Gruppe.tsx";
//import {Gruppe} from "../../08-vedlegg/Gruppe.tsx";

const InntektDokumentasjon = () => {
    const {formue, setFormue} = useFormue();
    const {sorterte, grupper} = useOpplysninger(); // 🔥 Fetch all opplysninger
    const firstGroup = grupper[0];

    useEffect(() => {
        console.log("Automatically selecting brukskonto for Kort Søknad");

        setFormue(["brukskonto"]); // ✅ Automatically set brukskonto as selected
    }, []);

    console.log("formue", formue);

    //const firstGroup = grupper[0];
    // 🔍 Find the opplysning that has type "kontooversikt|brukskonto"
    //const opplysning = sorterte.find((item) => item.type === "kontooversikt|brukskonto");
    //const opplysning = sorterte.find((opplysning) => opplysning.type === "kontooversikt|brukskonto");
    //
    //if (!opplysning) {
    //    console.warn("Fant ingen opplysning med type kontooversikt|brukskonto");
    //    return null; // Avoid rendering if no opplysning is found
    //}

    return <Gruppe gruppeKey={firstGroup} opplysninger={sorterte.filter((x) => x.gruppe === firstGroup)} />;
};

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
                <InntektDokumentasjon />
                <FileUploadBox
                    sporsmal={t("begrunnelse.kort.behov.dokumentasjon.tittel")}
                    undertekst="situasjon.kort.dokumentasjon.description"
                    liste="situasjon.kort.dokumentasjon.liste"
                    dokumentasjonType={"annet|annet"}
                />
                <SkjemaStegButtons onPrevious={async () => navigate("../3")} onNext={async () => await gotoPage(5)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Inntekt;
