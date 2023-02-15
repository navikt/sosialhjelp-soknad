import * as React from "react";
import {getIntlTextOrKey} from "../../utils";
import {Button, Loader} from "@navikt/ds-react";
import {sendSoknadPending, visAvbrytSoknadModal} from "../../../digisos/redux/soknad/soknadActions";
import {useDispatch, useSelector} from "react-redux";
import {minSideUrl} from "../avbrytsoknad/AvbrytSoknadModal";
import {useTranslation} from "react-i18next";
import {SkjemaConfig, SkjemaSteg} from "./digisosSkjema";
import {setVisBekreftMangler} from "../../../digisos/redux/oppsummering/oppsummeringActions";
import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {sendSoknad} from "../../../lib/sendSoknad";
import {State} from "../../../digisos/redux/reducers";
import {logInfo} from "../../utils/loggerUtils";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";

interface SkjemaStegNavigasjonProps {
    skjemaConfig: SkjemaConfig;
    steg: SkjemaSteg;
    loading?: boolean;
    gaVidereLabel?: string;
    goToStep: (newStep: number) => void;
}

export const SkjemaStegNavKnapperLegacy = ({steg, loading, goToStep}: SkjemaStegNavigasjonProps) => {
    const {oppsummering} = useSelector((state: State) => state);
    const behandlingsId = useBehandlingsId();
    const adresseValg = useSoknadsdata().personalia.adresser.valg;
    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const forwardInhibited = loading;
    const backwardInhibited = loading || steg.id <= 1;

    const getAttributesForSkjemaFullfortEvent = () => {
        const attr: Record<string, any> = {};

        oppsummering.nyOppsummering.forEach((steg) =>
            steg.avsnitt.forEach((avsnitt) =>
                avsnitt.sporsmal.forEach(({tittel, felt}) => {
                    if (tittel === "bosituasjon.sporsmal") attr["valgtBosted"] = !!felt?.length;
                    if (tittel === "arbeidsforhold.infotekst") attr["harArbeidsforhold"] = !!felt?.length;
                    if (tittel === "utbetalinger.inntekt.skattbar.har_gitt_samtykke") attr["skattSamtykke"] = true;
                    if (tittel === "utbetalinger.inntekt.skattbar.mangler_samtykke") attr["skattSamtykke"] = false;
                })
            )
        );

        return attr;
    };

    const sendInnSoknad = () => {
        if (!oppsummering.bekreftet) {
            dispatch(setVisBekreftMangler(true));
        } else {
            logAmplitudeEvent("skjema fullført", createSkjemaEventData(getAttributesForSkjemaFullfortEvent()));
            if (adresseValg) logInfo("klikk--" + adresseValg);
            dispatch(sendSoknadPending());
            sendSoknad(behandlingsId, dispatch).then((nextPage) => {
                if (nextPage) window.location.href = nextPage;
            });
        }
    };

    return (
        <div className={"space-y-8 lg:space-y-16 pt-2 md:pt-5 lg:pt-10 pb-8 lg:pb-16"}>
            <div className="space-x-3">
                <Button
                    variant="secondary"
                    id="gaa_tilbake_button"
                    onClick={() => goToStep(steg.id - 1)}
                    disabled={backwardInhibited}
                >
                    {getIntlTextOrKey(t, "skjema.knapper.forrige")}
                    {loading && <Loader />}
                </Button>
                {steg.type === "skjema" ? (
                    <Button
                        variant="primary"
                        id="gaa_videre_button"
                        onClick={() => goToStep(steg.id + 1)}
                        disabled={forwardInhibited}
                    >
                        {t("skjema.knapper.neste")}
                        {loading && <Loader />}
                    </Button>
                ) : (
                    <Button variant="primary" id="send_button" onClick={sendInnSoknad} disabled={forwardInhibited}>
                        {t("skjema.knapper.send")}
                        {loading && <Loader />}
                    </Button>
                )}
            </div>
            <div>
                <Button variant="tertiary" onClick={() => (window.location.href = minSideUrl)}>
                    {t("avbryt.fortsettsenere")}
                </Button>
                <Button variant="tertiary" onClick={() => dispatch(visAvbrytSoknadModal())}>
                    {t("avbryt.slett")}
                </Button>
            </div>
        </div>
    );
};

export default SkjemaStegNavKnapperLegacy;
