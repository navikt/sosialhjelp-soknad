import React, {useEffect, useState} from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useTranslation} from "react-i18next";
import {Bostotte} from "../../06-inntektFormue/bostotte/Bostotte";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {NavYtelser} from "../../06-inntektFormue/navytelser";
import {SkattbarInntekt} from "../../06-inntektFormue/skattbarInntekt";
import FileUploadBox, {FileUploadBoxNoStyle} from "../../../lib/components/fileupload/FileUploadBox.tsx";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {useOpplysninger} from "../../../lib/hooks/dokumentasjon/useOpplysninger.ts";
import {Opplysning} from "../../../lib/opplysninger.ts";
import {BodyShort, Heading} from "@navikt/ds-react";
import {DokumentasjonRader} from "../../08-vedlegg/DokumentasjonRader.tsx";
import {useFormue} from "../../../lib/hooks/data/useFormue.tsx";
import useIsKort from "../../../lib/hooks/data/useIsKort.ts";

const Dokumentasjon = ({opplysning}: {opplysning: Opplysning}) => {
    const {t} = useTranslation("skjema");
    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {t("utbetalinger.inntekt.skattbar.kort_saldo_tittel")}
            </Heading>
            <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.kort_saldo_undertekst")}</BodyShort>
            <DokumentasjonRader opplysning={opplysning} />
            <FileUploadBoxNoStyle
                bunntekst={t("utbetalinger.inntekt.skattbar.kort_saldo_lastOpp")}
                dokumentasjonType={opplysning.type}
            />
        </div>
    );
};

const Inntekt = () => {
    const {t} = useTranslation("skjema");
    const {sorterte} = useOpplysninger();
    const brukskontoOpplysning = sorterte.find((opplysning) => opplysning.type === "kontooversikt|brukskonto");
    const {setFormue, formue} = useFormue();
    const isKortSoknad = useIsKort();
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (!hasInitialized && isKortSoknad && formue && !formue.brukskonto) {
            setFormue(["brukskonto"]);
            setHasInitialized(true);
        }
    }, [isKortSoknad, formue, hasInitialized]);

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
                {brukskontoOpplysning && <Dokumentasjon opplysning={brukskontoOpplysning} />}
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
