import { Action, Dispatch } from "redux";
import {
	ActionTypeKeys,
	OpprettSoknadAction,
	SetBrukerBehandlingIdAction,
	SetServerFeilAction
} from "./types";
import { fetchPost, fetchToJson } from "../../utils";
import { setFaktumVerdi, setFaktum } from "../../skjema/actions";

export type ActionTypes = OpprettSoknadAction | SetBrukerBehandlingIdAction | SetServerFeilAction;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({type: ActionTypeKeys.PENDING});
		const payload = JSON.stringify({soknadType: "NAV DIGISOS"});
		fetchPost("soknader", payload)
			.then(response => {
				const key = "brukerBehandlingId";
				const brukerBehandlingId = response[key];
				dispatch({type: ActionTypeKeys.SET_BRUKERBEHANDLING_ID, brukerBehandlingId});
				hentFakta(brukerBehandlingId, kommuneId, bydelId, dispatch);
			})
			.catch(reason => {
				dispatch({type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
			});
	};
}

function hentFakta(brukerBehandlingId: string, kommuneId: string, bydelId: string, dispatch: Dispatch<Action>) {
	dispatch({type: ActionTypeKeys.PENDING});
	fetchToJson("soknader/" + brukerBehandlingId + "/fakta")
		.then(response => {
			dispatch(setFaktum(response));
			dispatch(setFaktumVerdi("personalia.kommune", kommuneId));
			if (bydelId !== "") {
				dispatch(setFaktumVerdi("personalia.bydel", bydelId));
			}
		})
		.catch(reason => {
			dispatch({type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason});
		});
}
