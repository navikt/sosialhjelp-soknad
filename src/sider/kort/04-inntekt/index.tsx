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
import {BodyShort, Heading, Loader} from "@navikt/ds-react";
import BelopBeskrivelse from "../../08-vedlegg/form/BelopBeskrivelse.tsx";
import useOkonomiskOpplysningMutation from "../../../lib/hooks/dokumentasjon/useOkonomiskOpplysningMutation.ts";
import {BelopDto, DokumentasjonDtoType} from "../../../generated/new/model";
import {useFormue} from "../../../lib/hooks/data/useFormue.tsx";

const KortDokumentasjon = ({opplysningstype}: {opplysningstype: DokumentasjonDtoType}) => {
    const {t} = useTranslation("skjema");
    const {updateOkonomiskOpplysning, data, isLoading} = useOkonomiskOpplysningMutation<BelopDto>(opplysningstype);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {t("utbetalinger.inntekt.skattbar.kort_saldo_tittel")}
            </Heading>
            <BodyShort spacing>{t("utbetalinger.inntekt.skattbar.kort_saldo_undertekst")}</BodyShort>
            <BelopBeskrivelse
                opplysningstype={opplysningstype}
                excludeBeskrivelse
                opplysning={data}
                mutate={updateOkonomiskOpplysning}
                belopLabel={
                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                        {t("utbetalinger.inntekt.skattbar.kort_saldo_saldo")}
                    </span>
                }
                leggTilTekst={t("utbetalinger.inntekt.skattbar.kort_saldo_leggTil")}
            />
            <FileUploadBoxNoStyle bunntekst={t("utbetalinger.inntekt.skattbar.kort_saldo_lastOpp")} />
        </div>
    );
};

const Inntekt = () => {
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();
    const gotoPage = async (page: number) => {
        await logAmplitudeSkjemaStegFullfort(4);
        navigate(`../${page}`);
    };
    const {setFormue, formue} = useFormue();
    const [hasInitialized, setHasInitialized] = useState(false);

    // TODO: Gjør dette i backend ved kort transition i stedet.
    // TODO: Denne eksistere på grunn av en 404 feil når søker skriver verdi
    // TODO: i inputeltet
    useEffect(() => {
        if (!hasInitialized && formue && !formue.hasBrukskonto) {
            setFormue(["hasBrukskonto"]);
            setHasInitialized(true);
        }
    }, [formue, hasInitialized]);

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={4} onStepChange={gotoPage} />
            <SkjemaStegBlock className={"lg:space-y-12"}>
                <SkjemaStegTitle
                    className={"lg:mb-12"}
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
                />
                <SkjemaStegButtons onPrevious={async () => navigate("../3")} onNext={async () => await gotoPage(5)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Inntekt;
