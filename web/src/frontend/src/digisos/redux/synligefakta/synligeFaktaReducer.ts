import { Reducer } from "../../../nav-soknad/redux/reduxTypes";
import {
	FaktumStruktur,
	GruppertFaktumStruktur,
	SynligeFaktaActionTypeKeys,
	SynligeFaktaActionTypes,
	SynligeFaktaState
} from "./synligeFaktaTypes";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";

const defaultState: SynligeFaktaState = {
	restStatus: REST_STATUS.INITIALISERT,
	data: {}
};

const synligeFaktaReducer: Reducer<SynligeFaktaState, SynligeFaktaActionTypes> = (state = defaultState, action) => {

	switch (action.type) {
		case SynligeFaktaActionTypeKeys.START_BYGG_STRUKTUR:
			return {
				...defaultState,
				restStatus: REST_STATUS.PENDING
			};
		case SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK:
			return {
				...state,
				data: grupperFaktumStrukturer(action.data)
			};
		case SynligeFaktaActionTypeKeys.BYGG_STRUKTUR_FEILET:
			return {
				...state,
				restStatus: REST_STATUS.FEILET
			};
		case SynligeFaktaActionTypeKeys.BYGG_STRUKTUR_OK:
			return {
				...state,
				restStatus: REST_STATUS.OK
			};
		default:
			return state;
	}
};

function grupperFaktumStrukturer(faktumStrukturer: FaktumStruktur[]): GruppertFaktumStruktur {
	const gruppert: GruppertFaktumStruktur = {};

	faktumStrukturer
		.filter(struktur => struktur.dependOn)
		.filter(struktur => !struktur.id.endsWith(".vedlegg"))
		.forEach(struktur => {
			if (struktur.dependOn) {
				const gruppe = struktur.dependOn.id;
				if (!gruppert[gruppe]) {
					gruppert[gruppe] = [];
				}
				gruppert[gruppe].push(struktur);
			}
		});

	return gruppert;
}

export default synligeFaktaReducer;
