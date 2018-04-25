import { KommunerActionTypeKeys, KommunerActionTypes } from "./kommunerTypes";
import { NavEnhet } from "../../../digisos/data/kommuner";

const lesKommuner = (): KommunerActionTypes => {
	return {
		type: KommunerActionTypeKeys.LES_KOMMUNER
	};
};

const lesKommunerOk = (kommuner: NavEnhet[]): KommunerActionTypes => {
	return {
		type: KommunerActionTypeKeys.LES_KOMMUNER_OK,
		kommuner
	};
};

const lesKommunerFeilet = (error: string): KommunerActionTypes => {
	return {
		type: KommunerActionTypeKeys.LES_KOMMUNER_FEILET,
		error
	};
};

export {
	lesKommuner,
	lesKommunerOk,
	lesKommunerFeilet
};
