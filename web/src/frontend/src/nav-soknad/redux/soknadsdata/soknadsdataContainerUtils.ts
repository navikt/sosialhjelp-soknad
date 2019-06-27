import {connect} from "react-redux";
import {hentSoknadsdata, lagreSoknadsdata} from "./soknadsdataActions";
import {clearValideringsfeil, setValideringsfeil} from "../valideringActions";
import {
    oppdaterSoknadsdataSti,
    settRestStatus,
    Soknadsdata,
    SoknadsdataType
} from "./soknadsdataReducer";
import {REST_STATUS} from "../../types";
import {setVisSamtykkeInfo} from "../init/initActions";
import {Valideringsfeil, ValideringsFeilKode} from "../valideringActionTypes";
import {SoknadState} from "../reduxTypes";
import {State} from "../../../digisos/redux/reducers";

/*
 * Properties og redux koblinger som er felles for komponenter i søknadsskjemaet.
 */


export interface SoknadsdataContainerProps {
    // Egne props
    skjul?: boolean;

    // PropsMappedFromStore:
    soknad: SoknadState
    soknadsdata: Soknadsdata;
    brukerBehandlingId: string;
    feil: Valideringsfeil[];

    // Funksjoner:
    hentSoknadsdata: (brukerBehandlingId: string, urlPath: string) => void;
    lagreSoknadsdata: (brukerBehandlingId: string, urlPath: string, soknadsdata: any, responseHandler?: (response: any) => void) => void;
    oppdaterSoknadsdataSti: (sti: string, soknadsdata: SoknadsdataType) => void;
    settRestStatus: (sti: string, restStatus: REST_STATUS) => void;
    setVisSamtykkeInfo: (vis: boolean) => void;
    setValideringsfeil: (feilkode: ValideringsFeilKode, faktumKey: string) => void;
    clearValideringsfeil: (faktumKey: string) => void;
}

export const connectSoknadsdataContainer = connect(
    (state: State) => ({
        soknad: state.soknad,
        brukerBehandlingId: state.soknad.behandlingsId,
        soknadsdata: JSON.parse(JSON.stringify(state.soknadsdata)),
        feil: state.validering.feil
    }),
    {
        hentSoknadsdata,
        lagreSoknadsdata,
        oppdaterSoknadsdataSti,
        settRestStatus,
        setVisSamtykkeInfo,
        setValideringsfeil,
        clearValideringsfeil
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
    callback: () => void) => {
    let eksisterendeFeil: Valideringsfeil | undefined;
    if (feil) {
        eksisterendeFeil = feil.find((valideringsfeil: Valideringsfeil) =>
            valideringsfeil.faktumKey === faktumKey);
    }
    const eksisterendeFeilkode: string | undefined = (eksisterendeFeil && eksisterendeFeil.feilkode) ?
        eksisterendeFeil.feilkode : undefined;
    if (eksisterendeFeilkode !== nyFeilkode) {
        callback();
    }
};
