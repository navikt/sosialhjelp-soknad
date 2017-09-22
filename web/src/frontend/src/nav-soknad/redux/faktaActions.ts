import {FaktaActionTypes, Faktum, FaktumActionTypeKeys, FaktumValueType, SoknadDispatch} from "./faktaTypes";
import {fetchPost, fetchPut} from "../../digisos/redux/rest-utils";
import {FaktumActionTypes} from "./faktaReducer";
import {State} from "../../digisos/redux/reducers";

export function setFaktumVerdi(faktum: Faktum, value: FaktumValueType, property?: string) {
	return (dispatch: SoknadDispatch<FaktaActionTypes>) => {
		let nyttFaktum = {...faktum};
		if ( property) {
			nyttFaktum = {...faktum, properties: {...faktum.properties, [property]: value}};
		} else {
			nyttFaktum.value = value;
		}
		dispatch({type: FaktumActionTypeKeys.OPPDATER_FAKTUM});
		fetchPut("fakta/" + nyttFaktum.faktumId, JSON.stringify(nyttFaktum))
			.then(response => {
				dispatch({
					type: FaktumActionTypeKeys.OPPDATERT_FAKTUM,
					faktum: nyttFaktum
				});
			})
			.catch(reason => {
				dispatch({type: FaktumActionTypeKeys.FEILET, feilmelding: reason});
			});
	};
}

interface OpprettFaktumType {
	key: string;
	parrentFaktum: number;
}
export function opprettFaktum(faktum: OpprettFaktumType | Faktum) {
	return (dispatch: SoknadDispatch<FaktumActionTypes>, getState: () => State) => {
		dispatch({type: FaktumActionTypeKeys.OPPRETT_FAKTUM});
		return fetchPost("fakta?behandlingsId=" + getState().soknad.data.brukerBehandlingId, JSON.stringify(faktum))
			.then((response: Faktum) => {
				dispatch({
					type: FaktumActionTypeKeys.OPPRETTET_FAKTUM,
					faktum: response
				});
			})
			.catch((reason: string) => {
				dispatch({type: FaktumActionTypeKeys.FEILET, feilmelding: reason});
			});
	};
}