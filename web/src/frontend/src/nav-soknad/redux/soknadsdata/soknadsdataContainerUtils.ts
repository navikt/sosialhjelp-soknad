import { ValideringActionKey, Valideringsfeil } from "../../validering/types";
import { connect } from "react-redux";
import { State } from "../../../digisos/redux/reducers";
import { hentSoknadsdata, lagreSoknadsdata } from "./soknadsdataActions";
import { setValideringsfeil } from "../valideringActions";
import {
	oppdaterSoknadsdataSti,
	settRestStatus,
	Soknadsdata,
	SoknadsdataType
} from "./soknadsdataReducer";
import { REST_STATUS } from "../../types";

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
	// lagreSoknadsdata?: (brukerBehandlingId: string, urlPath: string, soknadsdata: SoknadsdataType, responseHandler?: (response: any) => void) => void;
	lagreSoknadsdata?: (brukerBehandlingId: string, urlPath: string, soknadsdata: any, responseHandler?: (response: any) => void) => void;
	setValideringsfeil?: (feilkode: ValideringActionKey, faktumKey: string) => void;
	oppdaterSoknadsdataSti?: (sti: string, soknadsdata: SoknadsdataType) => void;
	settRestStatus?: (sti: string, restStatus: REST_STATUS) => void;
}

export const connectSoknadsdataContainer = connect<{}, {}, SoknadsdataContainerProps>(
	(state: State) => ({
		brukerBehandlingId: state.soknad.data.brukerBehandlingId,
		soknadsdata: JSON.parse(JSON.stringify(state.soknadsdata)),
		feil: state.validering.feil
	}),
	{
		hentSoknadsdata,
		lagreSoknadsdata,
		oppdaterSoknadsdataSti,
		setValideringsfeil,
		settRestStatus
	}
);

/*
 * Utilities
 */

// For å unngå at man dispatcher samme identiske feilmelding flere ganger, kan denne funksjonen brukes:
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
