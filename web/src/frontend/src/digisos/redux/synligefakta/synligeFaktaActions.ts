import {
	FaktumStruktur, HentetSynligeFaktaAction, HentSynligeFaktaAction,
	SynligeFaktaActionTypeKeys
} from "./synligeFaktaTypes";
import { SoknadDispatch } from "../../../nav-soknad/redux/reduxTypes";
import { State } from "../reducers";
import { fetchToJson } from "../../../nav-soknad/utils/rest-utils";

export type SynligeFaktaActionTypes = HentSynligeFaktaAction | HentetSynligeFaktaAction;


export function hentSynligeFakta() {
	return (dispatch: SoknadDispatch<SynligeFaktaActionTypes>, getState: () => State) => {
		dispatch({type: SynligeFaktaActionTypeKeys.HENT_SYNLIGE});
		const behandlingsId = getState().soknad.data.brukerBehandlingId;

		return fetchToJson(`soknader/${behandlingsId}/synligsoknadstruktur?panelFilter=opplysningerBolk`)
			.then((struktur: FaktumStruktur[]) => {
				dispatch({
					type: SynligeFaktaActionTypeKeys.HENTET_SYNLIGE,
					data: struktur
				});
			});
	};
}
