export type FaktumValueType = string | null;

export interface Steg {
	url: string;
	cmstekst: string;
}

export interface Faktum {
	faktumId: number;
	soknadId: number;
	parrentFaktum: null | number;
	key: string;
	value: FaktumValueType;
	faktumEgenskaper?: FaktumEgenskap[];
	properties: object;
	type?: string;
	/** Verdier som er lagret på server - kun gyldige verdier */
	lagret?: {
		value?: FaktumValueType;
		properties?: object;
	};
}

export interface FaktumEgenskap {
	faktumId: number;
	soknadId: number;
	key: string;
	value: string;
	systemEgenskap: number;
}

export interface Soknad {
	soknadId: number;
	skjemaNummer: string;
	uuid: string;
	brukerBehandlingId: string;
	behandlingskjedeId: null | string;
	fakta: Faktum[];
	status: string;
	aktoerId: string;
	opprettetDato: string;
	sistLagret: string;
	delstegStatus: string;
	vedlegg: Vedlegg[];
	journalforendeEnhet: null | string;
	soknadPrefix: string;
	soknadUrl: string;
	fortsettSoknadUrl: string;
	stegliste: Steg[];
	sprak: string;
	ikkeInnsendteVedlegg: Vedlegg[];
	opplastedeVedlegg: Vedlegg[];
	innsendteVedlegg: Vedlegg[];
}

export interface Vedlegg {
	vedleggId: number;
	soknadId: number;
	faktumId: number;
	skjemaNummer: string;
	skjemanummerTillegg: string;
	innsendingsvalg: string;
	opprinneligInnsendingsvalg: string;
	navn: string;
	opprettetDato: string;
	urls: any;
	tittel: string;
	aarsak: string;
}

export enum DelstegStatus {
	OPPRETTET = "OPPRETTET",
	UTFYLLING = "UTFYLLING",
	SKJEMA_VALIDERT = "SKJEMA_VALIDERT",
	VEDLEGG_VALIDERT = "VEDLEGG_VALIDERT",
	SAMTYKKET = "SAMTYKKET",
	ETTERSENDING_OPPRETTET = "ETTERSENDING_OPPRETTET",
	ETTERSENDING_UTFYLLING = "ETTERSENDING_UTFYLLING"
}

export enum Adressetype {
	POSTADRESSE_UTLAND = "POSTADRESSE_UTLAND",
	BOSTEDSADRESSE = "BOSTEDSADRESSE",
	POSTADRESSE = "POSTADRESSE",
	GATEADRESSE = "GATEADRESSE",
	POSTBOKSADRESSE = "POSTBOKSADRESSE",
	OMRAADEADRESSE = "OMRAADEADRESSE",
	UTENLANDSK_ADRESSE = "UTENLANDSK_ADRESSE",
	UKJENT_ADRESSE = "UKJENT_ADRESSE",
	MIDLERTIDIG_POSTADRESSE_NORGE = "MIDLERTIDIG_POSTADRESSE_NORGE",
	MIDLERTIDIG_POSTADRESSE_UTLAND = "MIDLERTIDIG_POSTADRESSE_UTLAND"
}

export enum SoknadInnsendingStatus {
	UNDER_ARBEID = "UNDER_ARBEID",
	FERDIG = "FERDIG",
	AVBRUTT_AV_BRUKER = "AVBRUTT_AV_BRUKER",
	AVBRUTT_AUTOMATISK = "AVBRUTT_AUTOMATISK"
}

export interface PersonaliaProperties {
	statsborgerskapType: string;
	gjeldendeAdresseLandkode: string;
	statsborgerskap: string;
	utenlandskKontoBanknavn: string;
	erUtenlandskBankkonto: string;
	kjonn: string;
	epost: string;
	sekundarAdresseType: string;
	gjeldendeAdresse: string;
	fnr: string;
	alder: string;
	sekundarAdresseGyldigTil: string;
	utenlandskKontoLand: string;
	kontonummer: string;
	sekundarAdresse: string;
	sekundarAdresseGyldigFra: string;
	gjeldendeAdresseType: string;
	diskresjonskode: null | string;
	navn: string;
	gjeldendeAdresseGyldigTil: null | string;
	gjeldendeAdresseGyldigFra: null | string;
}
