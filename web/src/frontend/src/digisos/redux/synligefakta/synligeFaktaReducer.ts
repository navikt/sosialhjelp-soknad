import { Reducer } from "../../../nav-soknad/redux/reduxTypes";
import {
	FaktumStruktur,
	SynligeFaktaActionTypeKeys,
	SynligeFaktaState,
	GruppertFaktumStruktur,
	SynligeFaktaActionTypes
} from "./synligeFaktaTypes";
import { REST_STATUS } from "../../../nav-soknad/types/restTypes";

const defaultState: SynligeFaktaState = {
	restStatus: REST_STATUS.INITIALISERT,
	data: {}
};

const synligeFaktaReducer: Reducer<SynligeFaktaState, SynligeFaktaActionTypes> = (state = defaultState, action) => {

	switch (action.type) {
		case SynligeFaktaActionTypeKeys.HENT_SYNLIGE:
			return {
				...defaultState,
				restStatus: REST_STATUS.PENDING
			};
		case SynligeFaktaActionTypeKeys.HENT_SYNLIGE_OK:
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: grupperFaktumStrukturer(action.data)
			};
		case SynligeFaktaActionTypeKeys.HENT_SYNLIGE_FEILET:
			return {
				...state,
				restStatus: REST_STATUS.FEILET
			};
		default:
			return state;
	}
};

function grupperFaktumStrukturer(faktumStrukturer: FaktumStruktur[]): GruppertFaktumStruktur {
	const gruppert: GruppertFaktumStruktur = {};

	faktumStrukturer.forEach(struktur => {
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
