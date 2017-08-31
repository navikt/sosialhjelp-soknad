import { Action, Dispatch } from "redux";
import {
	ActionTypeKeys,
	OpprettSoknadAction,
	SetBrukerBehandlingIdAction,
	SetServerFeilAction,
	SetOppsummering
} from "./types";
import { fetchPost, fetchToJson, fetchHtml } from "../../utils";

export type ActionTypes =
	| OpprettSoknadAction
	| SetBrukerBehandlingIdAction
	| SetServerFeilAction
	| SetOppsummering;

export function opprettSoknad() {
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
				hentFakta(brukerBehandlingId, dispatch);
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}

function hentFakta(id: string, dispatch: Dispatch<Action>) {
	dispatch({ type: ActionTypeKeys.PENDING });
	fetchToJson("soknader/" + id + "/fakta")
		.then(response => {
			// TODO Prosesser fakta
		})
		.catch(reason => {
			dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
		});
}

export function hentOppsummering(id: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.PENDING });
		fetchHtml("soknader/" + id + "/oppsummering")
			.then(response => {
				dispatch({
					type: ActionTypeKeys.SET_OPPSUMMERING,
					oppsummering: response
				});
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}
