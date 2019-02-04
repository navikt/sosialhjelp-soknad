import { Reducer } from "../reduxTypes";
import {
	Bankinformasjon,
	initialBankinfoState
} from "../../../digisos/skjema/personopplysninger/bankinfo/bankinformasjonActions";
import { Begrunnelse, initialBegrunnelseState } from "../../../digisos/skjema/begrunnelse_ny/begrunnelseActions";
import { initialUtdanningState, Utdanning } from "../../../digisos/skjema/arbeidUtdanning/utdanning/utdanningActions";
import {
	initialTelefonnummerState,
	Telefonnummer
} from "../../../digisos/skjema/personopplysninger/telefon/telefonActions";
import { Bosituasjon, initialBosituasjonState } from "../../../digisos/skjema/bosituasjon_ny/bosituasjonActions";
import { Arbeid, initialArbeidState } from "../../../digisos/skjema/arbeidUtdanning/arbeid/arbeidActions";

export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER"
}

export interface SoknadsdataState {
	bankinformasjon: Bankinformasjon;
	begrunnelse: Begrunnelse;
	utdanning: Utdanning;
	telefonnummer: Telefonnummer;
	bosituasjon: Bosituasjon;
	arbeid: Arbeid;
}

const initialState: SoknadsdataState = {
	bankinformasjon: initialBankinfoState,
	begrunnelse: initialBegrunnelseState,
	utdanning: initialUtdanningState,
	telefonnummer: initialTelefonnummerState,
	bosituasjon: initialBosituasjonState,
	arbeid: initialArbeidState
};

const SoknadsdataReducer: Reducer<SoknadsdataState, any> = (
	state = initialState,
	action
): any => {
	switch (action.type) {
		case SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA: {
			return {
				...state,
				...action.verdi
			};
		}
		default:
			return state;
	}
};

export const oppdaterSoknadsdataAction = (verdi: any): any => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA,
		verdi
	}
};

export default SoknadsdataReducer;
