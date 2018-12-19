import endpoints from "./endpoints.json";
import { settMockData} from "./mockRestUtils";

import adresserJSON from "./jsonTemplates/adresser.json";
import arbeidJSON from "./jsonTemplates/arbeid.json";
import brukerprofilJSON from "./jsonTemplates/brukerprofil.json";
import familieJSON from "./jsonTemplates/familie.json";
import norgJSON from "./jsonTemplates/norg.json";
import organisasjonJSON from "./jsonTemplates/organisasjon.json";
import telefonJSON from "./jsonTemplates/telefon.json";
import utbetalingJSON from "./jsonTemplates/utbetaling.json";

import midlertidigPostadresseJSON from "./jsonPartialTemplates/midlertidigPostadresse.json";


const adresser: object = adresserJSON;
const arbeid: object = arbeidJSON;
const brukerprofil: object = brukerprofilJSON;
const familie: object = familieJSON;
const norg: object = norgJSON;
const organisasjon: object = organisasjonJSON;
const telefon: object = telefonJSON;
const utbetaling: object = utbetalingJSON;

const midlertidigPostadresse: object = midlertidigPostadresseJSON;

const PERSON: string = "person";
const MIDLERTIDIGPOSTADRESSE: string = "midlertidigPostadresse";
const BANKKONTO: string = "bankkonto";
const VERDI: string = "verdi";
const ARBEIDSFORHOLD: string = "arbeidsforhold";
const ORGANISASJON: string = "organisasjon";
const PERSONNAVN: string = "personnavn";


export enum Valg {
	Nei = "nei",
	Default = "default",
	Egendefinert = "egendefinert"
}


export const SystemdataMockAPI = {

	"settNavn" : (fornavn: string, mellomnavn: string, etternavn: string) => {
		const navnObject: object =
		{
			"etternavn": etternavn,
			"fornavn": fornavn,
			"mellomnavn": mellomnavn,
			"sammensattNavn": null,
			"endringstidspunkt": null,
			"endretAv": null,
			"endringstype": null
		};

		familie[PERSONNAVN] = navnObject;
	},

	"settMidlertidigPostadresse" : (valg: Valg, midlertidigPostadresseEgendefinertValue: object) => {
		if (valg === Valg.Default){
			brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
		} else if (valg === Valg.Egendefinert){
			brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
		} else {
			brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
		}
	},

	"settTelefonnummer" : (telefonnummer: string | null) => {
		if (typeof telefonnummer === "undefined") {
			throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).")
		}
		telefon[VERDI] = telefonnummer;
	},

	"settBankkontonummer" : (bankkontonummer: string | null) => {

		if (bankkontonummer !== null){
			brukerprofil[PERSON][BANKKONTO] = { "bankkonto" : { "bankkontonummer": bankkontonummer} }
		} else {
			brukerprofil[PERSON][BANKKONTO] = null;
		}
	},

	"settArbeidsforholdMedArbeidsgivernummer" : (startDato: string, sluttDato: string, stillingsProsent: string, arbeidsgiverNummer: string, arbeidsgiverNavn: string ) => {
		const nyttArbeidsForhold: object =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : parseInt(stillingsProsent, 10),
				} ],
				"arbeidsgiver" : {
					"arbeidsgivernummer": arbeidsgiverNummer,
					"navn": arbeidsgiverNavn
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	"settArbeidsforholdMedIdent" : (startDato: string, sluttDato: string, stillingsProsent: string, ident: string ) => {
		const nyttArbeidsForhold: object =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : stillingsProsent
				} ],
				"arbeidsgiver" : {
					"ident": {
						"ident": ident
					}
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	"settArbeidsforholdMedOrganisasjonsnummer" : ( startDato: string, sluttDato: string, stillingsProsent: string, orgnummer: string ) => {
		const nyttArbeidsForhold: object =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : stillingsProsent
				} ],
				"arbeidsgiver" : {
					"orgnummer" : orgnummer
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);

		const nyOrganisasjon: object =
		{
			"orgnummer": orgnummer,
			"navn": {
			"navnelinje": [
				"Navn på organisasjon."
			]
		},
			"organisasjonDetaljer": null,
			"bestaarAvOrgledd": [],
			"inngaarIJuridiskEnhet": [],
			"virksomhetDetaljer": null
		};
		organisasjon[ORGANISASJON] = nyOrganisasjon;
	},

	"send" : () => {
		settMockData(endpoints.telefon, telefon);
		settMockData(endpoints.familie, familie);
		settMockData(endpoints.brukerprofil, brukerprofil);
		settMockData(endpoints.arbeid, arbeid);
		settMockData(endpoints.organisasjon, organisasjon);

	},

	"NoOp" : () => {
		console.warn(adresser);
		console.warn(arbeid);
		console.warn(familie);
		console.warn(norg);
		console.warn(organisasjon);
		console.warn(utbetaling);
		console.warn(midlertidigPostadresse);
	}
};

