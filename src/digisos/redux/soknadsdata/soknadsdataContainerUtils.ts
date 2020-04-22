import {connect} from "react-redux";
import {hentSoknadsdata, lagreSoknadsdata} from "./soknadsdataActions";
import {clearValideringsfeil, setValideringsfeil} from "../validering/valideringActions";
import {oppdaterSoknadsdataSti, settRestStatus, Soknadsdata, SoknadsdataType} from "./soknadsdataReducer";
import {Valideringsfeil, ValideringsFeilKode} from "../validering/valideringActionTypes";
import {State} from "../reducers";
import {REST_STATUS, SoknadState} from "../soknad/soknadTypes";
import {visSamtykkeInfo} from "../soknad/soknadActions";
import {Dispatch} from "redux";

/*
 * Properties og redux koblinger som er felles for komponenter i søknadsskjemaet.
 */
export interface SoknadsdataContainerProps {
    // Egne props
    skjul?: boolean;

    // PropsMappedFromStore:
    soknad: SoknadState;
    soknadsdata: Soknadsdata;
    behandlingsId: string | undefined;
    feil: Valideringsfeil[];

    // Funksjoner:
    hentSoknadsdata: (brukerBehandlingId: string, urlPath: string) => void;
    lagreSoknadsdata: (
        brukerBehandlingId: string,
        urlPath: string,
        soknadsdata: any,
        responseHandler?: (response: any) => void
    ) => void;
    oppdaterSoknadsdataSti: (sti: string, soknadsdata: SoknadsdataType | null) => void;
    settRestStatus: (sti: string, restStatus: REST_STATUS) => void;
    visSamtykkeInfo: (vis: boolean) => void;
    setValideringsfeil: (feilkode: ValideringsFeilKode, faktumKey: string) => void;
    clearValideringsfeil: (faktumKey: string) => void;
    dispatchAction: (action: any) => void;
}

export const connectSoknadsdataContainer = connect(
    (state: State) => ({
        soknad: state.soknad,
        behandlingsId: state.soknad.behandlingsId,
        soknadsdata: JSON.parse(JSON.stringify(state.soknadsdata)),
        feil: state.validering.feil,
    }),
    (dispatch: Dispatch) => {
        return {
            hentSoknadsdata: (brukerBehandlingId: string, sti: string) =>
                hentSoknadsdata(brukerBehandlingId, sti)(dispatch),
            lagreSoknadsdata: (
                brukerBehandlingId: string,
                sti: string,
                soknadsdata: SoknadsdataType,
                responseHandler?: (response: any) => void
            ) => lagreSoknadsdata(brukerBehandlingId, sti, soknadsdata, responseHandler)(dispatch),
            oppdaterSoknadsdataSti: (sti: string, verdi: SoknadsdataType | null) =>
                dispatch(oppdaterSoknadsdataSti(sti, verdi)),
            settRestStatus: (sti: string, restStatus: REST_STATUS) => dispatch(settRestStatus(sti, restStatus)),
            visSamtykkeInfo: (skalVises: boolean) => dispatch(visSamtykkeInfo(skalVises)),
            setValideringsfeil: (feilkode: ValideringsFeilKode, faktumKey: string) =>
                dispatch(setValideringsfeil(feilkode, faktumKey)),
            clearValideringsfeil: (faktumKey: string) => dispatch(clearValideringsfeil(faktumKey)),
            dispatchAction: (action: any) => {
                dispatch(action);
            },
        };
    }
);

/*
 * Utilities
 */

// For å unngå at man dispatcher samme identiske feilmelding flere ganger, kan denne funksjonen brukes:
export const onEndretValideringsfeil = (
    nyFeilkode: ValideringsFeilKode | undefined,
    faktumKey: string,
    feil: Valideringsfeil[],
    callback: () => void
) => {
    let eksisterendeFeil: Valideringsfeil | undefined;
    if (feil) {
        eksisterendeFeil = feil.find((valideringsfeil: Valideringsfeil) => valideringsfeil.faktumKey === faktumKey);
    }
    const eksisterendeFeilkode: string | undefined =
        eksisterendeFeil && eksisterendeFeil.feilkode ? eksisterendeFeil.feilkode : undefined;
    if (eksisterendeFeilkode !== nyFeilkode) {
        callback();
    }
};
