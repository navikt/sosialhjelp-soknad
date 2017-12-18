import { Vedlegg, VedleggActionTypeKeys, VedleggActionTypes, VedleggApiType } from "./vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";
import { finnFaktumMedId } from "../../utils/faktumUtils";

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
		case VedleggActionTypeKeys.LAST_OPP: {
			return {
				...state,
				opplastingStatus: REST_STATUS.PENDING
			};
		}
		case VedleggActionTypeKeys.LAST_OPP_OK: {
			return {
				...state,
				opplastingStatus: REST_STATUS.OK
			};
		}
		case VedleggActionTypeKeys.OPPDATERT_VEDLEGG: {
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
		case VedleggActionTypeKeys.NYTT_VEDLEGG: {
			return {
				...state,
				data: [...state.data, leggFaktumPaVedleggStruktur(action.vedlegg, action.fakta)]
			};
		}
		case VedleggActionTypeKeys.START_SLETT_VEDLEGG: {
			return {
				...state,
				opplastingStatus: REST_STATUS.PENDING
			};
		}
		case VedleggActionTypeKeys.SLETT_VEDLEGG: {
			return {
				...state,
				data: state.data.filter(v => v.vedleggId !== action.vedleggId)
			};
		}

		case VedleggActionTypeKeys.SLETT_VEDLEGG_OK: {
			return {
				...state,
				opplastingStatus: REST_STATUS.OK
			};
		}
		case VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK: {
			const vedleggsForventninger = action.vedleggsforventninger;
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

function leggFaktumPaVedleggStruktur(vedlegg: Vedlegg, fakta: Faktum[]) {
	const vedleggFaktum = finnFaktumMedId("", fakta, vedlegg.faktumId);
	vedlegg.belopFaktumId = vedleggFaktum.parrentFaktum;
	return vedlegg;
}
