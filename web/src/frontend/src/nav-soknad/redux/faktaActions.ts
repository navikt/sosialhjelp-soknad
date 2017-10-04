import {
	FaktaActionTypes,
	FaktaActionTypeKeys,
	FaktumActionTypeKeys,
	SoknadDispatch,
	SoknadAppState
} from "./reduxTypes";
import { Faktum } from "../types";
import { fetchPost, fetchPut } from "../utils/rest-utils";
import { FaktumActionTypes } from "./faktaReducer";
import { oppdaterFaktumMedVerdier } from "../utils";

function prepFaktumForLagring(faktum: Faktum) {
	delete faktum.lagret;
	return JSON.stringify(faktum);
}

export function lagreFaktum(
	faktum: Faktum,
	dispatch: SoknadDispatch<FaktaActionTypes>
): Promise<any> {
	dispatch({
		type: FaktumActionTypeKeys.LAGRE_FAKTUM,
		faktum
	});
	return fetchPut("fakta/" + faktum.faktumId, prepFaktumForLagring(faktum))
		.then(response => {
			dispatch({
				type: FaktumActionTypeKeys.LAGRET_FAKTUM,
				faktum: response as Faktum
			});
		})
		.catch(reason => {
			dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
		});
}

export function setFaktum(faktum: Faktum) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		dispatch({
			type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
			faktum
		});
	};
}

export function setFaktumVerdi(
	faktum: Faktum,
	verdi: string,
	property?: string
) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		dispatch({
			type: FaktumActionTypeKeys.OPPDATER_FAKTUM,
			faktum: oppdaterFaktumMedVerdier(faktum, verdi, property)
		});
	};
}

interface OpprettFaktumType {
	key: string;
	parrentFaktum: number;
}
export function opprettFaktum(faktum: OpprettFaktumType | Faktum) {
	return (
		dispatch: SoknadDispatch<FaktumActionTypes>,
		getState: () => SoknadAppState
	) => {
		dispatch({ type: FaktumActionTypeKeys.OPPRETT_FAKTUM });
		return fetchPost(
			"fakta?behandlingsId=" + getState().soknad.data.brukerBehandlingId,
			JSON.stringify(faktum)
		)
			.then((response: Faktum) => {
				dispatch({
					type: FaktumActionTypeKeys.OPPRETTET_FAKTUM,
					faktum: response
				});
			})
			.catch((reason: string) => {
				dispatch({ type: FaktumActionTypeKeys.FEILET, feilmelding: reason });
			});
	};
}

export function resetFakta() {
	return {
		type: FaktaActionTypeKeys.RESET_FAKTA
	};
}
