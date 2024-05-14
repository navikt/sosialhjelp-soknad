type NorgEnhetsinformasjon = {
    enhetId: number;
    navn: string;
    enhetNr: string;
    antallRessurser: number;
    status: string;
    orgNivaa: string;
    type: string;
    organisasjonsnummer: string;
    underEtableringDato: string;
    aktiveringsdato: string;
    underAvviklingDato?: string;
    nedleggelsesdato?: string;
    oppgavebehandler: true;
    versjon: number;
    sosialeTjenester: string;
    kanalstrategi?: string;
    orgNrTilKommunaltNavKontor: string;
};

type NorgKontaktinformasjon = {
    id: number;
    enhetNr: string;
    telefonnummer: string;
    telefonnummerKommentar?: string;
    faksnummer?: string;
    epost?: {
        adresse: string;
        kommentar: string;
        kunIntern: boolean;
    };
    postadresse: {
        postnummer: string;
        poststed: string;
        type: string;
    };
    besoeksadresse: {
        postnummer: string;
        poststed: string;
        gatenavn: string;
        husnummer: string;
        husbokstav?: string;
        adresseTilleggsnavn?: string;
    };
    spesielleOpplysninger: string;
    publikumsmottak: [
        {
            id: number;
            besoeksadresse: {
                postnummer: string;
                poststed: string;
                gatenavn: string;
                husnummer: string;
                husbokstav?: string;
                adresseTilleggsnavn?: string;
            };
            aapningstider: {
                id: number;
                dag: string;
                dato?: string;
                fra: string;
                til: string;
                kommentar?: string;
                stengt: boolean;
            }[];
            stedsbeskrivelse?: string;
        },
    ];
};
const kontakt: NorgKontaktinformasjon = {
    id: 100000681,
    enhetNr: "0312",
    telefonnummer: "55553333",
    postadresse: {
        type: "postboksadresse",
        postnummer: "0614",
        poststed: "OSLO",
    },
    besoeksadresse: {
        postnummer: "0271",
        poststed: "OSLO",
        gatenavn: "Drammensveien",
        husnummer: "60",
    },
    spesielleOpplysninger:
        "Informasjon i forbindelse med korona-situasjonen: Vi oppfordrer alle til å benytte våre skriftlige kanaler på nav.no fremfor å oppsøke NAV-kontorene.  På nav.no kan du søke om økonomisk sosialhjelp, dagpenger og andre ytelser fra NAV. Begrens besøkene dine til NAV–kontoret med mindre det er helt nødvendig for deg\n\nDersom du skal søke om dagpenger fordi du har blitt permittert eller arbeidsledig, må du først registrere deg som arbeidssøker på nav.no. Deretter kan du søke om dagpenger på nav.no: https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering",
    publikumsmottak: [
        {
            id: 100000523,
            besoeksadresse: {
                postnummer: "0271",
                poststed: "OSLO",
                gatenavn: "Drammensveien",
                husnummer: "60",
            },
            aapningstider: [
                {
                    id: 100001770,
                    dag: "Mandag",
                    fra: "10:00",
                    til: "14:00",
                    stengt: false,
                },
                {
                    id: 100001771,
                    dag: "Tirsdag",
                    fra: "10:00",
                    til: "14:00",
                    stengt: false,
                },
                {
                    id: 100001772,
                    dag: "Onsdag",
                    fra: "10:00",
                    til: "14:00",
                    stengt: false,
                },
                {
                    id: 100001773,
                    dag: "Torsdag",
                    fra: "10:00",
                    til: "14:00",
                    stengt: false,
                },
                {
                    id: 100001774,
                    dag: "Fredag",
                    fra: "10:00",
                    til: "14:00",
                    stengt: false,
                },
            ],
        },
    ],
};

const enhet: NorgEnhetsinformasjon = {
    enhetId: 100000046,
    navn: "NAV Frogner",
    enhetNr: "0312",
    antallRessurser: 0,
    status: "Aktiv",
    orgNivaa: "EN",
    type: "LOKAL",
    organisasjonsnummer: "991381163",
    underEtableringDato: "1970-01-01",
    aktiveringsdato: "1970-01-01",
    oppgavebehandler: true,
    versjon: 60,
    sosialeTjenester:
        "--> Kontakt vakttelefon der flykninger fra Ukraina ikke kan sende inn digital søknad på sosial\n\n--> Kontoret har redusert åpningstid pga Korona-viruset: 10 - 14, dette gjelder kun brukere med absolutt akutt hjelpebehov.\n \nOppfølging og timeavtaler vil kunne bli gjennomført pr telefon.\nVed behov for akutt nødhjelp mellom 1530 og 0800 kan bruker ta kontakt med kommunenes sosialtjenestevakt (legevakten) på 23487090\n\nVakttelefon for bruk av NKS, krisesentre og andre offentlige etater: 41399130, betjent 0900-15.00. \n------------------------\n\nJobbsenter for unge arbeidssøkere (Jobb-UNG) opptil 30 år: Mandag-torsdag 9 - 12. Ved melding om fravær skal deltakere settes i kontakt med Sissel M Hoff eller Hedda S Høgli. \n\n10 - 1130 torsdag drop-in supplerende stønad,\n9- 1030 fredag drop-in farskapssaker \n\n10 PCer tilgjengelig i V/P som bruker kan benytte til selvbetjening.\n\nNAV Oslo (0300) registrerer Del A for Nav kontorene i Oslo. Spørsmål skal til NAV kontoret.\n\nSosialfaglige henvendelser\nTil saksbehandler. Ingen vakttelefon.\nSosialfaglige tjenester: Gjeldsrådgivning, Flyktningtjenesten, Kommunalt frikort, HOLF (helhetlig oppfølging av lavinntektsfamilier), Vedlikeholdsgruppa (tiltak), Yno (yrkesrettet norskopplæring)\n\nSender post digitalt.\n\nPapirsøknadsskjema finnes på kommunens nettside og i V/P\n\nOslo kommune har en døgnåpen vakttjeneste i Storgata 40, de behandler søknader om akutt nødhjelp når NAV-kontoret er stengt.\n\nSaksbehandlingstider: \nØkonomisk sosialhjelp: 14 dager \nStartlån:                               3mnd.\n\nUtbetaling: \nFast utbetalingsdato: alle dager\nSiste tidspunkt for kjøring: 1300\nVed helg/helligdag utbetales det siste virkedag før \nUtbetalingsmåter nødhjelp: Kronekort/rekvisisjon/kontantkort \nKvalifiseringsstønad og introduksjonsstønad: 28 i mnd",
    orgNrTilKommunaltNavKontor: "874778702",
};

export const useNorgKontaktinformasjon = (_enhetsNr?: string) => {
    return {
        data: {kontakt, enhet},
        loading: false,
        error: false,
    };
};
