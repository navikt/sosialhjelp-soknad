import endpoints from "./endpoints.json";
import {clearMockData, settMockData} from "./mockRestUtils";

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

let harSystemregistrertTelefonnummer: boolean = false;

const PERSON: string = "person";
const MIDLERTIDIGPOSTADRESSE: string = "midlertidigPostadresse";
const BANKKONTO: string = "bankkonto";
const VERDI: string = "verdi";
const ARBEIDSFORHOLD: string = "arbeidsforhold";
const ORGANISASJON: string = "organisasjon";


export enum Valg {
	Nei = "nei",
	Default = "default",
	Egendefinert = "egendefinert"
}


export const SystemdataMockAPI = {

	"settMidlertidigPostadresse" : (valg: Valg, midlertidigPostadresseEgendefinertValue: object) => {
		if (valg === Valg.Default){
			brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
		} else if (valg === Valg.Egendefinert){
			brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
		} else {
			brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
		}
	},

	"settTelefonnummer" : (harSystemregistrertTelefonnummerInput: boolean, telefonnummer: string) => {
		telefon[VERDI] = telefonnummer;
		harSystemregistrertTelefonnummer = harSystemregistrertTelefonnummerInput;
	},

	"settBankkontonummer" : (harSystemregistrertBankkontonummer: boolean, bankkontonummer: string) => {

		harSystemregistrertBankkontonummer
			? brukerprofil[PERSON][BANKKONTO] = { "bankkonto" : { "bankkontonummer": bankkontonummer} }
			: brukerprofil[PERSON][BANKKONTO] = null;
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
		harSystemregistrertTelefonnummer ? settMockData(endpoints.telefon, telefon) : clearMockData(endpoints.telefon);

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

