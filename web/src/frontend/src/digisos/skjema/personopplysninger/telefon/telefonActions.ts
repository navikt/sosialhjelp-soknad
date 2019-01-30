import { Dispatch } from "../../../../nav-soknad/redux/reduxTypes";
import { fetchPut, fetchToJson } from "../../../../nav-soknad/utils/rest-utils";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";

export interface Telefonnummer {
	brukerdefinert: null | boolean;
	systemverdi: null | string;
	verdi: null | string;
}

export const initialTelefonnummerState: Telefonnummer = {
	brukerdefinert: false,
	systemverdi: null,
	verdi: null
};

const bankinfoUrl = (brukerBehandlingId: string): string => `soknader/${brukerBehandlingId}/personalia/telefonnummer`;

export const hentTelefonnummerAction = (brukerBehandlingId: string) => {
	return (dispatch: Dispatch) => {
		fetchToJson(bankinfoUrl(brukerBehandlingId)).then((response: Telefonnummer) => {
			dispatch(oppdaterSoknadsdataAction({telefonnummer: response}));
		}).catch(() => {
			dispatch(navigerTilServerfeil());
		});
	}
};

export const oppdaterTelefonnummerAction = (brukerBehandlingId: string, telefonnummer: Telefonnummer) => {
	return (dispatch: Dispatch) => {
		fetchPut(bankinfoUrl(brukerBehandlingId), JSON.stringify(telefonnummer)).then(() => {
			dispatch(oppdaterSoknadsdataAction({ telefonnummer }));
		}).catch(() => {
			dispatch(navigerTilServerfeil());
		});
	}
};
