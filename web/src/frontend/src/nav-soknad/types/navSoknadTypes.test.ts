import { Soknad } from "./navSoknadTypes";

const soknad: Soknad = {
	soknadId: 1,
	skjemaNummer: "NAV DIGISOS",
	uuid: "0d2c7ea4-5201-4231-9fa0-7608be0c7266",
	brukerBehandlingId: "1000B7FGM",
	behandlingskjedeId: null,
	fakta: [
		{
			faktumId: 1,
			soknadId: 1,
			parrentFaktum: null,
			key: "bolker",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 2,
			soknadId: 1,
			parrentFaktum: null,
			key: "personalia",
			value: null,
			faktumEgenskaper: [
				{
					faktumId: 2,
					soknadId: 1,
					key: "kjonn",
					value: "m",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "erUtenlandskBankkonto",
					value: "true",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "sekundarAdresseGyldigTil",
					value: "2012-11-12",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "statsborgerskapType",
					value: "norsk",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "gjeldendeAdresseGyldigTil",
					value: null,
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "alder",
					value: "54",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "fnr",
					value: "03033321212",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "gjeldendeAdresseType",
					value: "POSTADRESSE",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "sekundarAdresse",
					value: "Poitigatan 55, Nord-Poiti, 1111 Helsinki, Finland, Finland",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "gjeldendeAdresse",
					value: "Grepalida 44B, 0560 Oslo, Norge",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "utenlandskKontoBanknavn",
					value: "Nordea",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "gjeldendeAdresseGyldigFra",
					value: null,
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "utenlandskKontoLand",
					value: "Norge",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "gjeldendeAdresseLandkode",
					value: "NOR",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "kontonummer",
					value: "9876 98 98765",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "sekundarAdresseType",
					value: "MIDLERTIDIG_POSTADRESSE_UTLAND",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "epost",
					value: "test@epost.com",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "statsborgerskap",
					value: "NOR",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "diskresjonskode",
					value: null,
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "sekundarAdresseGyldigFra",
					value: "2017-09-06",
					systemEgenskap: 1
				},
				{
					faktumId: 2,
					soknadId: 1,
					key: "navn",
					value: "Donald D. Mockmann",
					systemEgenskap: 1
				}
			],
			properties: {
				statsborgerskapType: "norsk",
				gjeldendeAdresseLandkode: "NOR",
				statsborgerskap: "NOR",
				utenlandskKontoBanknavn: "Nordea",
				erUtenlandskBankkonto: "true",
				kjonn: "m",
				epost: "test@epost.com",
				sekundarAdresseType: "MIDLERTIDIG_POSTADRESSE_UTLAND",
				gjeldendeAdresse: "Grepalida 44B, 0560 Oslo, Norge",
				fnr: "03033321212",
				alder: "54",
				sekundarAdresseGyldigTil: "2012-11-12",
				utenlandskKontoLand: "Norge",
				kontonummer: "9876 98 98765",
				sekundarAdresse: "Poitigatan 55, Nord-Poiti, 1111 Helsinki, Finland, Finland",
				sekundarAdresseGyldigFra: "2017-09-06",
				gjeldendeAdresseType: "POSTADRESSE",
				diskresjonskode: null,
				navn: "Donald D. Mockmann",
				gjeldendeAdresseGyldigTil: null,
				gjeldendeAdresseGyldigFra: null
			},
			type: "SYSTEMREGISTRERT"
		},
		{
			faktumId: 3,
			soknadId: 1,
			parrentFaktum: null,
			key: "kontakt.kontonummer",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 4,
			soknadId: 1,
			parrentFaktum: null,
			key: "kontakt.telefon",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 5,
			soknadId: 1,
			parrentFaktum: null,
			key: "kontakt.statsborger",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 6,
			soknadId: 1,
			parrentFaktum: null,
			key: "dinsituasjon.jobb",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 7,
			soknadId: 1,
			parrentFaktum: null,
			key: "dinsituasjon.studerer",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 8,
			soknadId: 1,
			parrentFaktum: null,
			key: "familie.sivilstatus",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 9,
			soknadId: 1,
			parrentFaktum: null,
			key: "familie.barn",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 10,
			soknadId: 1,
			parrentFaktum: null,
			key: "begrunnelse.hvorfor",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 11,
			soknadId: 1,
			parrentFaktum: null,
			key: "begrunnelse.hva",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 12,
			soknadId: 1,
			parrentFaktum: null,
			key: "bosituasjon",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 17,
			soknadId: 1,
			parrentFaktum: null,
			key: "inntekt.bostotte",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 18,
			soknadId: 1,
			parrentFaktum: null,
			key: "inntekt.eierandeler",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 19,
			soknadId: 1,
			parrentFaktum: null,
			key: "inntekt.bankinnskudd",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 20,
			soknadId: 1,
			parrentFaktum: null,
			key: "inntekt.inntekter",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 21,
			soknadId: 1,
			parrentFaktum: null,
			key: "utgifter.boutgift",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 22,
			soknadId: 1,
			parrentFaktum: null,
			key: "utgifter.barn",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 23,
			soknadId: 1,
			parrentFaktum: 6,
			key: "dinsituasjon.jobb.true.grad",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 24,
			soknadId: 1,
			parrentFaktum: 7,
			key: "dinsituasjon.studerer.true.grad",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 25,
			soknadId: 1,
			parrentFaktum: 8,
			key: "familie.sivilstatus.gift.navn",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 26,
			soknadId: 1,
			parrentFaktum: 8,
			key: "familie.sivilstatus.gift.fnr",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 27,
			soknadId: 1,
			parrentFaktum: 8,
			key: "familie.sivilstatus.gift.pnr",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 28,
			soknadId: 1,
			parrentFaktum: 8,
			key: "familie.sivilstatus.gift.borsammen",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 29,
			soknadId: 1,
			parrentFaktum: 28,
			key: "familie.sivilstatus.gift.borsammen.false.beskrivelse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 30,
			soknadId: 1,
			parrentFaktum: 9,
			key: "familie.barn.true.navn",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 31,
			soknadId: 1,
			parrentFaktum: 9,
			key: "familie.barn.true.fnr",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 32,
			soknadId: 1,
			parrentFaktum: 9,
			key: "familie.barn.true.pnr",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 33,
			soknadId: 1,
			parrentFaktum: 9,
			key: "familie.barn.true.borsammen",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 34,
			soknadId: 1,
			parrentFaktum: 33,
			key: "familie.barn.true.borsammen.true.grad",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 35,
			soknadId: 1,
			parrentFaktum: 12,
			key: "bosituasjon.annet.botype",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 36,
			soknadId: 1,
			parrentFaktum: 35,
			key: "bosituasjon.annet.botype.institusjon",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 37,
			soknadId: 1,
			parrentFaktum: 35,
			key: "bosituasjon.annet.botype.fengsel",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 38,
			soknadId: 1,
			parrentFaktum: 35,
			key: "bosituasjon.annet.botype.foreldre",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 39,
			soknadId: 1,
			parrentFaktum: 35,
			key: "bosituasjon.annet.botype.krisesenter",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 40,
			soknadId: 1,
			parrentFaktum: 35,
			key: "bosituasjon.annet.botype.venner",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 41,
			soknadId: 1,
			parrentFaktum: 35,
			key: "bosituasjon.annet.botype.familie",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 42,
			soknadId: 1,
			parrentFaktum: 13,
			key: "bosituasjon.barnunder18.true.antall",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 43,
			soknadId: 1,
			parrentFaktum: 14,
			key: "bosituasjon.personover18.true.antall",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 44,
			soknadId: 1,
			parrentFaktum: 17,
			key: "inntekt.bostotte.true.type",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 45,
			soknadId: 1,
			parrentFaktum: 44,
			key: "inntekt.bostotte.true.type.husbanken",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 46,
			soknadId: 1,
			parrentFaktum: 44,
			key: "inntekt.bostotte.true.type.kommunal",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 47,
			soknadId: 1,
			parrentFaktum: 18,
			key: "inntekt.eierandeler.true.type",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 48,
			soknadId: 1,
			parrentFaktum: 47,
			key: "inntekt.eierandeler.true.type.bolig",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 49,
			soknadId: 1,
			parrentFaktum: 47,
			key: "inntekt.eierandeler.true.type.kjoretoy",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 50,
			soknadId: 1,
			parrentFaktum: 47,
			key: "inntekt.eierandeler.type.true.campingvogn",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 51,
			soknadId: 1,
			parrentFaktum: 47,
			key: "inntekt.eierandeler.true.type.fritidseiendom",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 52,
			soknadId: 1,
			parrentFaktum: 47,
			key: "inntekt.eierandeler.true.type.annet",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 53,
			soknadId: 1,
			parrentFaktum: 52,
			key: "inntekt.eierandeler.true.type.annet.true.beskrivelse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 54,
			soknadId: 1,
			parrentFaktum: 19,
			key: "inntekt.bankinnskudd.true.type",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 55,
			soknadId: 1,
			parrentFaktum: 19,
			key: "inntekt.bankinnskudd.true.type.sparekonto",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 56,
			soknadId: 1,
			parrentFaktum: 19,
			key: "inntekt.bankinnskudd.true.type.brukskonto",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 57,
			soknadId: 1,
			parrentFaktum: 19,
			key: "inntekt.bankinnskudd.true.type.livsforsikring",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 58,
			soknadId: 1,
			parrentFaktum: 19,
			key: "inntekt.bankinnskudd.true.type.aksjer",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 59,
			soknadId: 1,
			parrentFaktum: 19,
			key: "inntekt.bankinnskudd.true.type.annet",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 60,
			soknadId: 1,
			parrentFaktum: 59,
			key: "inntekt.bankinnskudd.true.type.annet.true.beskrivelse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 61,
			soknadId: 1,
			parrentFaktum: 20,
			key: "inntekt.inntekter.true.type",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 62,
			soknadId: 1,
			parrentFaktum: 61,
			key: "inntekt.inntekter.true.type.utbytte",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 63,
			soknadId: 1,
			parrentFaktum: 61,
			key: "inntekt.inntekter.true.type.salg",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 64,
			soknadId: 1,
			parrentFaktum: 61,
			key: "inntekt.inntekter.true.type.leieinntekter",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 65,
			soknadId: 1,
			parrentFaktum: 61,
			key: "inntekt.inntekter.true.type.forsikringsutbetalinger",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 66,
			soknadId: 1,
			parrentFaktum: 61,
			key: "inntekt.inntekter.true.type.annet",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 67,
			soknadId: 1,
			parrentFaktum: 66,
			key: "inntekt.inntekter.true.type.annet.true.beskrivelse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 68,
			soknadId: 1,
			parrentFaktum: 21,
			key: "utgifter.boutgift.true.type",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 69,
			soknadId: 1,
			parrentFaktum: 68,
			key: "utgifter.boutgift.true.type.husleie",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 70,
			soknadId: 1,
			parrentFaktum: 68,
			key: "utgifter.boutgift.true.type.strom",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 71,
			soknadId: 1,
			parrentFaktum: 68,
			key: "utgifter.boutgift.true.type.kommunaleavgifter",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 72,
			soknadId: 1,
			parrentFaktum: 68,
			key: "utgifter.boutgift.true.type.oppvarming",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 73,
			soknadId: 1,
			parrentFaktum: 68,
			key: "utgifter.boutgift.true.type.avdraglaan",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 74,
			soknadId: 1,
			parrentFaktum: 68,
			key: "utgifter.boutgift.true.type.andreutgifter",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 75,
			soknadId: 1,
			parrentFaktum: 74,
			key: "utgifter.boutgift.true.type.andreutgifter.true.beskrivelse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 76,
			soknadId: 1,
			parrentFaktum: 22,
			key: "utgifter.barn.true.utgifter",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 77,
			soknadId: 1,
			parrentFaktum: 76,
			key: "utgifter.barn.true.utgifter.fritidsaktivitet",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 78,
			soknadId: 1,
			parrentFaktum: 76,
			key: "utgifter.barn.true.utgifter.barnehage",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 79,
			soknadId: 1,
			parrentFaktum: 76,
			key: "utgifter.barn.true.utgifter.tannbehandling",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 80,
			soknadId: 1,
			parrentFaktum: 76,
			key: "utgifter.barn.true.utgifter.helse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 81,
			soknadId: 1,
			parrentFaktum: 76,
			key: "utgifter.barn.true.utgifter.annet",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		},
		{
			faktumId: 82,
			soknadId: 1,
			parrentFaktum: 81,
			key: "utgifter.barn.true.utgifter.annet.true.beskrivelse",
			value: null,
			faktumEgenskaper: [],
			properties: {},
			type: "BRUKERREGISTRERT"
		}
	],
	status: "UNDER_ARBEID",
	aktoerId: "01011045454",
	opprettetDato: "2017-09-06T14:09:36.152Z",
	sistLagret: "2017-09-06T14:09:36.188Z",
	delstegStatus: "OPPRETTET",
	vedlegg: [],
	journalforendeEnhet: null,
	soknadPrefix: "soknadsosialhjelp",
	soknadUrl: "http://127.0.0.1:8189/soknadsosialhjelp/app",
	fortsettSoknadUrl: "http://127.0.0.1:8189/soknadsosialhjelp/app",
	stegliste: [
		{
			url: "informasjonsside",
			cmstekst: "veiledning"
		},
		{
			url: "soknad",
			cmstekst: "skjema"
		},
		{
			url: "vedlegg",
			cmstekst: "vedlegg"
		},
		{
			url: "oppsummering",
			cmstekst: "sendInn"
		}
	],
	sprak: "nb_NO",
	ikkeInnsendteVedlegg: [],
	opplastedeVedlegg: [],
	innsendteVedlegg: []
};

describe("soknad types", () => {

	it("should have types checked", () => {

		function prosesserSoknad(soknad: Soknad) {
			return soknad;
		}

		expect(prosesserSoknad(soknad).brukerBehandlingId).toEqual("1000B7FGM");
	});

});
