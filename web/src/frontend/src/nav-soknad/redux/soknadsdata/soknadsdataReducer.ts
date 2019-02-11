import { Reducer } from "../reduxTypes";
import {
	initialKontonummerState, Kontonummer
} from "../../../digisos/skjema/personopplysninger/bankinfo/KontonummerType";
import { Begrunnelse, initialBegrunnelseState } from "../../../digisos/skjema/begrunnelse_ny/begrunnelseTypes";
import {
	initialTelefonnummerState,
	Telefonnummer
} from "../../../digisos/skjema/personopplysninger/telefon/telefonActions";
import { Bosituasjon, initialBosituasjonState } from "../../../digisos/skjema/bosituasjon_ny/bosituasjonActions";
import { Arbeid, initialArbeidState } from "../../../digisos/skjema/arbeidUtdanning/arbeid/arbeidActions";
import {
	Familie, initialFamilieStatus,
} from "../../../digisos/skjema/familie/sivilstatus/FamilieTypes";
import { initialUtdanningState, Utdanning } from "../../../digisos/skjema/arbeidUtdanning/utdanning/utdanningTypes";

export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER"
}

// Sti brukes både til url og datasti under soknadsdata i redux:
export enum SoknadsSti {
	BEGRUNNELSE = "begrunnelse",
	BANKINFORMASJON = "personalia/kontonummer",
	UTDANNING = "utdanning"
}

export interface Personalia {
	kontonummer: Kontonummer;
}

export const initialPersonaliaState: Personalia = {
	kontonummer: initialKontonummerState
};

// TODO Denne og interfacet under er duplikat...
export interface SoknadsdataState {
	// bankinformasjon: Bankinformasjon;
	personalia: Personalia;
	begrunnelse: Begrunnelse;
	utdanning: Utdanning;
	telefonnummer: Telefonnummer;
	bosituasjon: Bosituasjon;
	arbeid: Arbeid;
	familie: Familie;
}

export interface Soknadsdata {
	personalia: Personalia;
	begrunnelse: Begrunnelse;
	utdanning: Utdanning;
	telefonnummer: Telefonnummer;
	bosituasjon: Bosituasjon;
	arbeid: Arbeid;
	familie: Familie;
}

export interface SoknadsdataActionVerdi {
	// bankinformasjon?: Bankinformasjon
	begrunnelse?: Begrunnelse,
	utdanning?: Utdanning,
	telefonnummer?: Telefonnummer,
	bosituasjon?: Bosituasjon,
	arbeid?: Arbeid,
	familie?: Familie
}

export type SoknadsdataType =
	Personalia
	| Begrunnelse
	| Utdanning
	| Telefonnummer
	| Bosituasjon
	| Arbeid
	| Familie;

interface SoknadsdataActionType {
	type: SoknadsdataActionTypeKeys,
	verdi: SoknadsdataActionVerdi
}

export const initialSoknadsdataState: SoknadsdataState = {
	personalia: initialPersonaliaState,
	begrunnelse: initialBegrunnelseState,
	utdanning: initialUtdanningState,
	telefonnummer: initialTelefonnummerState,
	bosituasjon: initialBosituasjonState,
	arbeid: initialArbeidState,
	familie: initialFamilieStatus
};

const SoknadsdataReducer: Reducer<Soknadsdata, SoknadsdataActionType> = (
	state = initialSoknadsdataState,
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

export const oppdaterSoknadsdataState = (verdi: SoknadsdataActionVerdi): SoknadsdataActionType => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA,
		verdi
	}
};

export default SoknadsdataReducer;
