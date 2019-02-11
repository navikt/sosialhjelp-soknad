import { ValideringActionKey, Valideringsfeil } from "../../validering/types";
import { connect } from "react-redux";
import { State } from "../../../digisos/redux/reducers";
import { hentSoknadsdata, lagreSoknadsdata } from "./soknadsdataActions";
import { setValideringsfeil } from "../valideringActions";
import { oppdaterSoknadsdataState, Soknadsdata, SoknadsdataActionVerdi, SoknadsdataType } from "./soknadsdataReducer";

// Properties og redux koblinger som brukes for å lese og endre søknadsdata

export interface SoknadsdataContainerProps {
	// Props:
	soknadsdata?: null | Soknadsdata;
	brukerBehandlingId?: string;
	// feil?: ValideringState;
	feil?: Valideringsfeil[];

	// Funksjoner:
	hentSoknadsdata?: (brukerBehandlingId: string, urlPath: string) => void;
	lagreSoknadsdata?: (brukerBehandlingId: string, urlPath: string, soknadsdata: SoknadsdataType) => void;
	setValideringsfeil?: (feilkode: ValideringActionKey, faktumKey: string) => void;
	oppdaterSoknadsdataState?: (soknadsdata: SoknadsdataActionVerdi) => void;
}

// Dispatch ny endring av valideringsfeil hvis nødvending
// Dispatch ny endring av valideringsfeil hvis nødvending
export const onEndretValideringsfeil = (nyFeilkode: ValideringActionKey, faktumKey: string, feil: Valideringsfeil[], callback: () => void) => {
	let eksisterendeFeil: Valideringsfeil;
	if ( feil ) {
		eksisterendeFeil = feil.find((valideringsfeil: Valideringsfeil) =>
			valideringsfeil.faktumKey === faktumKey);
	}
	const eksisterendeFeilkode: string = (eksisterendeFeil && eksisterendeFeil.feilkode) ?
		eksisterendeFeil.feilkode : undefined;
	if (eksisterendeFeilkode !== nyFeilkode) {
		callback();
		// this.props.setValideringsfeil(nyFeilkode, faktumKey);
	}
};

export const connectSoknadsdataContainer = connect<{}, {}, SoknadsdataContainerProps>(
	(state: State) => ({
		brukerBehandlingId: state.soknad.data.brukerBehandlingId,
		soknadsdata: state.soknadsdata,
		feil: state.validering.feil
	}),
	{
		hentSoknadsdata,
		lagreSoknadsdata,
		oppdaterSoknadsdataState,
		setValideringsfeil
	}
);
