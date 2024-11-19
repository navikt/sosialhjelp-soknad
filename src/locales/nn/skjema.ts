export const skjema = {
    aar: "År",
    endre: "Endre",
    forhandsvisning: "Førehandsvisning",
    forrige: "Førre",
    forstorr: "Forstørr",
    fremdriftsindikator: "Framdriftsindikator",
    hoppTilHovedinnhold: "Gå til hovudinnhaldet",
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
                fixme: "Kommunen din kan ikkje ta imot digitale søknader.",
                utenurl: "{{kommuneNavn}} kommune kan ikkje ta imot digitale søknader.",
                v2: "{{kommuneNavn}} kommune kan ikkje ta imot digitale søknader.<br/>Du kan <lenke>søkje på papirskjema</lenke>.",
            },
            feil: {
                fixme: "Vi kan diverre ikkje ta imot digitale søknader akkurat no. Søk på papirskjema, eller prøv igjen seinare.",
                utenurl:
                    "{{kommuneNavn}} kommune kan diverre ikkje ta imot digitale søknader akkurat no. Søk på papirskjema, eller prøv igjen seinare.",
                v2: "{{kommuneNavn}} kommune kan diverre ikkje ta imot digitale søknader akkurat no. <lenke>Søk på papirskjema</lenke>, eller prøv igjen seinare.",
            },
            navKontor: "{{enhetsnavn}}, {{kommunenavn}} kommune.",
            suksess: "Søknaden din vil bli sendt til:",
        },
    },
    adresse_med_fylke: {
        alertstripe: {
            advarsel: {
                utenurl: "{{kommuneNavn}} kommune ({{fylkeNavn}}) kan ikkje ta imot digitale søknader.",
                v2: "{{kommuneNavn}} kommune ({{fylkeNavn}}) kan ikkje ta imot digitale søknader. Du kan <lenke>søkje på papirskjema</lenke>.",
                stringValue:
                    '{{kommuneNavn}} kommune ({{fylkeNavn}}) kan ikkje ta imot digitale søknader. Du kan <a href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">søkje på papirskjema</lenke>.',
            },
            feil: {
                utenurl:
                    "{{kommuneNavn}} kommune ({{fylkeNavn}}) kan diverre ikkje ta imot digitale søknader akkurat no. Søk på papirskjema, eller prøv igjen seinare.",
                v2: "{{kommuneNavn}} kommune ({{fylkeNavn}}) kan diverre ikkje ta imot digitale søknader akkurat no. <lenke>Søk på papirskjema</lenke>, eller prøv igjen seinare.",
                stringValue:
                    '{{kommuneNavn}} kommune ({{fylkeNavn}}) kan diverre ikkje ta imot digitale søknader akkurat no. <a href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">Søk på papirskjema</lenke>, eller prøv igjen seinare.',
            },
            suksess: "Søknaden blir send til: {{navkontorNavn}}, {{kommuneNavn}} kommune ({{fylkeNavn}}).",
        },
    },
    antallvelger: {
        feilmeldinger: {
            forlite: "Talet kan ikkje vere mindre enn {{0}}.",
            forstort: "Talet kan ikkje vere større enn {{0}}.",
            tall: "Du må leggje inn eit gyldig tal mellom {{0}} og {{1}}.",
        },
    },
    applikasjon: {
        advarsel: {
            gjenopptatt:
                "Vi jobbar med å gjere søknaden betre, og det kan difor ha skjedd endringar sidan sist du var logga inn. Dette betyr at spørsmål og informasjon kan ha blitt lagt til eller fjerna.",
        },
        sidetittel: {
            kortnavn: "Søknad",
            stringValue: "Søknad om økonomisk sosialhjelp",
        },
        ukjentfeilunderhentdata: "Det oppstod ein feil då det skulle hentast inn informasjon.",
    },
    applikasjonsfeil: {
        dialogtittel: "Feilmelding",
    },
    arbeid: {
        dinsituasjon: {
            annensituasjon: {
                true: {
                    beskrivelse: {
                        feilmelding: "Gi ei kort beskriving av situasjonen din",
                        label: "Beskriv kort",
                    },
                },
                stringValue: "Annan situasjon",
            },
            arbeidsledig: "Eg er arbeidsledig",
            feilmelding: "Du må oppgi kva situasjonen din er",
            jobb: "Eg er i jobb",
            sporsmal: "Kva er situasjonen din?",
            student: {
                true: {
                    heltid: {
                        false: {
                            hjelpetekst: {
                                tekst: "Dette er ein hjelpetekst som skal vere med",
                            },
                            stringValue: "Deltid",
                        },
                        feilmelding: "Oppgi om du studerer på heiltid eller deltid",
                        sporsmal: "Studerer du?",
                        true: "Heiltid",
                    },
                },
                stringValue: "Eg er student",
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
            label: "Arbeidsgivar",
        },
        fom: {
            label: "Starta i jobben",
        },
        infotekst_del1: "For dei siste tre månadene:",
        infotekst_del2: "(Henta frå Arbeidsgiver- og arbeidstakerregisteret)",
        ingen: "Vi fann ingen arbeidsforhold for dei siste tre månadene.",
        kommentar: {
            placeholder: "Ikkje legg inn helseopplysningar eller andre sensitive personopplysningar",
        },
        sporsmal: "Arbeidsforholda dine",
        stillingsprosent: {
            label: "Stillingsprosent",
        },
        stillingstype: {
            label: "Stillingstype",
        },
        tom: {
            label: "Slutta i jobben",
        },
    },
    autocomplete: {
        husnummer: "Dersom du har husnummer, må du leggje til dette (før kommaet).",
        ugyldig: "Adressa er ugyldig. Legg inn ei gyldig gateadresse.",
    },
    avbryt: {
        avbryt: "Avbryt",
        forklaring:
            "Vi har lagra det du har fylt ut så langt i søknaden, og du kan velje å halde fram seinare. Søknaden blir lagra i to veker før han blir sletta. Dersom du vel å slette søknaden no, blir alle opplysningane sletta.",
        fortsettsenere: "Hald fram seinare",
        ja: "Ja",
        lenkenavn: "Tilbake til ditt Nav",
        navigasjon: {
            forklaring:
                "Før du avbryt, må du velje om du vil at vi skal lagre søknaden, slik at du kan halde fram seinare, eller om du ønskjer å slette alt du har fylt ut i søknaden. Dersom du ønskjer å gjere ferdig søknaden seinare, har du to veker på deg før søknaden automatisk blir sletta.",
            overskrift: "Viktig å vite",
            tekst: "Dersom du avbryt søknaden, blir ikkje opplysningane lagra. Dette betyr at det du har fylt ut så langt, blir sletta.",
            uthevet: {
                tekst: "Er du sikker på at du vil avbryte søknaden?",
            },
        },
        nei: "Nei",
        overskrift: "Viktig å vite",
        slett: "Slett søknaden",
        soknad: "Slett søknaden",
        soknadslettet: {
            tekst: "Søknaden og alle dokumenter er sletta. For å starte ein ny søknad må du gå tilbake til skjemaa på Mi Side.",
            tittel: "Søknaden er sletta",
        },
        tekst: "Dersom du avbryt søknaden du har byrja på, blir han ikkje lagra. Dette inneber at du mistar det du har fylt ut så langt.",
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
            beskrivelse: "Ka anna søkjer du om penger til?",
        },
        hva: {
            description: 'Døme på tekst: "Eg søkjer om pengar til mat, husleige og straum."',
            descriptionOld: "Til dømes pengar til/utgifter husleige og for å leve",
            label: "Kva søkjer du om?",
            labelOld: "Skriv i stikkordsform kva du søkjer om",
        },
        hvorfor: {
            description: "om situasjonen din og kva du søkjer om.",
            label: "Fortel oss mer",
            labelOld: "Grunngi kort søknaden",
        },
        kategorier: {
            annet: "Anna",
            barn: "Andre utgifter til barn",
            barnehage: "Barnehage og SFO/AKS",
            bolig: "Husleige",
            hoytid: "Høgtid og merkedagar",
            klaer: "Klede og utstyr",
            label: "Kva søkjer du om penger til?",
            description:
                "Her er nokre utgifter det er vanleg å søkje om. Du kan skrive inn andre under “Anna”. Du kan velje fleire av kategoriane.",
            lege: "Lege og medisin",
            mat: "Mat",
            nodhjelp: "Nødhjelp",
            strom: "Straum og oppvarming",
            tannlege: "Tannlege",
            transport: "Transport",
            fritidsaktiviteter: "Fritidsaktivitetar for barn",
        },
        kort: {
            behov: {
                description: 'Døme på tekst: "Eg søkjer om pengar til livsopphald, husleige og straum."',
                dokumentasjon: {
                    beskrivelse:
                        "Her kan du laste opp dokumentasjon for det du søkjer om pengar til. Viss du legg ved dokumentasjon saman med søknaden din, kan det hjelpe oss med å behandle søknaden raskare.",
                    tittel: "Dokumentasjon",
                },
                oppsummeringstittel: "Ditt behov",
            },
        },
        nødhjelp: {
            beskrivelse: "Nødhjelp kan du søkje om viss du ikkje har pengar til det mest nødvendige det neste døgnet.",
        },
        underkategorier: {
            nodhjelp: {
                bosted: "Eg har ikkje ein stad å bu i natt",
                mat: "Eg har ikkje pengar til mat i dag",
                strøm: "Straumen er stengt, eller stengast i dag eller i morgon",
            },
        },
    },
    begrunnelsebolk: {
        tittel: "Behov",
    },
    bosituasjon: {
        annenBotype: {
            familie: "Bur hos familie",
            fengsel: "Fengsel",
            foreldre: "Bur hos foreldra",
            institusjon: "Institusjon (sjukehus, psykiatri eller rusbehandling)",
            krisesenter: "Krisesenter",
            sporsmal: "Vil du utdjupe?",
            venner: "Bur hos vennar",
        },
        annet: "Annan busituasjon",
        antallpersoner: {
            label: "Tal. Ikkje tel med deg sjølv.",
            sporsmal: "Kor mange personar bur du saman med?",
        },
        eier: "Eg bur i ein bustad eg eig sjølv",
        feilmelding: "Du må oppgi korleis du bur",
        ingen: "Eg har ingen stad å bu",
        kommunal: "Eg leiger ein kommunal bustad",
        leier: "Eg leiger ein privat bustad",
        leierkommunalt: "Eg leiger ein kommunal bustad",
        leierprivat: "Eg leiger ein privat bustad",
        sporsmal: "Korleis bur du?",
        tittel: "Din busituasjon",
    },
    bosituasjonbolk: {
        tittel: "Busituasjon",
    },
    dinsituasjon: {
        jobb: {
            sporsmal: "Er du i jobb?",
            true: {
                grad: {
                    deltid: "Deltid",
                    heltid: "Heiltid",
                    sporsmal: "Jobbar du heiltid eller deltid?",
                },
            },
        },
        studerer: {
            grad: {
                deltid: "Deltid",
                heltid: "Heiltid",
                sporsmal: "Studerer du heiltid eller deltid?",
            },
            hjelpetekst: {
                tekst: "",
            },
            mer: {
                info: {
                    forklaring:
                        "Her kan du svare ja dersom du går på skule eller studerar. Det kan være videregåande skule, høgskule, universitet, norskopplæring, grunnskule for vaksne eller vaksenopplæring.",
                    tittel: "Eksempel på å være elev",
                },
            },
            sporsmal: "Er du skuleelev eller student?",
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
            feilmelding: "Du må svare på om du har barn som bur saman med deg",
            hjelpetekst: {
                tekst: "Oppgi alle barn du pliktar å forsørgje (dekkje nødvendige utgifter for). Du pliktar å forsørgje barn du har som er under 18 år. Dette gjeld sjølv om dei ikkje bur saman med deg. Dersom du har økonomi til det, må du forsørgje barna dine til dei er ferdige med vidaregåande skule.",
            },
            sporsmal: "Har du barn du pliktar å forsørgje?",
            tittel: "Barn",
            true: {
                barn: {
                    borsammen: {
                        sporsmal: "Bur barnet fast saman med deg?",
                    },
                    deltbosted: {
                        hjelpetekst: {
                            tekst: "Delt bustad betyr at barnet bur fast hos begge foreldra etter eit samlivsbrot. Foreldra har i dette tilfellet inngått ein avtale om delt bustad, eller ein domstol har bestemt at barnet skal dele bustad mellom foreldra. Dette inneber at barnet bur (omtrent) like mykje hos kvar av foreldra, og begge må vere samde i avgjerder som gjeld kvardagen til barnet. Delt bustad er ikkje det same som at barnet har samvær med kvar av foreldra halvparten av tida.",
                        },
                        sporsmal: "Har barnet delt bustad?",
                    },
                    etternavn: {
                        label: "Etternamn",
                    },
                    fjern: "Fjern",
                    fjernalternativtekst: "Fjern barn",
                    fnr: {
                        label: "Fødselsdato (ddmmåååå)",
                    },
                    fornavn: {
                        label: "Fornamn",
                    },
                    grad: {
                        deltid: "Deltid",
                        heltid: "Heiltid",
                        hoyretekst: "%",
                        label: "Samværsgrad i prosent (maks 50)",
                        sporsmal: "Kor mykje samvær har du med barnet?",
                    },
                    leggtil: "Legg til barn",
                    mellomnavn: {
                        label: "Mellomnamn",
                    },
                    navn: {
                        label: "Namn",
                    },
                    pnr: {
                        label: "Personnummer",
                    },
                    slett: "Slett informasjon",
                    sporsmal: "Opplysningar om barn",
                },
                barnebidrag: {
                    begge: "Eg betaler og får barnebidrag",
                    betaler: "Eg betaler barnebidrag",
                    ingen: "Nei",
                    mottar: "Eg får barnebidrag",
                    sporsmal: "Får eller betaler du barnebidrag for eitt eller fleire av barna?",
                },
                listetittel: "Opplysningar om barn",
            },
        },
        sivilstatus: {
            enke: "Enkje/enkjemann",
            feilmelding: "Du må oppgi sivilstatusen din",
            gift: {
                borsammen: {
                    false: {
                        beskrivelse: {
                            label: "Beskriv kvifor",
                        },
                    },
                    sporsmal: "Folkeregistrert på same adresse",
                },
                ektefelle: {
                    borsammen: {
                        sporsmal: "Bur du saman med ektefellen din?",
                    },
                    etternavn: {
                        label: "Etternamn",
                    },
                    fnr: {
                        label: "Fødselsdato (ddmmåååå)",
                    },
                    fornavn: {
                        label: "Fornamn",
                    },
                    ikkesammenbeskrivelse: {
                        label: "Beskriv situasjonen din",
                    },
                    mellomnavn: {
                        label: "Mellomnamn",
                    },
                    navn: {
                        label: "Namn",
                    },
                    pnr: {
                        label: "Personnummer (5 siffer)",
                    },
                    sporsmal: "Opplysningar om ektefellen din",
                },
                fnr: {
                    label: "Fødselsnummer (ddmmåååå)",
                },
                navn: {
                    label: "Namn",
                },
                pnr: {
                    label: "Personnummer",
                },
                sporsmal: "Opplysningar om ektefelle",
                stringValue: "Gift / registrert partnar",
            },
            samboer: "Sambuar",
            separert: "Separert",
            skilt: "Skild",
            sporsmal: "Kva er sivilstatusen din",
            ugift: "Ugift",
        },
    },
    familiebolk: {
        tittel: "Familiesituasjon",
    },
    familierelasjon: {
        bor_sammen: "Bur barnet hos deg?",
        delt: {
            samvaer: {
                sporsmal: "Har {{navnString}} delt bustad?",
            },
        },
        faktum: {
            lagttil: "Barn du har registrert sjølv",
            leggtil: {
                hjelpetekst: {
                    tekst: "Du kan leggje til barn som du forsørgjer, men som vi ikkje har henta informasjon om. Dette kan til dømes vere fosterbarn eller barn over 18 år som går på vidaregåande skule.",
                },
                sporsmal: "Legg til barn vi ikkje har registrert",
            },
            sporsmal: "Barn du forsørgjer:",
        },
        fodselsdato: "Fødselsdato",
        hentet_fra_folkeregisteret: "(Henta frå Folkeregisteret)",
        ingen_registrerte_barn:
            "<p> Vi har henta følgjande opplysningar frå Folkeregisteret: </p> <p> <b>Du har ingen registrerte barn under 18 år.</b> </p>",
        ingen_registrerte_barn_tekst: "Du har ingen registrerte barn under 18 år.",
        ingen_registrerte_barn_tittel: "Vi har henta følgjande opplysningar frå Folkeregisteret:",
        ingress: {
            antallBarn_one: "{{count}} barn under 18 år",
            antallBarn_other: "{{count}} barn under 18 år",
        },
        ingress_folkeregisteret: "Vi har henta følgjande opplysningar frå Folkeregisteret:",
        ingress_forsorger: "Vi har registrert at du har forsørgjaransvar for:",
        samme_folkeregistrerte_adresse: "Folkeregistrert på same adresse",
        samvaer: {
            sporsmal: "Kor mykje samvær har du med barnet?",
        },
    },
    feilmelding: {
        boks: {
            overskrift: "Du må svare på følgjande:",
        },
        generelt: "Prøv igjen seinare.",
        innsending: {
            number1:
                "Vi har lagra alt du har gjort, men søknaden er ikkje send. Send søknaden på nytt seinare. Du kan få tilsendt ei lenkje til søknaden på e-post:",
            number2: "Du kan også finne søknaden ved å gå til",
        },
        lenketekst: "Til Mi Side",
        maks500tegn: "Du kan skrive opptil 500 teikn",
        mineinnsedinger: {
            lenketekst: "Mine innsendingar",
        },
        tps: "Systemet for persondata hos Nav er diverre ikkje tilgjengeleg. Vi anbefaler at du prøver igjen seinare.",
        stringValue: "Vi beklagar, men noko gjekk gale.",
    },
    feilside: {
        feilkode: "Feilkode",
        ikkefunnet: {
            feilmelding:
                "Dersom det gjeld ein søknad som allereie er innsend/sletta, går du <lenke>tilbake til startsida</lenke>.",
            returner: {
                knapp: "Gå til startside for sosialhjelp",
            },
            tittel: "Sida blei ikkje funnen",
        },
        lenke: {
            meldfra: {
                tekst: "Meld frå om feil",
            },
            minside: {
                teskt: "Gå til Mi Side",
            },
            nav: {
                tekst: "Gå til nav.no",
            },
        },
        number404: {
            fantIkkeSide: "Vi finn ikkje sida du prøver å opne.",
        },
        serverfeil: {
            beklager: "Me beklagar!",
            feilmelding:
                "Beklagar, men vi har tekniske problem. Søknad om økonomisk sosialhjelp er ikkje tilgjengeleg akkurat no. Vi anbefaler at du prøver på nytt litt seinare.",
            informasjon: {
                ikkeLagret:
                    "Søknaden er oppretta, men det er ikkje lagra svar på han. Du kan halde fram på søknaden seinare.",
                stringValue: "Søknaden blei sist lagra {{0}}, og du kan jobbe vidare med han seinare.",
            },
            knapp: "Kontakt Nav-Kontoret ditt",
            lenke: {
                meldfra: "Send feilrapport",
                minside: "Gå til Mi Side",
                nav: "Gå til nav.no",
            },
            loggUt: "Logg ut",
            loggfort: "Hendinga har vorte loggført og problemet blir utbetra så fort som mogleg.",
            nodsituasjon: {
                tekst: "Kontakt Nav-kontoret dersom du ikkje har pengar til det aller mest nødvendige (t.d. mat). Nav skal også hjelpe deg å finne eit mellombels butilbod dersom du ikkje har ein stad å sove eller opphalde deg på det nærmaste døgnet.",
                tittel: "Treng du rask hjelp?",
            },
            opprett: {
                informasjon:
                    "Eit teknisk problem gjorde at vi ikkje kunne opprette søknaden. Prøv igjen eller vent til seinare.",
            },
            papir: "Du kan òg <lenke>søkje om økonomisk sosialhjelp på papir</lenke> hos Nav-kontoret ditt.",
            prov: {
                igjen: "Me tilrår at du prøver på nytt.",
            },
            provIgjen: "Prøv på nytt",
            startside: "Gå til framsida for sosialhjelp",
            teknisk: {
                feil: "Ein teknisk feil har oppstått.",
            },
            til: {
                startsiden: "Til startsida for søknad",
            },
            tittel: "Beklagar, men det har oppstått ein feil på vår side.",
        },
        soknadikkefunnet: {
            informasjon: "Vi finn ikkje søknaden din. Dette kan skuldast feil i systemet, eller at søknaden er sletta.",
            tittel: "Vi beklagar, men noko gjekk gale.",
        },
    },
    fil: {
        feil: {
            format: "Feil filformat. Last opp ei fil i PDF-, PNG- eller JPG-format.",
            kryptert: "Passordbeskytta PDF-fil. Du må laste opp fila utan passordbeskyttelse.",
            signert: "Signert PDF-fil. Du må laste opp fila utan signatur.",
        },
        for: {
            stor: "Fila er for stor. Maksimal filstorleik er 10 MB.",
        },
    },
    formue: {
        annetLabel: "Beskriv",
        type: {
            aksjer: "Aksjar, obligasjonar og fond",
            annet: "Anna",
            belop: {
                true: {
                    beskrivelse: {
                        label: "Beskriv",
                    },
                },
                stringValue: "Anna",
            },
            brukskonto: "Brukskonto",
            bsu: "Boligsparing for Ungdom (BSU)",
            hjelpetekst: {
                tekst: "Du må oppgi alle bankkontoar og spareordningar du har både i Noreg og i utlandet. Huk av sjølv om du ikkje har pengar disponibelt.",
            },
            livsforsikring: "Livsforsikring med sparedel",
            livsforsikringssparedel: "Livsforsikring med sparedel",
            sparekonto: "Sparekonto",
            sporsmal: "Kva bankkontoar og spareordningar har du?",
            verdipapirer: "Aksjar, obligasjonar og fond",
        },
    },
    fortsettSenere: {
        epost: {
            label: "Send meg ei lenkje på e-post (ikkje obligatorisk)",
            pattern: {
                feilmelding: "E-postadressa er ikkje i eit gyldig format",
            },
            required: {
                feilmelding: "Du må leggje inn ei e-postadresse",
            },
            send: "Send",
        },
        fortsettlink: "Hald fram på søknad",
        info: "Vi har lagra alt du har gjort, men søknaden er ikkje send til Nav. Du kan sende søknaden seinare ved å logge deg inn på Mi Side. Vi kan også sende deg ein e-post med ei lenkje tilbake til innsendinga.",
        kvittering: {
            inngangsportenlink: "Inngangsporten",
            sendpaanyttlink: "Send e-posten på nytt",
            tekst: "Vi har sendt ein e-post til følgjande adresse:",
            tittel: "E-post er sendt",
        },
        lastoppvedlegglink: "Last opp",
        oppsummeringlinktekst: "Til oppsummering",
        sendEpost: {
            epostInnhold:
                "Du har valt å sende inn søknaden seinare. Du kan gjere dette via denne lenkja: {{0}} . Søknaden er ikkje send til Nav. Søknader du har starta på, men ikkje sendt inn, blir automatisk sletta dersom det går meir enn åtte veker utan at du gjer noko meir med dei. Vennleg helsing Nav",
            epostTittel: "Lenkje til påbyrja søknad",
        },
        sidetittel: "Send inn seinare – www.nav.no",
        tilbake: "Tilbake til innsending",
        tittel: "Send inn seinare",
        stringValue: "Hald fram på søknaden seinare",
    },
    generelt: {
        kommune: "kommune",
        merinfo: "Meir informasjon",
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
            sporsmal: "Kor mykje samvær har du med barnet?",
        },
    },
    ikkefunnet: {
        informasjon: "Skjemaet du bad om, blei ikkje funne i systema våre.",
        tittel: "Finn ikkje skjema",
    },
    informasjon: {
        hilsen: {
            hei: "Hei, {{fornavn}}!",
            tittel: "Her finn du informasjon det kan vere lurt at du les gjennom før du går i gang med søknaden.",
        },
        husbanken: {
            bostotte: {
                url: "https://husbanken.no/bostotte",
                v2: "Bustøtte frå Husbanken er ei statleg støtteordning for dei som har låg inntekt og høge buutgifter. Bustøtta skal vere ei hjelp til å betale buutgifter. Du har svart at du har buutgifter, men ikkje får bustøtte. Vi anbefaler deg å sjekke om du kan få <lenke>støtte frå Husbanken</lenke>.",
                stringValue:
                    'Bustøtte frå Husbanken er ei statleg støtteordning for dei som har låg inntekt og høge buutgifter. Bustøtta skal vere ei hjelp til å betale buutgifter. Du har svart at du har buutgifter, men ikkje får bustøtte. Vi anbefaler deg å sjekke om du kan få <a href="https://husbanken.no/bostotte" target="_blank" rel="noreferrer noopener">støtte frå Husbanken</lenke>.',
            },
        },
        ikketilgang: {
            bruker: {
                tekst: {
                    v2: "Du kan diverre ikkje bruke den digitale søknaden om økonomisk sosialhjelp. \nPersoner med kode 6 eller 7 kan ikkje søke om økonomisk sosialhjelp digitalt. \nTa kontakt med <lenke>det lokale Nav-kontoret ditt</lenke> for å få hjelp til å søkja.",
                },
                tittel: "Beklagar",
            },
            tekst: {
                v2: "Du er no komen til ei digital teneste for å søkje om økonomisk stønad. Tenesta er under utvikling, og er på noverande tidspunkt berre tilgjengeleg for innbyggjarar med adresse i Horten, Skien, Bergen, Oslo, Trondheim eller Askøy kommune. Dersom du har behov for økonomisk stønad, kontaktar du <lenke>ditt lokale Nav-kontor.</lenke>",
            },
            tittel: "Beklagar",
        },
        samtykke: {
            bostotte_samtykke: "Husbanken",
            info_del1: "Då du starta søknaden, valde du å hente informasjon frå",
            info_del2:
                "Desse opplysningane kan ha endra seg, og vi kan oppdatere dei for deg. Dersom du vil, kan du slette opplysningane før du sender søknaden.",
            knapp: "Hald fram på søknaden",
            skatteetaten_samtykke: "Skatteetaten",
            sporsmal: "Oppdater opplysningane frå",
        },
        student: {
            studielan: {
                number1: {
                    v2: "Økonomisk sosialhjelp skal i utgangspunktet ikkje finansiere høgare utdanning. Sjekk om du kan søkje om lån og stipend på <lenke>lanekassen.no</lenke>.",
                },
                number2:
                    "Det finst unntak der du kan ha rett på økonomisk sosialhjelp. Dette kan vere dersom du er i ein naudssituasjon eller har mellombels behov for hjelp før du har fått utbetalinga frå Lånekassen. Kontakt Nav-kontoret for å få avklart behovet ditt og få opplysning, råd og rettleiing.",
                tittel: "Informasjon til deg som er student",
                url: "https://lanekassen.no",
            },
        },
        svarpasoknad: {
            tekst: "Kommunane kan ha ulik svartid. Dersom det har gått meir enn éin månad frå du søkte, skal du få brev om at saksbehandlingstida er forlenga.",
            undertittel: "Når får du svar på søknaden?",
        },
        tekster: {
            personopplysninger: {
                ettersendt: {
                    tekst: "Når du sender søknaden, går han til kommunen du oppheld deg i. Kommunen har ansvar for å behandle søknaden og lagre opplysningene i sitt kommunale fagsystem.",
                    tittel: "Etter at søknaden er send",
                },
                fordusender: {
                    tekst: "Før du sender søknaden, blir opplysningane lagra hos Arbeids- og velferdsdirektoratet. Dersom du klikkar på «avbryt» før du har sendt søknaden, blir alle opplysningane sletta. Du kan velje å avbryte når som helst i søknaden.",
                    tittel: "Før du sender søknaden",
                },
                innhenting: {
                    tekst: 'Du legg sjølv inn opplysningar i søknaden. I tillegg hentar vi informasjon frå offentlege register der det er lov. Dette vil til dømes vere opplysningar om familie frå Folkeregisteret, opplysningar om arbeidsforhold frå Arbeidstakarregisteret og informasjon om statlege ytingar frå Nav. <br></br><br></br>Dersom du ikkje ønskjer at vi hentar inn slike opplysningar om deg automatisk, kan du bruke papirskjema for å søkje om økonomisk sosialhjelp. Papirskjema kan du laste ned frå <a href="https://nav.no" target="_blank">nav.no</a> eller hente på Nav-kontoret.',
                    tittel: "Innhenting av personopplysningar",
                },
                rettigheter: {
                    lenke: "Les meir om behandling av personopplysningar.",
                    tekst: "Du har rett på å få informasjon om og innsyn i eigne personopplysningar. Dersom det er lagra opplysningar om deg som er feil, ufullstendige eller unødvendige, kan du krevje at desse blir retta eller supplerte.",
                    tittel: "Rettane dine",
                },
                sporsmal: "Kontakt Nav-kontoret ditt dersom du har spørsmål om personopplysningar.",
                tittel: "Slik behandlar vi personopplysningane dine",
            },
        },
        tittel: "Informasjon framside",
    },
    informasjonsside: {
        lestbrosjyre: {
            sporsmal: "Eg stadfestar å ha lest og forstått informasjonen på nav.no/dagpenger",
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
                tekst: "Du må oppgi alle bankkontoar og spareordningar du har både i Noreg og i utlandet. Huk av sjølv om du ikkje har pengar disponibelt.",
            },
            infotekst: {
                tekst: "Til dømes brukskonto, BSU, aksjar og fond",
            },
            sporsmal: "Har du bankkontoar og/eller andre spareordningar?",
        },
        bostotte: {
            gi_samtykke: {
                overskrift: "Vil du hente informasjon om du har søkt om eller får bustøtte frå Husbanken?",
                tekst: "Desse opplysningane kan vere nødvendige for å behandle søknaden. Dersom du ikkje ønskjer at vi hentar inn denne informasjonen om deg, kan du laste opp dokumentasjon på det siste trinnet i søknaden.",
                ja: "Ja, hent informasjon",
                nei: "Nei",
            },
            har_gitt_samtykke: "Du har henta informasjon frå Husbanken",
            husbanken: {
                info: "Du henta informasjon om saker og utbetalingar frå Husbanken for",
                ingensakerfunnet: "Du har ingen registrerte saker hos Husbanken for siste månad.",
                ingenutbetalingerfunnet: "Du har ingen registrerte utbetalingar hos Husbanken for siste månad.",
                lenkeText: "Sjå detaljar hos Husbanken",
                mottaker: {
                    husstand: "Til husstand",
                    kommune: "Til kommune",
                },
                sak: {
                    beskrivelse: "Beskriving av vedtak",
                },
                saker: "Saker",
                status: {
                    under_behandling: "Under behandling",
                },
                tittel: "Bustøtte frå Husbanken",
                url: "https://kundeforhold-bostotte.husbanken.no/esoknad-bostotte/",
                utbetalinger: "Utbetalingar",
                vedtaksstatus: {
                    avslag: "Avslag",
                    avvist: "Avvist",
                    innvilget: "Innvilga",
                },
            },
            ikkefunnet: "Du har ingen registrerte utbetalingar eller saker hos Husbanken den siste månaden.",
            infotekst: {
                tekst: "Du har henta informasjon om saker og utbetalingar frå Husbanken.",
            },
            kontaktproblemer: "Vi fekk ikkje henta opplysningar frå Husbanken",
            mangler_samtykke: "Du har ikkje henta informasjon frå Husbanken",
            nedlasting_feilet:
                "Vi fekk ikkje kontakt med Husbanken. Du kan prøve igjen om nokre minutt, eller laste opp dokumentasjonen sjølv på det siste trinnet i søknaden",
            overskrift: "Bustøtte frå Husbanken",
            sak: {
                dato: "Dato",
                status: "Status",
                stringValue: "Sak",
            },
            sakerIkkefunnet: "Du har ingen registrerte saker hos Husbanken den siste månaden.",
            sporsmal: {
                sporsmal: "Har du søkt om eller fått bustøtte frå Husbanken i løpet av dei to siste månadene?",
            },
            ta_bort_samtykke: "Fjern informasjon frå Husbanken",
            tidspunkt: "Informasjonen blei henta",
            true: {
                type: {
                    husbanken: "Bustøtte frå Husbanken",
                    kommunal: "Kommunal bustøtte",
                    sporsmal: "Kva støtte får du?",
                },
            },
            utbetaling: {
                belop: "Beløp",
                belop_siste_maned: "Beløp siste månad",
                mottaker: "Mottakar",
                sporsmal_manuell: "Kva har du fått i bustøtte frå Husbanken?",
                utbetalingsdato: "Utbetalingsdato",
                stringValue: "Utbetaling",
            },
            utbetalingerIkkefunnet: "Du har ingen registrerte utbetalingar hos Husbanken den siste månaden.",
            stringValue: "Bustøtte",
        },
        eierandeler: {
            hjelpetekst: {
                tekst: "Med økonomisk verdi meiner vi eigedom eller eigedelar av høgare verdi både i Noreg og i utlandet. Vi kan krevje at du sel gjenstandar som du ikkje treng i kvardagen, og som du kan få eit visst beløp for. Vi kan ikkje krevje at du sel personlege eigedelar som t.d. klede og innbu av vanleg standard.",
            },
            infotekst: {
                tekst: "Til dømes bustad eller køyretøy",
            },
            sporsmal: "Eig du noko av økonomisk verdi?",
            true: {
                type: {
                    annet: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv kva du eig",
                            },
                        },
                        stringValue: "Anna",
                    },
                    bolig: "Bustad",
                    campingvogn: "Campingvogn og/eller båt",
                    fritidseiendom: "Fritidseigedom",
                    kjoretoy: "Køyretøy",
                    sporsmal: "Kva eig du?",
                },
            },
        },
        inntekter: {
            hjelpetekst: {
                tekst: "Dersom du har fått utbetalt pengar i form av utbyte på aksjar, fond, sal av eigedelar eller på andre måtar, ønskjer vi å vite om dette.",
            },
            lesmer: "Døme på utbetalingar",
            sporsmal:
                "Har du i løpet av dei siste tre månadene fått utbetalt pengar som verken er løn eller yting frå Nav?",
            tittel: "Andre inntekter",
            true: {
                type: {
                    annen: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv",
                            },
                        },
                        stringValue: "Anna",
                    },
                    annet: {
                        true: {
                            beskrivelse: {
                                label: "Beskriv",
                            },
                        },
                        stringValue: "Anna",
                    },
                    forsikring: "Forsikringsutbetalingar",
                    forsikringsutbetalinger: "Forsikringsutbetalingar",
                    salg: "Sal av eigedom og/eller eigedelar",
                    sporsmal: "Kva har du fått?",
                    utbytte: "Utbyte på aksjar, fond eller verdipapir",
                },
            },
        },
        mottarytelser: {
            feilmelding: "Du må svare på om du tek imot ytingar frå Nav",
            sporsmal: "Tek du imot ytingar frå Nav?",
        },
        soktytelser: {
            feilmelding: "Du må svare på om du har ikkje-ferdigbehandla søknader om ytingar hos Nav",
            sporsmal: "Har du ikkje-ferdigbehandla søknader om ytingar hos Nav?",
        },
        studielan: {
            sporsmal: "Får du lån/stipend frå Lånekassen?",
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
                    label: "Poststad",
                },
                sporsmal: "Adresse for søknaden",
            },
        },
        kontonummer: {
            bruker: {
                label: "Dersom dette ikkje skal nyttast, må det i staden leggjast inn kontonummer",
                stringValue: "Du har oppgitt følgjande:",
            },
            description:
                "Kontonummeret du oppgir her vil kun bli brukt til utbetaling av økonomisk sosialhjelp, og oppdateres ikkje på Mi Side",
            feilmelding: "Oppgi kontonummer",
            harikke: {
                sporsmal: "Kontonummer",
                true: "Eg har ikkje bankkonto eg kan bruke.",
                stringValue: "Eg har ikkje bankkonto eg kan bruke.",
            },
            infotekst: {
                tekst: "Kontonummeret du oppgir her, vil berre bli brukt til utbetaling av økonomisk sosialhjelp.",
            },
            ingeninfo: "Ingen opplysningar om bankkonto.",
            kontonummerFelt: "Kontonummeret felt",
            label: "Nytt kontonummer (11 siffer)",
            oppgi: "Oppgi kontonummer",
            sporsmal: "Nytt kontonummer for søknaden",
        },
        statsborger: {
            feilmelding: "Vel statsborgarskap",
            hjelpetekst: {
                tekst: "Som nordisk borgar reknar ein personar med svensk, dansk, finsk eller islandsk statsborgarskap. Dersom du er EØS-borgar og ikkje har fått sosialhjelp tidlegare, må du kontakte Nav-kontoret før du søkjer.",
            },
        },
        system: {
            adresse: {
                adresse: {
                    label: "Adresse",
                },
                bolignummer: {
                    label: "Bustadnummer",
                },
                bruksnummer: {
                    label: "Bruksnummer",
                },
                eiendomsnavn: {
                    label: "Namn på eigedom",
                },
                endreknapp: {
                    label: "Bruk ei anna adresse",
                },
                festenummer: {
                    label: "Festenummer",
                },
                gaardsnummer: {
                    label: "Gardsnummer",
                },
                gatenavn: {
                    label: "Gatenamn",
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
                    label: "Poststad",
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
                        "Skriv adressa der du bur eller oppheld deg. Viss du ikkje veit adressa kan du skrive adressa til Nav-kontoret i kommunen eller bydelen. Søk opp <lenke>Nav-kontoret.</lenke>",
                },
                sporsmal: "Adresse",
            },
            kontonummer: {
                endreknapp: {
                    label: "Rediger",
                },
                infotekst: {
                    tekst: "Vi har henta følgjande opplysningar frå Mi Side:",
                },
                label: "Kontonummer",
                sporsmal: "Kontonummer",
            },
            oppholdsadresse: {
                finnerKontor: "Finn Nav-kontoret ditt",
                folkeregistrertAdresse: "Folkeregistrert adresse",
                hvorOppholder: "Kva adresse bur du på?",
                midlertidigAdresse: "Mellombels adresse på Mi Side:",
                soknad: {
                    infotekst: {
                        tekst: "Du må oppgi adressa der du bur for at søknaden skal bli sendt til rett Nav-kontor.",
                    },
                    sporsmal: "Kva adresse bur du på?",
                },
                sporsmal: "Opphaldsadresse og Nav-kontor",
                valg: {
                    feilmelding: "Vel opphaldsadresse og Nav-kontor.",
                    folkeregistrert: "Folkeregistrert adresse",
                    midlertidig: "Mellombels adresse registrert i adresseregisteret hos Nav (TPS)",
                    soknad: "Eg bur på ei anna adresse",
                    sporsmal: "Kva er opphaldsadressa di?",
                },
                velgKontor: "Adressa gav fleire treff på Nav-kontor. Vel ditt lokale kontor.",
                velgMottaker: "Vel Nav-kontor",
            },
            personalia: {
                fnr: "Fødselsnummer",
                fodselsdato: "Fødselsdato",
                infotekst: {
                    tekst: "(Henta frå Folkeregisteret)",
                },
                navn: "Namn",
                sporsmal: "Personalia",
                statsborgerskap: "Statsborgarskap",
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
                    tekst: "(Henta frå Kontakt- og reservasjonsregisteret)",
                },
                ingeninfo: "Vi fann ikkje eit telefonnummer i Kontakt- og reservasjonsregisteret.",
                sporsmal: "Telefonnummer",
            },
        },
        telefon: {
            beskrivelse: "For at vi enkelt skal kunne kome i kontakt med deg, må vi ha telefonnummeret ditt",
            description:
                "Telefonnummeret du oppgir her kan bli brukt til å kontakte deg om søknaden, og oppdateres ikkje på Mi Side",
            feil: {
                maxLength: "Telefonnummer er for langt",
                tom: "Legg inn telefonnummer",
                ugyldig: "Telefonnummer er ugyldig",
            },
            feilmelding: "Intet nummer oppgitt",
            infotekst: {
                tekst: "Telefonnummeret du oppgir her kan bli brukt til å kontakte deg om søknaden.",
            },
            label: "Telefonnummer",
            landskode: "Landskode",
            oppgi: "Oppgi telefonnummer",
            sporsmal: "Telefonnummeret ditt",
            telefonnummerFelt: "Telefonnummer felt",
            tittel: "Nytt telefonnummer",
        },
        tittel: "Personopplysningar",
    },
    kvittering: {
        dato: "Søknaden er send til Nav",
        erSendt: "{{0}} av {{1}} vedlegg blei sendt til Nav {{2}}, klokka {{3}}",
        ikkeInnsendt: {
            tittel: "Følgjande vedlegg er ikkje sendt",
        },
        informasjonstekst: {
            del1: '<p>Du kan ettersende dokument <strong><a href="https://tjenester.nav.no/saksoversikt/app/ettersending" target="_blank">her</lenke>.</strong>  Dersom noko skal sendast til Nav av andre enn deg (t.d. lege eller arbeidsgivar), må du gi vedkomande beskjed om dette, slik at du er sikker på at det blir sendt.</p>',
            del2: "<p>Dersom Nav ikkje har fått nødvendig dokumentasjon <strong>innan 14 dagar</strong>, kan søknaden bli avslått på grunn av manglande opplysningar.</p>",
        },
        innsendt: {
            tittel: "Følgjande vedlegg er sendt",
        },
        klokkeslett: "klokka",
        normertbehandlingstid:
            'Her kan du sjå <a href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV">saksbehandlingstidene</lenke> i fylket ditt.',
        saksbehandling: {
            tekst: "Saksbehandlingstida varierer frå kommune til kommune. Du får eit vedtak så snart vi har behandla søknaden din. Dersom det går meir enn éin månad, skal du få eit førebels svar. Dersom vi manglar dokumentasjon, kan det ta lengre tid før du får svar på søknaden. Vi anbefaler difor at du sender dokumentasjon snarast råd, og helst innan 14 dagar. Du kan også sende dokumentasjon du har fått beskjed om i vedtaket ditt, til dømes i samband med vilkår eller andre avtalar med NAV. Du kan sende vedlegg på Mi Side.",
            tittel: "Saksbehandlingstid",
        },
        saksoversikt: {
            informasjon:
                "Du kan følgje saka di hos NAV. På sakssida finn du meir informasjon om søknaden din, og kan melde frå om endringar som er av betydning for saka.",
            lenke: "Gå til saka",
        },
        samtale: {
            tekst: 'Dersom det du søkjer om økonomisk sosialhjelp, blir du vanlegvis kalla inn til samtale med ein rettleiar. Du kan også kontakte NAV-kontoret ditt og avtale eit møte. <a href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote" target="_blank" rel="noreferrer noopener">Les meir om korleis eit møte blir lagt opp.</lenke>',
            tittel: "Samtale med NAV-kontoret",
        },
        situasjon: {
            tekst: "Gi beskjed dersom den økonomiske situasjonen din endrar seg etter at du har sendt søknaden.",
            tittel: "Dersom situasjonen din endrar seg",
        },
        skrivutknapp: {
            label: "Skriv ut søknaden",
        },
        tekst: {
            post: ", som vil vere kontoret som behandlar saka di.",
            pre: "Søknaden er send til",
        },
        tittel: "Kvittering",
        undertittel: "Søknad om økonomisk sosialhjelp er sendt",
        utskrift: {
            oppsummering: {
                tittel: "Oppsummering av søknaden",
            },
            stringValue: "Skriv ut kvittering",
        },
        vedlegg: {
            tittel: "Vedlegg som NAV-kontoret treng for å behandle søknaden din",
        },
        veienvidere: {
            tittel: "Kva skjer no?",
        },
    },
    matrikkel: {
        gnrbnr: "Gards- og bruksnummer",
        kommunenr: "Kommunenr",
        mangler: {
            kommune: "Du må velje kommune før du kan gå vidare.",
        },
        sok: {
            placeholder: "Søk etter kommune",
        },
        tekst: "Du har ein adressetype som ikkje er ei gateadresse.",
    },
    maxlength: {
        feilmelding: "Teksten er for lang",
    },
    minlength: {
        feilmelding: "Teksten er for kort",
    },
    modalvindu: {
        lukk: "Lukk modalvindauge",
    },
    navytelser: {
        infotekst: {
            tekst: "Vi har registrert følgjande opplysningar:",
        },
        sporsmal: "Utbetalingar frå NAV",
        tittel: {
            infotekst: {
                tekst: "Vi har registrert følgjande opplysningar:",
            },
            sporsmal: "Utbetalte ytingar frå NAV siste månad",
        },
    },
    nedetid: {
        alertstripe: {
            avbryt: "Grunna teknisk vedlikehald kan du ikkje sende digital søknad om økonomisk sosialhjelp i tidsrommet frå {{nedetidstart}} til {{nedetidslutt}}.",
            ettersendelse:
                "Grunna teknisk vedlikehald er digital søknad om økonomisk sosialhjelp utilgjengeleg i tidsrommet frå {{nedetidstart}} til {{nedetidslutt}}. Kontakt ditt lokale NAV-kontor dersom du skal ettersende opplysningar for søknaden i denne perioden.",
            infoside:
                "Grunna teknisk vedlikehald er det ikkje mogleg å sende digital søknad i tidsrommet frå {{nedetidstart}} til {{nedetidslutt}}. Kontakt ditt lokale NAV-kontor dersom du skal søkje om økonomisk sosialhjelp i dette tidsrommet.",
            send: "Grunna teknisk vedlikehald er det ikkje mogleg å sende digital søknad i tidsrommet frå {{nedetidstart}} til {{nedetidslutt}}. Kontakt ditt lokale NAV-kontor dersom du skal søkje om økonomisk sosialhjelp i dette tidsrommet.",
        },
    },
    opplasting: {
        avbryt: "Avbryt",
        feilmelding: {
            duplikat:
                "Dokumentet du lasta opp, er eit duplikat av eit dokument du allereie har lasta opp. Last opp eit anna dokument.",
            feiltype: "Opplastinga mislukkast. Du kan berre laste opp filer i JPG-, PNG- eller PDF-format.",
            konvertering: "Konvertering av dokumentet mislukkast. Prøv å laste opp dokumentet på nytt.",
            makssider: "Opplastinga mislukkast. Du kan laste opp maks. 10 sider",
            maksstorrelse:
                "Opplastinga mislukkast fordi fila var for stor. Du kan berre laste opp filer på under 10 MB",
            manglerVedlegg: "Du må leggje til eit vedlegg.",
            pdf: {
                applepreview:
                    "Dokumentet du lasta opp, har ugyldig format frå Mac. Vel først «Arkiv» i Førehandsvisning-menyen, og vel deretter «Eksporter …». Vel formatet «JPG» på nedtrekksmenyen. Deretter kan du laste opp skjemaet på nytt frå der du lagra det.",
                kryptert:
                    "Dokumentet du lasta opp, er beskytta med passord. Lagre dokumentet utan passord, eller skriv det ut og skann det inn på nytt. Last det så opp på nytt igjen.",
            },
        },
        ferdig: "Legg ved søknaden",
        lastopp: "Last opp",
        leggtil: "Legg til",
        slett: {
            siden: "Slett sida",
        },
    },
    opplysninger: {
        arbeid: {
            sporsmal: "Arbeid og utdanning",
        },
        arbeidsituasjon: {
            infotekst: {
                tekst: "Vi har registrert følgjande opplysningar:",
            },
            kommentarer: {
                description: 'Døme på tekst: "Eg er arbeidsledig" eller "Eg jobbar 50% hos Arbeidsgiveren AS".',
                label: "Dersom opplysningane ikkje stemmer, ber vi om at du skriv ei kort forklaring om situasjonen din.",
            },
        },
        bosituasjon: {
            eier: {
                sporsmal: "Då du har svart at du eig bustad, ber vi om at du dokumenterer",
            },
            sporsmal: "Busituasjon",
        },
        ekstrainfo: {
            sporsmal: "Ønskjer du å leggje til andre utgifter?",
        },
        familiesituasjon: {
            barnebidrag: {
                begge: {
                    betaler: {
                        label: "Betaler",
                    },
                    mottar: {
                        label: "Får",
                    },
                    sporsmal: "Kor mykje får og betaler du i barnebidrag per månad?",
                },
            },
            sporsmal: "Familiesituasjon",
        },
        fjern: "Fjern",
        formue: {
            annen: {
                undertittel: "Annan formue",
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
                "Vi ser at du ikkje har svart på spørsmål om utgiftene dine. For at vi skal kunna vurdera søknaden din så raskt som mogleg, er det viktig at du gir oss så mange opplysningar som mogleg.",
            avsnitt2:
                "Du kan leggja ved dokumentasjon saman med søknaden din, eller levera dette etter du har sendt inn søknaden.",
            melding:
                "Vi ser at du ikkje har svart på spørsmål om utgiftene dine. For at vi skal kunna vurdera søknaden din så raskt som mogleg, er det viktig at du gir oss så mange opplysningar som mogleg.",
            tittel: "Manglande økonomiske opplysningar",
        },
        informasjon: {
            avsnitt1: "Her kan du føre inn inntekter og utgifter, og leggje ved vedlegg til søknaden din.",
            avsnitt2:
                "Du kan leggja ved dokumentasjon saman med søknaden din, eller levera dette etter du har sendt inn søknaden.",
            lenke: "Treng du hjelp til å senda dokumentasjon?",
            modal: {
                bolk1: {
                    avsnitt1: "Då kan du gjerne sjekka om dokumentet er under 10 MB, eller er låst med passord.",
                    tittel: "Godtek vi ikkje dokumentasjonen du prøver å senda inn?",
                },
                bolk2: {
                    avsnitt1:
                        "Har du dokumentasjon på papir, kan du skanna det og senda det digitalt. Ved å skanna dokumentasjonen blir kvaliteten betre, slik dei er lettare å lesa.",
                    avsnitt2:
                        "Med ein skanne-app kan du bruka kameraet på mobiltelefonen din til å skanna dokumentasjonen. Du kan samla fleire papirsider til eitt digitalt vedlegg, til dømes husleigekontrakten din.",
                    avsnitt3:
                        "Du kan også ta bilete av dokumentasjonen du har på papir med mobiltelefonen din. Bileta kan du leggja ved når du sender vedlegg frå mobilen. Viss du bruker datamaskin, kan du senda bileta til deg sjølv på e-post først, og så lasta dei opp på nav.no.",
                    tittel: "Dokumentasjon du har på papir",
                },
                bolk3: {
                    avsnitt1:
                        "Hvis du skal senda dokumentasjon frå ei anna nettside, kan du lasta ned dokumentet først viss det er mogleg. Til dømes er skattemeldinga og vedtak frå Lånekassen tilgjengeleg for nedlasting som PDF. Du bør unngå å ta bilete av PC-skjermen med eit kamera.",
                    tittel: "Dokumentasjon frå andre nettsider",
                },
                bolk4: {
                    avsnitt1:
                        "Det er viktig at du sjekkar at dokumentasjonen du lastar opp er fullstendige og kan lesast. Viss det er vanskeleg å lesa opplysningane, kan du bli bede om å senda dei på nytt.",
                    tittel: "Sørg for at dokumentasjonen du sender kan lesast",
                },
                overskrift: "Treng du hjelp til å senda dokumentasjon?",
            },
            stringValue:
                'Her fører du inn det du har av inntekter og utgifter. Felta under er baserte på opplysningar du har gitt undervegs i søknaden. Det er viktig at du så langt som råd svarer på alle spørsmåla om økonomisk situasjon, og dokumenterer opplysningane du gir. Dersom du har vedlegg på papir, kan du skanne dei eller <a href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/ta-bilde-av-vedleggene-med-mobilen" target="_blank">ta bilete av vedlegga med mobiltelefon</lenke>. Dersom du ikkje har alle vedlegga no, kan du laste opp det som manglar, etter at du har sendt søknaden. Du kan også sende opplysningane i posten eller levere dei til NAV-kontoret ditt.',
        },
        inntekt: {
            bankinnskudd: {
                belop: {
                    leggtil: "Legg til saldo",
                    saldo: {
                        label: "Saldo",
                    },
                    sporsmal: "Kva er saldoen på andre bankkontoar eller spareordningar du har?",
                },
                livsforsikringssparedel: {
                    leggtil: "Legg til saldo",
                    saldo: {
                        label: "Saldo",
                    },
                    sporsmal: "Kva er saldoen på livsforsikringa di med sparedel?",
                },
                verdipapirer: {
                    saldo: {
                        label: "Saldo",
                    },
                    sporsmal: "Kva er saldoen på aksjane, obligasjonane eller fonda dine?",
                },
            },
            eierandeler: {
                annet: {
                    sporsmal: "Då du har svart at du eig anna av verdi, ber vi om at du dokumenterer",
                },
                bolig: {
                    sporsmal: "Då du har svart at du eig bustad, ber vi om at du dokumenterer",
                },
                campingvogn: {
                    sporsmal: "Då du har svart at du eig campingvogn og/eller båt, ber vi om at du dokumenterer",
                },
                fritidseiendom: {
                    sporsmal: "Då du har svart at du eig fritidseigedom, ber vi om at du dokumenterer",
                },
                kjoretoy: {
                    sporsmal: "Då du har svart at du eig køyretøy, ber vi om at du dokumenterer",
                },
            },
            inntekter: {
                annen: {
                    leggtil: "Legg til utbetaling",
                    sporsmal: "Du har svart at du har fått andre utbetalingar",
                    sum: {
                        label: "Sum",
                    },
                },
                forsikring: {
                    sporsmal: "Kor mykje har du fått i forsikringsutbetalingar?",
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
                    "Vi ber om at du lastar opp registreringsbevis/opphaldsløyve som dokumenterer opphaldet i Noreg.",
            },
            sporsmal: "Statsborgarskap",
        },
        utgifter: {
            barn: {
                annenBarneutgift: {
                    sisteregning: {
                        label: "Beløp siste rekning",
                    },
                    sporsmal: "Kva andre utgifter har du til barn?",
                    type: {
                        label: "Type utgift",
                    },
                },
                barnFritidsaktiviteter: {
                    sisteregning: {
                        label: "Beløp siste rekning",
                    },
                    sporsmal: "Kva utgifter har du til fritidsaktivitetar for barn?",
                    type: {
                        label: "Beskriving av aktivitet",
                    },
                },
                barnTannregulering: {
                    sisteregning: {
                        label: "Beløp siste rekning",
                    },
                    sporsmal: "Kor mykje betaler du for tannregulering for barn?",
                },
            },
            boutgift: {
                annenBoutgift: {
                    sisteregning: {
                        label: "Beløp buutgift",
                    },
                    sporsmal: "Kva andre buutgifter har du?",
                    type: {
                        label: "Type buutgift",
                    },
                },
                kommunalAvgift: {
                    sisteregning: {
                        label: "Beløp siste rekning",
                    },
                    sporsmal: "Kor mykje betaler du i kommunale avgifter?",
                },
            },
            sporsmal: "Utgifter og gjeld",
        },
        vedlegg: {
            alleredelastetopp: "Eg har levert dokumentet tidlegare",
            feil: {
                footer: "Problemet er blitt loggført og vil bli undersøkt.",
                konvertering:
                    "Ein teknisk feil oppstod ved konvertering av vedlegget ditt til PDF. Vennleg prøv igjen senere, eller forsøk å laste opp i et annet format (vi foreslår PDF)",
                kryptering:
                    "Vi støttar diverre ikkje Passordbeskytta PDF-filer. Vennleg last opp ein PDF uten passord (forsøk å åpne den og skrive ut som PDF)",
                retry: "Prøv på nytt",
                tittel: "Beklager, det oppstod ein feil",
                ukjent: "Ein ukjend feil oppstod i behandling av dette vedlegget. Vennleg prøv igjen seinare.",
            },
            knapp: {
                tekst: "Last opp",
            },
            ugyldig:
                "Dokumentet du prøvde å laste opp, er større enn 10 MB eller i eit ugyldig filformat. Last opp ei PDF-, PNG- eller JPEG- fil på under 10 MB.",
            ukjent_feil: "Feil: Dokumentet blei ikkje lasta opp.",
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
            tittel: "Barn det blir søkt om barnetillegg for",
        },
        bekreftOpplysninger:
            "<p>Eg er kjend med at eg kan miste retten på stønad dersom opplysningane eg oppgir, ikkje er rette og fullstendige. Eg er også klar over at kan eg bli meld til politiet og måtte betale tilbake pengar eg har fått utbetalt utan å ha rett på. Vidare er eg kjend med og samtykkjer til at NAV kan innhente opplysningar som er nødvendige for å behandle søknaden.</p>",
        bekreftelse: {
            feilmelding: "Du må stadfeste at du er kjend med innhaldet i punktet over",
        },
        bor: "bur i",
        datotil: "til",
        eSoknad: "e-søknad",
        egennaering: {
            arbeidstimerIUken: "Eg jobbar {{0}} timar i veka",
            fordelingAvInntekt: "Fordeling av inntekter frå gardsbruket",
            gaardsEiere: "Eigarar av gardsbruket",
            typeGaardsbruk: "Type gardsbruk",
        },
        feilmelding: {
            bekreftmangler: "Du må stadfeste før søknaden kan sendast inn.",
        },
        fodt: "fødd",
        gatilbake: "Gå tilbake for å endre",
        ikkeutfylt: "ikkje fylt ut",
        ingenBarn: "Søkjer ikkje om barnetillegg",
        inntekt: "inntekt på",
        seVedlegg: "Sjå vedlegg",
        send: "Send inn søknad",
        sendesAvAndre: "Andre sender det for meg",
        sendesIkke: "Eg sender det ikkje",
        sendesIkkeSendesAvAndre: "Blir ikkje sendt / blir sendt av andre",
        sendesSenere: "Blir ettersendt",
        side: "side",
        sideAvTotal: "av",
        sider: "sider",
        systemdataendret: {
            true: "Du bør lese ekstra nøye gjennom søknaden. Opplysningar vi har henta inn om deg, har endra seg sidan sist. Det kan vere nye krav til vedlegg.",
        },
        tittel: "Oppsummering",
        vedlegg: {
            dokument: "Dokument lastet opp:",
            ingen: "Ingen vedlegg",
            tittel: "Vedlegg",
        },
        vedleggAlleredeSendt: "Eg har sendt det med tidlegare søknad",
    },
    organisasjonsnummer: {
        forfaatall: {
            feilmelding: "Organisasjonsnummeret må bestå av 9 tal",
        },
        format: {
            feilmelding: "Organisasjonsnummeret kan berre bestå av 9 tal",
        },
        leggtil: "Legg til fleire organisasjonsnummer",
        slett: "Slett",
    },
    pattern: {
        feilmelding: "Teksten inneheld ugyldige teikn",
    },
    personalia: {
        bosted: {
            oppsummering: "Når du har fylt ut søknaden, blir han send til",
        },
        bostedsadresse: "Bustadsadresse",
        bydel: {
            default: "Vel bydel",
            label: "I kva bydel?",
        },
        co: "c/o:",
        ferdig: "Ferdig med personalia",
        fnr: "Fødselsnummer",
        folkeregistrertadresse: "Folkeregistrert adresse",
        gyldigTil: "Gyldig til:",
        informasjon:
            "For at vi skal kunne sende søknaden din til rett NAV-kontor, må vi vite kor du bur eller oppheld deg.",
        ingenadresse: "Du har ikkje mellombels adresse i Noreg eller utlandet",
        intro: {
            tekst: "Din profil",
            stringValue:
                "NAV har registrert følgjande kontaktinformasjon. Dersom denne ikkje stemmer, kan du leggje til ei mellombels adresse i {{0}}. Der kan du også leggje inn eller endre kontonummer og telefonnummer.",
        },
        kommune: {
            default: "Vel by",
            label: "I kva kommune bur eller oppheld du deg?",
        },
        kontonummer: {
            ikkeRegistrert:
                "Kontonummeret ditt er ikkje registrert hos oss, og vi anbefaler difor at du legg det inn i Din profil.",
            stringValue: "Kontonummer",
        },
        kvinne: "kvinne",
        mann: "mann",
        midlertidigAdresseNorge: "Mellombels adresse i Noreg",
        midlertidigAdresseUtland: "Mellombels adresse i utlandet",
        navn: "Namn:",
        postboks: "Postboks",
        tittel: "Personalia",
        utenlandskstatsborger: {
            statsborgerskap: {
                informasjon:
                    "Du er ikkje registrert som nordisk statsborgar. Dersom du er EØS-borgar, må du leggje ved registreringsbevis for EØS-borgarar. Dette kan du få hos politiet. Dersom du ikkje er frå eit EØS-land, må du leggje ved opphalds- og arbeidsløyve. Dette får du hos UDI (Utlendingsdirektoratet).",
            },
        },
    },
    personaliabolk: {
        tittel: "Personopplysningar",
    },
    saksoversikt: {
        mottaker: {
            deg: "Deg",
            nav: "NAV",
        },
        soknadsnavn: {
            ettersending: "Ettersending av vedlegg til søknad om økonomisk sosialhjelp",
            stringValue: "Søknad om økonomisk sosialhjelp",
        },
        temanavn: "Sosialhjelp",
    },
    select: {
        required: {
            feilmelding: "Du må gi eit svar",
        },
        ugyldig: {
            feilmelding: "Du må velje eit element på lista",
        },
    },
    sendsoknadfeilet: {
        melding:
            "Det oppstod ein feil då søknaden skulle sendast inn. Du kan lukke denne meldinga og prøve på nytt. Dersom feilen varer ved, kan du gå tilbake til denne sida og prøve på nytt seinare.",
        tittel: "Innsendinga mislukkast",
    },
    sendtSoknad: {
        sendEpost: {
            epostInnhold:
                "Du har sendt ein søknad til NAV. Dersom du skal ettersende vedlegg til søknaden, kan du bruke denne lenkja: {{1}}. Hugs at du må ettersende vedlegg innan fristen som er sett. Når fristen har gått ut, behandlar vi søknaden med dei opplysningane vi har, og du kan få avslag på grunn av manglande opplysningar. Du kan også følgje søknaden din i saksoversikta på Mi Side for å sjå når han er ferdigbehandla (sjå {{0}}). Vennleg helsing NAV",
            epostSubject: "Du har sendt ein søknad til NAV",
        },
    },
    sistLagret: {
        aldriLagret: "Søknaden er ikkje lagra",
        lagret: "Sist lagra",
    },
    situasjon: {
        kategorier: {
            oppsummeringstekst: {
                label: "Du har valgt:",
                resten: "Eg søkjer om penger til:",
            },
        },
        kort: {
            dokumentasjon: {
                description: "Her kan du laste opp annan dokumentasjon du tenkjar er viktig for søknaden.",
                title: "Dokumentasjon av endringa",
            },
            endring: {
                description: "Til dømes inntekter, utgifter, familiesituasjon eller busituasjon.",
                legend: "Har noko i situasjonen din endra seg sidan du søkte sist?",
            },
            hvaErEndret: {
                description:
                    "Har noko endra seg sidan førre gong du søkte, eller vil du fortelje meir om kva du søkjer om pengar til?",
                label: "Kva er situasjonen din?",
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
                feilmeldinger: "Tal på feil i skjemaet:",
            },
            gaatil: {
                forrige: "Førre feil",
                neste: "Neste feil",
            },
            lukk: {
                aria: "Lukk feilmeldingoversikt",
                stringValue: "Lukk",
            },
        },
        feilmeldinger: {
            feilkode: "Feilkode",
            number404: "Vi finn ikkje sida du prøver å opne.",
            tilbake: "Tilbake",
            tittel: "VI BEKLAGAR, MEN NOKO GJEKK GALE",
        },
        ferdig: "Gå vidare til vedlegg",
        knapper: {
            avbryt: "Avbryt",
            forrige: "Førre steg",
            neste: "Neste steg",
            send: "Send søknaden",
        },
        sensitivadvarsel: "Ikkje legg inn helseopplysningar eller andre sensitive personopplysningar",
        tittel: "Søknad om økonomisk sosialhjelp",
    },
    slett: {
        informasjon: "Alt du har gjort, vil bli sletta, og søknaden blir ikkje send til NAV",
        tittel: "Bekreft at du ønskjer å slette søknaden",
    },
    slettet: {
        informasjon:
            "Søknaden og alle vedlegg er sletta. Dersom du ombestemmer deg og ønskjer å sende søknaden likevel, må du gå tilbake til skjemarettleiaren og starte på nytt.",
        skjemaveileder: "Til skjemarettleiaren",
        tittel: "Søknaden er sletta",
    },
    soknad: {
        ferdigstilt: "Søknaden er allereie send.",
    },
    soknadsmottaker: {
        enhetsnavn: {
            label: "NAV-kontor",
        },
        hjelpetekst: {
            ingress:
                "Viss du oppheld deg på ein institusjon, til dømes på sjukehus eller i fengsel, skriv den siste adressa di før du kom til institusjonen.",
            tekst: "For at søknaden skal bli send til rett NAV-kontor, må du oppgi adressa du bur på.",
        },
        infotekst: {
            tekst: "Oppgi adressa du bur på (obligatorisk)",
        },
        kommunenavn: {
            label: "Kommune",
        },
        sporsmal: "Adressa di",
    },
    soknadsmottakerbolk: {
        tittel: "Søknadsmottakar",
    },
    soknadsosialhjelp: {
        ettersending: {
            kvittering: {
                tittel: "Ettersending av vedlegg",
            },
        },
        forstesiden: {
            bekreftInfoModal: {
                body: '<h3>Informasjon</h3><p>Når du søkjer om økonomisk sosialhjelp digitalt, må du gi opplysningar om deg sjølv, slik at NAV-kontoret kan behandle søknaden din. Døme på opplysningar er busituasjon, formue og utgifter.</p><p>I tillegg hentar NAV opplysningar frå offentlege register på vegner av kommunen som skal behandle søknaden din.</p></br><p>Du kan vere trygg på at personopplysningane dine blir behandla på ein sikker og korrekt måte:</p><ul><li>Vi skal ikkje hente inn fleire opplysningar enn det som er nødvendig.</li><li>Hos NAV har vi teieplikt om opplysningane vi behandlar. Dersom offentlege verksemder eller andre ønskjer å få utlevert opplysningar om deg, må dei ha heimel i lov eller samtykke frå deg.</li></ul><h4>Innhenting av personopplysningane dine</h4><p>Du fyller sjølv inn opplysningar om deg i søknaden din. I tillegg hentar vi opplysningar frå register som NAV har lov til å hente informasjon frå:</p></br><ul><li>Opplysningar om statsborgarskap, adresse og familieforhold frå Folkeregisteret.</li><li>Opplysningar om kontonummer.</li><li>Opplysningar om telefonnummer frå Kontakt- og reservasjonsregisteret.</li><li>Opplysningar om arbeidsforhold frå Arbeidsgivar- og arbeidstakarregisteret.</li><li>Opplysningar om statlege ytingar frå NAV.</li></ul></br><p>Dersom du gir samtykke til dette i søknaden din, hentar vi i tillegg opplysningar om skattbare inntekter frå Skatteetaten, og opplysningar om bustøtte frå Husbanken.</p><h4>Formålet med å samle inn og bruke personopplysningar</h4><p>Formålet med søknaden er å samle inn tilstrekkeleg opplysningar til at kommunen kan behandle søknaden din om økonomisk sosialhjelp. Opplysningar du gir i den digitale søknaden, blir sende digitalt frå nav.no til NAV-kontoret ditt saman med andre opplysningar som er henta inn. Det blir enklare for deg å søkje, og NAV-kontoret ditt får søknaden ferdig utfylt med nødvendige vedlegg.</p></br><p>Opplysningane i søknaden din vil bli brukt til å vurdere om du oppfyller vilkåra for økonomisk sosialhjelp, og skal ikkje lagrast lenger enn det som er nødvendig ut frå formålet. Dersom opplysningane ikkje skal oppbevarast etter arkivlova eller andre lover, skal dei slettast etter bruk.</p><h4>Lovgrunnlaget</h4><p>Lovgrunnlaget for å samle inn informasjon i samband med søknaden din er lov om sosiale tenester i Arbeids- og velferdsforvaltinga.</p><h4>Behandlingsansvarleg</h4><p>Det er opphaldskommunen din som har ansvaret for å behandle søknaden og personopplysningane dine.</p></br><p>Kontakt kommunen dersom du har spørsmål om personopplysningar. Kommunen har også eit personvernombod du kan kontakte.</p></br><p>Arbeids- og velferdsdirektoratet har ansvaret for nav.no, og er databehandlar på vegner av kommunen. Her kan du lese meir om <a href="https://www.nav.no/personvern-sikkerhet-navno" class="lenke" target="_blank" rel="noreferrer noopener">personvern og tryggleik på nav.no</a>.</p><h4>Lagring av personopplysningane dine</h4><h5>Før du sender søknaden, blir opplysningane lagra på nav.no</h5><p>Søknader som er påbyrja, men ikkje fullførte, blir lagra hos Arbeids- og velferdsdirektoratet i to veker. Deretter blir dei sletta.</p><h5>Etter at du har sendt søknaden, har kommunen ansvaret for opplysningane om deg </h5><p>Når du sender søknaden din, bruker vi skytenesta til KS (Kommunesektorens organisasjon) for digital post (Svarut). Kommunen hentar søknaden din i Svarut, og lagrar opplysningane i sitt kommunale fagsystem. Kommunen din har ansvaret for lagring og sletting av opplysningane dine både i Svarut og i fagsystemet . Arkivlova bestemmer kor lenge opplysningar skal lagrast. Kontakt kommunen din dersom du har spørsmål om lagringstid.</p><h4>Rettar som registrert</h4><p>Personopplysningslova slår fast at alle har rett på å få informasjon om og innsyn i eigne personopplysningar.</p><p>Dersom det er lagra opplysningar om deg som er feil, ufullstendige eller unødvendige, gir personopplysningslova deg rett til å krevje at desse blir retta eller supplerte. </br> I særlege tilfelle kan du også be om å få opplysningane sletta. Kommunen er i enkelte tilfelle lovpålagd å lagre opplysningane som dokumentasjon. Slike krav skal behandlast kostnadsfritt og seinast innan 30 dagar.</p></br><p>Du har også fleire personvernrettar, derimellom <strong>rett til avgrensing</strong>: Du kan i enkelte tilfelle ha rett å krevje at behandlinga av personopplysningane dine blir avgrensa. Dersom du har ein slik rett, vil opplysningane bli lagra, men ikkje brukt.</p><p>Du har også <strong>rett til å protestere</strong> mot behandling av personopplysningar: Dette inneber at du i enkelte tilfelle kan protestere mot det som elles er lovleg behandling av personopplysningar hos kommunen. Behandlinga må då stansast. Dersom du får medhald, vil opplysningane eventuelt bli  sletta.</p></br><p>På nettsidene til Datatilsynet finn du ei samla oversikt over <a href="https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/" class="lenke" target="_blank" rel="noreferrer noopener">rettane dine</a>. Kommunen din vil også ha informasjon om behandling av personopplysningar på nettsidene sine.</p><p>Kontakt NAV-kontoret ditt dersom du har spørsmål som gjeld behandlinga av personopplysningane dine.</p><h4>Klagerett til Datatilsynet</h4><p>Du har rett til å klage til Datatilsynet dersom du ikkje er nøgd med korleis vi behandlar personopplysningar om deg, eller dersom du meiner at behandlinga er i strid med personvernreglane. På nettsidene til Datatilsynet kan du lese meir om <a href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/" class="lenke" target="_blank" rel="noreferrer noopener">korleis du klager</a>.</p>',
            },
            bekreftOpplysninger: "Eg stadfestar å ha lest og forstått informasjonen om samtykke",
            rettigheterPlikter:
                "Søknader som er påbyrja, men ikkje fullførte, blir lagra på nav.no i to veker. Deretter blir dei sletta. Les om",
            rettigheterPlikterLinktekst: "personvernrettane dine.",
        },
        oppsummering: {
            bekreftInfoModal: {
                body: "<p> Eg samtykkjer til at opplysningane eg har gitt i denne søknaden, kan sendast over til {{kommuneNavn}} kommune ved NAV {{navKontorNavn}} saman med opplysningar som er henta inn frå andre register i tråd med gjeldande regelverk. Dette for at NAV-kontoret skal kunne behandle søknaden min om økonomisk sosialhjelp. {{kommuneNavn}} kommune kan ikkje utlevere opplysningane mine til andre, med mindre det blir gjort etter heimel i lov eller samtykke frå meg. </p> <p> Samtykket til å hente inn opplysningar og dele desse med kommunen, gjeld berre i samband med behandling av denne søknaden.</p> <p> Eg er informert om at opplysningane blir lagra i saksbehandlingssystemet til {{kommuneNavn}} kommune ved NAV {{navKontorNavn}}. I tillegg er eg informert om at eg kan krevje innsyn i desse opplysningane og eventuelt krevje å få dei sletta eller korrigert. Eg er innforstått med at det er frivillig å gi dette samtykket, og at eg kan trekkje det tilbake når eg måtte ønskje det. Dersom eg ønskjer å trekkje tilbake samtykket, vil eg kontakte {{kommuneNavn}} kommune ved NAV {{navKontorNavn}}. </p> <p> Dersom du ikkje ønskjer å gi samtykke som beskrive over, tek du kontakt med ditt lokale NAV-kontor og fyller ut eit manuelt søknadsskjema. </p>",
                title: "Samtykke om personopplysningar for denne søknaden",
            },
            bekreftOpplysninger:
                "Du kan miste retten til stønad dersom opplysningane du gir ikkje er riktige eller fullstendige. NAV kan halde igjen eller krevje tilbake pengar. Å gje feil opplysningar kan vere straffbart.",
            bekreftelse: {
                ny: {
                    label: "Vi stolar på deg",
                },
            },
            harLestSamtykker: "Eg stadfestar at opplysningane eg har gitt, stemmer.",
            hvorsendes_del1: "Søknaden din blir send til {{valgtEnhetsNavn}}.",
            hvorsendes_del2:
                "NAV-kontoret skal behandla søknaden din så fort som mogleg. Dei tek kontakt viss dei treng noko frå deg!",
            infoSamtykke: "informasjon om personvernrettane dine",
            samtykke: {
                oversendelse: {
                    pdf: "Før du kan gå i gang med å fylle ut søknaden, må du stadfeste å ha lest og forstått informasjonen om samtykke. Eg stadfestar å ha lest og forstått informasjonen om samtykke. For å kunne søkje om økonomisk sosialhjelp digitalt må du samtykkje til at opplysningane du sjølv oppgir, kan oversendast – saman med andre opplysningar som blir innhenta etter gjeldande regelverk – til NAV-kontoret i kommunen din for endeleg saksbehandling. Du vil heile tida kunne sjå kva opplysningar NAV hentar inn i søknaden din. Når du har fylt ut og skal sende inn søknaden, blir du beden om å stadfeste ei samtykkeerklæring for oversending til ditt lokale NAV-kontor. Dersom du veit allereie no at du ikkje ønskjer å gi samtykke til at søknaden blir send til ditt lokale NAV-kontor, kontaktar du NAV-kontoret ditt for å fylle ut eit manuelt søknadsskjema.",
                },
                sannferdig: {
                    pdf: "Eg samtykkjer til at opplysningane eg har gitt i denne søknaden, kan sendast over til mitt lokale NAV-kontor saman med opplysningar som er henta inn frå andre register i tråd med gjeldande regelverk. Dette for at NAV-kontoret skal kunne behandle søknaden min om økonomisk sosialhjelp. Kommunen kan ikkje utlevere opplysningane mine til andre, med mindre det blir gjort etter heimel i lov eller samtykke frå meg. Samtykket til å hente inn opplysningar og dele desse med kommunen, gjeld berre i samband med behandling av denne søknaden. Eg er informert om at opplysningane blir lagra i saksbehandlingssystemet til det lokale NAV-kontoret. I tillegg er eg informert om at eg kan krevje innsyn i desse opplysningane og eventuelt krevje å få dei sletta eller korrigert. Eg er innforstått med at det er frivillig å gi dette samtykket, og at eg kan trekkje det tilbake når eg måtte ønskje det. Dersom eg ønsker å trekkje tilbake samtykket, kontaktar eg det lokale NAV-kontoret.",
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
        veiledning: "Rettleiing",
    },
    system: {
        familie: {
            barn: {
                antall: {
                    sporsmal: "Tal på registrerte barn under 18 år",
                },
                sporsmal: "Vi har registrert at du har barn",
                tittel: "Barn",
                true: {
                    barn: {
                        deltbosted: {
                            hjelpetekst: {
                                tekst: "Delt bustad betyr at barnet bur fast hos begge foreldra etter eit samlivsbrot. Foreldra har i dette tilfellet inngått ein avtale om delt bustad, eller ein domstol har bestemt at barnet skal dele bustad mellom foreldra. Dette inneber at barnet bur (omtrent) like mykje hos kvar av foreldra, og begge må vere samde i avgjerder som gjeld kvardagen til barnet. Delt bustad er ikkje det same som at barnet har samvær med kvar av foreldra halvparten av tida.",
                            },
                            sporsmal: "Har barnet delt bustad?",
                        },
                        etternavn: {
                            label: "Etternamn",
                        },
                        fodselsdato: {
                            label: "Fødselsdato (ddmmåååå)",
                        },
                        folkeregistrertsammen: {
                            sporsmal: "Barnet har same folkeregistrerte adresse som deg",
                        },
                        fornavn: {
                            label: "Fornamn",
                        },
                        grad: {
                            label: "Kor mykje samvær har du med barnet?",
                            pattern: "Samværsgrad i %",
                            sporsmal: "Kor mykje samvær har du med barnet?",
                        },
                        mellomnavn: {
                            label: "Mellomnamn",
                        },
                        pattern: "",
                        sporsmal: "Opplysningar om barn",
                    },
                    listetittel: "Opplysningar om barn",
                },
                empty: "Vi fann ingen barn registrert på deg",
            },
            sivilstatus: {
                diskresjonskode: "Ektefelle/partnar har diskresjonskode",
                enke: "Enkje/enkjemann",
                gift: {
                    ektefelle: {
                        etternavn: {
                            label: "Etternamn",
                        },
                        fodselsdato: "Fødselsdato",
                        folkereg: "Har same folkeregistrerte adresse som deg",
                        folkeregistrertsammen: {
                            sporsmal: "Folkeregistrert på same adresse som ektefelle",
                        },
                        fornavn: {
                            label: "Fornamn",
                        },
                        mellomnavn: {
                            label: "Mellomnamn",
                        },
                        navn: "Namn",
                        tittel: "Opplysningar om ektefelle",
                    },
                    stringValue: "Gift / registrert partnar",
                },
                ikkeTilgang: {
                    label: "Du er gift eller registrert partnar",
                },
                informasjonspanel: {
                    tekst: "Vi ser på den samla økonomien dykkar når vi vurdera ut økonomisk sosialhjelp. For å gjere dette treng vi opplysningar om situasjonen til ektefellen din. Ektefellen din kan sende inn ein eigen søknad, eller dere kan ta kontakt med det lokale NAV-kontoret.",
                    tittel: "Ektefellar pliktar å forsørgje kvarandre.",
                },
                infotekst: "Opplysningar om ektefelle",
                kilde: "Vi har henta følgjande opplysningar frå Folkeregisteret:",
                label: "Du er gift eller registrert partnar med:",
                samboer: "Sambuar",
                separert: "Separert",
                skilt: "Skilt",
                sporsmal: "Sivilstatusen din",
                ugift: "Ugift",
                stringValue: "(Henta frå Folkeregisteret)",
                empty: "Vi fann ingen registrert ektefelle eller partnar",
            },
        },
    },
    systeminfo: {
        avbrytendringknapp: {
            label: "Angre endringar",
        },
    },
    textarea: {
        feilmleding: "Du er over teikngrensa",
        overmaks: "for mange teikn",
        undermaks: "teikn igjen",
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
        tittel: "Tilleggsopplysingar",
    },
    utbetalinger: {
        infotekst: {
            tekst: {
                url: "https://tjenester.nav.no/utbetalingsoversikt",
                v2: "Detaljert informasjon blir send med søknaden. Du kan sjå detaljane under <lenke>Dine utbetalingar</lenke>.",
            },
        },
        ingen: {
            true: "Vi har ingen registrerte utbetalingar på deg frå NAV den siste månaden.",
        },
        inntekt: {
            fra: "Frå",
            skattbar: {
                avbryt: {
                    ja: "Ja, hent informasjon",
                    nei: "Nei",
                },
                beskrivelse: "Du har henta informasjon om inntekta di frå Skatteetaten.",
                bruttoinntekt: "Inntekt før skatt",
                forskuddstrekk: "Skattetrekk",
                gi_samtykke: "Hent frå Skatteetaten",
                har_gitt_samtykke: "Du har henta informasjon frå Skatteetaten",
                hent: {
                    info: {
                        skatteetaten: "Hent informasjonen frå Skatteetaten",
                    },
                },
                ingen: "Du er ikkje registrert med inntekt hos Skatteetaten for siste månad.",
                inntekt: {
                    tittel: "Inntekt henta frå Skatteetaten",
                },
                mangler_samtykke: "Du har ikkje henta informasjon frå Skatteetaten",
                nettoinntekt: "Inntekt etter skatt",
                oppsummering:
                    "Vi har registrert at du{ antall, plural,=0 { ikkje har hatt }other {har hatt{ antall, plural,=1 {{éi}}=2 {{to}}=3 {{tre}}=4 {{fire}}=5 {{fem}}=6 {{seks}}=7 {{sju}}=8 {{åtte}}=9 {{ni}}=10 {{ti}}=11 {{elleve}}=12 {{tolv}}other {{#}}}}}skattbare inntekter.",
                samtykke_info:
                    "Desse opplysningane kan vere nødvendige for å behandle søknaden. Dersom du ikkje ønskjer at vi hentar inn denne informasjonen om deg, kan du laste opp dokumentasjon på det siste trinnet i søknaden.",
                samtykke_sporsmal_v1: "Vil du hente informasjon om inntekta di frå Skatteetaten?",
                samtykke_sporsmal_v2: "Vil du hente informasjon om inntekta di frå Skatteetaten?",
                skatteetaten: "Sjå detaljar hjå Skatteetaten.",
                ta_bort_samtykke: "Fjern informasjon frå Skatteetaten",
                tidspunkt: "Informasjonen blei henta",
                tittel: "Inntekt",
                undertittel: "Innrapportert inntekt til Skatteetaten",
            },
            til: "til",
        },
        kontaktproblemer: "På grunn av systemfeil, fekk vi ikkje henta inn informasjon om ytingar frå NAV.",
        skattbar: {
            kontaktproblemer:
                "Vi fekk ikkje kontakt med Skatteetaten. Du kan prøve igjen om nokre minutt, eller laste opp opplysningane sjølv på det siste trinnet i søknaden",
        },
        sporsmal: "Ytingar som har blitt utbetalte siste månad",
        utbetaling: {
            andretrekk: {
                label: "Andre trekk",
            },
            arbeidsgivernavn: {
                label: "Namn på arbeidsgivar",
            },
            belop: {
                label: "Beløp",
            },
            brutto: {
                label: "Beløp (brutto)",
            },
            erutbetalt: {
                label: "Utbetalt",
                title: "Ytingar frå NAV",
            },
            netto: {
                label: "Beløp (netto)",
            },
            periodeFom: {
                label: "Frå",
            },
            periodeTom: {
                label: "Til",
            },
            skattetrekk: {
                label: "Skattetrekk",
            },
            sporsmal: "Yting",
            type: {
                label: "Yting",
            },
            utbetalingsdato: {
                label: "Dato",
            },
        },
    },
    utgifter: {
        barn: {
            infotekst: {
                tekst: "Til dømes barnehage, SFO eller fritidsaktivitetar.",
            },
            sporsmal: "Har du utgifter til barn?",
            typer: {
                annet: "Anna",
                barnFritidsaktiviteter: "Fritidsaktivitetar",
                barnTannregulering: "Tannregulering",
                barnehage: "Barnehage",
                fritidsaktivitet: "Fritidsaktivitetar",
                fritidsaktiviteter: "Fritidsaktivitetar",
                helse: "Helse",
                sfo: "SFO (skulefritidsordning)",
                sporsmal: "Kva utgifter dreier det seg om?",
                tannbehandling: "Tannregulering",
                tannregulering: "Tannregulering",
            },
        },
        boutgift: {
            infotekst: {
                tekst: "Til dømes husleige eller straum.",
            },
            sporsmal: "Har du bukostnader?",
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
                    avdraglaan: "Avdrag og renter på bustadlån",
                    boliglan: "Avdrag og renter på bustadlån",
                    boliglanAvdrag: "Avdrag og renter på bustadlån",
                    feilmelding: "Du må oppgi kva utgifter du har til bustad",
                    husleie: "Husleige",
                    kommunalAvgift: "Kommunale avgifter",
                    kommunaleavgifter: "Kommunale avgifter",
                    oppvarming: "Ved, gass eller fjernvarme",
                    sporsmal: "Kva betaler du for der du bur?",
                    strom: "Straum",
                },
            },
        },
        tittel: "Utgifter og gjeld",
    },
    utgifterbolk: {
        tittel: "Utgifter og gjeld",
    },
    validering: {
        adresseMangler: "Du må velje ei gyldig adresse før du kan gå vidare",
        erFdato: "Ugyldig dato",
        erFdatoEtterIdag: "Fødselsdatoen til kan ikkje vere etter dags dato",
        erKontonummer: "Ugyldig kontonummer",
        erSamvaersgrad: "Samværsgraden må vere mellom 0 og 100 %",
        erTall: "Ugyldig tal. Legg inn eit heiltal.",
        erTelefonnummer: "Ugyldig telefonnummer",
        feltEksistererIkke:
            "Vi kunne ikkje oppdatere feltet. Det kan vere at du har gjort endringar i søknaden. Oppdater denne sida og prøv på nytt.",
        filEksistererIkke:
            "Vi kunne ikkje laste opp vedlegget. Det kan vere at du har gjort endringar i søknaden. Oppdater denne sida og prøv på nytt.",
        maksLengde: "Du er over teikngrensa.",
        minLengde: "For få teikn.",
        pakrevd: "Må fyllast ut",
        tittel: "Du må fiksa desse feila før du kan halda fram.",
    },
    vedlegg: {
        K7: {
            tittel: "Stadfesting av på samling",
        },
        L7: {
            null: {
                tittel: "Kvittering på innsend søknad",
            },
        },
        annet: {
            annet: {
                info: "Dersom du har andre vedlegg du vil at vi skal sjå på, kan du laste dei opp her",
                tittel: "Andre opplysingar",
            },
            beskrivelse: {
                sporsmal: "Kva legg du ved (maks. 25 teikn)?",
            },
            ikkelastetopp: {
                feilmelding: "Du må laste opp vedlegget",
            },
            inlinefeilmelding: "Du må laste opp vedlegget",
            navn: {
                feilmelding: "Du må gi ei beskriving av vedlegget som inneheld minst tre teikn",
                lengde: {
                    feilmelding: "Beskrivinga må bestå av minst 3 teikn",
                },
            },
            slett: "Slett",
        },
        barnebidrag: {
            betaler: {
                tittel: "Opplysningar om utgifter til barnebidrag",
            },
            mottar: {
                tittel: "Opplysningar om motteke bidrag",
            },
        },
        behandlet: {
            LastetOpp: "Opplasta vedlegg",
            SendesIkke: "Vedlegg blir ikkje sendt",
            SendesSenere: "Vedlegg blir sendt seinare",
            VedleggAlleredeSendt: "Vedlegg er sendt tidlegare",
            VedleggKreves: "Vedlegg er påkravd",
            VedleggSendesAvAndre: "Vedlegg blir sendt av andre",
            VedleggSendesIkke: "Vedlegg blir ikkje sendt",
        },
        dokumentasjon: {
            annetboutgift: {
                tittel: "Opplysningar om andre buutgifter",
            },
            annetinntekter: {
                tittel: "Opplysningar om andre utbetalingar",
            },
            annetverdi: {
                tittel: "Opplysningar om anna av verdi",
            },
            campingvogn: {
                tittel: "Opplysningar om campingvogn og/eller båt",
            },
            forsikringsutbetaling: {
                tittel: "Opplysningar om forsikringsutbetaling",
            },
            fritidseiendom: {
                tittel: "Opplysningar om fritidseigedom",
            },
            kjoretoy: {
                tittel: "Opplysningar om køyretøy",
            },
            utbytte: {
                tittel: "Opplysningar om utbyte",
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
                tittel: "Kvittering/faktura på husleige",
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
                tittel: "Kvittering/faktura på straum",
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
            info: "Sørg for at dokumenta er leselege og viser rett informasjon",
            opplast: "Last opp dokument",
            slett: "Slett",
            tilbake: {
                mobil: "Tilbake",
                stringValue: "Tilbake til førre side",
            },
        },
        husbanken: {
            vedtak: {
                tittel: "Vedtak om bustøtte for siste 2 mnd.",
            },
        },
        husleiekontrakt: {
            husleiekontrakt: {
                tittel: "Husleigekontrakt",
            },
            kommunal: {
                tittel: "Husleigekontrakt",
            },
        },
        infoboks: {
            lastopp: "Dokumenta lastar du opp seinare i søknaden.",
        },
        inlinefeilmelding: "Du må anten laste opp vedlegget eller svare på om du vil leggje det ved seinare",
        kjopekontrakt: {
            kjopekontrakt: {
                tittel: "Kjøpekontrakt",
            },
        },
        kontooversikt: {
            aksjer: {
                tittel: "Saldoutskrift frå VPS-konto",
            },
            annet: {
                tittel: "Opplysningar om andre bankinnskot eller sparing",
            },
            brukskonto: {
                tittel: "Last opp saldoutskrift for brukskonto (på søknadstidspunktet)",
            },
            bsu: {
                tittel: "Saldoutskrift for BSU (på søknadstidspunktet)",
            },
            livsforsikring: {
                tittel: "Last opp opplysningar om livsforsikring",
            },
            sparekonto: {
                tittel: "Saldoutskrift for sparekonto (på søknadstidspunktet)",
            },
        },
        lastned: "Last ned",
        lastopp: "Last opp vedlegget",
        leggtilekstravedlegg: "Legg til ekstra vedlegg",
        leggved: "Legg ved følgjande:",
        lonnslipp: {
            arbeid: {
                tittel: "Lønsslipp (siste månad)",
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
                tittel: "Registreringsbevis eller opphaldsløyve",
            },
        },
        opplasting: {
            feil: {
                filType: "Opplastinga var mislukka. Berre JPEG, PNG, og PDF filer er tillatne.",
                forStor: "Opplastinga var mislukka. Fila kan ikkje vere større enn {{maxUploadSize}}",
                generell: "Opplastinga var mislukka. Prøv igjen.",
                infotekst: "Vedlegget kunne ikkje lastast opp. Prøv igjen eller send vedlegget seinare.",
                muligVirus: "Opplastinga blei stoppa av antivirus-programmet. Du kan prøve på nytt med ei anna fil.",
                samletStorrelseForStor:
                    "Du har lasta opp {{antall}} vedlegg som til saman er på over 150 MB. Det er diverre ikkje mogleg å laste opp fleire vedlegg, men du kan framleis ettersende vedlegga du manglar, etter at søknaden er send.",
            },
            suksess: "Dokumentasjon er lasta opp",
        },
        oppsummering: {
            ikkelastetopp: "Ikkje lasta opp",
            tittel: "Vedlegg",
        },
        salgsoppgjor: {
            eiendom: {
                tittel: "Opplysningar om salsoppgjer",
            },
        },
        samvarsavtale: {
            barn: {
                tittel: "Samværsavtale eller avtale om delt bustad",
            },
        },
        skattemelding: {
            skattemelding: {
                tittel: "Skattemelding og skatteoppgjer",
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
                tittel: "Sluttoppgjer",
            },
        },
        student: {
            vedtak: {
                tittel: "Vedtak frå Lånekassen",
            },
        },
        tittel: "Opplasting av vedlegg",
    },
    backendCompat: {
        jsonOkonomiOpplysningerArbeidAvsluttet: "Sluttoppgjer/feriepengar etter skatt",
        jsonOkonomiOpplysningerArbeidJobb: "Lønnsinntekt",
    },
    arbeidOgFamilie: {
        tittel: "Arbeid og familie",
        alert: "Du får ein ny og kortare søknad sidan du har søkt før. Gi gjerne tilbakemeldingar om søknaden til rettleiaren din.",
    },
};

export default skjema;
