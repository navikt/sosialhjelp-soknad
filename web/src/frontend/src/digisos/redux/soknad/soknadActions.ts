import { Action, Dispatch } from "redux";
import {
	HentetSoknadAction,
	HentSoknadAction,
	OpprettetSoknadAction,
	OpprettSoknadAction,
	ResetSoknadAction,
	SetServerFeilAction,
	SoknadActionTypeKeys
} from "./soknadTypes";

import { fetchPost, fetchToJson } from "../rest-utils";
import { hentFakta, setFaktumVerdi } from "../../../nav-soknad/redux/faktaActions";
import { finnFaktum } from "../../../nav-soknad/redux/faktaUtils";
import { State } from "../reducers";

export type SoknadActionTypes =
	| OpprettSoknadAction
	| OpprettetSoknadAction
	| HentSoknadAction
	| HentetSoknadAction
	| SetServerFeilAction
	| ResetSoknadAction;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (dispatch: Dispatch<SoknadActionTypes>, getState: () => State) => {
		dispatch({type: SoknadActionTypeKeys.OPPRETT_SOKNAD});
		const payload = JSON.stringify({soknadType: "NAV DIGISOS"});
		fetchPost("soknader", payload)
			.then((response: { brukerBehandlingId: string }) => {
				dispatch({
					type: SoknadActionTypeKeys.OPPRETTET_SOKNAD,
					brukerBehandlingId: response.brukerBehandlingId
				});
				const brukerBehandlingId = getState().soknad.data.brukerBehandlingId;

				hentFakta(brukerBehandlingId, dispatch).then(() => {
					const fakta = getState().fakta.data;
					dispatch(setFaktumVerdi(finnFaktum("personalia.kommune", fakta), kommuneId));
					if (bydelId !== "") {
						dispatch(setFaktumVerdi(finnFaktum("personalia.bydel", fakta), bydelId));
					}
				});
			})
			.catch(reason => {
				dispatch({type: SoknadActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
			});
	};
}

export function hentSoknad(brukerBehandlingsId: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({type: SoknadActionTypeKeys.HENT_SOKNAD});
		fetchToJson("soknader/" + brukerBehandlingsId )
			.then(soknadsdata => {
				dispatch({type: SoknadActionTypeKeys.HENTET_SOKNAD, data: soknadsdata});
			})
			.catch(reason => {
				dispatch({type: SoknadActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
			});
	};
}

export function resetSoknad() {
	return (dispatch: Dispatch<Action>) => {
		dispatch({type: SoknadActionTypeKeys.RESET_SOKNAD});
	};
}
