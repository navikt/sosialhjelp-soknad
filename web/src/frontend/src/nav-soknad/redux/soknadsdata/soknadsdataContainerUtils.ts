import { ValideringActionKey, Valideringsfeil } from "../../validering/types";
import { connect } from "react-redux";
import { State } from "../../../digisos/redux/reducers";
import { hentSoknadsdata, lagreSoknadsdata } from "./soknadsdataActions";
import { setValideringsfeil } from "../valideringActions";
import {
	oppdaterSoknadsdataState,
	oppdaterSoknadsdataSti,
	Soknadsdata,
	SoknadsdataActionVerdi,
	SoknadsdataType
} from "./soknadsdataReducer";

/*
 * Properties og redux koblinger som er felles for komponenter i søknadsskjemaet.
 */

export interface SoknadsdataContainerProps {
	// Props:
	soknadsdata?: null | Soknadsdata;
	brukerBehandlingId?: string;
	feil?: Valideringsfeil[];

	// Funksjoner:
	hentSoknadsdata?: (brukerBehandlingId: string, urlPath: string) => void;
	lagreSoknadsdata?: (brukerBehandlingId: string, urlPath: string, soknadsdata: SoknadsdataType) => void;
	setValideringsfeil?: (feilkode: ValideringActionKey, faktumKey: string) => void;
	oppdaterSoknadsdataState?: (soknadsdata: SoknadsdataActionVerdi) => void;
	oppdaterSoknadsdataSti?: (sti: string, soknadsdata: SoknadsdataType) => void;
}

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
		oppdaterSoknadsdataSti,
		setValideringsfeil
	}
);

/*
 * Utilities
 */

// For å unngå til at man dispatcher samme identiske feilmelding flere ganger, kan denne funksjonen brukes:
export const onEndretValideringsfeil = (
	nyFeilkode: ValideringActionKey,
	faktumKey: string,
	feil: Valideringsfeil[],
	callback: () => void) =>
{
	let eksisterendeFeil: Valideringsfeil;
	if (feil) {
		eksisterendeFeil = feil.find((valideringsfeil: Valideringsfeil) =>
			valideringsfeil.faktumKey === faktumKey);
	}
	const eksisterendeFeilkode: string = (eksisterendeFeil && eksisterendeFeil.feilkode) ?
		eksisterendeFeil.feilkode : undefined;
	if (eksisterendeFeilkode !== nyFeilkode) {
		callback();
	}
};
