import {
	Fil,
	VedleggActionTypeKeys,
	VedleggActionTypes,
	VedleggApiType,
	Vedlegg
} from "./vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";

const {
	LASTOPP,
	LASTOPP_OK,
	LASTOPP_PENDING,
	LASTOPP_FEILET,
	HENT_VEDLEGGSFORVENTNING,
	HENT_VEDLEGGSFORVENTNING_OK,
	HENT_VEDLEGGSFORVENTNING_FEILET,
	HENT_FIL_LISTE,
	HENT_FIL_LISTE_OK
} = VedleggActionTypeKeys;

const initialState: VedleggApiType = {
	restStatus: REST_STATUS.INITIALISERT,
	feilmelding: "",
	data: {
		vedlegg: {}
	}
};

export default (
	state: VedleggApiType = initialState,
	action: VedleggActionTypes
) => {
	switch (action.type) {
		case LASTOPP: {
			const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
			vedlegg[action.faktumKey].filer = action.filer.map( (fil: Fil) => {
				return {navn: fil.navn, status: REST_STATUS.PENDING};
			});
			return {...state, restStatus: REST_STATUS.PENDING, data: { vedlegg }};
		}

		case LASTOPP_PENDING: {
			const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
			vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map( (fil: Fil) => {
				return {navn: fil.navn, status: REST_STATUS.PENDING};
			});
			return {...state, restStatus: REST_STATUS.PENDING, data: { vedlegg }};
		}

		case LASTOPP_OK: {
			const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
			vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map( (fil: Fil) => {
				return {navn: fil.navn, status: REST_STATUS.OK};
			});
			return {...state, restStatus: REST_STATUS.OK, data: { vedlegg }};
		}

		case LASTOPP_FEILET: {
			const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
			vedlegg[action.faktumKey].filer = vedlegg[action.faktumKey].filer.map( (fil: Fil) => {
				return {navn: fil.navn, status: REST_STATUS.FEILET};
			});
			return {...state, restStatus: REST_STATUS.FEILET, data: { vedlegg }};
		}

		case HENT_FIL_LISTE: {
			return 	{...state, restStatus: REST_STATUS.PENDING};
		}
		case HENT_FIL_LISTE_OK: {
			const vedlegg: Vedlegg = Object.assign(state.data.vedlegg);
			vedlegg[action.faktumKey].filer = action.filer.map( (fil: any) => {
				return {navn: fil.navn, status: REST_STATUS.OK};
			});
			return 	{...state, restStatus: REST_STATUS.OK, data: { vedlegg }};
		}

		// case HENT_FILLISTE_FEILET: {
		// 	return 	{...state, restStatus: REST_STATUS.FEILET};
		// }

		case HENT_VEDLEGGSFORVENTNING:
			return {...state, restStatus: REST_STATUS.PENDING};

		case HENT_VEDLEGGSFORVENTNING_OK: {
			const vedlegg = {};
			action.vedleggsforventninger.map( (forventning: any) => {
				action.fakta.map( (faktum: Faktum) => {
					if (faktum.faktumId === forventning.faktumId) {
						const filer = forventning.filer.map((fil: any) => {
							return {navn: fil.navn, status: REST_STATUS.OK};
						});
						vedlegg[faktum.key] = {
							faktumId: faktum.faktumId,
							vedleggId: forventning.vedleggId,
							filer
						};
					}
				});
			});
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: {
					vedlegg
				}
			};
}
		case HENT_VEDLEGGSFORVENTNING_FEILET:
			return {
				...state,
				restStatus: REST_STATUS.FEILET
			};
		default:
			return state;
	}
};
