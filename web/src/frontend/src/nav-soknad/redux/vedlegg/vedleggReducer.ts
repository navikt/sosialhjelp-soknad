import { Vedlegg, VedleggActionTypeKeys, VedleggActionTypes, VedleggApiType } from "./vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";
import { finnFaktumMedId } from "../../utils/faktumUtils";

const {
	LAST_OPP,
	LAST_OPP_OK,
	OPPDATERT_VEDLEGG,
	NYTT_VEDLEGG,
	HENT_VEDLEGGSFORVENTNING_OK,
} = VedleggActionTypeKeys;

const initialState: VedleggApiType = {
	restStatus: REST_STATUS.INITIALISERT,
	opplastingStatus: REST_STATUS.OK,
	feilmelding: "",
	data: []
};

export default (
	state: VedleggApiType = initialState,
	action: VedleggActionTypes
) => {
	switch (action.type) {
		case LAST_OPP: {
			return {
				...state,
				opplastingStatus: REST_STATUS.PENDING
			};
		}
		case LAST_OPP_OK: {
			return {
				...state,
				opplastingStatus: REST_STATUS.OK
			};
		}
		case OPPDATERT_VEDLEGG: {
			const index = state.data.findIndex(v => v.vedleggId === action.vedlegg.vedleggId);
			const data = [
				...state.data.slice(0, index),
				leggFaktumPaVedleggStruktur(action.vedlegg, action.fakta),
				...state.data.slice(index + 1)
			];
			return {
				...state,
				data
			};
		}
		case NYTT_VEDLEGG: {
			return {
				...state,
				data: [...state.data, leggFaktumPaVedleggStruktur(action.vedlegg, action.fakta)]
			};
		}
		//
		// case LAST_OPP_FEILET: {
		// 	const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
		// 	vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map((fil: Fil) => {
		// 		return {navn: fil.navn, status: REST_STATUS.FEILET};
		// 	});
		// 	return {...state, restStatus: REST_STATUS.FEILET, data: {vedlegg}};
		// }
		//
		// case SLETT_FIL: {
		// 	const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
		// 	vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map((fil: Fil) => {
		// 		const status = (fil.navn === action.filNavn) ? REST_STATUS.PENDING : fil.status;
		// 		return {navn: fil.navn, status};
		// 	});
		// 	return {...state, restStatus: REST_STATUS.PENDING, data: {vedlegg}};
		// }
		//
		// case SLETT_FIL_OK: {
		// 	const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
		// 	vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.filter((fil: Fil) => {
		// 		return (fil.navn !== action.filNavn);
		// 	});
		// 	return {...state, restStatus: REST_STATUS.OK, data: {vedlegg}};
		// }

		case HENT_VEDLEGGSFORVENTNING_OK: {

			const vedleggsForventninger = action.vedleggsforventninger;
			// har action.fakta
			vedleggsForventninger.forEach(vedlegg => leggFaktumPaVedleggStruktur(vedlegg, action.fakta));

			return {
				...state,
				restStatus: REST_STATUS.OK,
				data:  vedleggsForventninger
			};
		}
		default:
			return state;
	}
};

// TODO unødvendig?
function leggFaktumPaVedleggStruktur(vedlegg: Vedlegg, fakta: Faktum[]) {
	const vedleggFaktum = finnFaktumMedId("", fakta, vedlegg.faktumId);
	vedlegg.belopFaktumId = vedleggFaktum.parrentFaktum;
	return vedlegg;
}
