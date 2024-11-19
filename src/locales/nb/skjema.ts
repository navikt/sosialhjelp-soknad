export const skjema = {
    aar: "År",
    endre: "Endre",
    forhandsvisning: "Forhåndsvisning",
    forrige: "Forrige",
    forstorr: "Forstørr",
    fremdriftsindikator: "Fremdriftsindikator",
    hoppTilHovedinnhold: "Hopp til hovedinnhold",
    lagreEndring: "Lagre endring",
    lastopp: "Last opp",
    lukk: "Lukk",
    neste: "Neste",
    prosent: "%",
    send: "Send",
    start: "Start",
    adresse: {
        alertstripe: {
            advarsel: {
                fixme: "Din kommune kan ikke ta i mot digitale søknader.",
                utenurl: "{{kommuneNavn}} kommune kan ikke ta i mot digitale søknader.",
                v2: "{{kommuneNavn}} kommune kan ikke ta i mot digitale søknader.<br/>Du kan <lenke>søke på papirskjema</lenke>.",
            },
            feil: {
                fixme: "Vi kan dessverre ikke ta i mot digitale søknader akkurat nå. Søk på papirskjema, eller prøv igjen senere.",
                utenurl:
                    "{{kommuneNavn}} kommune kan dessverre ikke ta i mot digitale søknader akkurat nå. Søk på papirskjema, eller prøv igjen senere.",
                v2: "{{kommuneNavn}} kommune kan dessverre ikke ta i mot digitale søknader akkurat nå. <lenke>Søk på papirskjema</lenke>, eller prøv igjen senere.",
            },
            navKontor: "{{enhetsnavn}}, {{kommunenavn}} kommune.",
            suksess: "Din søknad vil bli sendt til:",
        },
    },
    antallvelger: {
        feilmeldinger: {
            forlite: "Tallet kan ikke være mindre enn {{0}}.",
            forstort: "Tallet kan ikke være større enn {{0}}.",
            tall: "Du må skrive inn et gyldig tall mellom {{0}} og {{1}}.",
        },
    },
    applikasjon: {
        advarsel: {
            gjenopptatt:
                "Vi jobber med å gjøre søknaden bedre, og det kan derfor ha skjedd endringer siden sist du var innlogget. Det betyr at spørsmål og informasjon kan være lagt til eller fjernet.",
        },
        sidetittel: {
            kortnavn: "Søknad",
            stringValue: "Søknad om økonomisk sosialhjelp",
        },
        ukjentfeilunderhentdata: "Det oppstod en feil under informasjonshentingen",
    },
    applikasjonsfeil: {
        dialogtittel: "Feilmelding",
    },
    arbeid: {
        dinsituasjon: {
            annensituasjon: {
                true: {
                    beskrivelse: {
                        feilmelding: "Du må beskrive situasjonen din kort",
                        label: "Beskriv kort",
                    },
                },
                stringValue: "Annen situasjon",
            },
            arbeidsledig: "Jeg er arbeidsledig",
            feilmelding: "Du må oppgi hva din situasjon er",
            jobb: "Jeg er jobb",
            sporsmal: "Hva er din situasjon?",
            student: {
                true: {
                    heltid: {
                        false: {
                            hjelpetekst: {
                                tekst: "Dette er en hjelpetekst som skal være med",
                            },
                            stringValue: "Deltid",
                        },
                        feilmelding: "Du må oppgi om du studerer på hel eller deltid",
                        sporsmal: "Studerer du?",
                        true: "Heltid",
                    },
                },
                stringValue: "Jeg er student",
            },
            studerer: {
                undertittel: "Utdanning",
            },
        },
    },
    arbeidbolk: {
        tittel: "Arbeid og utdanning",
    },
    arbeidsforhold: {
        arbeidsgivernavn: {
            label: "Arbeidsgiver",
        },
        fom: {
            label: "Startet i jobben",
        },
        infotekst_del1: "For de siste tre månedene:",
        infotekst_del2: "(Hentet fra Arbeidsgiver- og arbeidstakerregisteret)",
        ingen: "Vi finner ingen arbeidsforhold for de siste tre månedene.",
        kommentar: {
            placeholder: "Ikke oppgi helseopplysninger eller andre sensitive personopplysninger",
        },
        sporsmal: "Dine arbeidsforhold",
        stillingsprosent: {
            label: "Stillingsprosent",
        },
        stillingstype: {
            label: "Stillingstype",
        },
        tom: {
            label: "Sluttet i jobben",
        },
    },
    autocomplete: {
        husnummer: "Hvis du har husnummer må du legge til det (før kommaet).",
        ugyldig: "Adressen er ugyldig. Vennligst skriv inn en gyldig gateadresse.",
    },
    avbryt: {
        avbryt: "Avbryt",
        forklaring:
            "Søknaden din er lagret frem til nå, og du kan velge å fortsette innsendingen senere. Søknaden blir bare lagret i to uker før den blir slettet. Hvis du velger å slette søknaden nå, blir  alle opplysningene slettet.",
        fortsettsenere: "Fortsett senere",
        ja: "Ja",
        lenkenavn: "Tilbake til ditt Nav",
        navigasjon: {
            forklaring:
                "Før du avbryter søknaden må du velge om du ønsker at vi beholder søknaden lagret så du kan fortsette senere, eller om du vil slette alt innhold i søknaden. Vær oppmerksom på at søknaden lagres i to uker før den blir slettet hvis du velger å fullføre innsendingen senere.",
            overskrift: "Viktig å vite",
            tekst: "Hvis du avbryter søknaden, så vil ikke opplysningene bli lagret, og det du har fylt ut til nå vil bli slettet.",
            uthevet: {
                tekst: "Er du sikker på at du vil avbryte søknaden?",
            },
        },
        nei: "Nei",
        overskrift: "Viktig å vite",
        slett: "Slett søknaden",
        soknad: "Slett søknaden",
        soknadslettet: {
            tekst: "Søknaden og alle dokument er slettet. For å starte en ny søknad må du gå tilbake til skjemaer på Min Side.",
            tittel: "Søknaden er slettet",
        },
        tekst: "Avbryter du søknaden du har begynt på blir den ikke lagret og det du har fylt ut til nå blir slettet.",
        uthevet: {
            tekst: "Er du sikker på at du vil avbryte søknaden?",
        },
    },
    avslag: {
        knapp: "Avslutt og slett søknaden",
        tittel: "Du vil få avslag",
    },
    begrunnelse: {
        annet: {
            beskrivelse: "Hva annet søker du om penger til?",
        },
        hva: {
            description: 'Eksempel på tekst: "Jeg søker om penger til mat, husleie og strøm."',
            descriptionOld: "For eksempel penger til/utgifter for å leve og husleie",
            label: "Hva søker du om?",
            labelOld: "Skriv med stikkord hva du søker om",
        },
        hvorfor: {
            description: "om situasjonen din og hva du søker om.",
            label: "Fortell oss mer",
            labelOld: "Gi en kort begrunnelse for søknaden",
        },
        kategorier: {
            annet: "Annet",
            barn: "Andre utgifter til barn",
            barnehage: "Barnehage og SFO/AKS",
            bolig: "Husleie",
            hoytid: "Høytid og merkedager",
            klaer: "Klær og utstyr",
            label: "Hva søker du om penger til?",
            description:
                "Her er noen utgifter det er vanlig å søke om. Du kan skrive inn andre under “Annet”. Du kan velge flere av kategoriene.",
            lege: "Lege og medisiner",
            mat: "Mat",
            nodhjelp: "Nødhjelp",
            strom: "Strøm og oppvarming",
            tannlege: "Tannlege",
            transport: "Transport",
            fritidsaktiviteter: "Fritidsaktiviteter for barn",
        },
        kort: {
            behov: {
                description: 'Eksempel på tekst: "Jeg søker om penger til livsopphold, husleie og strøm."',
                dokumentasjon: {
                    beskrivelse:
                        "Her kan du laste opp dokumentasjon for det du søker om penger til. Hvis du legger ved dokumentasjon sammen med søknaden din, kan det hjelpe oss med å behandle søknaden raskere.",
                    tittel: "Dokumentasjon",
                },
                oppsummeringstittel: "Ditt behov",
            },
        },
        nødhjelp: {
            beskrivelse: "Nødhjelp kan du søke om hvis du ikke har penger til det mest nødvendige det neste døgnet.",
        },
        underkategorier: {
            nodhjelp: {
                bosted: "Jeg har ikke et sted å bo i natt",
                mat: "Jeg har ikke penger til mat i dag",
                strøm: "Strømmen er stengt, eller stenges i dag eller i morgen",
            },
        },
    },
    begrunnelsebolk: {
        tittel: "Behov",
    },
    bosituasjon: {
        annenBotype: {
            familie: "Bor hos familie",
            fengsel: "Fengsel",
            foreldre: "Bor hos foreldre",
            institusjon: "Institusjon (sykehus, psykiatri eller rusbehandling)",
            krisesenter: "Krisesenter",
            sporsmal: "Vil du utdype?",
            venner: "Bor hos venner",
        },
        annet: "Annen bosituasjon",
        antallpersoner: {
            label: "Antall. Ikke tell med deg selv.",
            sporsmal: "Hvor mange personer bor du sammen med?",
        },
        eier: "Jeg bor i bolig jeg eier selv",
        feilmelding: "Du må oppgi hvordan du bor",
        ingen: "Jeg har ikke noe sted å bo",
        kommunal: "Jeg leier kommunal bolig",
        leier: "Jeg leier privat bolig",
        leierkommunalt: "Jeg leier kommunal bolig",
        leierprivat: "Jeg leier privat bolig",
        sporsmal: "Hvordan bor du?",
        tittel: "Din bosituasjon",
    },
    bosituasjonbolk: {
        tittel: "Bosituasjon",
    },
    dinsituasjon: {
        jobb: {
            sporsmal: "Er du i jobb?",
            true: {
                grad: {
                    deltid: "Deltid",
                    heltid: "Heltid",
                    sporsmal: "Jobber du heltid eller deltid?",
                },
            },
        },
        studerer: {
            grad: {
                deltid: "Deltid",
                heltid: "Heltid",
                sporsmal: "Studerer du heltid eller deltid?",
            },
            hjelpetekst: {
                tekst: "",
            },
            mer: {
                info: {
                    forklaring:
                        "Her kan du svare ja hvis du går på skole eller studerer. Det kan være videregående skole, høyskole, universitet, norskopplæring, grunnskole for voksne eller voksenopplæring.",
                    tittel: "Eksempler på å være elev",
                },
            },
            sporsmal: "Er du skoleelev eller student?",
            true: {
                grad: {
                    deltid: "Ja - Deltid",
                    heltid: "Ja - Heltid",
                },
            },
        },
    },
    faktum: {
        key: {
            grad: {
                label: "Samværsgrad",
            },
        },
    },
    familie: {
        barn: {
            feilmelding: "Du må svare på om du har barn som bor sammen med deg",
            hjelpetekst: {
                tekst: "Oppgi alle barn du har plikt til å forsørge (dekke nødvendige utgifter for). Du har plikt til å forsørge barna dine som er under 18 år, selv om de ikke bor sammen med deg. Hvis du har økonomi til det, må du forsørge barna dine til de er ferdige med videregående skole.",
            },
            sporsmal: "Har du barn som du har plikt til å forsørge?",
            tittel: "Barn",
            true: {
                barn: {
                    borsammen: {
                        sporsmal: "Bor barnet fast sammen med deg?",
                    },
                    deltbosted: {
                        hjelpetekst: {
                            tekst: "Delt bosted betyr at barnet bor fast hos begge foreldrene etter et samlivsbrudd. Da har foreldrene inngått en avtale om delt bosted eller en domstol har bestemt at barnet skal dele bosted mellom foreldrene. Dette innebærer at barnet bor (omtrent) like mye hos hver av foreldrene, og begge må være enige i beslutninger som gjelder barnets hverdag. Delt bosted er ikke det samme som at barnet har samvær med hver av foreldrene halvparten av tiden.",
                        },
                        sporsmal: "Har barnet delt bosted?",
                    },
                    etternavn: {
                        label: "Etternavn",
                    },
                    fjern: "Fjern",
                    fjernalternativtekst: "Fjern barn",
                    fnr: {
                        label: "Fødselsdato (ddmmåååå)",
                    },
                    fornavn: {
                        label: "Fornavn",
                    },
                    grad: {
                        deltid: "Deltid",
                        heltid: "Heltid",
                        hoyretekst: "%",
                        label: "Samværsgrad i prosent (maks 50)",
                        sporsmal: "Hvor mye samvær har du med barnet?",
                    },
                    leggtil: "Legg til barn",
                    mellomnavn: {
                        label: "Mellomnavn",
                    },
                    navn: {
                        label: "Navn",
                    },
                    pnr: {
                        label: "Personnummer",
                    },
                    slett: "Slett informasjon",
                    sporsmal: "Opplysninger om barn",
                },
                barnebidrag: {
                    begge: "Jeg betaler og mottar barnebidrag",
                    betaler: "Jeg betaler barnebidrag",
                    ingen: "Nei",
                    mottar: "Jeg mottar barnebidrag",
                    sporsmal: "Mottar eller betaler du barnebidrag for ett eller flere av barna?",
                },
                listetittel: "Opplysninger om barn",
            },
        },
        sivilstatus: {
            enke: "Enke/enkemann",
            feilmelding: "Du må oppgi hva din sivilstatus er",
            gift: {
                borsammen: {
                    false: {
                        beskrivelse: {
                            label: "Beskriv hvorfor",
                        },
                    },
                    sporsmal: "Folkeregistrert på samme adresse",
                },
                ektefelle: {
                    borsammen: {
                        sporsmal: "Bor du sammen med ektefellen din?",
                    },
                    etternavn: {
                        label: "Etternavn",
                    },
                    fnr: {
                        label: "Fødselsdato (ddmmåååå)",
                    },
                    fornavn: {
                        label: "Fornavn",
                    },
                    ikkesammenbeskrivelse: {
                        label: "Beskriv situasjonen din",
                    },
                    mellomnavn: {
                        label: "Mellomnavn",
                    },
                    navn: {
                        label: "Navn",
                    },
                    pnr: {
                        label: "Personnummer (5 siffer)",
                    },
                    sporsmal: "Opplysninger om ektefellen din",
                },
                fnr: {
                    label: "Fødselsnummer (ddmmåååå)",
                },
                navn: {
                    label: "Navn",
                },
                pnr: {
                    label: "Personnummer",
                },
                sporsmal: "Opplysninger om ektefelle",
                stringValue: "Gift/registrert partner",
            },
            samboer: "Samboer",
            separert: "Separert",
            skilt: "Skilt",
            sporsmal: "Hva er sivilstatusen din?",
            ugift: "Ugift",
        },
    },
    familiebolk: {
        tittel: "Familiesituasjon",
    },
    familierelasjon: {
        bor_sammen: "Bor barnet hos deg?",
        delt: {
            samvaer: {
                sporsmal: "Har {{navnString}} delt bosted?",
            },
        },
        faktum: {
            lagttil: "Barn du har registrert selv",
            leggtil: {
                hjelpetekst: {
                    tekst: "Du kan legge til barn du forsørger som vi ikke har hentet informasjon om. Dette kan for eksempel være barn over 18 år som går på videregående skole eller fosterbarn.",
                },
                sporsmal: "Legg til barn vi ikke har registrert",
            },
            sporsmal: "Barn du forsørger",
        },
        fodselsdato: "Fødselsdato",
        hentet_fra_folkeregisteret: "(Hentet fra Folkeregisteret)",
        ingen_registrerte_barn:
            "<p>\n    Vi har hentet følgende opplysninger fra Folkeregisteret:\n</p>\n<p>\n    <b>Du har ingen registrerte barn under 18 år.</b>\n</p>",
        ingen_registrerte_barn_tekst: "Du har ingen registrerte barn under 18 år.",
        ingen_registrerte_barn_tittel: "Vi har hentet følgende opplysninger fra Folkeregisteret:",
        ingress: {
            antallBarn_one: "{{count}} barn under 18 år",
            antallBarn_other: "{{count}} barn under 18 år",
        },
        ingress_folkeregisteret: "Vi har hentet følgende opplysninger fra Folkeregisteret:",
        ingress_forsorger: "Vi har registrert at du har forsørgeransvar for:",
        samme_folkeregistrerte_adresse: "Folkeregistrert på samme adresse",
        samvaer: {
            sporsmal: "Hvor mye samvær har du med barnet?",
        },
    },
    feilmelding: {
        boks: {
            overskrift: "Du må besvare:",
        },
        generelt: "Vennligst prøv igjen senere",
        innsending: {
            number1:
                "Alt du har gjort er lagret, men søknaden er ikke innsendt. Du må sende inn søknad på nytt senere. Du kan få en lenke til søknaden til din e-post:",
            number2: "Du kan også finne søknaden ved å gå til",
        },
        lenketekst: "Til Min Side",
        maks500tegn: "Du kan maks skrive 500 tegn",
        mineinnsedinger: {
            lenketekst: "Mine innsendinger",
        },
        tps: "Navs system for persondata er dessverre ikke tilgjengelig. Vi anbefaler at du prøver igjen senere.",
        stringValue: "Oops, noe gikk galt",
    },
    feilside: {
        feilkode: "Feilkode",
        ikkefunnet: {
            feilmelding: "Om det gjelder en ferdig innsendt/slettet søknad, <lenke>returner til startsiden</lenke>.",
            returner: {
                knapp: "Gå til startside sosialhjelp",
            },
            tittel: "Side ikke funnet",
        },
        lenke: {
            meldfra: {
                tekst: "Meld fra om feil",
            },
            minside: {
                teskt: "Gå til Min Side",
            },
            nav: {
                tekst: "Gå til nav.no",
            },
        },
        number404: {
            fantIkkeSide: "Vi fant ikke siden du prøvde å åpne.",
        },
        serverfeil: {
            beklager: "Vi beklager!",
            feilmelding:
                "Beklager, vi har tekniske problemer. Søknad om økonomisk sosialhjelp er ikke mulig å gjennomføre. Vi anbefaler at du prøver på nytt igjen litt senere.",
            informasjon: {
                ikkeLagret:
                    "Søknaden er opprettet, men det er ikke lagret noen svar på søknaden. Du kan fortsette på søknaden din senere.",
                stringValue: "Søknaden er sist lagret {{0}} og du kan fortsette på søknaden din senere.",
            },
            knapp: "Kontakt Nav-Kontoret ditt",
            lenke: {
                meldfra: "Send feilrapport",
                minside: "Gå til Min Side",
                nav: "Gå til nav.no",
            },
            loggUt: "Logg ut",
            loggfort: "Hendelsen har blitt loggført og problemet utbedres så fort som mulig.",
            nodsituasjon: {
                tekst: "Hvis du ikke har penger til det aller mest nødvendige som mat, må du kontakte Nav-kontoret ditt.\n\nNav skal også hjelpe deg med å finne et midlertidig botilbud hvis du ikke har et sted å sove eller oppholde deg det nærmeste døgnet.",
                tittel: "Trenger du rask hjelp?",
            },
            opprett: {
                informasjon:
                    "Noe gikk galt så vi ikke kunne opprette søknaden. Du kan prøve igjen nå, eller vente til senere.",
            },
            papir: "Du kan også <lenke>søke om økonomisk sosialhjelp på papir</lenke> hos ditt Nav-kontor.",
            prov: {
                igjen: "Vi anbefaler at du prøver på nytt.",
            },
            provIgjen: "Prøv på nytt",
            startside: "Gå til forsiden for sosialhjelp",
            teknisk: {
                feil: "En teknisk feil har oppstått.",
            },
            til: {
                startsiden: "Til startsiden for søknad",
            },
            tittel: "Beklager, vi har en feil hos oss",
        },
        soknadikkefunnet: {
            informasjon:
                "Vi kunne ikke finne søknaden din. Dette kan skyldes feil i systemet eller at søknaden er slettet.",
            tittel: "Oops, noe gikk galt",
        },
    },
    fil: {
        feil: {
            format: "Feil filformat. Du må laste opp en PDF, PNG eller JPG fil.",
            kryptert: "Passordbeskyttet PDF-fil. Du må laste opp filen uten passordbeskyttelse.",
            signert: "Signert PDF-fil. Du må laste opp filen uten signering.",
        },
        for: {
            stor: "Filen er for stor. Maksimal filstørrelse er 10 MB.",
        },
    },
    formue: {
        annetLabel: "Beskriv",
        type: {
            aksjer: "Aksjer, obligasjoner og fond",
            annet: "Annet",
            belop: {
                true: {
                    beskrivelse: {
                        label: "Beskriv",
                    },
                },
                stringValue: "Annet",
            },
            brukskonto: "Brukskonto",
            bsu: "Boligsparing for Ungdom (BSU)",
            hjelpetekst: {
                tekst: "Du må oppgi alle bankkontoer og spareordninger du har både i Norge og i utlandet. Du skal huke av selv om du ikke har penger disponibelt.",
            },
            livsforsikring: "Livsforsikring med sparedel",
            livsforsikringssparedel: "Livsforsikring med sparedel",
            sparekonto: "Sparekonto",
            sporsmal: "Hvilke bankkontoer og spareordninger har du?",
            verdipapirer: "Aksjer, obligasjoner og fond",
        },
    },
    fortsettSenere: {
        epost: {
            label: "Send meg en lenke på e-post (ikke påkrevd)",
            pattern: {
                feilmelding: "E-postadressen er ikke på et gyldig format",
            },
            required: {
                feilmelding: "Du må skrive inn en e-postadresse",
            },
            send: "Send",
        },
        fortsettlink: "Fortsett på søknad",
        info: "Alt du har gjort er lagret, men søknaden er ikke sendt til Nav. Du kan fortsette innsendingen senere ved å logge deg inn på Min Side. Vi kan også sende deg en e-post som gir deg en lenke tilbake til innsendingen.",
        kvittering: {
            inngangsportenlink: "Inngangsporten",
            sendpaanyttlink: "Send epost på nytt",
            tekst: "Vi har sendt en e-post til følgende adresse:",
            tittel: "E-post er sendt",
        },
        lastoppvedlegglink: "Last opp",
        oppsummeringlinktekst: "Til oppsummering",
        sendEpost: {
            epostInnhold:
                "Du har valgt å fortsette innsending av søknaden senere. Det kan du gjøre fra denne lenken: {{0}} . Søknaden er ikke sendt til Nav. Søknader du har begynt på, men ikke sendt inn, blir automatisk slettet hvis du ikke har gjort noe med dem på mer enn åtte uker. Med vennlig hilsen Nav",
            epostTittel: "Lenke til påbegynt søknad",
        },
        sidetittel: "Fortsett innsendingen senere - www.nav.no",
        tilbake: "Tilbake til innsendingen",
        tittel: "Fortsett innsendingen senere",
        stringValue: "Fortsett søknaden senere",
    },
    generelt: {
        kommune: "kommune",
        merinfo: "Mer informasjon",
    },
    hjelpetekst: {
        oppsummering: {
            tittel: "Hjelpetekst:",
        },
        tekst: {
            skjult: "? Hjelpetekst",
        },
    },
    hvormye: {
        faktum: {
            sporsmal: "Hvor mye samvær har du med barnet?",
        },
    },
    ikkefunnet: {
        informasjon: "Skjemaet du etterspurte ble ikke funnet i våre systemer.",
        tittel: "Skjema ikke funnet",
    },
    informasjon: {
        hilsen: {
            hei: "Hei {{fornavn}}",
            tittel: "Her får du informasjon som kan være nyttig å lese før du starter på søknaden.",
        },
        husbanken: {
            bostotte: {
                url: "https://husbanken.no/bostotte",
                v2: "Bostøtte fra Husbanken er en statlig støtteordning for de som har lave inntekter og høye boutgifter. Bostøtte skal bidra til å betale boutgifter. Du har svart at du har boutgifter, men mottar ikke bostøtte. Vi anbefaler deg å sjekke om du kan få <lenke>støtte fra Husbanken</lenke>.",
                stringValue:
                    'Bostøtte fra Husbanken er en statlig støtteordning for de som har lave inntekter og høye boutgifter. Bostøtte skal bidra til å betale boutgifter. Du har svart at du har boutgifter, men mottar ikke bostøtte. Vi anbefaler deg å sjekke om du kan få <a href="https://husbanken.no/bostotte"  target="_blank" rel="noreferrer noopener">støtte fra Husbanken</lenke>.',
            },
        },
        samtykke: {
            bostotte_samtykke: "Husbanken",
            info_del1: "Da du startet søknaden valgte du å hente informasjon fra",
            info_del2:
                "Det kan ha skjedd endringer i disse opplysningene og vi kan oppdatere dem for deg. Hvis du vil kan du slette opplysningene før du sender søknaden.",
            knapp: "Fortsett søknad",
            skatteetaten_samtykke: "Skatteetaten",
            sporsmal: "Oppdater opplysningene fra",
        },
        student: {
            studielan: {
                number1: {
                    v2: "Økonomisk sosialhjelp skal i utgangspunktet ikke finansiere høyere utdanning. Sjekk om du kan søke om lån og stipend på <lenke>lanekassen.no</lenke>.",
                },
                number2:
                    "Det finnes noen unntak der du kan ha rett til økonomisk sosialhjelp. Dette kan være hvis du har et midlertidig behov for hjelp før du har fått utbetalingen fra Lånekassen, eller i en nødsituasjon. Ta kontakt med Nav-kontoret ditt for å få avklart behovet ditt, og for å få opplysning, råd og veiledning.",
                tittel: "Informasjon til deg som er student",
                url: "https://lanekassen.no",
            },
        },
        svarpasoknad: {
            tekst: "Kommunene kan ha ulik svartid. Hvis det har gått mer enn én måned fra du søkte, skal du få brev om at saksbehandlingstiden er forlenget. ",
            undertittel: "Når får du svar på søknaden",
        },
        tekster: {
            personopplysninger: {
                ettersendt: {
                    tekst: "Når du sender søknaden går den til oppholdskommunen din. Kommunen har ansvar for å behandle søknaden og lagre opplysningene i sitt kommunale fagsystem.",
                    tittel: "Etter søknaden er sendt",
                },
                fordusender: {
                    tekst: "Opplysningene i søknaden blir lagret hos Nav. Hvis du trykker på «Slett søknaden» før du har sendt søknaden, vil alle opplysningene bli slettet. Dette kan du gjøre når som helst i søknaden.",
                    tittel: "Før du sender søknaden",
                },
                innhenting: {
                    tekst: 'Du fyller selv inn opplysninger i søknaden. I tillegg henter vi opplysninger fra offentlige registre som vi har lov til å hente fra. Eksempler er opplysninger om familie fra Folkeregisteret, opplysninger om arbeidsforhold fra Arbeidstakerregisteret og informasjon om statlige ytelser fra Nav. <br></br><br></br>Dersom du ikke ønsker at vi henter slike opplysninger om deg automatisk, kan du bruke papirskjema for å søke om økonomisk sosialhjelp. Papirskjema kan du laste ned fra <a href="https://nav.no" target="_blank">nav.no</a> eller hente på Nav-kontoret.',
                    tittel: "Innhenting av personopplysninger",
                },
                rettigheter: {
                    lenke: "Les mer om behandling av dine personopplysninger.",
                    tekst: "Du har rett til å få informasjon og innsyn i egne personopplysninger. Hvis opplysninger om deg er feil, ufullstendige eller unødvendige, kan du kreve at opplysningene blir rettet eller supplert.",
                    tittel: "Dine rettigheter",
                },
                sporsmal: "Har du spørsmål om personopplysninger, må du kontakte Nav-kontoret ditt.",
                tittel: "Slik behandler vi personopplysningene dine",
            },
        },
        tittel: "Informasjon forsiden",
    },
    informasjonsside: {
        lestbrosjyre: {
            sporsmal: "Jeg bekrefter at jeg har lest og forstått informasjonen på nav.no/dagpenger",
        },
    },
    infotekst: {
        oppsummering: {
            tittel: "Infotekst:",
        },
    },
    innsendt: {
        dato_tid: "Innsendt {{originalSoknadDato}} kl. {{originalSoknadTid}}",
    },
    inntekt: {
        bankinnskudd: {
            hjelpetekst: {
                tekst: "Du må oppgi alle bankkontoer og spareordninger du har både i Norge og i utlandet. Du skal huke av selv om du ikke har penger disponibelt.",
            },
            infotekst: {
                tekst: "For eksempel brukskonto, BSU, aksjer og fond",
            },
            sporsmal: "Har du bankkontoer og/eller andre spareordninger?",
        },
        bostotte: {
            gi_samtykke: {
                overskrift: "Vil du hente informasjon om du har søkt om eller mottar bostøtte fra Husbanken?",
                tekst: "Disse opplysningene kan være nødvendig for å behandle søknaden. Hvis du ikke ønsker at vi henter denne informasjonen om deg, så kan du laste opp dokumentasjon i siste steg av søknaden.",
                ja: "Ja, hent informasjon",
                nei: "Nei",
            },
            har_gitt_samtykke: "Du har hentet informasjon fra Husbanken",
            husbanken: {
                info: "Du hentet informasjon om saker og utbetalinger fra Husbanken for",
                ingensakerfunnet: "Du har ingen saker registrert hos Husbanken for siste måned.",
                ingenutbetalingerfunnet: "Du har ingen utbetalinger registrert hos Husbanken for siste måned.",
                lenkeText: "Se detaljer hos Husbanken",
                mottaker: {
                    husstand: "Til husstand",
                    kommune: "Til kommune",
                },
                sak: {
                    beskrivelse: "Beskrivelse av vedtak",
                },
                saker: "Saker",
                status: {
                    under_behandling: "Under behandling",
                },
                tittel: "Bostøtte fra Husbanken",
                url: "https://kundeforhold-bostotte.husbanken.no/esoknad-bostotte/",
                utbetalinger: "Utbetalinger",
                vedtaksstatus: {
                    avslag: "Avslag",
                    avvist: "Avvist",
                    innvilget: "Innvilget",
                },
            },
            ikkefunnet: "Du har ingen registrerte utbetalinger eller saker hos Husbanken den siste måneden.",
            infotekst: {
                tekst: "Du har hentet informasjon om saker og utbetalinger fra Husbanken.",
            },
            kontaktproblemer: "Vi fikk ikke hentet opplysninger fra Husbanken",
            mangler_samtykke: "Du har ikke hentet informasjon fra Husbanken",
            nedlasting_feilet:
                "Vi fikk ikke kontakt med Husbanken. Du kan prøve igjen om noen minutter eller laste opp dokumentasjonen selv på det siste steget i søknaden",
            overskrift: "Bostøtte fra Husbanken",
            sak: {
                dato: "Dato",
                status: "Status",
                stringValue: "Sak",
            },
            sakerIkkefunnet: "Du har ingen registrerte saker hos Husbanken den siste måneden.",
            sporsmal: {
                sporsmal: "Har du søkt eller mottatt bostøtte fra Husbanken i løpet av de to siste månedene?",
            },
            ta_bort_samtykke: "Fjern informasjon fra Husbanken",
            tidspunkt: "Informasjonen ble hentet",
            true: {
                type: {
                    husbanken: "Bostøtte fra husbanken",
                    kommunal: "Kommunal bostøtte",
                    sporsmal: "Hvilken støtte mottar du?",
                },
            },
            utbetaling: {
                belop: "Beløp",
                belop_siste_maned: "Beløp siste måned",
                mottaker: "Mottaker",
                sporsmal_manuell: "Hva har du mottatt i bostøtte fra Husbanken?",
                utbetalingsdato: "Utbetalingsdato",
                stringValue: "Utbetaling",
            },
            utbetalingerIkkefunnet: "Du har ingen registrerte utbetalinger hos Husbanken den siste måneden.",
            stringValue: "Bostøtte",
        },
        eierandeler: {
            hjelpetekst: {
                tekst: "Med økonomisk verdi mener vi eiendom eller eiendeler av høyere verdi både i Norge og i utlandet. Vi kan kreve at du selger gjenstander som du ikke trenger i hverdagen, og som kan selges for et beløp av noe størrelse. Personlige eiendeler, som klær og innbo av vanlig standard, kan vi ikke kreve at du selger.",
            },
            infotekst: {
                tekst: "For eksempel bolig eller kjøretøy",
            },
            sporsmal: "Eier du noe med økonomisk verdi?",
            true: {
                type: {
                    annet: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv hva du eier",
                            },
                        },
                        stringValue: "Annet",
                    },
                    bolig: "Bolig",
                    campingvogn: "Campingvogn og/eller båt",
                    fritidseiendom: "Fritidseiendom",
                    kjoretoy: "Kjøretøy",
                    sporsmal: "Hva eier du?",
                },
            },
        },
        inntekter: {
            hjelpetekst: {
                tekst: "Har du fått utbetalt penger i form av utbytte på aksjer, fond, salg av eiendeler eller på andre måter, ønsker vi å vite om dette.",
            },
            lesmer: "Eksempler på utbetalinger",
            sporsmal: "Har du de siste tre månedene fått utbetalt penger som hverken er lønn eller en ytelse fra Nav?",
            tittel: "Andre inntekter",
            true: {
                type: {
                    annen: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv",
                            },
                        },
                        stringValue: "Annet",
                    },
                    annet: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv",
                            },
                        },
                        stringValue: "Annet",
                    },
                    forsikring: "Forsikringsutbetalinger",
                    forsikringsutbetalinger: "Forsikringsutbetalinger",
                    salg: "Salg av eiendom og/eller eiendeler",
                    sporsmal: "Hva har du mottatt?",
                    utbytte: "Utbytte på aksjer, fond eller verdipapirer",
                },
            },
        },
        mottarytelser: {
            feilmelding: "Du må svare på om du mottar ytelser fra Nav",
            sporsmal: "Mottar du ytelser fra Nav?",
        },
        soktytelser: {
            feilmelding: "Du må svare på om du har søkt ytelser i Nav som ikke er ferdigbehandlet",
            sporsmal: "Har du søkt om ytelser i Nav som ikke er ferdigbehandlet?",
        },
        studielan: {
            sporsmal: "Mottar du lån/stipend fra Lånekassen?",
            tittel: "Studielån",
        },
    },
    inntektbolk: {
        tittel: "Inntekt og formue",
    },
    kontakt: {
        adresse: {
            bruker: {
                gateadresse: {
                    label: "Adresse",
                },
                postnummer: {
                    label: "Postnummer",
                },
                poststed: {
                    label: "Poststed",
                },
                sporsmal: "Adresse for søknaden",
            },
        },
        kontonummer: {
            bruker: {
                label: "Hvis dette ikke skal benyttes, legg inn kontonummer",
                stringValue: "Du har oppgitt:",
            },
            description:
                "Kontonummeret du oppgir her vil kun bli brukt til utbetaling av økonomisk sosialhjelp, og oppdateres ikke på Min Side",
            feilmelding: "Kontonummer må fylles ut",
            harikke: {
                sporsmal: "Kontonummer",
                true: "Jeg har ikke en bankkonto jeg kan bruke.",
                stringValue: "Jeg har ikke en bankkonto jeg kan bruke.",
            },
            infotekst: {
                tekst: "Kontonummeret du oppgir her vil kun bli brukt til utbetaling av økonomisk sosialhjelp.",
            },
            ingeninfo: "Ingen opplysninger om bankkonto.",
            kontonummerFelt: "Kontonummeret felt",
            label: "Nytt kontonummer (11 siffer)",
            oppgi: "Oppgi kontonummer",
            sporsmal: "Ditt kontonummer",
        },
        statsborger: {
            feilmelding: "Statsborgerskap må velges",
            hjelpetekst: {
                tekst: "Med nordisk borger menes svensk, dansk, finsk eller islandsk statsborger. Er du EØS borger og ikke tidligere har mottatt sosialhjelp, må du ta kontakt med Nav-kontoret før du søker.",
            },
        },
        system: {
            adresse: {
                adresse: {
                    label: "Adresse",
                },
                bolignummer: {
                    label: "Bolignummer",
                },
                bruksnummer: {
                    label: "Bruksnummer",
                },
                eiendomsnavn: {
                    label: "Eiendomsnavn",
                },
                endreknapp: {
                    label: "Bruk en annen adresse",
                },
                festenummer: {
                    label: "Festenummer",
                },
                gaardsnummer: {
                    label: "Gårdsnummer",
                },
                gatenavn: {
                    label: "Gatenavn",
                },
                husbokstav: {
                    label: "Husbokstav",
                },
                husnummer: {
                    label: "Husnummer",
                },
                kommunenummer: {
                    label: "Kommunenummer",
                },
                postboks: {
                    label: "Postboks",
                },
                postnummer: {
                    label: "Postnummer",
                },
                poststed: {
                    label: "Poststed",
                },
                seksjonsnummer: {
                    label: "Seksjonsnummer",
                },
                sporsmal: "Adresse",
                undernummer: {
                    label: "Undernummer",
                },
                stringValue: "Adresse",
            },
            kontaktinfo: {
                infotekst: {
                    ekstratekst:
                        'Skriv adressen der du bor eller oppholder deg. Hvis du ikke vet adressen kan du skrive adressen til Nav-kontoret i kommunen eller bydelen. <lenke a href="https://www.nav.no/sok-nav-kontor" target="_blank">Søk opp Nav-kontoret.</lenke>',
                },
                sporsmal: "Adresse",
            },
            kontonummer: {
                endreknapp: {
                    label: "Rediger",
                },
                infotekst: {
                    tekst: "Vi har hentet følgende opplysninger fra Min Side:",
                },
                label: "Kontonummer",
                sporsmal: "Kontonummer",
            },
            oppholdsadresse: {
                finnerKontor: "Finner ditt Nav-kontor",
                folkeregistrertAdresse: "Folkeregistrert adresse:",
                hvorOppholder: "Hvilken adresse bor du på?",
                midlertidigAdresse: "Midlertidig adresse på Min Side:",
                soknad: {
                    infotekst: {
                        tekst: "Du må legge inn hvor du oppholder deg for at søknaden skal sendes til riktig Nav-kontor. (Gjelder bare for denne søknaden.)",
                    },
                    sporsmal: "Hvilken adresse bor du på?",
                },
                sporsmal: "Din adresse",
                valg: {
                    feilmelding: "Du må velge oppholdsadresse og Nav-kontor.",
                    folkeregistrert: "Folkeregistrert adresse",
                    midlertidig: "Midlertidig adresse registrert i Navs adresseregister (TPS)",
                    soknad: "Jeg bor på en annen adresse",
                    sporsmal: "Hvilken adresse bor du på?",
                },
                velgKontor: "Adressen ga flere treff på NAV-kontor. Velg ditt lokale kontor.",
                velgMottaker: "Velg NAV-kontor",
            },
            personalia: {
                fnr: "Fødselsnummer",
                fodselsdato: "Fødselsdato",
                infotekst: {
                    tekst: "(Hentet fra Folkeregisteret)",
                },
                navn: "Navn",
                sporsmal: "Personalia",
                statsborgerskap: "Statsborgerskap",
            },
            telefon: {
                endre: "Endre",
                endreknapp: {
                    label: "Rediger",
                },
                label: "Telefonnummer",
                oppgitt: "Du har oppgitt:",
                sporsmal: "Telefonnummer",
            },
            telefoninfo: {
                infotekst: {
                    tekst: "(Hentet fra Kontakt- og reservasjonsregisteret)",
                },
                ingeninfo: "Vi fant ikke et telefonnummer i Kontakt- og reservasjonsregisteret.",
                sporsmal: "Telefonnummer",
            },
        },
        telefon: {
            beskrivelse: "For at vi enkelt skal kunne komme i kontakt med def trenger vi ditt telefonnummer",
            description:
                "Telefonnummeret du oppgir her kan bli brukt til å ta kontakt med deg om søknaden, og oppdateres ikke på Min Side",
            feil: {
                maxLength: "Telefonnummeret er for langt",
                tom: "Telefonnummer må fylles ut",
                ugyldig: "Ikke gyldig telefonnummer",
            },
            feilmelding: "Intet nummer oppgitt",
            infotekst: {
                tekst: "Telefonnummeret du oppgir her kan bli brukt til å ta kontakt med deg om søknaden.",
            },
            label: "Telefonnummer",
            landskode: "Landskode",
            oppgi: "Oppgi telefonnummer",
            sporsmal: "Ditt telefonnummer",
            telefonnummerFelt: "Telefonnummer felt",
            tittel: "Nytt telefonnummer",
        },
        tittel: "Personopplysninger",
    },
    kvittering: {
        dato: "Søknad ble sendt til NAV",
        erSendt: "{{0}} av {{1}} vedlegg ble sendt til NAV {{2}}, klokken {{3}}",
        ikkeInnsendt: {
            tittel: "Følgende vedlegg er ikke sendt",
        },
        informasjonstekst: {
            del1: '<p>Du kan ettersende dokumenter <strong><a href="https://tjenester.nav.no/saksoversikt/app/ettersending" target="_blank">her</lenke>.</strong>  Dersom noe skal sendes til NAV av andre enn deg (lege, arbeidsgiver), må du gi denne personen beskjed om dette, slik at du er sikker på at det blir sendt.</p>',
            del2: "<p>Dersom NAV ikke har mottatt nødvendig dokumentasjon <strong>innen 14 dager</strong>, kan søknaden bli avslått på grunn av manglende opplysninger.</p>",
        },
        innsendt: {
            tittel: "Følgende vedlegg er sendt",
        },
        klokkeslett: "klokken",
        normertbehandlingstid:
            'Her kan du se <a href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV">saksbehandlingstidene</lenke> i fylket ditt.',
        saksbehandling: {
            tekst: "Saksbehandlingstiden varierer fra kommune til kommune. Når vi har behandlet søknaden din, får du et vedtak. Hvis det går mer enn én måned, skal du få et foreløpig svar. Hvis vi mangler dokumentasjon, kan det ta lengre tid før du får svar på søknaden din. Vi anbefaler derfor at du sender dokumentasjon så snart som mulig, og helst innen 14 dager. Du kan også sende dokumentasjon du har fått beskjed om i vedtaket ditt, for eksempel i forbindelse med vilkår eller andre avtaler med NAV. Du kan sende dokumentasjon på Min Side.",
            tittel: "Saksbehandlingstid",
        },
        saksoversikt: {
            informasjon:
                "Du kan følge saken din hos NAV. Fra sakssiden får du mer informasjon om søknaden din og du kan melde fra om endringer som er av betydning for saken.",
            lenke: "Gå til saken",
        },
        samtale: {
            tekst: 'Hvis du søker om økonomisk sosialhjelp, blir du vanligvis innkalt til en samtale med en veileder. Du kan også kontakte NAV-kontoret\nditt og avtale et møte. <a href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote"  target="_blank" rel="noreferrer noopener">Les mer om hvordan et møte foregår.</lenke>',
            tittel: "Samtale med NAV kontoret",
        },
        situasjon: {
            tekst: "Du må gi beskjed hvis den økonomiske situasjonen din endrer seg etter at du har sendt søknaden.",
            tittel: "Hvis situasjonen din endrer seg",
        },
        skrivutknapp: {
            label: "Skriv ut søknaden",
        },
        tekst: {
            post: ", som vil være kontoret som behandler saken din.",
            pre: "Søknaden er sendt til",
        },
        tittel: "Kvittering",
        undertittel: "Søknad om økonomisk sosialhjelp er sendt",
        utskrift: {
            oppsummering: {
                tittel: "Oppsummering av søknaden",
            },
            stringValue: "Skriv ut kvitteringen",
        },
        vedlegg: {
            tittel: "Vedlegg som NAV-kontoret trenger for å behandle søknaden din",
        },
        veienvidere: {
            tittel: "Hva skjer videre nå?",
        },
    },
    matrikkel: {
        gnrbnr: "Gårds- og bruksnummer",
        kommunenr: "Kommunenr",
        mangler: {
            kommune: "Du må velge en kommune før du kan gå videre.",
        },
        sok: {
            placeholder: "Søk etter kommune",
        },
        tekst: "Du har en adressetype som ikke er en gateadresse.",
    },
    maxlength: {
        feilmelding: "Teksten er for lang",
    },
    minlength: {
        feilmelding: "Teksten er for kort",
    },
    modalvindu: {
        lukk: "Lukk modalvindu",
    },
    navytelser: {
        infotekst: {
            tekst: "Vi har registrert følgende opplysninger:",
        },
        sporsmal: "Dine utbetalinger fra NAV",
        tittel: {
            infotekst: {
                tekst: "Vi har registrert følgende opplysninger:",
            },
            sporsmal: "Utbetalte ytelser fra NAV siste måned",
        },
    },
    nedetid: {
        alertstripe: {
            avbryt: "I perioden {{nedetidstart}} – {{nedetidslutt}} kan du ikke sende digital søknad om økonomisk sosialhjelp grunnet teknisk vedlikehold.",
            infoside:
                "Du kan ikke sende digital søknad i perioden {{nedetidstart}} – {{nedetidslutt}} grunnet teknisk vedlikehold. Ta kontakt med ditt lokale NAV-kontor hvis du skal søke om økonomisk sosialhjelp i denne perioden.",
            send: "Du kan ikke sende digital søknad i perioden {{nedetidstart}} – {{nedetidslutt}} grunnet teknisk vedlikehold. Ta kontakt med ditt lokale NAV-kontor hvis du skal søke om økonomisk sosialhjelp i denne perioden.",
        },
    },
    opplasting: {
        avbryt: "Avbryt",
        feilmelding: {
            duplikat: "Dokumentet du lastet opp er et duplikat av et annet dokument. Last opp et annet dokument.",
            feiltype: "Opplasting feilet. Du kan bare laste opp filer av typen JPG, PNG og PDF.",
            konvertering: "Konvertering av dokumentet feilet. Prøv å laste opp dokumentet på nytt.",
            makssider: "Opplasting feilet. Du kan maks laste opp 10 sider",
            maksstorrelse:
                "Opplasting feilet fordi filen var for stor. Du kan kun laste opp filer som har en størrelse mindre enn 10MB",
            manglerVedlegg: "Du må legge til et vedlegg",
            pdf: {
                applepreview:
                    "Dokumentet du lastet opp har ugyldig format fra Mac. Velg først «Arkiv» i menyen til Forhåndsvisning, så «Eksporter …». Velg formatet «JPG» fra nedtrekksmenyen. Deretter kan du laste opp skjemaet igjen fra der du lagret det.",
                kryptert:
                    "Dokumentet du lastet opp er beskyttet med passord. Lagre dokumentet uten passord eller skriv det ut og skann det inn igjen. Last det så opp på nytt igjen.",
            },
        },
        ferdig: "Legg ved søknaden",
        lastopp: "Last opp",
        leggtil: "Legg til",
        slett: {
            siden: "Slett siden",
        },
    },
    opplysninger: {
        arbeid: {
            sporsmal: "Arbeid og utdanning",
        },
        arbeidsituasjon: {
            infotekst: {
                tekst: "Vi har registrert følgende opplysninger:",
            },
            kommentarer: {
                description: 'Eksempel på tekst: "Jeg er arbeidsledig" eller "Jeg jobber 50% hos Arbeidsgiveren AS".',
                label: "Hvis opplysningene ikke stemmer, ber vi deg skrive en kort forklaring om situasjonen din.",
            },
        },
        bosituasjon: {
            eier: {
                sporsmal: "Du har svart at du eier bolig, vi ber derfor om dokumentasjon",
            },
            sporsmal: "Bosituasjon",
        },
        ekstrainfo: {
            sporsmal: "Er det andre utgifter du vil legge til?",
        },
        familiesituasjon: {
            barnebidrag: {
                begge: {
                    betaler: {
                        label: "Betaler",
                    },
                    mottar: {
                        label: "Mottar",
                    },
                    sporsmal: "Hvor mye mottar og betaler du i barnebidrag i måneden?",
                },
            },
            sporsmal: "Familiesituasjon",
        },
        fjern: "Fjern",
        formue: {
            annen: {
                undertittel: "Annen formue",
            },
            bank: {
                undertittel: "Bank",
            },
        },
        generell: {
            sporsmal: "Generell dokumentasjon",
        },
        ikkebesvart: {
            avsnitt1:
                "Vi ser at du ikke har svart på spørsmål om dine utgifter. For at vi skal kunne vurdere søknaden din så raskt som mulig, er det viktig at du gir oss så mange opplysninger som mulig.",
            avsnitt2:
                "Du kan legge ved dokumentasjon sammen med søknaden din, eller levere dette etter du har sendt inn søknaden.",
            melding:
                "Vi ser at du ikke har svart på opplysninger om den økonomiske situasjonen din. For at vi skal kunne behandle søknaden din så raskt som mulig, er det viktig at du gir oss disse opplysningene.",
            tittel: "Manglende økonomiske opplysninger",
        },
        informasjon: {
            avsnitt1: "Her kan du oppgi hva du har av inntekter og utgifter, og legge ved vedlegg til søknaden din.",
            avsnitt2:
                "Du kan legge ved dokumentasjon sammen med søknaden din, eller levere dette etter du har sendt inn søknaden. ",
            lenke: "Trenger du hjelp til å sende dokumentasjon?",
            modal: {
                bolk1: {
                    avsnitt1: "Da kan du gjerne sjekke om dokumentet er under 10 MB, eller er låst med passord.",
                    tittel: "Godtar vi ikke dokumentet du prøver å sende inn?",
                },
                bolk2: {
                    avsnitt1:
                        "Har du dokumentasjon på papir, kan du skanne det og sende det digitalt. Ved å skanne dokumentasjonen blir kvaliteten bedre, slik de er lettere å lese.",
                    avsnitt2:
                        "Med en skanne-app kan du bruke kameraet på mobiltelefonen din til å skanne dokumentasjonen. Du kan samle flere papirsider til ett digitalt vedlegg, for eksempel husleiekontrakten din.",
                    avsnitt3:
                        "Du kan også ta bilde av dokumentasjonen du har på papir med mobiltelefonen din. Bildene kan du legge ved når du sender vedlegg fra mobilen. Hvis du bruker datamaskin, kan du sende bildene til deg selv på e-post først, og så laste de opp på nav.no.",
                    tittel: "Dokumentasjon du har på papir",
                },
                bolk3: {
                    avsnitt1:
                        "Hvis du skal sende dokumentasjon fra en annen nettside, kan du laste ned dokumentet først hvis det er mulig. For eksempel er skattemeldingen og vedtak fra Lånekassen tilgjengelig for nedlastning som PDF. Du bør unngå å ta bilde av PC-skjermen med et kamera.",
                    tittel: "Dokumentasjon fra andre nettsider",
                },
                bolk4: {
                    avsnitt1:
                        "Det er viktig at du sjekker at dokumentasjonen du laster opp er fullstendige og kan leses. Hvis det er vanskelig å lese opplysningene, kan du bli bedt om å sende de på nytt.",
                    tittel: "Sørg for at dokumentasjonen du sender kan leses",
                },
                overskrift: "Trenger du hjelp til å sende dokumentasjon?",
            },
            stringValue:
                'Her skal du oppgi hva du har av inntekter og utgifter. Feltene under er basert på opplysninger du har gitt underveis i søknaden. Det er viktig at du, så langt det er mulig, fyller ut alle opplysninger om den økonomiske situasjonen din og dokumenterer opplysningene. Har du vedlegg på papir kan du skanne dem eller <a href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/ta-bilde-av-vedleggene-med-mobilen" target="_blank">ta bilde av vedleggene med mobiltelefonen din</lenke>. Hvis du ikke har alle vedleggene nå, kan du laste opp det som mangler etter at du har sendt søknaden. Du kan også sende opplysningene i posten eller levere dem på NAV-kontoret ditt.',
        },
        inntekt: {
            bankinnskudd: {
                belop: {
                    leggtil: "Legg til saldo",
                    saldo: {
                        label: "Saldo",
                    },
                    sporsmal: "Hva er saldo på andre bankkontoer eller spareordninger?",
                },
                livsforsikringssparedel: {
                    leggtil: "Legg til saldo",
                    saldo: {
                        label: "Saldo",
                    },
                    sporsmal: "Hva er saldo på din livsforsikring med sparedel?",
                },
                verdipapirer: {
                    saldo: {
                        label: "Saldo",
                    },
                    sporsmal: "Hva er saldo på dine aksjer, obligasjoner eller fond?",
                },
            },
            eierandeler: {
                annet: {
                    sporsmal: "Du har svart at du eier annet av verdi, vi ber deg derfor dokumentere",
                },
                bolig: {
                    sporsmal: "Du har svart at du eier bolig, vi ber deg derfor dokumentere",
                },
                campingvogn: {
                    sporsmal: "Du har svart at du eier campingvogn og/eller båt, vi ber deg derfor dokumentere",
                },
                fritidseiendom: {
                    sporsmal: "Du har svart at du eier fritidseiendom, vi ber deg derfor dokumentere",
                },
                kjoretoy: {
                    sporsmal: "Du har svart at du eier kjøretøy, vi ber deg derfor dokumentere",
                },
            },
            inntekter: {
                annen: {
                    leggtil: "Legg til utbetaling",
                    sporsmal: "Du har svart at du har mottatt andre utbetalinger",
                    sum: {
                        label: "Sum",
                    },
                },
                forsikring: {
                    sporsmal: "Hvor mye har du mottatt i forsikringsutbetalinger?",
                    sum: {
                        label: "Sum",
                    },
                },
            },
            sporsmal: "Inntekt og formue",
            undertittel: "Inntekt",
        },
        leggtil: "Legg til",
        statsborgerskap: {
            nordisk: {
                sporsmal:
                    "Vi ber deg laste opp registreringsbevis/oppholdstillatelse som dokumenterer oppholdet i Norge.",
            },
            sporsmal: "Statsborgerskap",
        },
        utgifter: {
            barn: {
                annenBarneutgift: {
                    sisteregning: {
                        label: "Beløp siste regning",
                    },
                    sporsmal: "Hvilke andre utgifter har du til barn?",
                    type: {
                        label: "Type utgift",
                    },
                },
                barnFritidsaktiviteter: {
                    sisteregning: {
                        label: "Beløp siste regning",
                    },
                    sporsmal: "Hvilke utgifter har du til fritidsaktiviteter for barn?",
                    type: {
                        label: "Beskrivelse av aktivitet",
                    },
                },
                barnTannregulering: {
                    sisteregning: {
                        label: "Beløp siste regning",
                    },
                    sporsmal: "Hvor mye betaler du for tannregulering for barn?",
                },
            },
            boutgift: {
                annenBoutgift: {
                    sisteregning: {
                        label: "Beløp boutgift",
                    },
                    sporsmal: "Hvilke andre boutgifter har du?",
                    type: {
                        label: "Type boutgift",
                    },
                },
                kommunalAvgift: {
                    sisteregning: {
                        label: "Beløp siste regning",
                    },
                    sporsmal: "Hvor mye betaler du i kommunale avgifter?",
                },
            },
            sporsmal: "Utgifter og gjeld",
        },
        vedlegg: {
            alleredelastetopp: "Jeg har levert dokumentet tidligere",
            feil: {
                footer: "Problemet er blitt loggført og vil bli undersøkt.",
                konvertering:
                    "En teknisk feil oppstod ved konvertering av dokumentet ditt til PDF. Vennligst prøv igjen senere, eller forsøk å laste opp i et annet format (vi foreslår PDF)",
                kryptering:
                    "Vi støtter dessverre ikke passordbeskyttede PDF-filer. Vennligst last opp en PDF uten passord (forsøk å åpne den og skrive ut som PDF)",
                retry: "Prøv på nytt",
                tittel: "Beklager, det oppstod en feil",
                ukjent: "En ukjent feil oppstod i behandling av dette dokumentet. Vennligst prøv igjen senere.",
            },
            knapp: {
                tekst: "Last opp",
            },
            ugyldig:
                "Dokumentet du forsøkte å laste opp er ikke i et gyldig filformat eller overskrider 10 MB. Du må laste opp en PDF-, PNG-, eller en JPEG- fil og filen må være under 10 MB.",
            ukjent_feil: "Feil: dokumentet ble ikke lastet opp.",
        },
    },
    opplysningerbolk: {
        tittel: "Dokumentasjon",
    },
    oppsummering: {
        arbeidsforhold: {
            ingen: "Ingen arbeidsforhold",
            permitteringsgrad: "permitteringsgrad",
        },
        barn: {
            tittel: "Barn som det søkes barnetillegg for",
        },
        bekreftOpplysninger:
            "<p>Jeg er kjent med at hvis opplysningene jeg har oppgitt ikke er riktige og fullstendige, kan jeg miste retten til stønad. Jeg er også klar over at jeg må betale tilbake det jeg har fått feilaktig utbetalt, og at jeg kan bli anmeldt politiet. Videre er jeg kjent med og aksepterer at NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</p>",
        bekreftelse: {
            feilmelding: "Du må bekrefte at du er kjent med innholdet i punktet ovenfor",
        },
        bor: "bor i",
        datotil: "til",
        eSoknad: "e-søknad",
        egennaering: {
            arbeidstimerIUken: "Jeg jobber {{0}} timer i uken",
            fordelingAvInntekt: "Fordeling av inntekter fra gårdsbruket",
            gaardsEiere: "Eiere av gårdsbruket",
            typeGaardsbruk: "Type gårdsbruk",
        },
        feilmelding: {
            bekreftmangler: "Du må bekrefte før søknaden kan sendes inn.",
        },
        fodt: "født",
        gatilbake: "Gå tilbake for å endre",
        ikkeutfylt: "Ikke utfylt",
        ingenBarn: "Søker ikke om barnetillegg for noen barn",
        inntekt: "inntekt på",
        seVedlegg: "Se vedlegg",
        send: "Send inn søknad",
        sendesAvAndre: "Noen andre sender det for meg",
        sendesIkke: "Jeg sender det ikke",
        sendesIkkeSendesAvAndre: "Sendes ikke / sendes av andre",
        sendesSenere: "Ettersendes",
        side: "side",
        sideAvTotal: "av",
        sider: "sider",
        systemdataendret: {
            true: "Du bør lese ekstra nøye gjennom søknaden. Det har skjedd endringer i opplysninger vi har hentet inn om deg siden sist. Det kan være nye krav til dokumentasjon.",
        },
        tittel: "Oppsummering",
        vedlegg: {
            dokument: "Dokument lastet opp:",
            ingen: "Ingen dokumentasjon",
            tittel: "Dokumentasjon",
        },
        vedleggAlleredeSendt: "Jeg har sendt det med tidligere søknad",
    },
    organisasjonsnummer: {
        forfaatall: {
            feilmelding: "Organisasjonsnummeret må bestå av 9 sifre",
        },
        format: {
            feilmelding: "Organisasjonsnummeret kan kun bestå av 9 tall",
        },
        leggtil: "Legg til flere organisasjonsnumre",
        slett: "Slett",
    },
    pattern: {
        feilmelding: "Teksten inneholder ugyldige tegn",
    },
    personalia: {
        bosted: {
            oppsummering: "Når du har fylt ut søknaden blir den sendt til",
        },
        bostedsadresse: "Bostedsadresse",
        bydel: {
            default: "Velg bydel",
            label: "I hvilken bydel?",
        },
        co: "c/o:",
        ferdig: "Ferdig med personalia",
        fnr: "Fødselsnummer",
        folkeregistrertadresse: "Folkeregistrert adresse",
        gyldigTil: "Gyldig til:",
        informasjon:
            "For at vi skal kunne sende søknaden din til riktig NAV-kontor, trenger vi å vite hvor du bor eller oppholder deg.",
        ingenadresse: "Du har ikke midlertidig adresse i norge eller utlandet",
        intro: {
            tekst: "Din profil",
            stringValue:
                "NAV har registrert følgende kontaktinformasjon. Hvis den ikke stemmer, kan du legge til en midlertidig adresse i {{0}}. Du kan også legge inn eller endre kontonummer og telefonnummer der.",
        },
        kommune: {
            default: "Velg by",
            label: "I hvilken kommune bor du eller oppholder du deg i?",
        },
        kontonummer: {
            ikkeRegistrert: "Vi har ikke registret kontonummeret ditt, og anbefaler at du legger det inn i Din profil.",
            stringValue: "Kontonummer",
        },
        kvinne: "kvinne",
        mann: "mann",
        midlertidigAdresseNorge: "Midlertidig adresse Norge",
        midlertidigAdresseUtland: "Midlertidig adresse, utland",
        navn: "Navn:",
        postboks: "Postboks",
        tittel: "Personalia",
        utenlandskstatsborger: {
            statsborgerskap: {
                informasjon:
                    "Du er ikke registrert som nordisk statsborger. Hvis du er EØS-borger, må du legge ved registreringsbevis for EØS-borgere. Dette kan du få hos politiet. Er du ikke fra et EØS-land, må du legge ved oppholds- og arbeidstillatelse. Dette får du hos UDI (Utlendingsdirektoratet).",
            },
        },
    },
    personaliabolk: {
        tittel: "Personopplysninger",
    },
    saksoversikt: {
        mottaker: {
            deg: "Deg",
            nav: "NAV",
        },
        soknadsnavn: {
            ettersending: "Ettersendelse av vedlegg for søknad om økonomisk sosialhjelp",
            stringValue: "Søknad om økonomisk sosialhjelp",
        },
        temanavn: "Sosialhjelp",
    },
    select: {
        required: {
            feilmelding: "Du må gi ett svar",
        },
        ugyldig: {
            feilmelding: "Du må velge et element som ligger i listen",
        },
    },
    sendsoknadfeilet: {
        melding:
            "Det oppstod en feil under innsending av søknaden. Du kan lukke denne meldingen og prøve på nytt. Dersom feilen vedvarer, kan du gå tilbake til denne siden og prøve på nytt senere.",
        tittel: "Innsending feilet",
    },
    sendtSoknad: {
        sendEpost: {
            epostInnhold:
                "Du har sendt en søknad til NAV. Hvis du skal ettersende vedlegg til søknaden, kan du bruke denne lenken: {{1}}. Husk at du må ettersende vedlegg innen fristen du har fått. Etter dette behandler vi søknaden med de opplysningene vi har, og du kan få avslag på grunn av manglende opplysninger. Du kan også følge søknaden din i saksoversikten på Min Side, og se når den er ferdig behandlet, se {{0}}. Med vennlig hilsen NAV",
            epostSubject: "Du har sendt en søknad til NAV",
        },
    },
    sistLagret: {
        aldriLagret: "Søknaden er ikke blitt lagret",
        lagret: "Sist lagret",
    },
    situasjon: {
        kategorier: {
            oppsummeringstekst: {
                label: "Du har valgt:",
                resten: "Jeg søker om penger til:",
            },
        },
        kort: {
            dokumentasjon: {
                description: "Her kan du laste opp annen dokumentasjon du tenker er viktig for søknaden.",
                title: "Dokumentasjon",
            },
            endring: {
                description: "For eksempel inntekter, utgifter, familiesituasjon eller bosituasjon.",
                legend: "Har noe i situasjonen din endret seg siden du søkte sist?",
            },
            hvaErEndret: {
                description:
                    "Har noe endret seg siden forrige gang du søkte, eller vil du fortelle mer om hva du søker om penger til?",
                label: "Hva er situasjonen din?",
            },
            tittel: "Inntekter",
        },
        nodsituasjon: {
            oppsummering: "Nødhjelp:",
        },
    },
    skjema: {
        feilmelding: {
            antall: {
                feilmeldinger: "Antall feil i skjemaet:",
            },
            gaatil: {
                forrige: "Forrige feil",
                neste: "Neste feil",
            },
            lukk: {
                aria: "Lukk feilmeldingoversikt",
                stringValue: "Lukk",
            },
        },
        feilmeldinger: {
            feilkode: "Feilkode",
            number404: "Vi fant ikke siden du prøvde å åpne.",
            tilbake: "Tilbake",
            tittel: "OOPS, NOE GIKK GALT",
        },
        ferdig: "Gå videre til vedlegg",
        knapper: {
            avbryt: "Avbryt",
            forrige: "Forrige steg",
            neste: "Neste steg",
            send: "Send søknaden",
        },
        navigering: {
            feil: "Beklager, et teknisk problem oppstod ved innsending. Prøv gjerne igjen.",
        },
        sensitivadvarsel: "Ikke oppgi helseopplysninger eller andre sensitive personopplysninger",
        tittel: "Søknad om økonomisk sosialhjelp",
    },
    slett: {
        informasjon: "Alt du har gjort, vil bli slettet, og søknaden blir ikke sendt til NAV",
        tittel: "Bekreft at du vil slette søknaden",
    },
    slettet: {
        informasjon:
            "Søknaden og alle vedlegg er slettet. Ønsker du å sende søknaden likevel, må du tilbake til skjemaveilederen og starte på nytt.",
        skjemaveileder: "Til skjemaveileder",
        tittel: "Søknaden er slettet",
    },
    soknad: {
        ferdigstilt: "Søknaden er allerede sendt.",
        innsendingFeilet:
            "Vi klarte ikke sende søknaden din, grunnet en midlertidig teknisk feil. Vi ber deg prøve igjen. Søknaden din er lagret og dersom problemet fortsetter kan du forsøke igjen senere. Kontakt ditt NAV-kontor dersom du er i en nødsituasjon.",
    },
    soknadsmottaker: {
        enhetsnavn: {
            label: "NAV-kontor",
        },
        hjelpetekst: {
            ingress:
                "Hvis du oppholder deg på en institusjon, for eksempel på sykehus eller i fengsel, skriv den siste adresse din før du kom til institusjonen.",
            tekst: "Du må oppgi adressen der du bor for at søknaden skal bli sendt til riktig NAV-kontor.",
        },
        infotekst: {
            tekst: "Oppgi adressen der du bor (obligatorisk)",
        },
        kommunenavn: {
            label: "Kommune",
        },
        sporsmal: "Din adresse",
    },
    soknadsmottakerbolk: {
        tittel: "Søknadsmottaker",
    },
    soknadsosialhjelp: {
        ettersending: {
            kvittering: {
                tittel: "Ettersendelse av vedlegg",
            },
        },
        forstesiden: {
            bekreftInfoModal: {
                body: '<h3>Informasjon</h3><p>Når du søker om økonomisk sosialhjelp digitalt, må du gi opplysninger om deg selv slik at NAV-kontoret kan behandle søknaden din. Eksempler på opplysninger er bosituasjon, formue og utgifter.</p><p>I tillegg henter NAV opplysninger fra offentlige registre på vegne av kommunen som skal behandle søknaden din.</p></br><p>Du kan være trygg på at personopplysningene dine blir behandlet på en sikker og riktig måte:</p><ul><li>Vi skal ikke innhente flere opplysninger enn det som er nødvendig.</li><li>NAV har taushetsplikt om alle opplysninger som vi behandler. Hvis offentlige virksomheter eller andre ønsker å få utlevert opplysninger om deg, må de ha hjemmel i lov eller du må gi samtykke til det.</li></ul><h4>Innhenting av personopplysningene dine</h4><p>Du fyller selv inn opplysninger om deg i søknaden din. I tillegg henter vi opplysninger som NAV har i sine registre og som vi har lov til å hente informasjon fra:</p></br><ul><li>Opplysninger om statsborgerskap, adresse og familieforhold fra Folkeregisteret.</li><li>Opplysninger om kontonummer.</li><li>Opplysninger om telefonnummer fra Kontakt- og reservasjonsregisteret.</li><li>Opplysninger om arbeidsforhold fra Arbeidsgiver- og arbeidstakerregisteret.</li><li>Opplysninger om statlige ytelser fra NAV.</li></ul></br><p>Hvis du samtykker i søknaden din, henter vi også opplysninger om skattbare inntekter fra Skatteetaten og opplysninger om bostøtte fra Husbanken.</p><h4>Formålet med å samle inn og bruke personopplysninger</h4><p>Formålet med søknaden er å samle inn tilstrekkelig med opplysninger til at kommunen kan behandle søknaden din om økonomisk sosialhjelp. Opplysninger du gir i den digitale søknaden og opplysninger som blir hentet inn, sendes digitalt fra nav.no til NAV-kontoret ditt. Det blir enklere for deg å søke, og NAV-kontoret ditt mottar søknaden ferdig utfylt med nødvendige vedlegg.</p></br><p>Opplysningene i søknaden din vil bli brukt til å vurdere om du fyller vilkårene for økonomisk sosialhjelp, og skal ikke lagres lenger enn det som er nødvendig ut fra formålet. Hvis ikke opplysningene skal oppbevares etter arkivloven eller andre lover, skal de slettes etter bruk.</p><h4>Lovgrunnlaget</h4><p>Lovgrunnlaget for å samle inn informasjon i forbindelse med søknaden din er lov om sosiale tjenester i Arbeids- og velferdsforvaltningen.</p><h4>Behandlingsansvarlig</h4><p>Det er oppholdskommunen som er ansvarlig for å behandle søknaden og personopplysningene dine.</p></br><p>Ta kontakt med kommunen hvis du har spørsmål om personopplysninger. Kommunen har også et personvernombud du kan kontakte.</p></br><p>Arbeids- og velferdsdirektoratet har ansvaret for nav.no, og er databehandler på vegne av kommunen. Her kan du lese mer om <a href="https://www.nav.no/personvern-sikkerhet-navno" class="lenke" target="_blank" rel="noreferrer noopener">personvern og sikkerhet på nav.no</a>.</p><h4>Lagring av personopplysningene dine</h4><h5>Før du sender søknaden lagres opplysningene på nav.no</h5><p>Søknader som er påbegynt, men ikke fullført, blir lagret hos Arbeids- og velferdsdirektoratet i to uker. Deretter slettes de.</p><h5>Etter du har sendt søknaden har kommunen ansvaret for opplysningene om deg </h5><p>Når du sender søknaden din bruker vi KS (Kommunesektorens organisasjon) sin skytjeneste for digital post (Svarut).  Kommunen henter søknaden din i Svarut og lagrer opplysningene i sitt kommunale fagsystem.  Kommunen din har ansvaret for lagring og sletting av opplysningene dine både i Svarut og i fagsystemet . Arkivloven bestemmer hvor lenge opplysninger skal lagres. Ta kontakt med kommunen din hvis du har spørsmål om lagringstid.</p><h4>Rettigheter som registrert</h4><p>Alle har rett på informasjon om og innsyn i egne personopplysninger etter personopplysningsloven.</p><p>Hvis opplysninger om deg er feil, ufullstendige eller unødvendige, kan du kreve at opplysningene blir rettet eller supplert etter personopplysningsloven. </br>Du kan også i særlige tilfeller be om å få opplysningene slettet. I noen tilfeller har kommunen en lovpålagt plikt til å lagre opplysningene som dokumentasjon. Slike krav skal besvares kostnadsfritt og senest innen 30 dager.</p></br><p>Du har også flere personvernrettigheter, blant annet såkalt <strong>rett til begrensning</strong>: Du kan i noen tilfeller ha rett til å få en begrenset behandling av personopplysningene dine. Hvis du har en slik rett, vil opplysningene bli lagret, men ikke brukt.</p><p>Du har også <strong>rett til å protestere</strong> mot behandling av personopplysninger: Det vil si at du i enkelte tilfeller kan ha rett til å protestere mot kommunens ellers lovlige behandling av personopplysninger. Behandlingen må da stanses, og hvis du får medhold vil opplysningene eventuelt bli slettet.</p></br><p>På nettsidene til Datatilsynet finner du en samlet oversikt over <a href="https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/"  class="lenke" target="_blank" rel="noreferrer noopener">Dine rettigheter</a>. Kommunen din vil også ha informasjon om behandling av personopplysninger på sine nettsider.</p><p>Alle spørsmål du har om behandling av personopplysningene dine må du rette til NAV-kontoret ditt.</p><h4>Klagerett til Datatilsynet</h4><p>Du har rett til å klage til Datatilsynet hvis du ikke er fornøyd med hvordan vi behandler personopplysninger om deg, eller hvis du mener behandlingen er i strid med personvernreglene. Informasjon om <a href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/"  class="lenke" target="_blank" rel="noreferrer noopener">hvordan du klager</a> finner du på nettsidene til Datatilsynet.</p>',
            },
            bekreftOpplysninger: "Jeg bekrefter at jeg har lest og forstått informasjon om samtykke",
            rettigheterPlikter:
                "Søknader som er påbegynt, men ikke fullført, blir lagret på nav.no i to uker. Deretter slettes de.\nLes om dine",
            rettigheterPlikterLinktekst: "personvernrettigheter.",
        },
        oppsummering: {
            bekreftInfoModal: {
                body: "<p>\n    Jeg samtykker til at opplysningene jeg har gitt i denne søknaden, og at opplysninger som blir hentet inn fra andre registre i henhold til gjeldende regelverk kan oversendes til {{kommuneNavn}} kommune ved NAV {{navKontorNavn}}. Dette for at NAV-kontoret skal kunne behandle min søknad om økonomisk sosialhjelp. {{kommuneNavn}} kommune kan ikke utlevere mine opplysninger til andre med mindre jeg har gitt mitt samtykke eller at de har lovhjemmel.\n</p>\n\n<p>\n    Samtykket til å hente inn opplysninger og dele disse med kommunen gjelder kun for behandling av denne søknaden.</p>\n<p>\n    Jeg er informert om at opplysningene lagres i saksbehandlingssystemet til {{kommuneNavn}} kommune ved NAV {{navKontorNavn}}. I tillegg er jeg informert om at jeg kan kreve innsyn i disse opplysningene, samt kreve å få slettet eller rettet opplysninger om meg selv. Jeg er innforstått med at det er frivillig å gi dette samtykket, og at samtykket kan trekkes tilbake når jeg ønsker det. Hvis jeg ønsker å trekke tilbake samtykket, vil jeg henvende meg til {{kommuneNavn}} kommune ved NAV {{navKontorNavn}}.\n</p>\n\n<p>\n    Hvis du ikke ønsker å gi ditt samtykke som beskrevet over, må du henvende deg til ditt lokale NAV-kontor og fylle ut et manuelt søknadskjema.\n</p>",
                title: "Samtykke om personopplysninger for denne søknaden",
            },
            bekreftOpplysninger:
                "Du kan miste retten til stønad hvis opplysningene du gir ikke er riktige eller fullstendige. NAV kan holde igjen eller kreve tilbake penger. Å gi feil opplysninger kan være straffbart.",
            bekreftelse: {
                ny: {
                    label: "Vi stoler på deg",
                },
            },
            harLestSamtykker: "Jeg bekrefter at opplysningene jeg har gitt er riktige.",
            hvorsendes_del1: "Søknaden din sendes til {{valgtEnhetsNavn}}.",
            hvorsendes_del2:
                "NAV-kontoret skal behandle søknaden din så fort som mulig. De tar kontakt hvis de trenger noe fra deg!",
            infoSamtykke: "informasjon om dine personvernrettigheter",
            samtykke: {
                oversendelse: {
                    pdf: "For å begynne med søknaden så må du bekrefte at du har lest og forstått informasjon om samtykke. \nJeg bekrefter at jeg har lest og forstått informasjon om samtykke. \n\nFor å kunne søke om økonomisk sosialhjelp digitalt, er det nødvendig at du samtykker til at de opplysningene som du selv oppgir og opplysninger som blir innhentet etter gjeldende regelverk, kan oversendes til NAV-kontoret i din kommune for endelig saksbehandling. Du vil hele tiden kunne se hvilke opplysninger NAV henter inn i din søknad. Når du har fylt ut søknaden og skal sende denne inn, vil du bli bedt om å godkjenne en samtykkeerklæring for oversendelsen til ditt lokale NAV-kontor. Hvis du allerede nå vet at du ikke ønsker å gi ditt samtykke til å oversende søknaden til ditt lokale NAV-kontor, må du kontakte NAV-kontoret ditt for å fylle ut et manuelt søknadskjema.",
                },
                sannferdig: {
                    pdf: "Jeg samtykker til at opplysningene jeg har gitt i denne søknaden, og at opplysninger som blir hentet inn fra andre registre i henhold til gjeldende regelverk kan oversendes til mitt lokale NAV-kontor. Dette for at NAV-kontoret skal kunne behandle min søknad om økonomisk sosialhjelp. Kommunen kan ikke utlevere mine opplysninger til andre med mindre jeg har gitt mitt samtykke eller at de har lovhjemmel. \n\nSamtykket til å hente inn opplysninger og dele disse med kommunen gjelder kun for behandling av denne søknaden. \n\nJeg er informert om at opplysningene lagres i saksbehandlingssystemet til mitt lokale NAV-kontor. I tillegg er jeg informert om at jeg kan kreve innsyn i disse opplysningene, samt kreve å få slettet eller rettet opplysninger om meg selv. Jeg er innforstått med at det er frivillig å gi dette samtykket, og at samtykket kan trekkes tilbake når jeg ønsker det. Hvis jeg ønsker å trekke tilbake samtykket, vil jeg henvende meg til mitt lokale NAV-kontor.",
                },
            },
        },
        skjema: {
            tittel: "Søknad om økonomisk sosialhjelp",
        },
    },
    stegindikator: {
        aktivt: "Aktivt",
        gjennomfort: "Gjennomført",
        sendInn: "Send inn",
        skjema: "Skjema",
        vedlegg: "Vedlegg",
        veiledning: "Veiledning",
    },
    system: {
        familie: {
            barn: {
                antall: {
                    sporsmal: "Antall registrerte barn under 18 år",
                },
                sporsmal: "Vi har registrert at du har barn",
                tittel: "Barn",
                true: {
                    barn: {
                        deltbosted: {
                            hjelpetekst: {
                                tekst: "Delt bosted betyr at barnet bor fast hos begge foreldrene etter et samlivsbrudd. Da har foreldrene inngått en avtale om delt bosted eller en domstol har bestemt at barnet skal dele bosted mellom foreldrene. Dette innebærer at barnet bor (omtrent) like mye hos hver av foreldrene, og begge må være enige i beslutninger som gjelder barnets hverdag. Delt bosted er ikke det samme som at barnet har samvær med hver av foreldrene halvparten av tiden.",
                            },
                            sporsmal: "Har barnet delt bosted?",
                        },
                        etternavn: {
                            label: "Etternavn",
                        },
                        fodselsdato: {
                            label: "Fødselsdato (ddmmåååå)",
                        },
                        folkeregistrertsammen: {
                            sporsmal: "Barnet Folkeregistrert på samme adresse",
                        },
                        fornavn: {
                            label: "Fornavn",
                        },
                        grad: {
                            label: "Hvor mye samvær har du med barnet?",
                            pattern: "Samværsgrad i %",
                            sporsmal: "Hvor mye samvær har du med barnet?",
                        },
                        mellomnavn: {
                            label: "Mellomnavn",
                        },
                        pattern: "",
                        sporsmal: "Opplysninger om barn",
                    },
                    listetittel: "Opplysninger om barn",
                },
                empty: "Vi fant ingen barn registrert på deg",
            },
            sivilstatus: {
                diskresjonskode: "Ektefelle/partner har diskresjonskode",
                enke: "Enke/enkemann",
                gift: {
                    ektefelle: {
                        etternavn: {
                            label: "Etternavn",
                        },
                        fodselsdato: "Fødselsdato",
                        folkereg: "Folkeregistrert på samme adresse",
                        folkeregistrertsammen: {
                            sporsmal: "Folkeregistrert på samme adresse som ektefelle",
                        },
                        fornavn: {
                            label: "Fornavn",
                        },
                        mellomnavn: {
                            label: "Mellomnavn",
                        },
                        navn: "Navn",
                        tittel: "Opplysninger om ektefelle",
                    },
                    stringValue: "Gift/registrert partner",
                },
                ikkeTilgang: {
                    label: "Du er gift eller registrert partner",
                },
                informasjonspanel: {
                    tekst: "Vi ser på den samlede økonomien deres når vi vurderer søknaden. For å gjøre dette trenger vi opplysninger om situasjonen til ektefellen din. Ektefellen din kan sende inn en egen søknad, eller dere kan ta kontakt med det lokale NAV-kontoret.",
                    tittel: "Ektefeller har plikt til å forsørge hverandre",
                },
                infotekst: "Opplysninger om ektefelle",
                kilde: "Vi har hentet følgende opplysninger fra Folkeregisteret:",
                label: "Du er gift eller registrert partner med:",
                samboer: "Samboer",
                separert: "Separert",
                skilt: "Skilt",
                sporsmal: "Din sivilstatus",
                ugift: "Ugift",
                stringValue: "(Hentet fra Folkeregisteret)",
                empty: "Vi fant ingen registrert ektefelle eller partner",
            },
        },
    },
    systeminfo: {
        avbrytendringknapp: {
            label: "Angre endringer",
        },
    },
    textarea: {
        overmaks: "tegn for mye",
        undermaks: "tegn igjen",
    },
    tilbake: {
        til: {
            soknad: {
                lenke: "Tilbake til søknaden",
            },
            vedlegg: {
                lenke: "Tilbake til vedlegg",
            },
        },
        stringValue: "Tilbake",
    },
    tilleggsopplysninger: {
        tittel: "Tilleggsopplysninger",
    },
    utbetalinger: {
        infotekst: {
            detaljer: "Se detaljer",
            lukk: "Lukk",
            tekst: {
                url: "https://tjenester.nav.no/utbetalingsoversikt",
                v2: "Detaljert informasjon sendes med søknaden. Du kan se detaljene på <lenke>Dine utbetalinger</lenke>.",
            },
        },
        ingen: {
            true: "Vi har ingen registrerte utbetalinger på deg fra NAV den siste måneden.",
        },
        inntekt: {
            fra: "Fra",
            skattbar: {
                avbryt: {
                    ja: "Ja, hent informasjon",
                    nei: "Nei",
                },
                beskrivelse: "Du har hentet informasjon om inntekten din fra Skatteetaten.",
                bruttoinntekt: "Inntekt før skatt",
                forskuddstrekk: "Skattetrekk",
                gi_samtykke: "Hent fra Skatteetaten",
                har_gitt_samtykke: "Du har hentet informasjon fra Skatteetaten",
                hent: {
                    info: {
                        skatteetaten: "Hent informasjonen fra Skatteetaten",
                    },
                },
                ingen: "Du har ingen inntekt registrert hos Skatteetaten for siste måned.",
                inntekt: {
                    tittel: "Inntekt hentet fra Skatteetaten",
                },
                mangler_samtykke: "Du har ikke hentet informasjon fra Skatteetaten",
                nettoinntekt: "Inntekt etter skatt",
                oppsummering:
                    "Vi har registrert at du{ antall, plural,=0 { ikke har hatt }other {har hatt{ antall, plural,=1 {{en}}=2 {{to}}=3 {{tre}}=4 {{fire}}=5 {{fem}}=6 {{seks}}=7 {{sju}}=8 {{åtte}}=9 {{ni}}=10 {{ti}}=11 {{elleve}}=12 {{tolv}}other {{#}}}}}skattbare inntekter.",
                samtykke_info:
                    "Disse opplysningene kan være nødvendig for å behandle søknaden. Hvis du ikke ønsker at vi henter denne informasjonen om deg, så kan du laste opp dokumentasjon i siste steg av søknaden.",
                samtykke_sporsmal_v1: "Vil du hente informasjon om inntekten din fra Skatteetaten?",
                samtykke_sporsmal_v2: "Vil du hente informasjon om inntekten din fra Skatteetaten automatisk?",
                skatteetaten: "Se detaljer hos Skatteetaten.",
                ta_bort_samtykke: "Fjern informasjon fra Skatteetaten",
                tidspunkt: "Informasjonen ble hentet",
                tittel: "Inntekt",
                undertittel: "Innrapportert inntekt til Skatteetaten",
            },
            til: "til",
        },
        kontaktproblemer: "På grunn av systemfeil klarte vi ikke å hente inn informasjon om ytelser fra NAV.",
        skattbar: {
            kontaktproblemer:
                "Vi fikk ikke kontakt med Skatteetaten. Du kan prøve igjen om noen minutter eller laste opp opplysningene selv på det siste steget i søknaden",
        },
        sporsmal: "Ytelser som er utbetalt siste måned",
        utbetaling: {
            andretrekk: {
                label: "Andre trekk",
            },
            arbeidsgivernavn: {
                label: "Arbeidsgivernavn",
            },
            belop: {
                label: "Beløp",
            },
            brutto: {
                label: "Beløp (brutto)",
            },
            erutbetalt: {
                label: "Utbetalt",
                title: "Ytelser fra NAV",
            },
            netto: {
                label: "Beløp (netto)",
            },
            periodeFom: {
                label: "Fra",
            },
            periodeTom: {
                label: "Til",
            },
            skattetrekk: {
                label: "Skattetrekk",
            },
            sporsmal: "Ytelse",
            type: {
                label: "Ytelse",
            },
            utbetalingsdato: {
                label: "Dato",
            },
        },
    },
    utgifter: {
        barn: {
            infotekst: {
                tekst: "For eksempel barnehage, SFO eller fritidsaktiviteter.",
            },
            sporsmal: "Har du utgifter til barn?",
            typer: {
                annet: "Annet",
                barnFritidsaktiviteter: "Fritidsaktiviteter",
                barnTannregulering: "Tannregulering",
                barnehage: "Barnehage",
                fritidsaktivitet: "Fritidsaktiviteter",
                fritidsaktiviteter: "Fritidsaktiviteter",
                helse: "Helse",
                sfo: "SFO (Skolefritidsordning)",
                sporsmal: "Hvilke utgifter er det?",
                tannbehandling: "Tannregulering",
                tannregulering: "Tannregulering",
            },
        },
        boutgift: {
            infotekst: {
                tekst: "For eksempel husleie eller strøm.",
            },
            sporsmal: "Har du utgifter til å bo?",
            true: {
                type: {
                    andreutgifter: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv",
                            },
                        },
                        stringValue: "Andre utgifter",
                    },
                    annenBoutgift: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv",
                            },
                        },
                        stringValue: "Andre utgifter",
                    },
                    avdraglaan: "Avdrag og renter på boliglån",
                    boliglan: "Avdrag og renter på boliglån",
                    boliglanAvdrag: "Avdrag og renter på boliglån",
                    feilmelding: "Du må oppgi hvilke utgifter du har til bolig",
                    husleie: "Husleie",
                    kommunalAvgift: "Kommunale avgifter",
                    kommunaleavgifter: "Kommunale avgifter",
                    oppvarming: "Ved, gass eller fjernvarme",
                    sporsmal: "Hva betaler du for der du bor?",
                    strom: "Strøm",
                },
            },
        },
        tittel: "Dine utgifter og gjeld",
    },
    utgifterbolk: {
        tittel: "Utgifter og gjeld",
    },
    validering: {
        adresseMangler: "Du må velge en gyldig adresse før du kan gå videre",
        erFdato: "Ugyldig dato",
        erFdatoEtterIdag: "Fødselsdato kan ikke være etter dagens dato",
        erKontonummer: "Ugyldig kontonummer",
        erSamvaersgrad: "Samværsgrad må være mellom 0 og 100%",
        erTall: "Ugyldig tall. Du må oppgi et heltall.",
        erTelefonnummer: "Ugyldig telefonnummer",
        feltEksistererIkke:
            "Vi klarte ikke å oppdatere feltet. Det kan være fordi du har gjort endringer i søknaden, vennligst oppdater denne siden og prøv på nytt.",
        filEksistererIkke:
            "Vi klarte ikke å laste opp vedlegget. Det kan være fordi du har gjort endringer i søknaden, vennligst oppdater denne siden og prøv på nytt.",
        maksLengde: "Du har brukt for mange tegn.",
        minLengde: "For få tegn.",
        pakrevd: "Må fylles ut",
        tittel: "Du må fikse disse feilene før du kan fortsette.",
    },
    vedlegg: {
        K7: {
            tittel: "Bekreftelse på samling",
        },
        L7: {
            null: {
                tittel: "Kvittering på innsendt søknad",
            },
        },
        annet: {
            annet: {
                info: "Hvis du har andre vedlegg du ønsker å gi oss, kan de lastes opp her.",
                tittel: "Andre opplysninger",
            },
            beskrivelse: {
                sporsmal: "Hva legger du ved (maks. 25 tegn)?",
            },
            ikkelastetopp: {
                feilmelding: "Du må laste opp vedlegget",
            },
            inlinefeilmelding: "Du må laste opp vedlegget",
            navn: {
                feilmelding: "Du må beskrive vedlegget, og det må inneholde minst tre tegn",
                lengde: {
                    feilmelding: "Beskrivelsen må inneholde minst 3 tegn",
                },
            },
            slett: "Slett",
        },
        barnebidrag: {
            betaler: {
                tittel: "Opplysninger på utgift barnebidrag",
            },
            mottar: {
                tittel: "Opplysninger på mottatt bidrag",
            },
        },
        behandlet: {
            LastetOpp: "Opplastet vedlegg",
            SendesIkke: "Vedlegg sendes ikke",
            SendesSenere: "Vedlegg sendes senere",
            VedleggAlleredeSendt: "Vedlegg sendt tidligere",
            VedleggKreves: "Vedlegg kreves",
            VedleggSendesAvAndre: "Vedlegg sendes av andre",
            VedleggSendesIkke: "Vedlegg sendes ikke",
        },
        dokumentasjon: {
            annetboutgift: {
                tittel: "Opplysninger på andre boutgifter",
            },
            annetinntekter: {
                tittel: "Opplysninger på andre utbetalinger",
            },
            annetverdi: {
                tittel: "Opplysninger på annet av verdi",
            },
            campingvogn: {
                tittel: "Opplysninger på campingvogn og/eller båt",
            },
            forsikringsutbetaling: {
                tittel: "Opplysninger på forsikringsutbetaling",
            },
            fritidseiendom: {
                tittel: "Opplysninger på fritidseiendom",
            },
            kjoretoy: {
                tittel: "Opplysninger på kjøretøy",
            },
            utbytte: {
                tittel: "Opplysninger på utbytte",
            },
        },
        faktura: {
            annetbarnutgift: {
                tittel: "Kvittering/faktura på andre barneutgifter",
            },
            barnehage: {
                tittel: "Kvittering/faktura på barnehage",
            },
            fritidsaktivitet: {
                tittel: "Kvittering/faktura på fritidsaktivitet",
            },
            husleie: {
                tittel: "Kvittering/faktura på husleie",
            },
            kommunaleavgifter: {
                tittel: "Kvittering/faktura på kommunale avgifter",
            },
            oppvarming: {
                tittel: "Kvittering/faktura på oppvarming",
            },
            sfo: {
                tittel: "Kvittering/faktura på SFO",
            },
            strom: {
                tittel: "Kvittering/faktura på strøm",
            },
            tannbehandling: {
                tittel: "Kvittering/faktura på tannregulering",
            },
        },
        ferdig: "Til oppsummering",
        forhandsvisning: {
            avbryt: "Avbryt",
            fullskjerm: {
                lukk: "Lukk fullskjerm",
                stringValue: "Fullskjerm",
            },
            info: "Sørg for at dokumentene er leselige og viser riktig informasjon",
            opplast: "Last opp dokument",
            slett: "Slett",
            tilbake: {
                mobil: "Tilbake",
                stringValue: "Tilbake til forrige side",
            },
        },
        husbanken: {
            vedtak: {
                tittel: "Vedtak bostøtte for siste 2 mnd",
            },
        },
        husleiekontrakt: {
            husleiekontrakt: {
                tittel: "Husleiekontrakt",
            },
            kommunal: {
                tittel: "Husleiekontrakt",
            },
        },
        infoboks: {
            lastopp: "Dokumentene laster du opp senere i søknaden.",
        },
        inlinefeilmelding: "Du må enten laste opp vedlegget eller svare på om du legger det ved senere",
        kjopekontrakt: {
            kjopekontrakt: {
                tittel: "Kjøpekontrakt",
            },
        },
        kontooversikt: {
            aksjer: {
                tittel: "Saldoutskrift fra VPS-konto",
            },
            annet: {
                tittel: "Opplysninger på andre bankinnskudd eller sparing",
            },
            brukskonto: {
                tittel: "Last opp saldoutskrift for brukskonto (på søknadstidspunktet)",
            },
            bsu: {
                tittel: "Saldoutskrift for BSU (på søknadstidspunktet)",
            },
            livsforsikring: {
                tittel: "Last opp opplysninger på livsforsikring",
            },
            sparekonto: {
                tittel: "Saldoutskrift for sparekonto (på søknadstidspunktet)",
            },
        },
        lastned: "Last ned",
        lastopp: "Last opp vedlegget",
        leggtilekstravedlegg: "Legg til ekstra vedlegg",
        leggved: "Du må legge ved følgende:",
        lonnslipp: {
            arbeid: {
                tittel: "Lønnsslipp (siste måned)",
            },
        },
        nedbetalingsplan: {
            avdraglaan: {
                tittel: "Nedbetalingsplan",
            },
        },
        netbetalingsplan: {
            avdraglaan: {
                tittel: "Nedbetalingsplan",
            },
        },
        oppholdstillatel: {
            oppholdstillatel: {
                tittel: "Registreringsbevis eller oppholdstillatelse",
            },
        },
        opplasting: {
            feil: {
                filType: "Opplastingen feilet. Støtter kun JPEG, PNG og PDF filer",
                forStor: "Opplastingen feilet. Total filstørrelse kan ikke overstige {{maxUploadSize}}.",
                generell: "Opplastingen feilet. Vennligst prøv igjen.",
                infotekst: "Opplasting av vedlegget feilet. Vennligst prøv igjen eller send vedlegget senere.",
                muligVirus: "Opplastingen ble stoppet av antivirus-programmet. Du kan prøve på nytt med en annen fil.",
                samletStorrelseForStor:
                    "Du har lastet opp {{antall}} vedlegg som til sammen er over 150MB. Det er dessverre ikke mulig å laste opp flere vedlegg, men du kan fortsatt ettersende de vedleggene du mangler etter at søknaden er sendt.",
            },
            suksess: "Dokumentasjon er lastet opp!",
        },
        oppsummering: {
            ikkelastetopp: "Ikke lastet opp",
            tittel: "Vedlegg",
        },
        salgsoppgjor: {
            eiendom: {
                tittel: "Opplysninger på salgsoppgjør",
            },
        },
        samvarsavtale: {
            barn: {
                tittel: "Samværsavtale eller avtale om delt bosted",
            },
        },
        skattemelding: {
            skattemelding: {
                tittel: "Skattemelding og skatteoppgjør",
            },
        },
        slett: "Slett",
        sletteModal: {
            tittel: "Er du sikker på at du vil slette filen?",
            avbryt: "Avbryt",
            slett: "Slett fil",
        },
        slettvedlegg: "Slett vedlegget",
        sluttoppgjor: {
            arbeid: {
                tittel: "Sluttoppgjør",
            },
        },
        student: {
            vedtak: {
                tittel: "Vedtak fra Lånekassen",
            },
        },
        tittel: "Opplasting av vedlegg",
    },
    backendCompat: {
        jsonOkonomiOpplysningerArbeidAvsluttet: "Sluttoppgjør/feriepenger etter skatt",
        jsonOkonomiOpplysningerArbeidJobb: "Lønnsinntekt",
    },
    arbeidOgFamilie: {
        tittel: "Arbeid og familie",
        alert: "Du får en ny og kortere søknad siden du har søkt før. Gi gjerne tilbakemeldinger om søknaden til veilederen din.",
    },
};

export default skjema;
