import { Reducer } from "../reduxTypes";
import {
	initialKontonummerState, Kontonummer
} from "../../../digisos/skjema/personopplysninger/bankinfo/KontonummerType";
import { Begrunnelse, initialBegrunnelseState } from "../../../digisos/skjema/begrunnelse_ny/begrunnelseTypes";
import {
	initialTelefonnummerState,
	Telefonnummer
} from "../../../digisos/skjema/personopplysninger/telefon/telefonTypes";
import { Bosituasjon, initialBosituasjonState } from "../../../digisos/skjema/bosituasjon_ny/bosituasjonTypes";
import {
	Familie, initialFamilieStatus,
} from "../../../digisos/skjema/familie/sivilstatus/FamilieTypes";
import { initialUtdanningState, Utdanning } from "../../../digisos/skjema/arbeidUtdanning/utdanning/utdanningTypes";
import { Arbeid, initialArbeidState } from "../../../digisos/skjema/arbeidUtdanning/arbeid/arbeidTypes";
import { setPath } from "./soknadsdataActions";
import {
	BasisPersonalia,
	initialBasisPersonalia
} from "../../../digisos/skjema/personopplysninger/personalia/BasisPersonaliaTypes";
import { REST_STATUS } from "../../types";
// import { setPath } from "./soknadsdataActions";


export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER",
	OPPDATER_SOKNADSDATA_STI = "soknadsdata/OPPDATER_STI",
	SETT_REST_STATUS = "soknadsdata/SETT_REST_STATUS",
	START_REST_KALL = "soknadsdata/START_REST_KALL",
	STOPP_REST_KALL = "soknadsdata/STOPP_REST_KALL"
}

/*
 * Sti for REST endepunkter og redux state datastruktur:
 * Eksempel: Kontonummer hentes fra REST endepunktet "http://..../123/personalia/kontonummer"
 * og legges på redux state state.soknadsdata.personalia.kontonummer
 */
export enum SoknadsSti {
	ARBEID = "arbeid",
	BANKINFORMASJON = "personalia/kontonummer",
	BEGRUNNELSE = "begrunnelse",
	BOSITUASJON = "bosituasjon",
	UTDANNING = "utdanning",
	TELEFONNUMMER = "personalia/telefonnummer",
	BASIS_PERSONALIA = "personalia/basisPersonalia"
}

export interface Personalia {
	kontonummer?: Kontonummer;
	telefonnummer?: Telefonnummer;
	basisPersonalia?: BasisPersonalia;
}

export const initialPersonaliaState: Personalia = {
	kontonummer: initialKontonummerState,
	telefonnummer: initialTelefonnummerState,
	basisPersonalia: initialBasisPersonalia
};

export interface Soknadsdata {
	arbeid: Arbeid;
	begrunnelse: Begrunnelse;
	bosituasjon: Bosituasjon;
	familie: Familie;
	utdanning: Utdanning;
	personalia: Personalia;
	restStatus: any;
}

export interface SoknadsdataActionVerdi {
	arbeid?: Arbeid;
	bosituasjon?: Bosituasjon;
	begrunnelse?: Begrunnelse;
	familie?: Familie;
	utdanning?: Utdanning;
	personalia: Personalia;
}

export type SoknadsdataType
	= Arbeid
	| Begrunnelse
	| Bosituasjon
	| Familie
	| Utdanning
	| Kontonummer
	| Telefonnummer
	| Personalia

interface SoknadsdataActionType {
	type: SoknadsdataActionTypeKeys,
	verdi?: SoknadsdataActionVerdi | SoknadsdataType,
	sti?: string,
	restStatus?: string
}

export const initialSoknadsdataState: Soknadsdata = {
	arbeid: initialArbeidState,
	begrunnelse: initialBegrunnelseState,
	bosituasjon: initialBosituasjonState,
	familie: initialFamilieStatus,
	utdanning: initialUtdanningState,
	personalia: initialPersonaliaState,
	restStatus: {
		personalia: {
			telefonnummer: REST_STATUS.INITIALISERT,
			kontonummer: REST_STATUS.INITIALISERT
		}
	}
};

const SoknadsdataReducer: Reducer<Soknadsdata, SoknadsdataActionType> = (
	state = initialSoknadsdataState,
	action
): any => {
	switch (action.type) {
		case SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI: {
			return {
				...setPath(state, action.sti, action.verdi)
			};
		}
		case SoknadsdataActionTypeKeys.SETT_REST_STATUS: {
			return {
				...setPath(state, "restStatus/" + action.sti, action.restStatus)
			}
		}
		default:
			return state;
	}
};

export const settRestStatus = (sti: string, restStatus: REST_STATUS): SoknadsdataActionType => {
	return {
		type: SoknadsdataActionTypeKeys.SETT_REST_STATUS,
		sti,
		restStatus
	}
};

export const oppdaterSoknadsdataSti = (sti: string, verdi: SoknadsdataType): SoknadsdataActionType => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI,
		sti,
		verdi
	}
};

export default SoknadsdataReducer;
