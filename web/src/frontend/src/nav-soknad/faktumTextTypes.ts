export interface Infotekst {
	tittel?: string;
	tekst?: string;
}

export interface SporsmalFaktumTekst {
	sporsmal: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
}

export interface CheckboxFaktumTekst {
	label: string;
	infotekst?: Infotekst;
	hjelpetekst?: Infotekst;
}

export interface InputFaktumTekst {
	/** Label som knyttes sammen med inputfelt */
	label: string;
	/** Valgfritt spørsmål */
	sporsmal?: string;
	/** Utfyllende informasjon */
	infotekst?: Infotekst;
	/** Hjelpetekst som plasseres vedsiden av spørsmål */
	hjelpetekst?: Infotekst;
	/** Tekst som skal stå i bakgrunn for sjekkboksen */
	pattern?: string;
	/** Tekst til høyre for inputboks */
	hoyretekst?: string;
	/** Tekst til venstre for inputboks */
	venstretekst?: string;
}
