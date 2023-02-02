import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {resetSendSoknadServiceUnavailable, sendSoknadPending} from "../../../digisos/redux/soknad/soknadActions";
import {setVisBekreftMangler} from "../../../digisos/redux/oppsummering/oppsummeringActions";
import {erAktiv, navEnhetGyldigEllerIkkeSatt} from "../../containers/navEnhetStatus";
import {
    clearAllValideringsfeil,
    clearValideringsfeil,
    setValideringsfeil,
    visValideringsfeilPanel,
} from "../../../digisos/redux/validering/valideringActions";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {logInfo} from "../../utils/loggerUtils";
import {SkjemaSteg} from "./digisosSkjema";
import {useNavigate} from "react-router";
import {sendSoknad} from "../../../lib/sendSoknad";
import {useHentAdresser} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";
import {NavEnhetFrontend} from "../../../generated/model";
import {useEffect} from "react";

export const useSkjemaNavigation = () => {
    const {soknadsdata, validering, oppsummering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const behandlingsId = useBehandlingsId();
    const {data: adresseData} = useHentAdresser(behandlingsId);
    const valgtNavEnhet = adresseData?.navEnhet;

    // Midlertidig hack i påvente av mer ordentlig validering
    useEffect(() => {
        if (erAktiv(valgtNavEnhet)) dispatch(clearValideringsfeil("soknadsmottaker"));
    }, [valgtNavEnhet, dispatch]);

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
    const handleNavEnhetErUgyldigFeil = (valgtNavEnhet?: NavEnhetFrontend) => {
        dispatch(setValideringsfeil(ValideringsFeilKode.SOKNADSMOTTAKER_PAKREVD, "soknadsmottaker"));
        if (!valgtNavEnhet || (!valgtNavEnhet.enhetsnavn && !valgtNavEnhet.enhetsnr)) {
            logInfo("Ingen navenhet valgt");
        } else {
            logInfo(`Ugyldig navenhet valgt: ${valgtNavEnhet.enhetsnr} ${valgtNavEnhet.enhetsnavn}`);
        }
        dispatch(visValideringsfeilPanel());
    };
    const loggAdresseTypeTilGrafana = () => {
        const {valg} = soknadsdata.personalia.adresser;
        if (valg) logInfo("klikk--" + valg);
    };
    const handleGaVidere = async (aktivtSteg: SkjemaSteg) => {
        if (!behandlingsId) return;

        if (aktivtSteg.type === "oppsummering") {
            if (oppsummering.bekreftet) {
                logAmplitudeEvent("skjema fullført", createSkjemaEventData(getAttributesForSkjemaFullfortEvent()));
                loggAdresseTypeTilGrafana();
                dispatch(sendSoknadPending());
                const nextPage = await sendSoknad(behandlingsId, dispatch);
                if (nextPage) window.location.href = nextPage;
            } else {
                dispatch(setVisBekreftMangler(true));
            }
            return;
        }

        if (aktivtSteg.id === 1 && !erAktiv(valgtNavEnhet)) {
            handleNavEnhetErUgyldigFeil(valgtNavEnhet);
            return;
        }

        if (validering.feil.length) {
            dispatch(visValideringsfeilPanel());
            return;
        }

        if (!(await navEnhetGyldigEllerIkkeSatt(behandlingsId, dispatch))) return;

        logAmplitudeEvent("skjemasteg fullført", {
            ...createSkjemaEventData(),
            steg: aktivtSteg.id,
        });

        navigate(`../${aktivtSteg.id + 1}`);
    };

    const handleGaTilSkjemaSteg = (steg: number, aktivtSteg?: SkjemaSteg) => {
        if (!aktivtSteg || !behandlingsId) return;

        if (aktivtSteg.id === 1 && !erAktiv(valgtNavEnhet)) {
            handleNavEnhetErUgyldigFeil(valgtNavEnhet);
        } else {
            if (!validering.feil.length) {
                dispatch(clearAllValideringsfeil());
                navigate(`../${steg}`);
            } else {
                dispatch(visValideringsfeilPanel());
            }
        }
    };
    const handleGaTilbake = (aktivtSteg: number) => {
        if (!behandlingsId) return;
        dispatch(clearAllValideringsfeil());
        dispatch(resetSendSoknadServiceUnavailable());
        navigate(`../${aktivtSteg - 1}`);
    };

    const kanGaTilSkjemasteg = (aktivtSteg?: SkjemaSteg): boolean => {
        if (!(aktivtSteg && behandlingsId)) return true;

        if (!erAktiv(valgtNavEnhet)) {
            handleNavEnhetErUgyldigFeil(valgtNavEnhet);
            return false;
        }

        return true;
    };

    return {
        handleGaVidere,
        handleGaTilbake,
        handleGaTilSkjemaSteg,
        kanGaTilSkjemasteg,
    };
};
