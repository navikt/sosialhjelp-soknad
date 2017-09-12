import { Action, Dispatch } from "redux";
import {
	ActionTypeKeys,
	OpprettSoknadAction,
	ResetSoknadAction,
	SetBrukerBehandlingIdAction,
	SetServerFeilAction,
	SettRestStatusOk,
	SettRestStatusPending
} from "./types";

import { fetchPost, fetchToJson } from "../rest-utils";
import { setFakta, setFaktumVerdi } from "../../../nav-soknad/redux/faktaActions";
import { finnFaktum } from "../../../nav-soknad/redux/faktaUtils";
import { Faktum } from "../../../nav-soknad/redux/faktaTypes";

export type ActionTypes =
	| OpprettSoknadAction
	| SetBrukerBehandlingIdAction
	| SetServerFeilAction
	| ResetSoknadAction
	| SettRestStatusPending
	| SettRestStatusOk;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.PENDING });
		const payload = JSON.stringify({ soknadType: "NAV DIGISOS" });
		fetchPost("soknader", payload)
			.then(response => {
				const key = "brukerBehandlingId";
				const brukerBehandlingId = response[key];
				dispatch({
					type: ActionTypeKeys.SET_BRUKERBEHANDLING_ID,
					brukerBehandlingId
				});
				hentFakta(brukerBehandlingId, dispatch).then((fakta: Faktum[]) => {
					dispatch({ type: ActionTypeKeys.OK });
					dispatch(setFakta(fakta));
					dispatch(setFaktumVerdi(finnFaktum("personalia.kommune", fakta ), kommuneId));
					if (bydelId !== "") {
						dispatch(setFaktumVerdi(finnFaktum("personalia.bydel", fakta ), bydelId));
					}
				});
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}

export function lesSoknad(brukerBehandlingId: string) {
	return (dispatch: Dispatch<Action>) => {
		hentFakta(brukerBehandlingId, dispatch).then(fakta => {
			dispatch(setFakta(fakta));
			dispatch({ type: ActionTypeKeys.OK });
		});
	};
}

function hentFakta(brukerBehandlingId: string, dispatch: Dispatch<Action>) {
	dispatch({ type: ActionTypeKeys.FAKTA_PENDING });
	return fetchToJson(
		"soknader/" + brukerBehandlingId + "/fakta"
	).catch(reason => {
		dispatch({ type: ActionTypeKeys.FEILET });
		dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
	});
}

export function resetSoknad() {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.RESET_SOKNAD });
	};
}
