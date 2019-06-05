import {ValideringActionTypeKeys, ValideringsfeilType} from "./valideringActionTypes";


export function visValideringsfeilPanel(){
	return {
		type: ValideringActionTypeKeys.VIS_VALIDERINGSFEIL_PANEL
	}
}

export function skjulValideringsfeilPanel(){
	return {
		type: ValideringActionTypeKeys.SKJUL_VALIDERINGSFEIL_PANEL
	}
}

export function setValideringsfeil(feilkode: ValideringsfeilType, faktumKey: string) {
	return {
		type: ValideringActionTypeKeys.SET_VALIDERINGSFEIL,
		feilkode,
		faktumKey
	};
}

export function clearValideringsfeil(faktumKey: string) {
	return {
		type: ValideringActionTypeKeys.CLEAR_VALIDERINGSFEIL,
		faktumKey
	};
}

export function clearAllValideringsfeil() {
	return {
		type: ValideringActionTypeKeys.CLEAR_ALL_VALIDERINGSFEIL
	}
}
