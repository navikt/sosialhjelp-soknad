import {
	initialKontonummerState, Kontonummer
} from "../../../digisos/skjema/personopplysninger/bankinfo/KontonummerType";
import { Begrunnelse, initialBegrunnelseState } from "../../../digisos/skjema/begrunnelse/begrunnelseTypes";
import {
	initialTelefonnummerState,
	Telefonnummer
} from "../../../digisos/skjema/personopplysninger/telefon/telefonTypes";
import { Bosituasjon, initialBosituasjonState } from "../../../digisos/skjema/bosituasjon/bosituasjonTypes";
import {
	Familie, initialFamilieStatus, Sivilstatus,
} from "../../../digisos/skjema/familie/sivilstatus/FamilieTypes";
import { initialUtdanningState, Utdanning } from "../../../digisos/skjema/arbeidUtdanning/utdanning/utdanningTypes";
import { Arbeid, initialArbeidState } from "../../../digisos/skjema/arbeidUtdanning/arbeid/arbeidTypes";
import { setPath } from "./soknadsdataActions";
import {Bostotte, initialBostotteState} from "../../../digisos/skjema/inntektFormue/bostotte/bostotteTypes";
import {
	initialUtbetalingerState,
	Utbetalinger
} from "../../../digisos/skjema/inntektFormue/utbetalinger/utbetalingerTypes";
import {
	initialVerdierState,
	Verdier
} from "../../../digisos/skjema/inntektFormue/verdier/VerdierTypes";
import {
	initialFormueState,
	Formue
} from "../../../digisos/skjema/inntektFormue/formue/FormueTypes";
import {
	initialBoutgifterState,
	Boutgifter
} from "../../../digisos/skjema/utgifterGjeld/boutgifter/BoutgifterTypes";
import {
	initialBarneutgifterState,
	Barneutgifter
} from "../../../digisos/skjema/utgifterGjeld/barneutgifter/BarneutgifterTypes";
import {
	AdresseKategori,
	Adresser,
	initialAdresserState, NavEnhet
} from "../../../digisos/skjema/personopplysninger/adresse/AdresseTypes";
import {
	BasisPersonalia,
	initialBasisPersonalia
} from "../../../digisos/skjema/personopplysninger/personalia/BasisPersonaliaTypes";
import { REST_STATUS } from "../../types";
import { Barnebidrag, ForsorgerPlikt } from "../../../digisos/skjema/familie/forsorgerplikt/ForsorgerPliktTypes";
import {
    initialSkattbarInntektState,
    SkattbarInntekt
} from "../../../digisos/skjema/inntektFormue/skattbarInntekt/inntektTypes";
import {Systeminntekter, initialSysteminntekter} from "../../../digisos/skjema/inntektFormue/navytelser/navYtelserTypes";

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
	BOSTOTTE = "inntekt/bostotte",
	UTBETALINGER = "inntekt/utbetalinger",
	VERDIER = "inntekt/verdier",
	FORMUE = "inntekt/formue",
	BOUTGIFTER = "utgifter/boutgifter",
	BARNEUTGIFTER = "utgifter/barneutgifter",
	ADRESSER = "personalia/adresser",
	NAV_ENHETER = "personalia/navEnheter",
	SIVILSTATUS = "familie/sivilstatus",
	BASIS_PERSONALIA = "personalia/basisPersonalia",
	FORSORGERPLIKT = "familie/forsorgerplikt",
	INNTEKT_SYSTEMDATA = "inntekt/systemdata",
    SKATTBARINNTEKT = "inntekt/skattbarinntektogforskuddstrekk"
}

export interface Inntekt {
	skattbarinntektogforskuddstrekk: SkattbarInntekt[];
	bostotte: Bostotte;
	utbetalinger: Utbetalinger;
	formue: Formue;
	verdier: Verdier;
	systemdata: Systeminntekter;
}

export const initialInntektState: Inntekt = {
	skattbarinntektogforskuddstrekk: initialSkattbarInntektState,
	bostotte: initialBostotteState,
	utbetalinger: initialUtbetalingerState,
	formue: initialFormueState,
	verdier: initialVerdierState,
	systemdata: initialSysteminntekter
}

export interface Personalia {
	kontonummer: Kontonummer;
	telefonnummer: Telefonnummer;
	adresser: Adresser;
	navEnheter: NavEnhet[];
	basisPersonalia: BasisPersonalia;
}

export interface Utgifter {
	boutgifter: Boutgifter;
	barneutgifter: Barneutgifter;

}

export const initialPersonaliaState: Personalia = {
	kontonummer: initialKontonummerState,
	telefonnummer: initialTelefonnummerState,
	adresser: initialAdresserState,
	navEnheter: [],
	basisPersonalia: initialBasisPersonalia
};

export const initialUtgifterState: Utgifter = {
	boutgifter: initialBoutgifterState,
	barneutgifter: initialBarneutgifterState
};

export interface Soknadsdata {
	arbeid: Arbeid;
	begrunnelse: Begrunnelse;
	bosituasjon: Bosituasjon;
	familie: Familie;
	utdanning: Utdanning;
	personalia: Personalia;
	inntekt: Inntekt;
	utgifter: Utgifter;
	restStatus: any;
}

export interface SoknadsdataActionVerdi {
	arbeid: Arbeid;
	bosituasjon: Bosituasjon;
	begrunnelse: Begrunnelse;
	familie: Familie;
	utdanning: Utdanning;
	personalia: Personalia;
	inntekt: Inntekt;
	utgifter: Utgifter;
}

export interface AdresseValg {
	valg: AdresseKategori;
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
	| Sivilstatus
	| ForsorgerPlikt
	| Barnebidrag
	| Bostotte
	| Formue
	| Verdier
	| Utgifter
	| Adresser
	| AdresseValg
	| NavEnhet[];

interface SoknadsdataActionType {
	type: SoknadsdataActionTypeKeys,
	verdi?: SoknadsdataActionVerdi | SoknadsdataType | null,
	sti: string,
	restStatus?: string
}

const initialSoknadsdataRestStatus = {
	personalia: {
		telefonnummer: REST_STATUS.INITIALISERT,
		kontonummer: REST_STATUS.INITIALISERT,
		basisPersonalia: REST_STATUS.INITIALISERT,
		adresser: REST_STATUS.INITIALISERT,
		navEnheter: REST_STATUS.INITIALISERT
	},
	familie: {
		sivilstatus: REST_STATUS.INITIALISERT,
		forsorgerplikt: REST_STATUS.INITIALISERT
	},
	inntekt: {
		bostotte: REST_STATUS.INITIALISERT,
		utbetalinger: REST_STATUS.INITIALISERT,
		verdier: REST_STATUS.INITIALISERT
	}
};

export const initialSoknadsdataState: Soknadsdata = {
	arbeid: initialArbeidState,
	begrunnelse: initialBegrunnelseState,
	bosituasjon: initialBosituasjonState,
	familie: initialFamilieStatus,
	utdanning: initialUtdanningState,
	personalia: initialPersonaliaState,
	inntekt: initialInntektState,
	utgifter: initialUtgifterState,
	restStatus: initialSoknadsdataRestStatus
};

export default (
	state: Soknadsdata = initialSoknadsdataState,
	action: SoknadsdataActionType
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

export const oppdaterSoknadsdataSti = (sti: string, verdi: SoknadsdataType | null): SoknadsdataActionType => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI,
		sti,
		verdi
	}
};
