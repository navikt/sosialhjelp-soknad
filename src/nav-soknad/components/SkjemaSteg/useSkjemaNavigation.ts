import {createSkjemaEventData, logAmplitudeEvent} from "../../utils/amplitude";
import {
    resetSendSoknadServiceUnavailable,
    sendSoknadOk,
    sendSoknadPending,
    setSendSoknadServiceUnavailable,
    showSendingFeiletPanel,
    visMidlertidigDeaktivertPanel,
} from "../../../digisos/redux/soknad/soknadActions";
import {setVisBekreftMangler} from "../../../digisos/redux/oppsummering/oppsummeringActions";
import {erAktiv, navEnhetGyldigEllerIkkeSatt} from "../../containers/containerUtils";
import {
    clearAllValideringsfeil,
    setValideringsfeil,
    visValideringsfeilPanel,
} from "../../../digisos/redux/validering/valideringActions";
import {getStegUrl} from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../digisos/redux/reducers";
import {NavEnhet} from "../../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {ValideringsFeilKode} from "../../../digisos/redux/validering/valideringActionTypes";
import {logInfo, logWarning} from "../../utils/loggerUtils";
import {SkjemaSteg} from "./digisosSkjema";
import {useNavigate} from "react-router";
import {SendSoknadResponse} from "../../../digisos/redux/soknad/soknadTypes";
import {fetchPost, getInnsynUrl, HttpStatus} from "../../utils/rest-utils";
import {AnyAction, Dispatch} from "redux";

const sendSoknad = async (behandlingsId: string, dispatch: Dispatch<AnyAction>) => {
    try {
        const response = await fetchPost<SendSoknadResponse>(
            `soknader/${behandlingsId}/actions/send`,
            JSON.stringify({behandlingsId}),
            true
        );

        dispatch(sendSoknadOk(behandlingsId));

        if (!response) return `/skjema/${behandlingsId}/ettersendelse`;
        if (response.sendtTil === "FIKS_DIGISOS_API") return `${getInnsynUrl()}${response.id}/status`;
        if (response?.id) return `/skjema/${response.id}/ettersendelse`;
    } catch (reason) {
        if (reason.message === HttpStatus.UNAUTHORIZED) return;

        logWarning("send soknad saga feilet: " + reason);

        if (reason.message === HttpStatus.SERVICE_UNAVAILABLE) {
            dispatch(visMidlertidigDeaktivertPanel(true));
            dispatch(setSendSoknadServiceUnavailable());
        } else {
            dispatch(showSendingFeiletPanel(true));
        }
    }
};

export const useSkjemaNavigation = () => {
    const {soknadsdata, soknad, validering, oppsummering} = useSelector((state: State) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {behandlingsId} = soknad;
    const finnSoknadsMottaker = () => soknadsdata.personalia.navEnhet;

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
    const handleNavEnhetErUgyldigFeil = (valgtNavEnhet: NavEnhet | null) => {
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

        const valgtNavEnhet = finnSoknadsMottaker();

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

        navigate(getStegUrl(behandlingsId, aktivtSteg.id + 1));
    };

    const handleGaTilSkjemaSteg = (steg: number, aktivtSteg?: SkjemaSteg) => {
        if (!aktivtSteg || !behandlingsId) return;

        const valgtNavEnhet = finnSoknadsMottaker();

        if (aktivtSteg.id === 1 && !erAktiv(valgtNavEnhet)) {
            handleNavEnhetErUgyldigFeil(valgtNavEnhet);
        } else {
            if (!validering.feil.length) {
                dispatch(clearAllValideringsfeil());
                navigate(getStegUrl(behandlingsId, steg));
            } else {
                dispatch(visValideringsfeilPanel());
            }
        }
    };
    const handleGaTilbake = (aktivtSteg: number) => {
        if (!behandlingsId) return;
        dispatch(clearAllValideringsfeil());
        dispatch(resetSendSoknadServiceUnavailable());
        navigate(getStegUrl(behandlingsId, aktivtSteg - 1));
    };

    const kanGaTilSkjemasteg = (aktivtSteg?: SkjemaSteg): boolean => {
        if (!(aktivtSteg && behandlingsId)) return true;

        const valgtNavEnhet = finnSoknadsMottaker();

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
