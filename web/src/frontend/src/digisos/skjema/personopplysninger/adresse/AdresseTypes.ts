export enum AdresseKategori {
	FOLKEREGISTRERT = "folkeregistrert",
	MIDLERTIDIG = "midlertidig",
	SOKNAD = "soknad"
}

export enum AdresseType {
	GATEADRESSE = "gateadresse",
	MATRIKKELADRESSE = "matrikkeladresse", // TODO Test med mock matrikkel adresse
	USTRUKTURERT = "ustrukturert" // TODO Test med mock ustrukturert adresse
}

export interface Matrikkeladresse {
	type: AdresseType.MATRIKKELADRESSE;
	kommunenummer: string;
	gaardsnummer: string;
	bruksnummer: string;
	festenummer: string;
	seksjonsnummer: string;
	undernummer: string;
}

export interface Gateadresse {
	type: AdresseType.GATEADRESSE;
	landkode: null;
	kommunenummer: string;
	adresselinjer: string[];
	bolignummer: string;
	postnummer: string;
	poststed: string;
	gatenavn: string;
	husnummer: string;
	husbokstav: string;
}

export interface UstrukturertAdresse {
	type: AdresseType.USTRUKTURERT;
	adresse: string[];
}

export interface AdresseElement {
	type: AdresseType;
	valg: null | string;
	gateadresse: null | Gateadresse;
	matrikkeladresse: null | Matrikkeladresse;
	ustrukturert: null | UstrukturertAdresse;
}

export interface Adresser {
	valg: null |string;
	folkeregistrert: AdresseElement;
	midlertidig: AdresseElement;
	soknad: null | AdresseElement;
}

export const initialAdresserState: Adresser = {
	valg: null,
	folkeregistrert: {
		type: AdresseType.GATEADRESSE,
		valg: null,
		gateadresse: {
			type: AdresseType.GATEADRESSE,
			landkode: null,
			kommunenummer: "",
			adresselinjer: [],
			bolignummer: "",
			postnummer: "",
			poststed: "",
			gatenavn: "",
			husnummer: "",
			husbokstav: ""
		},
		matrikkeladresse: null,
		ustrukturert: null
	},
	midlertidig: {
		type: AdresseType.GATEADRESSE,
		valg: null,
		gateadresse: {
			type: AdresseType.GATEADRESSE,
			landkode: null,
			kommunenummer: "",
			adresselinjer: [],
			bolignummer: "",
			postnummer: "",
			poststed: "",
			gatenavn: "",
			husnummer: "",
			husbokstav: ""
		},
		matrikkeladresse: null,
		ustrukturert: null
	},
	soknad: null
};
