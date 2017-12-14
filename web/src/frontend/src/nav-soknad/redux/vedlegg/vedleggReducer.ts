import { Vedlegg, VedleggActionTypeKeys, VedleggActionTypes, VedleggApiType } from "./vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";
import { finnFaktumMedId } from "../../utils/faktumUtils";

const {
	LAST_OPP,
	LAST_OPP_OK,
	LAST_OPP_PENDING,
	LAST_OPP_FEILET,
	SLETT_FIL,
	SLETT_FIL_OK,
	HENT_VEDLEGGSFORVENTNING_OK,
} = VedleggActionTypeKeys;

const initialState: VedleggApiType = {
	restStatus: REST_STATUS.INITIALISERT,
	feilmelding: "",
	data: []
};

export default (
	state: VedleggApiType = initialState,
	action: VedleggActionTypes
) => {
	switch (action.type) {
		// case LAST_OPP: {
		// 	const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
		// 	action.filer.map((fil: Fil) => {
		// 		vedlegg[action.faktumKey].filer.push(
		// 			{navn: fil.navn, status: REST_STATUS.PENDING}
		// 		);
		// 	});
		// 	return {...state, restStatus: REST_STATUS.PENDING, data: {vedlegg}};
		// }
		//
		// case LAST_OPP_PENDING: {
		// 	const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
		// 	vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map((fil: Fil) => {
		// 		return {navn: fil.navn, status: REST_STATUS.PENDING};
		// 	});
		// 	return {...state, restStatus: REST_STATUS.PENDING, data: {vedlegg}};
		// }
		//
		// case LAST_OPP_OK: {
		// 	const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
		// 	vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map((fil: Fil) => {
		// 		return {navn: fil.navn, status: REST_STATUS.OK};
		// 	});
		// 	return {...state, restStatus: REST_STATUS.OK, data: {vedlegg}};
		// }
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
}
