import { Dispatch } from "../../../../nav-soknad/redux/reduxTypes";
import { oppdaterSoknadsdataAction } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import { navigerTilServerfeil } from "../../../../nav-soknad/redux/navigasjon/navigasjonActions";
import { fetchPut, fetchToJson } from "../../../../nav-soknad/utils/rest-utils";

export interface Bankinformasjon {
	brukerdefinert: boolean;
	systemverdi: string | null;
	verdi: string | null;
	harIkkeKonto: boolean | null;
}

export const initialBankinfoState: Bankinformasjon = {
	brukerdefinert: false,
	systemverdi: null,
	verdi: null,
	harIkkeKonto: null
};

const bankinfoUrl = (brukerBehandlingId: string): string => `soknader/${brukerBehandlingId}/personalia/kontonummer`;

export const hentBankinformasjonAction = (brukerBehandlingId: string) => {
	return (dispatch: Dispatch) => {
		fetchToJson(bankinfoUrl(brukerBehandlingId)).then((response: Bankinformasjon) => {
			dispatch(oppdaterSoknadsdataAction({bankinformasjon: response}));
		}).catch(() => {
			dispatch(navigerTilServerfeil());
		});
	}
};

export const oppdaterBankinformasjonAction = (brukerBehandlingId: string, bankinformasjon: Bankinformasjon) => {
	return (dispatch: Dispatch) => {
		fetchPut(bankinfoUrl(brukerBehandlingId), JSON.stringify(bankinformasjon)).then(() => {
			dispatch(oppdaterSoknadsdataAction({ bankinformasjon }));
		}).catch(() => {
			dispatch(navigerTilServerfeil());
		});
	}
};
