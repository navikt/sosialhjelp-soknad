import { ValideringActionKey, Valideringsfeil } from "../../validering/types";
import { connect } from "react-redux";
import { State } from "../../../digisos/redux/reducers";
import { hentSoknadsdata, lagreSoknadsdata } from "./soknadsdataActions";
import { setValideringsfeil } from "../valideringActions";
import { oppdaterSoknadsdataState, Soknadsdata, SoknadsdataActionVerdi, SoknadsdataType } from "./soknadsdataReducer";

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
}

// Hvis valideringsfeil er endret, eksekver callback. For å unngå at valideringsfeil dispatches uten grunn:
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
