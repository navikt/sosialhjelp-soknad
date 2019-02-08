import { ValideringActionKey } from "../../validering/types";
import { connect } from "react-redux";
import { State } from "../../../digisos/redux/reducers";
import { hentSoknadsdata, lagreSoknadsdata } from "./soknadsdataActions";
import { setValideringsfeil } from "../valideringActions";
import { oppdaterSoknadsdataState, Soknadsdata, SoknadsdataActionVerdi, SoknadsdataType } from "./soknadsdataReducer";

// Properties og redux koblinger som brukes for å lese og endre søknadsdata

export interface SoknadsdataContainerProps {
	soknadsdata?: null | Soknadsdata;
	brukerBehandlingId?: string;
	hentSoknadsdata?: (brukerBehandlingId: string, urlPath: string) => void;
	lagreSoknadsdata?: (brukerBehandlingId: string, urlPath: string, soknadsdata: SoknadsdataType) => void;
	setValideringsfeil?: (feilkode: ValideringActionKey, faktumKey: string) => void;
	oppdaterSoknadsdataState?: (soknadsdata: SoknadsdataActionVerdi) => void;
}

export const connectSoknadsdataContainer = connect<{}, {}, SoknadsdataContainerProps>(
	(state: State) => ({
		brukerBehandlingId: state.soknad.data.brukerBehandlingId,
		soknadsdata: state.soknadsdata
	}),
	{
		hentSoknadsdata,
		lagreSoknadsdata,
		oppdaterSoknadsdataState,
		setValideringsfeil
	}
);
