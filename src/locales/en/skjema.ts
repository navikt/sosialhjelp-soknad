export const skjema = {
    aar: "Year",
    endre: "Change",
    forhandsvisning: "Preview",
    forrige: "Previous",
    forstorr: "Zoom in",
    fremdriftsindikator: "Progress indicator",
    hoppTilHovedinnhold: "Go to main content.",
    lagreEndring: "Save change",
    lastopp: "Upload",
    lukk: "Close",
    neste: "Next",
    prosent: "%",
    send: "Submit",
    start: "Start",
    adresse: {
        alertstripe: {
            advarsel: {
                fixme: "Your municipality cannot accept digital applications.",
                utenurl: "{{kommuneNavn}} municipality cannot accept digital applications.",
                v2: "{{kommuneNavn}} municipality cannot accept digital applications.<br/>You can <lenke>apply using a paper form</lenke>.",
            },
            feil: {
                fixme: "Unfortunately, we cannot accept digital applications right now. Apply using a paper form, or try again later.",
                utenurl:
                    "{{kommuneNavn}} municipality cannot accept digital applications right now. Apply using a paper form, or try again later.",
                v2: "{{kommuneNavn}} municipality cannot accept digital applications right now. <lenke>Apply using a paper form</lenke>, or try again later.",
            },
            navKontor: "{{enhetsnavn}}, {{kommunenavn}} municipality.",
            suksess: "Your application will be sent to:",
        },
    },
    adresse_med_fylke: {
        alertstripe: {
            advarsel: {
                utenurl: "{{kommuneNavn}} municipality ({{fylkeNavn}}) cannot accept digital applications.",
                v2: "{{kommuneNavn}} municipality ({{fylkeNavn}}) cannot accept digital applications. You can <lenke>apply using a paper form</lenke>.",
                stringValue:
                    '{{kommuneNavn}} municipality ({{fylkeNavn}}) cannot accept digital applications. You can <a href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">apply using a paper form</lenke>.',
            },
            feil: {
                utenurl:
                    "{{kommuneNavn}} municipality ({{fylkeNavn}}) cannot accept digital applications right now. Apply using a paper form, or try again later.",
                v2: "{{kommuneNavn}} municipality ({{fylkeNavn}}) cannot accept digital applications right now. <lenke>Apply using a paper form</lenke>, or try again later.",
                stringValue:
                    '{{kommuneNavn}} municipality ({{fylkeNavn}}) cannot accept digital applications right now. <a href="https://www.nav.no/sosialhjelp/sok-papir" target="_blank">Apply using a paper form</lenke>, or try again later.',
            },
            suksess:
                "Your application will be sent to: {{navkontorNavn}}, {{kommuneNavn}} municipality ({{fylkeNavn}}).",
        },
    },
    antallvelger: {
        feilmeldinger: {
            forlite: "The number cannot be smaller than {{0}}.",
            forstort: "The number cannot be larger than {{0}}.",
            tall: "You must enter a valid number between {{0}} and {{1}}.",
        },
    },
    applikasjon: {
        advarsel: {
            gjenopptatt:
                "We are working to improve the application, therefore some changes may have been made since the last time you were logged in. Some questions and information may have been added or deleted.",
        },
        fortsett: {
            soknad: "Continue with an application you have started",
        },
        opprettsoknadfeilet: "An error occurred when setting up the application. Please try later",
        paabegynt: {
            soknader_one: "{{count}} started application",
            soknader_other: "{{count}} started applications",
            sistOppdatert: "Last updated",
            slettes: "Will be deleted",
            informasjon:
                "Please note that the started applications will be deleted after {{DAYS_BEFORE_DELETION}} days.",
        },
        sidetittel: {
            kortnavn: "Application",
            stringValue: "Application for financial assistance",
        },
        start: {
            ny: {
                soknad: "Start a new application",
            },
        },
        ukjentfeilunderhentdata: "An error occurred when obtaining information",
    },
    applikasjonsfeil: {
        dialogtittel: "Error message",
    },
    arbeid: {
        dinsituasjon: {
            annensituasjon: {
                true: {
                    beskrivelse: {
                        feilmelding: "You must describe your situation in brief",
                        label: "Give a brief description",
                    },
                },
                stringValue: "Other situation",
            },
            arbeidsledig: "I am unemployed",
            feilmelding: "You must state your situation",
            jobb: "I am in work",
            sporsmal: "What is your situation?",
            student: {
                true: {
                    heltid: {
                        false: {
                            hjelpetekst: {
                                tekst: "This is a help text that must be included",
                            },
                            stringValue: "Part-time",
                        },
                        feilmelding: "You must state whether you study full-time or part-time",
                        sporsmal: "Are you studying?",
                        true: "Full-time",
                    },
                },
                stringValue: "I am a student",
            },
            studerer: {
                undertittel: "Education",
            },
        },
    },
    arbeidbolk: {
        tittel: "Work and education",
    },
    arbeidsforhold: {
        arbeidsgivernavn: {
            label: "Employer",
        },
        fom: {
            label: "Started in the job",
        },
        infotekst_del1: "For the last three months:",
        infotekst_del2: "(Retrieved from the State Register of Employers and Employees)",
        ingen: "We cannot find any work situations from the last three months.",
        kommentar: {
            placeholder: "Do not submit health information or other sensitive personal information",
        },
        sporsmal: "Your work situation",
        stillingsprosent: {
            label: "Employment percentage",
        },
        stillingstype: {
            label: "Type of position",
        },
        tom: {
            label: "Left the job",
        },
    },
    autocomplete: {
        husnummer: "If you have a house number you must enter this (before the comma)",
        ugyldig: "The address is invalid. Please enter a valid street address",
    },
    avbryt: {
        avbryt: "Close",
        forklaring:
            "Your application has been saved up to this point - you can return and submit the form later. The application will only be saved for two weeks before being deleted. If you choose to delete the application now, all information will be deleted.",
        fortsettsenere: "Continue later",
        ja: "Yes",
        lenkenavn: "Back to your Nav",
        navigasjon: {
            forklaring:
                "Before you close the application, you must select whether you wish us to save it so that you can continue later, or whether you wish to delete all of the content in the application. Please note that if you choose to complete the application later, it will be saved for two weeks before it is deleted.",
            overskrift: "Important to know",
            tekst: "If you close the application, the information will not be saved. Whatever you have entered up to this point will be deleted.",
            uthevet: {
                tekst: "Are you sure you wish to close the application?",
            },
        },
        nei: "No",
        overskrift: "Important to know",
        slett: "Delete application",
        soknad: "Delete application",
        soknadslettet: {
            tekst: "The application and all documents have been deleted. To start a new application, you must return to ‘Forms’ on My Page.",
            tittel: "The application has been deleted",
        },
        tekst: "If you close the application you have started, it will not be saved and the information you have entered will be deleted.",
        uthevet: {
            tekst: "Are you sure that you wish to close the application?",
        },
    },
    avslag: {
        knapp: "Close and delete application",
        tittel: "Your application will be rejected",
    },
    begrunnelse: {
        annet: {
            beskrivelse: "What are you applying for money for?",
        },
        hva: {
            description: 'Example of text: "I am applying for support for food, rent and electricity."',
            descriptionOld: "For example, money for living expenses and rent",
            label: "What are you applying for?",
            labelOld: "Using key words, state what you are applying for",
        },
        hvorfor: {
            description: "about your situation and what you are applying for.",
            label: "Tell us more",
            labelOld: "Give a brief reason for the application",
        },
        kategorier: {
            annet: "Other",
            barn: "Other expenses for children",
            barnehage: "Kindergarten and SFO/AKS",
            bolig: "Rent",
            hoytid: "Holidays and special occasions",
            klaer: "Clothes and equipment",
            label: "What are you applying for money for?",
            description:
                'Here are some common expenses to apply for. You can enter others under "Other". You can select multiple categories.',
            lege: "Medical help and medicine",
            mat: "Food",
            nodhjelp: "Emergency assistance",
            strom: "Electricity and heating",
            tannlege: "Dental treatment",
            transport: "Transport",
            fritidsaktiviteter: "Leisure activities for children",
        },
        kort: {
            behov: {
                description: 'Example: "I\'m applying for money for everyday living expenses, rent and electricity."',
                dokumentasjon: {
                    beskrivelse:
                        "Here you can upload documentation for what you are applying for money for. If you include documentation with your application, it can help us process it more quickly.",
                    tittel: "Documentation",
                },
                oppsummeringstittel: "Your needs",
            },
        },
        nødhjelp: {
            beskrivelse:
                "You can apply for emergency assistance if you do not have money for the most necessary things in the next 24 hours.",
        },
        underkategorier: {
            nodhjelp: {
                bosted: "I don't have any place to stay tonight",
                mat: "I have no money for food today",
                strøm: "The electricity is cut off, or will be cut off today or tomorrow",
            },
        },
    },
    begrunnelsebolk: {
        tittel: "Your needs",
    },
    bosituasjon: {
        annenBotype: {
            familie: "I live with other family",
            fengsel: "Prison",
            foreldre: "I live with my parents",
            institusjon: "Institution (for example hospital, or admitted for addiction treatment)",
            krisesenter: "Crisis centre",
            sporsmal: "Please provide more details about where you are staying",
            venner: "I live with friends",
        },
        annet: "Other living situation",
        antallpersoner: {
            label: "Number. Do not include yourself.",
            sporsmal: "How many people do you live with?",
        },
        eier: "I live in a home that I own",
        feilmelding: "You must state your living situation",
        ingen: "I do not have a place to live",
        kommunal: "I rent a municipal home",
        leier: "I rent a private home",
        sporsmal: "What is your living situation?",
        tittel: "Your living situation",
    },
    bosituasjonbolk: {
        tittel: "Living situation",
    },
    dinsituasjon: {
        jobb: {
            sporsmal: "Are you working?",
            true: {
                grad: {
                    deltid: "Part-time",
                    heltid: "Full-time",
                    sporsmal: "Do you work full-time or part-time?",
                },
            },
        },
        studerer: {
            grad: {
                deltid: "Part-time",
                heltid: "Full-time",
                sporsmal: "Do you study full-time or part-time?",
            },
            hjelpetekst: {
                tekst: "",
            },
            mer: {
                info: {
                    forklaring:
                        "Answer yes if you are attending school or studying. This can include high school, college, university, Norwegian language courses, primary school for adults, or adult education.",
                    tittel: "More information",
                },
            },
            sporsmal: "Are you attending school or studying?",
            true: {
                grad: {
                    deltid: "Yes - Part-time",
                    heltid: "Yes - Full-time",
                },
            },
        },
    },
    faktum: {
        key: {
            grad: {
                label: "Visiting arrangement",
            },
        },
    },
    familie: {
        barn: {
            feilmelding: "You must respond whether you have children who live with you",
            hjelpetekst: {
                tekst: "State all children you are responsible to provide for (cover necessary expenses for). You are responsible to provide for your children under 18 years of age, even if they do not live with you. If your finances allow, you must provide for your children until they have completed secondary education.",
            },
            sporsmal: "Do you have children you are responsible to provide for?",
            tittel: "Child",
            true: {
                barn: {
                    borsammen: {
                        sporsmal: "Does the child live with you permanently?",
                    },
                    deltbosted: {
                        hjelpetekst: {
                            tekst: "Shared residence means that the child lives with both parents after separation. In such case the parents have formed an agreement on shared residence or a court has decided that the child shall share his/her residence with the parents. This means that the child lives (approximately) an equal amount of time with both of the parents, and both must agree regarding decisions affecting the child’s daily life. Shared residence is not the same as if the child has visits with both parents half of the time.",
                        },
                        sporsmal: "Does the child have shared residence?",
                    },
                    etternavn: {
                        label: "Surname",
                    },
                    fjern: "Remove",
                    fjernalternativtekst: "Remove child",
                    fnr: {
                        label: "Date of birth (ddmmyyyy)",
                    },
                    fornavn: {
                        label: "First name",
                    },
                    grad: {
                        deltid: "Part-time",
                        heltid: "Full-time",
                        hoyretekst: "%",
                        label: "Write amount in percent % (max. 50)",
                        sporsmal: "What is your visiting arrangement with your child?",
                    },
                    leggtil: "Add child",
                    mellomnavn: {
                        label: "Middle name",
                    },
                    navn: {
                        label: "Name",
                    },
                    pnr: {
                        label: "ID number",
                    },
                    slett: "Delete information",
                    sporsmal: "Information about the child",
                },
                barnebidrag: {
                    begge: "Yes, I both pay and receive child support",
                    betaler: "Yes, I pay child support",
                    ingen: "No",
                    mottar: "Yes, I receive child support",
                    sporsmal: "Do you receive or pay child support?",
                },
                listetittel: "Information about the child/children",
            },
        },
        sivilstatus: {
            enke: "Widow/widower",
            feilmelding: "You must state your civil status",
            gift: {
                borsammen: {
                    false: {
                        beskrivelse: {
                            label: "State why",
                        },
                    },
                    sporsmal: "Registered on the same address",
                },
                ektefelle: {
                    borsammen: {
                        sporsmal: "Registered on the same address?",
                    },
                    etternavn: {
                        label: "Surname",
                    },
                    fnr: {
                        label: "Date of birth (ddmmyyyy)",
                    },
                    fornavn: {
                        label: "First name",
                    },
                    ikkesammenbeskrivelse: {
                        label: "Describe your situation",
                    },
                    mellomnavn: {
                        label: "Middle name",
                    },
                    navn: {
                        label: "Name",
                    },
                    pnr: {
                        label: "ID number (5 digits)",
                    },
                    sporsmal: "Information about your spouse",
                },
                fnr: {
                    label: "Date of birth (ddmmyyyy)",
                },
                navn: {
                    label: "Name",
                },
                pnr: {
                    label: "ID number",
                },
                sporsmal: "Information about your spouse",
                stringValue: "Married/registered partner",
            },
            samboer: "Cohabiting partner",
            separert: "Separated",
            skilt: "Divorced",
            sporsmal: "What is your civil status?",
            ugift: "Unmarried",
        },
    },
    familiebolk: {
        tittel: "Family situation",
    },
    familierelasjon: {
        bor_sammen: "Does the child live with you?",
        delt: {
            samvaer: {
                sporsmal: "Does {{navnString}} have shared residence?",
            },
        },
        faktum: {
            lagttil: "Children you have registered yourself",
            leggtil: {
                hjelpetekst: {
                    tekst: "You can add children you provide for, about whom we have not obtained information. For example, this may be children over 18 years of age who attended secondary school, or foster children.",
                },
                sporsmal: "Add children we have not registered",
            },
            sporsmal: "Children you provide for:",
        },
        fodselsdato: "Date of birth",
        hentet_fra_folkeregisteret: "(Retrieved from the National Population Register)",
        ingen_registrerte_barn:
            "<p> We have obtained the following information from the National Population Register: </p> <p> <b>You have no registered children under 18 years of age.</b> </p>",
        ingen_registrerte_barn_tekst: "You have no registered children under 18 years of age.",
        ingen_registrerte_barn_tittel:
            "We have obtained the following information from the National Population Register:",
        ingress: {
            antallBarn_one: "{{count}} child under 18 years of age",
            antallBarn_other: "{{count}} children under 18 years of age",
        },
        ingress_folkeregisteret: "We have obtained the following information from the National Population Register:",
        ingress_forsorger: "We have registered that you are responsible as a provider for:",
        samme_folkeregistrerte_adresse: "Registered on the same address",
        samvaer: {
            sporsmal: "What is your visiting arrangement with your child?",
        },
    },
    feilmelding: {
        boks: {
            overskrift: "You must respond to:",
        },
        generelt: "Please try later",
        innsending: {
            number1:
                "All of your entered data has been saved; however, the application has not been submitted. You must submit the application again later. You can receive a link to the application by e-mail.",
            number2: "You can also find your application by going to",
        },
        lenketekst: "To My Page",
        maks500tegn: "You can enter maximum 500 characters",
        mineinnsedinger: {
            lenketekst: "My submissions",
        },
        tps: "Nav’s system for personal data is unfortunately not available. Please try again later.",
        stringValue: "Oops, something went wrong...",
    },
    feilside: {
        feilkode: "Error code",
        ikkefunnet: {
            feilmelding:
                "If this concerns a completed submitted/deleted application, <lenke>return to start page</lenke>.",
            returner: {
                knapp: "Return to the start page",
            },
            tittel: "Page not found",
        },
        lenke: {
            meldfra: {
                tekst: "Report error",
            },
            minside: {
                teskt: "Go to My Page",
            },
            nav: {
                tekst: "Go to nav.no",
            },
        },
        number404: {
            fantIkkeSide: "We could not find the page you are trying to open.",
        },
        serverfeil: {
            beklager: "We are sorry!",
            feilmelding:
                "Sorry, we have technical problems. An application for financial assistance is not possible to complete. We recommend that you try again a little later.",
            informasjon: {
                ikkeLagret:
                    "The application has been set up, but no responses have been saved. You can continue with the application later.",
                stringValue: "The application was last saved {{0}} and you can continue with your application later.",
            },
            knapp: "Contact your Nav office",
            lenke: {
                meldfra: "Send bug report",
                minside: "Go to My Page",
                nav: "Go to nav.no",
            },
            loggUt: "Log out ",
            loggfort: "The incident has been logged and the problem will be rectified as soon as possible.",
            nodsituasjon: {
                tekst: "If you do not have money for necessary things such as food, you must contact your Nav office. Nav will also help you to find a temporary place of residence if you have nowhere to sleep or to stay in the next 24 hours.",
                tittel: "Do you need immediate help?",
            },
            opprett: {
                informasjon:
                    "Something went wrong - we were unable to set up the application. You can try again now, or wait until later.",
            },
            papir: "You can also <lenke>apply for financial assistance on paper</lenke> at your Nav office.",
            prov: {
                igjen: "We recommend that you try again.",
            },
            provIgjen: "Try again",
            startside: "Go to the front page for financial assistance",
            teknisk: {
                feil: "A technical error has occurred.",
            },
            til: {
                startsiden: "To the home page for the application",
            },
            tittel: "Sorry, we have a fault on our side.",
        },
        soknadikkefunnet: {
            informasjon:
                "We could not find your application. This may be due to a fault in the system or that the application has been deleted.",
            tittel: "Oops, something went wrong...",
        },
    },
    fil: {
        feil: {
            format: "Wrong file format. You must upload a PDF, PNG or JPG file.",
            kryptert: "Password-protected PDF file. You must upload a file without password protection.",
            signert: "Signed PDF file. You must upload an unsigned file.",
        },
        for: {
            stor: "The file is too large. Maximum file size is 10 MB.",
        },
    },
    formue: {
        annetLabel: "Describe",
        type: {
            aksjer: "Shares, bonds and funds",
            annet: "Other",
            belop: {
                true: {
                    beskrivelse: {
                        label: "Describe",
                    },
                },
                stringValue: "Other",
            },
            brukskonto: "Current account",
            bsu: "Young People's Housing Savings (BSU)",
            hjelpetekst: {
                tekst: "Please provide details of all bank accounts and savings schemes you have, both in Norway and abroad. You can check the boxes for these even if you do not have funds available.",
            },
            livsforsikring: "Life insurance with savings plan",
            livsforsikringssparedel: "Life insurance with savings plan",
            sparekonto: "Savings account",
            sporsmal: "Which bank accounts and savings schemes do you have?",
            verdipapirer: "Shares, bonds and funds",
        },
    },
    fortsettSenere: {
        epost: {
            label: "Send me a link by e-mail (not mandatory)",
            pattern: {
                feilmelding: "The format of the e-mail address is incorrect.",
            },
            required: {
                feilmelding: "You must enter an e-mail address",
            },
            send: "Send",
        },
        fortsettlink: "Continue with application",
        info: "All of your entered data has been saved; however, the application has not been submitted to Nav. You can continue with submission later by logging into My Page. We can also send you an e-mail with a link back to the submission.",
        kvittering: {
            inngangsportenlink: "Portal",
            sendpaanyttlink: "Resend e-mail",
            tekst: "We have sent an e-mail to the following address:",
            tittel: "E-mail has been sent",
        },
        lastoppvedlegglink: "Upload",
        oppsummeringlinktekst: "To summary",
        sendEpost: {
            epostInnhold:
                "You have chosen to continue submitting the application later. You can do so via this link: {{0}} . The application has not been submitted to Nav. Applications you have started on, but not submitted, will be automatically deleted if you do not continue them within eight weeks. Yours sincerely, Nav",
            epostTittel: "Link to started application",
        },
        sidetittel: "Continue with submission later - www.nav.no",
        tilbake: "Return to submission",
        tittel: "Continue with submission later",
        stringValue: "Continue application later",
    },
    generelt: {
        kommune: "municipality",
        merinfo: "More information",
    },
    hjelpetekst: {
        oppsummering: {
            tittel: "Help text:",
        },
        tekst: {
            skjult: "? Help text:",
        },
    },
    hvormye: {
        faktum: {
            sporsmal: "What is your visiting arrangement with your child?",
        },
    },
    ikkefunnet: {
        informasjon: "The form you requested was not found in our systems.",
        tittel: "Form not found",
    },
    informasjon: {
        hilsen: {
            hei: "Hello {{fornavn}}",
            tittel: "This information can be useful to read before you start your application.",
        },
        husbanken: {
            bostotte: {
                url: "https://husbanken.no/bostotte",
                v2: "If you have low income and high housing expences you can apply for housing allowance (bostøtte) from Husbanken. We recommend that you check if you can get <lenke>support from Husbanken</lenke>.",
                stringValue:
                    'If you have low income and high housing expences you can apply for housing allowance (bostøtte) from Husbanken. We recommend that you check if you can get <a href="https://husbanken.no/bostotte"  target="_blank" rel="noreferrer noopener">support from Husbanken</lenke>.',
            },
        },
        ikketilgang: {
            bruker: {
                tekst: {
                    v2: "Unfortunately, you cannot use the digital application for financial assistance. People with code 6 or 7 cannot apply for financial assistance digitally. Contact your local <lenke>Nav office</lenke> to receive help applying.",
                },
                tittel: "Sorry",
            },
            tekst: {
                v2: "You have now come to a digital service for applying for financial assistance. The service is under development, and at present, only residents with an address in Horten, Skien, Bergen, Oslo, Trondheim and Askøy municipalities can use the service. If you require financial assistance you must contact your <lenke>local Nav office.</lenke>",
            },
            tittel: "Sorry",
        },
        innhenting: {
            tekst_del1:
                'We automatically collect information from public registers. By pressing "Start application" you accept this.',
            tekst_del2: "<lenke>Read more about collecting and processing of your personal data</lenke>.",
            undertittel: "Collecting and processing of personal data",
        },
        nodsituasjon: {
            tekst: "If you do not have money for food or a place to stay for the next 24 hours, you should mention this in your application.",
            undertittel: "Are you in an emergency situation?",
        },
        samtykke: {
            bostotte_samtykke: "Husbanken",
            info_del1: "When you started the application, you chose to obtain information from",
            info_del2:
                "This information may have changed - we can update it for you If you wish you can delete the information before you submit the application.",
            knapp: "Continue with application",
            skatteetaten_samtykke: "Tax Administration",
            sporsmal: "Update information from",
        },
        start: {
            tekst_del1: "Please complete the application as best you can. Attach relevant documentation.",
            tekst_del2: "See examples of <lenke>what documentation we might ask for</lenke>.",
            tekst_del3:
                "If you intentionally withhold or provide incorrect information, you may have to pay back the benefit.",
            tittel: "Before you start your application",
            undertittel: "Information and documentation",
        },
        student: {
            studielan: {
                number1: {
                    v2: "If you are a student, you generally do not have the right to financial assistance. You can check if you can apply for a loan or grant at <lenke>lanekassen.no</lenke>.",
                },
                number2:
                    "There are some exceptions to the right to financial assistance. This might be if you have a temporary need for help before receiving payments from Lånekassen, or are in an emergency situation. Contact your Nav office to clarify your needs and to receive information, advice and guidance.",
                tittel: "Information for students",
                url: "https://lanekassen.no",
            },
        },
        svarpasoknad: {
            tekst: "Municipalities have varying response times. If more than one month has passed since you submitted your application, you should receive a letter that the case processing time has been extended.",
            undertittel: "When you receive a response to the application",
        },
        tekster: {
            personopplysninger: {
                ettersendt: {
                    tekst: "When you submit the application, it will be sent to the municipality in which you are resident. The municipality is responsible for processing the application and for storing the information in the municipal administration system.",
                    tittel: "After the application has been submitted",
                },
                fordusender: {
                    tekst: "Before you send the application, the information is stored with the Labour and Welfare Service. If you click “Close” before you have submitted the application, all of the information will be deleted. You can choose to close the process at any time during application.",
                    tittel: "Before you submit the application",
                },
                innhenting: {
                    tekst: 'You must enter your own information in the application. In addition, we obtain information from public registers to which we have legitimate access. Examples are family information from the National Population Register, information about your work situation from the State Register of Employers and Employees and information about state support from Nav. <br></br><br></br>If you do not want us to obtain this personal information automatically, you can use a paper form to apply for financial assistance. You can download the paper form at <a href="https://nav.no" target="_blank">nav.no</a> or pick it up at the Nav-office.',
                    tittel: "Obtaining personal information",
                },
                rettigheter: {
                    lenke: "Read more about the processing of personal data.",
                    tekst: "You have the right to receive information about and access to your own personal information. If the information contains errors, or is incomplete or unnecessary, you can request that the information be corrected or supplemented.",
                    tittel: "Your rights",
                },
                sporsmal: "If you have any questions about personal information, please contact your Nav office.",
                tittel: "How we process your personal information",
            },
        },
        tittel: "Information front page",
    },
    informasjonsside: {
        lestbrosjyre: {
            sporsmal: "I confirm that I have read and understood the information at: nav.no/dagpenger",
        },
    },
    infotekst: {
        oppsummering: {
            tittel: "Information text:",
        },
    },
    innsendt: {
        dato_tid: "Submitted {{originalSoknadDato}} time: {{originalSoknadTid}}",
    },
    inntekt: {
        bankinnskudd: {
            hjelpetekst: {
                tekst: "You must provide details of all bank accounts and savings schemes you have, both in Norway and abroad. You must check the boxes for these even if you do not have funds accessible.",
            },
            infotekst: {
                tekst: "For example, current accounts, Young People's Housing Savings (BSU) shares and funds",
            },
            sporsmal: "Do you have bank accounts and/or other saving schemes?",
        },
        bostotte: {
            gi_samtykke: {
                overskrift: "Would you like to retrieve information about your housing allowance from Husbanken?",
                tekst: "This information can be necessary for us to process the application. If you do not wish to obtain this information automatically, you can upload the documentation yourself.",
                ja: "Yes, get information",
                nei: "No",
            },
            har_gitt_samtykke: "You have obtained information from Husbanken",
            husbanken: {
                info: "You obtained information from Husbanken",
                ingensakerfunnet: "You have no cases registered with Husbanken for the last month.",
                ingenutbetalingerfunnet: "You have no payments registered with Husbanken for the last month.",
                lenkeText: "See details at Husbanken",
                mottaker: {
                    husstand: "To household",
                    kommune: "To municipality",
                },
                sak: {
                    beskrivelse: "Description of decision",
                },
                saker: "Cases",
                status: {
                    under_behandling: "Under processing",
                },
                tittel: "Housing allowance from Husbanken",
                url: "https://kundeforhold-bostotte.husbanken.no/esoknad-bostotte/",
                utbetalinger: "Payments",
                vedtaksstatus: {
                    avslag: "Refused",
                    avvist: "Rejected",
                    innvilget: "Granted",
                },
            },
            ikkefunnet: "You have no payments or cases registered with Husbanken for the last month.",
            infotekst: {
                tekst: "You have obtained information about cases and payments from Husbanken.",
            },
            kontaktproblemer: "We could not obtain information from Husbanken",
            mangler_samtykke: "You have not obtained information from Husbanken",
            nedlasting_feilet:
                "-	We could not contact Husbanken. You can try again in a few minutes or upload the documentation yourself.",
            overskrift: "Housing allowance from Husbanken",
            sak: {
                dato: "Date",
                status: "Status",
                stringValue: "Case",
            },
            sakerIkkefunnet: "You have no registered cases at Husbanken the last month.",
            sporsmal: {
                sporsmal: "Have you applied for or received housing allowance from Husbanken the last two months?",
            },
            ta_bort_samtykke: "Remove information from Husbanken",
            tidspunkt: "Information was obtained",
            true: {
                type: {
                    husbanken: "Housing allowance from Husbanken",
                    kommunal: "Municipal housing allowance",
                    sporsmal: "Which type of support you receive?",
                },
            },
            utbetaling: {
                belop: "Amount",
                belop_siste_maned: "Amount last month",
                mottaker: "Recipient",
                sporsmal_manuell: "How much have you received in housing allowance from Husbanken?",
                utbetalingsdato: "Payment date",
                stringValue: "Payment",
            },
            utbetalingerIkkefunnet: "You have no payments registered with Husbanken in the last month.",
            stringValue: "Housing allowance",
        },
        eierandeler: {
            hjelpetekst: {
                tekst: "By 'financial value,' we mean property or assets of higher value, both in Norway and abroad. We may require you to sell objects that you do not need in your daily life and that can be sold for a significant amount. Personal belongings, such as clothing and household items of standard quality, cannot be required to be sold.",
            },
            infotekst: {
                tekst: "For example, housing or vehicle",
            },
            sporsmal: "Do you own anything of financial value?",
            true: {
                type: {
                    annet: {
                        true: {
                            beskrivelse: {
                                label: "Describe what you own",
                            },
                        },
                        stringValue: "Other",
                    },
                    bolig: "Property",
                    campingvogn: "Caravan and/or boat",
                    fritidseiendom: "Leisure property",
                    kjoretoy: "Vehicle(s)",
                    sporsmal: "What do you own?",
                },
            },
        },
        inntekter: {
            hjelpetekst: {
                tekst: "By other income, we mean in the form of dividends on shares, funds, the sale of assets or other.",
            },
            lesmer: "Examples of other income",
            sporsmal: "Have you received money, other than wages or benefits from Nav, the last three months?",
            tittel: "Other income",
            true: {
                type: {
                    annen: {
                        true: {
                            beskrivelse: {
                                label: "Describe",
                            },
                        },
                        stringValue: "Other",
                    },
                    annet: {
                        true: {
                            beskrivelse: {
                                label: "Describe",
                            },
                        },
                        stringValue: "Other",
                    },
                    forsikring: "Insurance payouts",
                    forsikringsutbetalinger: "Insurance payouts",
                    salg: "Sale of property and/or assets",
                    sporsmal: "What have you received?",
                    utbytte: "Dividends on shares, funds or securities",
                },
            },
        },
        mottarytelser: {
            feilmelding: "You must respond to whether you receive benefits from Nav",
            sporsmal: "Do you receive benefits from Nav?",
        },
        soktytelser: {
            feilmelding:
                "You must respond to whether you have applied for benefits from Nav, and this is not fully processed",
            sporsmal: "Have you applied for benefits from Nav, and this is not fully processed?",
        },
        studielan: {
            sporsmal: "Do you receive loans/grants from Lånekassen?",
            tittel: "Student loan",
        },
    },
    inntektbolk: {
        tittel: "Income and assets",
    },
    kontakt: {
        adresse: {
            bruker: {
                gateadresse: {
                    label: "Address",
                },
                postnummer: {
                    label: "Postcode",
                },
                poststed: {
                    label: "Town/city",
                },
                sporsmal: "Address for application",
            },
        },
        kontonummer: {
            bruker: {
                label: "If this is not to be used, enter account number",
                stringValue: "You have stated:",
            },
            description:
                "The account number you enter here will only be used for payment of financial assistance, and will not be updated on My Page",
            feilmelding: "Account number must be entered",
            harikke: {
                sporsmal: "Account number",
                true: "I do not have a bank account I can use.",
                stringValue: "I do not have a bank account I can use.",
            },
            infotekst: {
                tekst: "The account number you provide here will only be used for payments of financial assistance.",
            },
            ingeninfo: "No information about bank account.",
            kontonummerFelt: "Account number field",
            label: "New account number (11 digits)",
            oppgi: "Enter account number",
            sporsmal: "Your account number",
        },
        statsborger: {
            feilmelding: "Citizenship must be selected",
            hjelpetekst: {
                tekst: "Nordic citizens include Swedish, Danish, Finnish or Icelandic citizens. If you are an EEA citizen and have not previously received social support, you must contact the Nav office before you apply.",
            },
        },
        system: {
            adresse: {
                adresse: {
                    label: "Address",
                },
                bolignummer: {
                    label: "House number",
                },
                bruksnummer: {
                    label: "Title number",
                },
                eiendomsnavn: {
                    label: "Name of property",
                },
                endreknapp: {
                    label: "Use another address",
                },
                festenummer: {
                    label: "Leasehold unit number",
                },
                gaardsnummer: {
                    label: "Cadastral ref. number",
                },
                gatenavn: {
                    label: "Street name",
                },
                husbokstav: {
                    label: "House letter",
                },
                husnummer: {
                    label: "House number",
                },
                kommunenummer: {
                    label: "Municipality number",
                },
                postboks: {
                    label: "PB",
                },
                postnummer: {
                    label: "Postcode",
                },
                poststed: {
                    label: "Town/city",
                },
                seksjonsnummer: {
                    label: "Section number",
                },
                sporsmal: "Address",
                undernummer: {
                    label: "Sub-number",
                },
                stringValue: "Address",
            },
            kontaktinfo: {
                infotekst: {
                    ekstratekst:
                        "Write the address where you are staying. If you do not know the address, you can write the address of the Nav office in the municipality or district where you live. <lenke>Look up Nav office.</lenke>",
                },
                sporsmal: "Address",
            },
            kontonummer: {
                endreknapp: {
                    label: "Edit",
                },
                infotekst: {
                    tekst: "We have obtained the following information from My Page:",
                },
                label: "Account number",
                sporsmal: "Account number",
            },
            oppholdsadresse: {
                finnerKontor: "Find your NAV office",
                folkeregistrertAdresse: "Registered address:",
                hvorOppholder: "What is your current address?",
                midlertidigAdresse: "Temporary address on My Page:",
                soknad: {
                    infotekst: {
                        tekst: "Fill in the address where you currently live so that we can send your application to the correct NAV office.",
                    },
                    sporsmal: "Where are you living at present?",
                },
                sporsmal: "Residential address and NAV office",
                valg: {
                    feilmelding: "You must select your address and NAV office",
                    folkeregistrert: "Registered address",
                    midlertidig: "Temporary address registered in NAV address register",
                    soknad: "I live at another address",
                    sporsmal: "What is your address?",
                },
                velgKontor: "The address generated several NAV offices. Select your local office.",
                velgMottaker: "Select NAV office",
            },
            personalia: {
                fnr: "National identity number",
                fodselsdato: "Date of birth",
                infotekst: {
                    tekst: "(Retrieved from the National Population Register)",
                },
                navn: "Name",
                sporsmal: "Personal details",
                statsborgerskap: "Citizenship",
            },
            telefon: {
                endre: "Edit",
                endreknapp: {
                    label: "Edit",
                },
                label: "Telephone number",
                oppgitt: "You have provided the following telephone number:",
                sporsmal: "Telephone number",
            },
            telefoninfo: {
                infotekst: {
                    tekst: "(Retrieved from the common contact register)",
                },
                ingeninfo: "We did not find any telephone number from the common contact register.",
                sporsmal: "Telephone number",
            },
        },
        telefon: {
            beskrivelse: "To make it easier to contact you, we require your telephone number.",
            description: "The phone number you enter here will not be updated on My Page",
            feil: {
                maxLength: "The phone number is too long",
                tom: "You must enter a telephone number",
                ugyldig: "The phone number is not valid",
            },
            feilmelding: "No telephone number provided",
            infotekst: {
                tekst: "The telephone number you provide here can be used to contact you regarding your application.",
            },
            label: "Telephone number",
            landskode: "Country code",
            oppgi: "Enter phone number",
            sporsmal: "Your telephone number",
            telefonnummerFelt: "Telephone number field",
            tittel: "New telephone number",
        },
        tittel: "Your personal information",
    },
    kvittering: {
        dato: "Application was sent to NAV",
        erSendt: "{{0}} of {{1}} documents were sent to NAV {{2}}, at {{3}}",
        ikkeInnsendt: {
            tittel: "The following documents were not sent",
        },
        informasjonstekst: {
            del1: '<p>You can forward documents<strong><a href="https://tjenester.nav.no/saksoversikt/app/ettersending" target="_blank">here</lenke>.</strong> If any documents are to be sent to NAV by anyone other than yourself (doctor, employer), you must notify the person/persons, to be certain they will be sent.</p>',
            del2: "<p>If NAV has not received necessary documentation <strong>within 14 days</strong>, the application can be rejected due to insufficient information.</p>",
        },
        innsendt: {
            tittel: "The following documents have been sent",
        },
        klokkeslett: "time:",
        normertbehandlingstid:
            'Here you can see <a href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV">case processing times</lenke> in your county.',
        saksbehandling: {
            tekst: "Case processing times vary from municipality to municipality. When we have processed your application, you will receive a decision. If the process takes longer than one month, you will receive a preliminary response. If we do not have sufficient information, it will take longer to respond to your application. Therefore, we recommend that you forward any attachments as soon as possible, preferably within 14 days. You can also forward information requested in your decision, for example in connection with terms and conditions or other agreements with NAV. You can forward attachments at My Page.",
            tittel: "Case processing times",
        },
        saksoversikt: {
            informasjon:
                "You can follow your case in NAV. From the case side, you can receive further information about your application and you can notify of any important changes.",
            lenke: "Go to case",
        },
        samtale: {
            tekst: 'If you apply for financial assistance, you will normally be called in to an interview with an advisor. You can also contact your NAV office to arrange a meeting. <a href="https://www.nav.no/sosialhjelp/slik-foregar-et-mote"  target="_blank" rel="noreferrer noopener">Read more about how meetings are held.</lenke>',
            tittel: "Interview with NAV office",
        },
        situasjon: {
            tekst: "You must notify us if your financial situation changes after you have submitted the application.",
            tittel: "If your situation changes",
        },
        skrivutknapp: {
            label: "Printout application",
        },
        tekst: {
            post: ", which will be the office processing your case.",
            pre: "The application has been sent to",
        },
        tittel: "Acknowledgement",
        undertittel: "Application for financial assistance has been sent.",
        utskrift: {
            oppsummering: {
                tittel: "Summary of application",
            },
            stringValue: "Print acknowledgement",
        },
        vedlegg: {
            tittel: "Supplementary information required by NAV to process your application",
        },
        veienvidere: {
            tittel: "What happens next?",
        },
    },
    matrikkel: {
        gnrbnr: "Cadastral ref. number and title number",
        kommunenr: "Municipality number",
        mangler: {
            kommune: "You must select a municipality before you can continue.",
        },
        sok: {
            placeholder: "Search for municipality",
        },
        tekst: "You have an address type that is not street address",
    },
    maxlength: {
        feilmelding: "The text is too long",
    },
    minlength: {
        feilmelding: "The text is too short",
    },
    modalvindu: {
        lukk: "Close modal window",
    },
    navytelser: {
        infotekst: {
            tekst: "We have registered the following information:",
        },
        sporsmal: "Your payments from NAV",
        tittel: {
            infotekst: {
                tekst: "We have registered the following information:",
            },
            sporsmal: "Paid benefits from NAV last month",
        },
    },
    nedetid: {
        alertstripe: {
            avbryt: "In the period {{nedetidstart}} – {{nedetidslutt}} you cannot send a digital application for financial assistance due to technical maintenance.",
            ettersendelse:
                "In the period {{nedetidstart}} – {{nedetidslutt}} digital applications for financial assistance are inaccessible due to technical maintenance. Contact your local NAV office if you need to forward information for the application during this period.",
            infoside:
                "You cannot send digital applications in the period {{nedetidstart}} – {{nedetidslutt}} due to technical maintenance. Contact your local NAV office if you need to apply for financial assistance during this period.",
            send: "You cannot send digital applications in the period {{nedetidstart}} – {{nedetidslutt}} due to technical maintenance. Contact your local NAV office if you need to apply for financial assistance during this period.",
        },
    },
    opplasting: {
        avbryt: "Close",
        feilmelding: {
            duplikat:
                "The document you have uploaded is a duplicate of a document you have already uploaded. Please check that you have uploaded the correct document.",
            feiltype: "Upload failed. You can only upload files of type JPG, PNG and PDF.",
            konvertering: "Conversion failed. Please try again.",
            makssider: "Upload failed. You can upload maximum 10 pages",
            maksstorrelse: "Upload failed – file is too large. You can only upload files of less than 10 MB",
            manglerVedlegg: "You must add documentation",
            pdf: {
                applepreview:
                    "The document you uploaded has an invalid format from Mac. First, select «Arkiv” in the menu for Forhåndsvisning, then «Eksporter...». Select the format «JPG» from the pull-down menu. Then upload the form again from where you saved it.",
                kryptert:
                    "The document you have uploaded is protected with a password. Store the document without a password, or print it out and scan it again. Then upload again.",
            },
        },
        ferdig: "Attached to application",
        lastopp: "Upload",
        leggtil: "Add",
        slett: {
            siden: "Delete page",
        },
    },
    opplysninger: {
        arbeid: {
            sporsmal: "Work and education",
        },
        arbeidsituasjon: {
            infotekst: {
                tekst: "We have registered the following information:",
            },
            kommentarer: {
                description: 'Example of text: "I am unemployed" or "I work 50% at Arbeidsgiveren AS".',
                label: "If the information is incorrect, please write a brief explanation of your situation.",
            },
        },
        bosituasjon: {
            eier: {
                sporsmal: "You have responded that you own a housing; therefore, we ask that you document",
            },
            sporsmal: "Living situation",
        },
        ekstrainfo: {
            sporsmal: "Is there any other expenses you wish to add?",
        },
        familiesituasjon: {
            barnebidrag: {
                begge: {
                    betaler: {
                        label: "Pay",
                    },
                    mottar: {
                        label: "Receive",
                    },
                    sporsmal: "How much do you receive and pay in child support per month?",
                },
            },
            sporsmal: "Family situation",
        },
        fjern: "Remove",
        formue: {
            annen: {
                undertittel: "Other assets",
            },
            bank: {
                undertittel: "Bank",
            },
        },
        generell: {
            sporsmal: "General documentation",
        },
        ikkebesvart: {
            avsnitt1:
                "We see that you have not answered questions about your expenses. In order for us to assess your application as quickly as possible, it is important that you provide us with as much information as possible.",
            avsnitt2:
                "You can attach documentation together with your application, or deliver this after you have submitted the application.",
            melding:
                "We see that you have not answered questions about your expenses. In order for us to assess your application as quickly as possible, it is important that you provide us with as much information as possible.",
            tittel: "Insufficient financial information",
        },
        informasjon: {
            avsnitt1:
                "Here you can state your income and expenses, and upload attachments as part of your application.",
            avsnitt2:
                "You can attach documentation together with your application, or deliver this after you have submitted the application.",
            lenke: "Do you need help sending documentation?",
            modal: {
                bolk1: {
                    avsnitt1: "Then you can check whether the document is under 10 MB, or is locked with a password.",
                    tittel: "Are we not accepting the documentation you are trying to submit?",
                },
                bolk2: {
                    avsnitt1: "If you have documentation on paper, you can scan it and send it digitally.",
                    avsnitt2:
                        "Using a scanning app, you can use the camera on your mobile phone to scan the documentation. You can compile several paper pages into one digital attachment, for example your tenancy agreement.",
                    avsnitt3:
                        "You can also take a photo of the documentation you have on paper with your mobile phone. You can attach the images when you send attachments from your mobile phone. If you use a PC, you can send the images to yourself by e-mail, then upload them to nav.no.",
                    tittel: "Send paper-based documentation",
                },
                bolk3: {
                    avsnitt1:
                        "If you wish to send documentation from another website, download the content if possible. For example, tax returns and letters of decisions from Lånekassen can be downloaded as PDF files. Avoid taking pictures of a PC screen with your mobile phone.",
                    tittel: "Send documentation from other websites",
                },
                bolk4: {
                    avsnitt1:
                        "It is important that you check that the documentation you upload is complete and can be read on the screen. If it is difficult to read the documentation, we may ask you to re-send it.",
                    tittel: "Make sure the documentation you send can be read",
                },
                overskrift: "Do you need help sending documentation?",
            },
            stringValue:
                'Here you must state your income and expenses. The fields below are based on information that you have provided during the application. It is important that, to the extent possible, you complete all information regarding your financial situation and provide documentation. If you have paper documentation, you can scan it or <a href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/ta-bilde-av-vedleggene-med-mobilen" target="_blank">take a picture of the documentation with your mobile telephone</lenke>. You can attach documentation together with your application, or deliver this after you have submitted the application.',
        },
        inntekt: {
            bankinnskudd: {
                belop: {
                    leggtil: "Add balance",
                    saldo: {
                        label: "Balance",
                    },
                    sporsmal: "What is the balance in other bank accounts or savings schemes?",
                },
                livsforsikringssparedel: {
                    leggtil: "Add balance",
                    saldo: {
                        label: "Balance",
                    },
                    sporsmal: "What is the balance in your life insurance?",
                },
                verdipapirer: {
                    saldo: {
                        label: "Balance",
                    },
                    sporsmal: "What is the balance on your shares, bonds funds?",
                },
            },
            eierandeler: {
                annet: {
                    sporsmal:
                        "You have responded that you own something else of value: therefore, we ask that you document",
                },
                bolig: {
                    sporsmal: "You have responded that you own a housing; therefore, we ask that you document",
                },
                campingvogn: {
                    sporsmal:
                        "You have responded that you own a caravan and/or boat; therefore, we ask that you document",
                },
                fritidseiendom: {
                    sporsmal: "You have responded that you own a housing; therefore, we ask that you document",
                },
                kjoretoy: {
                    sporsmal: "You have responded that you own a vehicle/vehicles; therefore, we ask that you document",
                },
            },
            inntekter: {
                annen: {
                    leggtil: "Add other payments",
                    sporsmal: "You have responded that you have received other payments",
                    sum: {
                        label: "Amount",
                    },
                },
                forsikring: {
                    sporsmal: "How much have you received in insurance payouts?",
                    sum: {
                        label: "Amount",
                    },
                },
            },
            sporsmal: "Income and assets",
            undertittel: "Income",
        },
        leggtil: "Add",
        statsborgerskap: {
            nordisk: {
                sporsmal:
                    "We ask that you upload your registration certificate/residence permit documenting your residence in Norway.",
            },
            sporsmal: "Citizenship",
        },
        utgifter: {
            barn: {
                annenBarneutgift: {
                    sisteregning: {
                        label: "Amount last expense",
                    },
                    sporsmal: "Which other expenses do you have for children?",
                    type: {
                        label: "Type of expense",
                    },
                },
                barnFritidsaktiviteter: {
                    sisteregning: {
                        label: "Amount last expense",
                    },
                    sporsmal: "Which expenses do you have for children’s leisure activities?",
                    type: {
                        label: "Description of activity",
                    },
                },
                barnTannregulering: {
                    sisteregning: {
                        label: "Amount last expense",
                    },
                    sporsmal: "How much do you pay for orthodontic treatment for children?",
                },
            },
            boutgift: {
                annenBoutgift: {
                    sisteregning: {
                        label: "Amount of housing expenses",
                    },
                    sporsmal: "Which other types of housing expenses do you have?",
                    type: {
                        label: "Type of housing expenses",
                    },
                },
                kommunalAvgift: {
                    sisteregning: {
                        label: "Amount last expense",
                    },
                    sporsmal: "How much do you pay in municipal charges?",
                },
            },
            sporsmal: "Expenses and debt",
        },
        vedlegg: {
            alleredelastetopp: "I have submitted this documentation previously",
            feil: {
                footer: "The problem has been logged and will be adressed.",
                konvertering:
                    "We experienced a technical error converting your document. Please try again later, or try uploading in a different format (we suggest PDF).",
                kryptering:
                    "We are currently unable to support password-protected PDFs. Please upload a PDF without a password (try opening it and printing as PDF).",
                retry: "Try again",
                tittel: "We're sorry, but there was a problem.",
                ukjent: "We experienced an unknown error with your document. Please try again later.",
            },
            knapp: {
                tekst: "Upload",
            },
            ugyldig:
                "The document you are trying to upload is not in a valid file format or exceeds 10 MB. You must upload a PDF, PNG or JPEG file and the file must be less than 10 MB.",
        },
    },
    opplysningerbolk: {
        tittel: "Documentation",
    },
    oppsummering: {
        arbeidsforhold: {
            ingen: "No work situation",
            permitteringsgrad: "Extent of lay-off",
        },
        barn: {
            tittel: "Children for whom child supplement is applied for",
        },
        bekreftOpplysninger:
            "<p>I am aware that if the information I have provided is not correct and complete, I can lose the right to receive support. I am also aware that I must repay any amounts that I have received incorrectly and that I can be reported to the police. Further, I am aware and I accept that NAV can obtain information necessary to process the case. </p >",
        bekreftelse: {
            feilmelding: "You must confirm that you are aware of the content in the point above",
        },
        bor: "live in",
        datotil: "to",
        eSoknad: "e-application",
        egennaering: {
            arbeidstimerIUken: "I work {{0}} hours per week",
            fordelingAvInntekt: "Distribution of income from farm",
            gaardsEiere: "Owner of farm",
            typeGaardsbruk: "Type of farm",
        },
        feilmelding: {
            bekreftmangler: "You must confirm before the application can be submitted.",
        },
        fodt: "born",
        gatilbake: "Go back to amend",
        ikkeutfylt: "Not completed",
        ingenBarn: "Not applying for child supplement for any children",
        inntekt: "income of",
        seVedlegg: "See attachment",
        send: "Submit application",
        sendesAvAndre: "Another person will submit it for me",
        sendesIkke: "I am not submitting it",
        sendesIkkeSendesAvAndre: "Not being submitted/ will be submitted by others",
        sendesSenere: "Will be forwarded",
        side: "Page",
        sideAvTotal: "of",
        sider: "pages",
        systemdataendret: {
            true: "You should read through the application thoroughly. There have been some recent changes in information we have obtained about you. There may be new requirements regarding attachments.",
        },
        tittel: "Summary",
        vedlegg: {
            dokument: "Document uploaded:",
            ingen: "No attachment",
            tittel: "Attachment",
        },
        vedleggAlleredeSendt: "I have sent this with a previous application",
    },
    organisasjonsnummer: {
        forfaatall: {
            feilmelding: "Organisation number must have 9 digits",
        },
        format: {
            feilmelding: "Organisation number can only be comprised of 9 digits",
        },
        leggtil: "Add additional organisation numbers",
        slett: "Delete",
    },
    pattern: {
        feilmelding: "The text contains invalid characters",
    },
    personalia: {
        bosted: {
            oppsummering: "When you have completed the application it will be sent to",
        },
        bostedsadresse: "Residential address",
        bydel: {
            default: "Select district",
            label: "In which district?",
        },
        co: "c/o:",
        ferdig: "Personal details completed",
        fnr: "Date of birth/ID number",
        folkeregistrertadresse: "Registered address",
        gyldigTil: "Valid until:",
        informasjon:
            "For us to send the application to the correct NAV office, we need to know where you live or are staying.",
        ingenadresse: "You do not have a temporary address in Norway or abroad",
        intro: {
            tekst: "Your profile",
            stringValue:
                "NAV has registered the following contact information If this is not correct, you can enter a temporary address in {{0}}. You can also enter other account numbers and telephone numbers here.",
        },
        kommune: {
            default: "Select town/city",
            label: "In which municipality are you living or staying?",
        },
        kontonummer: {
            ikkeRegistrert:
                "We have not registered your account number; we recommend that you enter this in Din Profil",
            stringValue: "Account number",
        },
        kvinne: "female",
        mann: "male",
        midlertidigAdresseNorge: "Temporary address Norway",
        midlertidigAdresseUtland: "Temporary address abroad",
        navn: "Name:",
        postboks: "PB",
        tittel: "Personal details",
        utenlandskstatsborger: {
            statsborgerskap: {
                informasjon:
                    "You are not registered as a Nordic citizen. If you are an EEA citizen, you must enclose a registration certificate for EEA citizens. You can obtain a registration certificate from the police. If you are not from an EEA country, you must enclose a residence and work permit. You can obtain these from UDI (Directorate of Immigration)",
            },
        },
    },
    personaliabolk: {
        tittel: "Personal information",
    },
    saksoversikt: {
        mottaker: {
            deg: "You",
            nav: "NAV",
        },
        soknadsnavn: {
            ettersending: "Forwarding documentation for an application for financial assistance",
            stringValue: "Application for financial assistance",
        },
        temanavn: "Financial assistance",
    },
    select: {
        required: {
            feilmelding: "You must provide a response",
        },
        ugyldig: {
            feilmelding: "You must select an element from the list",
        },
    },
    sendsoknadfeilet: {
        melding:
            "An error occurred when submitting the application. You can close this notification and try again. If the fault continues, you can return to this page and try again later.",
        tittel: "Submission failed",
    },
    sendtSoknad: {
        sendEpost: {
            epostInnhold:
                "You have submitted an application to NAV. If you intend to forward documentation to your application, you can use this link: {{1}} . Remember to submit documentation within the stipulated deadline. After this we will process your application with the information we have, and your application can be rejected due to insufficient information. You can also follow your application in your case overview on My Page, and see when it has been fully processed, see {{0}}. Yours sincerely, NAV",
            epostSubject: "You have submitted an application to NAV.",
        },
    },
    sistLagret: {
        aldriLagret: "The application has not been saved",
        lagret: "Last saved",
    },
    situasjon: {
        kategorier: {
            oppsummeringstekst: {
                label: "You have chosen:",
                resten: "I need money for:",
            },
        },
        kort: {
            dokumentasjon: {
                description: "Here you can upload any other documentation you consider important for the application.",
                title: "Documentation of the change",
            },
            endring: {
                description: "For example income, expenses, family situation or living situation.",
                legend: "Has anything in your situation changed since you last applied?",
            },
            hvaErEndret: {
                description:
                    "Has anything changed since the last time you applied, or would you like to provide more details about what you're applying for?",
                label: "What is your situation?",
            },
            tittel: "Income",
        },
        nodsituasjon: {
            oppsummering: "Emergency aid:",
        },
    },
    skjema: {
        feilmelding: {
            antall: {
                feilmeldinger: "Number of errors in the form:",
            },
            gaatil: {
                forrige: "Previous error",
                neste: "Next error",
            },
            lukk: {
                aria: "Close error overview",
                stringValue: "Close",
            },
        },
        feilmeldinger: {
            feilkode: "Error code",
            number404: "We could not find the page you are trying to open.",
            tilbake: "back",
            tittel: "OOPS, SOMETHING WENT WRONG...",
        },
        ferdig: "Continue to attachment",
        knapper: {
            avbryt: "Close",
            forrige: "Previous step",
            neste: "Next step",
            send: "Submit application",
            start: "Start application",
        },
        sensitivadvarsel: "Do not submit health information or other sensitive personal information",
        tittel: "Application for financial assistance",
    },
    slett: {
        informasjon: "All of your entered data will be deleted and the application will not be submitted to NAV.",
        tittel: "Confirm that you wish to delete the application",
    },
    slettet: {
        informasjon:
            "The application and all documentation have been deleted. If you wish to submit the application in any case, you must return to the form guide and start again.",
        skjemaveileder: "To form guide",
        tittel: "The application has been deleted",
    },
    soknad: {
        ferdigstilt: "The application has already been submitted.",
    },
    soknadsmottaker: {
        enhetsnavn: {
            label: "NAV office",
        },
        hjelpetekst: {
            ingress:
                "If you are staying in an institution, for example in a hospital or prison, write your last address before arriving at the institution.",
            tekst: "Fill in the address where you currently live so that we can send your application to the correct NAV office.",
        },
        infotekst: {
            tekst: "State your residential address (mandatory)",
        },
        kommunenavn: {
            label: "Municipality",
        },
        sporsmal: "Your address",
    },
    soknadsmottakerbolk: {
        tittel: "Application recipient",
    },
    soknadsosialhjelp: {
        ettersending: {
            kvittering: {
                tittel: "Forwarding documentation",
            },
        },
        forstesiden: {
            bekreftInfoModal: {
                body: '<h3>Information</h3><p>When you apply for financial assistance digitally, you must provide your personal information so that the NAV office can process your application. Examples of information are your living situation, assets and expenses.</p></br><p>In addition, NAV will obtain information from public registers on behalf of the municipality that will process your application.</p><p>You can be confident that your personal information will be processed in a secure, correct manner:</p></br><ul><li>We will not obtain any more information than is necessary.</li><li>NAV has a duty of non-disclosure in respect of all information that we process. If public agencies or others wish to obtain your personal information, they must have legal access or you must provide your consent.</li></ul><h4>Obtaining your personal information</h4><p>You enter information about yourself in your application. In addition, we obtain information that NAV holds in registers that we are permitted to use:</p></br><ul><li>Information concerning citizenship, address and family situation from the National Population Register.</li><li>Information concerning account numbers.</li><li>Information concerning telephone numbers from the contact and reservation register.</li></br><li>Information concerning your work situation from the State Register of Employers and Employees.</li><li>Information about state benefits from NAV.</li></ul><p>If you give your consent in the application, we will also obtain information concerning income from the Tax Administration and information concerning housing allowance from Husbanken.</p><h4>Purpose of compiling and using personal information</h4><p>The purpose of the application is to compile sufficient information so that the municipality can process your application for financial assistance. The information you provide in the digital application and information we obtain, will be sent digitally from nav.no to your NAV office. It will be easier for you to apply and your NAV office receives the application fully completed with the necessary attachments.</p></br><p>The information in your application will be used to evaluate whether you comply with requirements regarding financial assistance and will not be stored for any longer than necessary. If the information is not to be stored according to the Archive Act or other legislation, it must be deleted after use.</p><h4>Legal basis</h4><p>The legal basis for collecting information in connection with your application is the Act relating to social services in the Labour and Welfare Administration.</p><h4>Data controller</h4><p>The municipality in which you are resident is responsible for processing the application and for handling your personal information.</p><p>Contact the municipality if you have any questions regarding personal information. The municipality also has a Data Protection Officer you can contact.</p><p>The Labour and Welfare Administration is responsible for nav.no and is the data processor on behalf of the municipality. Here you can read more about <a href="https://www.nav.no/personvern-sikkerhet-navno" class="lenke" target="_blank" rel="noreferrer noopener">personal data protection and security at nav.no</a>.</p><h4>Storing your personal data</h4><h5>Before you submit the application, your information is stored at nav.no.</h5><p>Applications that have been started but not completed are stored by the Labour and Welfare Administration for two weeks. Thereafter, they are deleted.</p><h5>After you have submitted the application, the municipality is responsible for your personal information </h5><p>When you submit your application, we use KS’ (Norwegian Association of Local and Regional Authorities’) cloud service for digital post (Svarut). The municipality obtains your application in Svarut and stores the information in municipal administrative systems. Your municipality is responsible for storage and deletion of your information, both in Svarut and the administrative system. The Archive Act determines how long information can be stored. Contact your municipality if you have any questions regarding storage periods.</p><h4>Rights as a registered person</h4><p>Everyone has the right to information about and access to their own personal information according to the Personal Data Act. </p><p>If information about you is incorrect, incomplete or unnecessary, you can request that the information be corrected or supplemented. In special cases, you can request that the information be deleted. In certain cases, the municipality has a legal obligation to store the information as documentation. Such demands must be responded to at no charge and at the latest within 30 days.</p></br><p>You also have other personal data protection rights, including so-called <strong>the right to limitation.</strong>: In certain cases, you also have the right to have a limited processing of your personal information. If you have this right, the information will be stored, but not used.</p></br><p>You also have <strong>the right to object</strong> against processing of personal information: This means that in certain cases you can have the right to object against the municipality’s otherwise lawful processing of personal information. In such case, processing must cease and if your case is upheld the personal information will be deleted.</p></br><p>The Data Protection Authority\'s website has an overview of <a href="https://www.datatilsynet.no/rettigheter-og-plikter/den-registrertes-rettigheter/" class="lenke" target="_blank" rel="noreferrer noopener">your rights</a>. Your municipality also has information concerning processing of personal information on its website.</p><p>Any enquiries you have regarding processing of your personal information must be made to your NAV office.</p><h4>Right of appeal to the Data Protection Authority</h4><p>You have the right to complain to the Data Protection Authority if you are not satisfied with how we process your personal information, or if you believe the processing violates the personal data protection rules, Information about <a href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/" class="lenke" target="_blank" rel="noreferrer noopener">how to submit a complaint</a> is available on the Data Protection Authority\'s website.</p>',
            },
            bekreftOpplysninger: "I confirm that I have read and understood the information regarding consent",
            rettigheterPlikter:
                "Applications that are started, but not completed, will be saved by nav.no for two weeks. Thereafter, they are deleted. Read about your",
            rettigheterPlikterLinktekst: "personal information rights.",
        },
        oppsummering: {
            bekreftInfoModal: {
                body: "<P> I give my consent that the information I have provided in this application, and the information that will be obtained from other registers in accordance with applicable legislation, can be transferred to {{kommuneNavn}} municipality, c/o NAV {{navKontorNavn}}. This is so that the NAV office will be able to process my application for financial assistance. {{kommuneNavn}} municipality cannot disclose my information to other parties unless I have given my consent or they have the right according to legislation. </p> <p> Consent to obtain information and to exchange these with the municipality applies only to the processing of this application.</p> <p> I have been informed that the information will be stored in the administrative system of {{kommuneNavn}} municipality c/o NAV {{navKontorNavn}}. I have also been informed that I can request access to this information, and request deletion or correction of information about myself. I understand that giving this consent is voluntary and that consent can be withdrawn at any time. If I wish to withdraw my consent, I will make enquiries at {{kommuneNavn}} municipality c/o NAV {{navKontorNavn}}. </p> <p> If you do not wish to give your consent as described above, you must enquire at your local NAV office and complete a manual application form. </p>",
                title: "Consent concerning personal information for this application",
            },
            bekreftOpplysninger:
                "You may lose your right to benefits if the information you provide is not correct or complete. NAV can withhold or reclaim money. Providing incorrect information can be punishable.",
            bekreftelse: {
                ny: {
                    label: "We trust you",
                },
            },
            harLestSamtykker: "I confirm that the information I have provided is correct.",
            hvorsendes_del1: "Your application will be sent to {{valgtEnhetsNavn}}.",
            hvorsendes_del2:
                "The NAV office will process your application as quick as possible. They will contact you if they need anything from you!",
            infoSamtykke: "Information concerning your personal privacy rights.",
            samtykke: {
                oversendelse: {
                    pdf: "To begin with the application, you must confirm that you have read and understood information regarding consent. I confirm that I have read and understood the information regarding consent. To be able to apply for financial assistance digitally, it is necessary that you give your consent that the information you provide and the information obtained according to applicable legislation, can be transferred to the NAV office in your municipality for final case processing. You will at all times be able to see which information NAV obtains in your application. When you have completed the application and are ready to submit it, you will be asked to authorise a consent declaration for transfer to your local NAV office. If you already at this point know that you do not wish to give your consent to transfer your application to your local NAV office, you must contact your NAV office to complete a manual application form.",
                },
                sannferdig: {
                    pdf: "I give my consent that the information I have provided in this application, and the information that will be obtained from other registers in accordance with applicable legislation, can be transferred to my local NAV office. This is so that the NAV office will be able to process my application for financial assistance. The municipality cannot disclose my information to other parties unless I have given my consent or they have the right according to legislation. The consent to obtain information and to exchange this with the municipality applies only to processing of this application. I have been informed that the information will be stored in a case processing system at my local NAV office. In addition, I have been informed that I can request access to this information, and request deletion or correction of information about myself. I understand that giving this consent is voluntary and that consent can be withdrawn at any time. If I wish to withdraw my consent, I will make enquiries at my local NAV office.",
                },
            },
        },
        skjema: {
            tittel: "Application for financial assistance",
        },
    },
    stegindikator: {
        aktivt: "Active",
        gjennomfort: "Completed",
        sendInn: "Submit",
        skjema: "Form",
        vedlegg: "Attachment",
        veiledning: "Guide",
    },
    system: {
        familie: {
            barn: {
                antall: {
                    sporsmal: "Number of registered children under 18 years of age",
                },
                sporsmal: "We have registered that you have children",
                tittel: "Child",
                true: {
                    barn: {
                        deltbosted: {
                            hjelpetekst: {
                                tekst: "Shared residence means that the child lives with both parents after separation. In such case, the parents have formed an agreement on shared residence or a court has decided that the child shall share his/her residence with the parents. This means that the child lives (approximately) an equal amount of time with both of the parents, and both must agree regarding decisions affecting the child’s daily life. Shared residence is not the same as if the child has visits with both of the parents half of the time.",
                            },
                            sporsmal: "Does the child have shared residence?",
                        },
                        etternavn: {
                            label: "Surname",
                        },
                        fodselsdato: {
                            label: "Date of birth (ddmmyyyy)",
                        },
                        folkeregistrertsammen: {
                            sporsmal: "The child has the same registered address as you",
                        },
                        fornavn: {
                            label: "First name",
                        },
                        grad: {
                            label: "What is your visiting arrangement with your child?",
                            pattern: "Write amount in percent %",
                            sporsmal: "What is your visiting arrangement with your child?",
                        },
                        mellomnavn: {
                            label: "Middle name",
                        },
                        pattern: "",
                        sporsmal: "Information about the child/children",
                    },
                    listetittel: "Information about the child/children",
                },
                empty: "We could not find any children registered on you",
            },
            sivilstatus: {
                diskresjonskode: "Spouse/partner has discretion code",
                enke: "Widow/widower",
                gift: {
                    ektefelle: {
                        etternavn: {
                            label: "Surname",
                        },
                        fodselsdato: "Date of birth",
                        folkereg: "Registered at the same address",
                        folkeregistrertsammen: {
                            sporsmal: "Registered at the same address as spouse in the National Population Register",
                        },
                        fornavn: {
                            label: "First name",
                        },
                        mellomnavn: {
                            label: "Middle name",
                        },
                        navn: "Name",
                        tittel: "Information about your spouse",
                    },
                    stringValue: "Married/registered partner",
                },
                ikkeTilgang: {
                    label: "You are married or a registered partner",
                },
                informasjonspanel: {
                    tekst: "We look at your overall finances when assessing your application. To do this, we need information about the situation of your spouse. Your spouse can submit a separate application, or you can contact the local NAV office.",
                    tittel: "Spouses have a mutual obligation to provide for each other",
                },
                infotekst: "Information about your spouse",
                kilde: "We have obtained the following information from the National Population Register:",
                label: "You are married or a registered partner with:",
                samboer: "Cohabiting partner",
                separert: "Separated",
                skilt: "Divorced",
                sporsmal: "Your civil status",
                ugift: "Unmarried",
                stringValue: "(Retrieved from the National Population Register)",
                empty: "We could not find any registered spouse or partner",
            },
        },
    },
    systeminfo: {
        avbrytendringknapp: {
            label: "Undo changes",
        },
    },
    textarea: {
        overmaks: "characters too many",
        undermaks: "characters remaining",
    },
    tilbake: {
        til: {
            soknad: {
                lenke: "Return to application",
            },
            vedlegg: {
                lenke: "Return to documentation",
            },
        },
        stringValue: "Back",
    },
    tilleggsopplysninger: {
        tittel: "Supplementary documentation",
    },
    utbetalinger: {
        infotekst: {
            detaljer: "See details",
            lukk: "Close",
            tekst: {
                url: "https://tjenester.nav.no/utbetalingsoversikt",
                v2: "Detailed information will be sent with the application. You can see the details at: <lenke>Your payments</lenke>.",
            },
        },
        ingen: {
            true: "You have no payments registered from NAV in the last month.",
        },
        inntekt: {
            fra: "From",
            skattbar: {
                avbryt: {
                    ja: "Yes, get information",
                    nei: "No",
                },
                beskrivelse: "You have obtained information about your income from the Tax Administration.",
                bruttoinntekt: "Income before tax",
                forskuddstrekk: "Tax deduction",
                gi_samtykke: "Obtain from the Tax Administration",
                har_gitt_samtykke: "You have obtained information from the Tax Administration",
                hent: {
                    info: {
                        skatteetaten: "Retrieve the information from the Tax Administration",
                    },
                },
                ingen: "You have no income registered with the Tax Administration for the last month.",
                inntekt: {
                    tittel: "Income retrieved from the Tax Administration",
                },
                mangler_samtykke: "You have not obtained information from the Tax Administration",
                nettoinntekt: "Income after tax",
                oppsummering:
                    "We have registered that you{ antall, plural,=0 { have not had }other {have had{ antall, plural,=1 {{en}}=2 {{to}}=3 {{tre}}=4 {{fire}}=5 {{fem}}=6 {{seks}}=7 {{sju}}=8 {{åtte}}=9 {{ni}}=10 {{ti}}=11 {{elleve}}=12 {{tolv}}other {{#}}}}} incomes.",
                samtykke_info:
                    "This information can be necessary to process the application. If you do not wish us to obtain this personal information, you can upload documentation in the last stage of the application.",
                samtykke_sporsmal_v1:
                    "Would you like to retrieve information about your income from The Norwegian Tax Administration?",
                samtykke_sporsmal_v2:
                    "Would you like to retrieve information about your income from The Norwegian Tax Administration?",
                skatteetaten: "See details from the Tax Administration",
                ta_bort_samtykke: "Remove information from the Tax Administration",
                tidspunkt: "Information was obtained",
                tittel: "Income",
                undertittel: "Reported income to the Tax Administration",
            },
            til: "to",
        },
        kontaktproblemer: "Due to a system fault we have not been able to obtain information about benefits from NAV.",
        skattbar: {
            kontaktproblemer:
                "We could not contact the Tax Administration. You can try again in a few minutes or upload the documentation yourself at the last stage of the application",
        },
        sporsmal: "Benefits paid last month",
        utbetaling: {
            andretrekk: {
                label: "Other deductions",
            },
            arbeidsgivernavn: {
                label: "Name of employer",
            },
            belop: {
                label: "Amount",
            },
            brutto: {
                label: "Amount (gross)",
            },
            erutbetalt: {
                label: "Paid out",
                title: "Benefits from NAV",
            },
            netto: {
                label: "Amount (net)",
            },
            periodeFom: {
                label: "From",
            },
            periodeTom: {
                label: "To",
            },
            skattetrekk: {
                label: "Tax deduction",
            },
            sporsmal: "Benefit",
            type: {
                label: "Benefit",
            },
            utbetalingsdato: {
                label: "Date",
            },
        },
    },
    utgifter: {
        barn: {
            infotekst: {
                tekst: "For example kindergarten, after-school program (SFO/AKS) or leisure activities",
            },
            sporsmal: "Do you have expenses for children?",
            typer: {
                annet: "Other",
                barnFritidsaktiviteter: "Leisure activities",
                barnTannregulering: "Orthodontic treatment",
                barnehage: "Kindergarten",
                fritidsaktivitet: "Leisure activities",
                fritidsaktiviteter: "Leisure activities",
                helse: "Health",
                sfo: "After-school program (SFO/AKS)",
                sporsmal: "What type of expense is it?",
                tannbehandling: "Orthodontic treatment",
                tannregulering: "Orthodontic treatment",
            },
        },
        boutgift: {
            infotekst: {
                tekst: "For example rent or electricity",
            },
            sporsmal: "You have housing expenses?",
            true: {
                type: {
                    andreutgifter: {
                        true: {
                            beskrivelse: {
                                label: "Describe",
                            },
                        },
                        stringValue: "Other expenses",
                    },
                    annenBoutgift: {
                        true: {
                            beskrivelse: {
                                label: "Describe",
                            },
                        },
                        stringValue: "Other expenses",
                    },
                    avdraglaan: "Installments and interest on home mortgage",
                    boliglan: "Installments and interest on home mortgage",
                    boliglanAvdrag: "Installments and interest on home mortgage",
                    feilmelding: "You must state your housing expenses",
                    husleie: "Rent",
                    kommunalAvgift: "Municipal charges",
                    kommunaleavgifter: "Municipal charges",
                    oppvarming: "Wood, gas or district heating",
                    sporsmal: "Which expences do you have where you live?",
                    strom: "Electricity",
                },
            },
        },
        tittel: "Your expenses and debt",
    },
    utgifterbolk: {
        tittel: "Expenses and debt",
    },
    validering: {
        adresseMangler: "You must select a valid address before you can continue",
        erFdato: "Invalid date",
        erFdatoEtterIdag: "Date of birth cannot be after today’s date",
        erKontonummer: "Invalid account number",
        erSamvaersgrad: "Visiting arrangement must be between 0 and 100%",
        erTall: "Please state the amount in whole numbers",
        erTelefonnummer: "Invalid telephone number",
        feltEksistererIkke:
            "We could not update the field. This may be because you have made changes in the application. Please update this page and try again.",
        filEksistererIkke:
            "We could not upload the documentation. This may be because you have made changes in the application. Please update this page and try again.",
        maksLengde: "You have entered too many characters.",
        minLengde: "Not enough characters.",
        pakrevd: "Must be completed",
        tittel: "You must fix the following before you can continue.",
    },
    vedlegg: {
        K7: {
            tittel: "Confirmation of compilation",
        },
        L7: {
            null: {
                tittel: "Receipt for submitted application",
            },
        },
        annet: {
            annet: {
                info: "If you have other documentation you wish to submit, they can be uploaded here.",
                tittel: "Other information",
            },
            beskrivelse: {
                sporsmal: "What are you documenting (max. 25 characters)?",
            },
            ikkelastetopp: {
                feilmelding: "You must upload the documentation",
            },
            inlinefeilmelding: "You must upload the attachment",
            navn: {
                feilmelding: "You must describe the documentation, and it must contain minimum 3 characters",
                lengde: {
                    feilmelding: "The description must contain minimum 3 characters",
                },
            },
            slett: "Delete",
        },
        barnebidrag: {
            betaler: {
                tittel: "Upload information on how much you pay",
            },
            mottar: {
                tittel: "Upload information on how much you receive",
            },
        },
        behandlet: {
            LastetOpp: "Uploaded documentation",
            SendesIkke: "Documents not being submitted",
            SendesSenere: "Documentation will be forwarded",
            VedleggAlleredeSendt: "Documentation submitted previously",
            VedleggKreves: "Documentation required",
            VedleggSendesAvAndre: "Documentation will be submitted by someone else",
            VedleggSendesIkke: "Documentation not being submitted",
            alleredeSendt: {
                fritekst: {
                    feilmelding:
                        "You must state which documentation have been submitted previously, and the date when they were submitted.",
                    negativtellertekst: "SIGN",
                    sporsmal:
                        "You must state which documentation have been submitted previously, and the date when they were submitted.",
                    tellertekst: "SIGN AGAIN",
                },
            },
            sendesAvAndre: {
                fritekst: {
                    feilmelding: "You must state who will be submitting the documentation.",
                    negativtellertekst: "SIGN",
                    sporsmal:
                        "NAV must receive the documentation within 14 days - if not, there is a risk that your application will be rejected. You must state who will be submitting the documentation.",
                    tellertekst: "SIGN AGAIN",
                },
            },
            sendesIkke: {
                fritekst: {
                    feilmelding: "You must state the reason why you are not submitting the documentation.",
                    negativtellertekst: "SIGN",
                    sporsmal:
                        "It is likely that your application will be rejected. You must in any case state the reason why you are not submitting the documentation.",
                    tellertekst: "SIGN AGAIN",
                },
            },
            sendesSenere: {
                fritekst: {
                    feilmelding: "You must state the reason why you are not submitting the documentation at this time.",
                    negativtellertekst: "SIGN",
                    sporsmal:
                        "NAV must receive the documentation within 14 days - if not, there is a risk that your application will be rejected. You must state the reason why you are not submitting the documentation at this time.",
                    tellertekst: "SIGN AGAIN",
                },
            },
        },
        dokumentasjon: {
            annetboutgift: {
                tittel: "Information about other housing expenses",
            },
            annetinntekter: {
                tittel: "Information about other payments",
            },
            annetverdi: {
                tittel: "Information about other objects of value",
            },
            campingvogn: {
                tittel: "Information about caravan and/or boat",
            },
            forsikringsutbetaling: {
                tittel: "Information about insurance payouts",
            },
            fritidseiendom: {
                tittel: "Information about leisure property",
            },
            kjoretoy: {
                tittel: "Information about vehicles",
            },
            utbytte: {
                tittel: "Information about dividends",
            },
        },
        faktum: {
            VedleggSendesAvAndre: "Another person will submit it for me",
            andreInnsendingsvalg: "Do you not have the document available? You must check the box on the list below",
            eksempel: "Example of documentation",
            ettersend: "I will submit it later",
            faq: "Frequently asked questions",
            ikkesend: "Not submitting, or someone else is submitting it for me",
            lastopp: {
                dennepc: "Upload from this PC",
                mobil: "Upload from mobile telephone",
                stringValue: "I wish to upload",
            },
            vedleggalleredesendt: {
                hjelpetekst: {
                    tekst: "If the documentation you submitted with a previous application also applies to the period you are currently applying for, and your situation has not changed, you do not need to submit the attachment this time.",
                },
                stringValue: "I have submitted it previously",
            },
            vedleggikkesend: "I am not submitting it",
        },
        faktura: {
            annetbarnutgift: {
                tittel: "Receipt/invoice for other children expenses",
            },
            barnehage: {
                tittel: "Receipt/invoice from kindergarten",
            },
            fritidsaktivitet: {
                tittel: "Receipt/invoice from leisure activity",
            },
            husleie: {
                tittel: "Receipt/invoice for rent",
            },
            kommunaleavgifter: {
                tittel: "Receipt/invoice for municipal charges",
            },
            oppvarming: {
                tittel: "Receipt/invoice for heating",
            },
            sfo: {
                tittel: "Receipt/invoice from after-school program (SFO/AKS)",
            },
            strom: {
                tittel: "Receipt/invoice for electricity",
            },
            tannbehandling: {
                tittel: "Receipt/invoice for orthodontic treatment",
            },
        },
        ferdig: "To summary",
        forhandsvisning: {
            avbryt: "Cancel",
            fullskjerm: {
                lukk: "End full screen",
                stringValue: "Full screen",
            },
            info: "Please ensure the documents can be read, and show the correct information",
            opplast: "Upload document",
            slett: "Delete",
            tilbake: {
                mobil: "Back",
                stringValue: "Return to previous page",
            },
        },
        husbanken: {
            vedtak: {
                tittel: "Decision on housing allowance for last 2 months",
            },
        },
        husleiekontrakt: {
            husleiekontrakt: {
                tittel: "Rental agreement",
            },
            kommunal: {
                tittel: "Rental agreement",
            },
        },
        info1: 'Upload all of the documentation you wish to submit with this application. If you have paper-based documentation and do not have a scanner, you can instead<a href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/ta-bilde-av-vedleggene-med-mobilen">take a picture of the document/lenke> with your mobile telephone.',
        info2: 'Here you can check <a href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV" target="_blank">case processing times</lenke>  in your county. If you upload all of the documentation at once, your case processing time may be shorter.',
        info3: "If you need to forward documentation, you must send these within 14 days. If we do not receive the documentation within the deadline, we will not have sufficient information to process your case. We will determine your case using the information we have available, and you risk having your application rejected.",
        infoboks: {
            lastopp: "You can upload the documents later in the application.",
        },
        inlinefeilmelding: "You must either upload the documentation or respond that you will forward it later",
        kjopekontrakt: {
            kjopekontrakt: {
                tittel: "Purchase contract",
            },
        },
        kontooversikt: {
            aksjer: {
                tittel: "Balance statement from VPS account",
            },
            annet: {
                tittel: "Information about other bank deposits or savings",
            },
            brukskonto: {
                tittel: "Upload balance statement for current account (at the time of application)",
            },
            bsu: {
                tittel: "Balance statement for BSU (at the time of application)",
            },
            livsforsikring: {
                tittel: "Upload information about life insurance",
            },
            sparekonto: {
                tittel: "Balance statement for savings account(s) (at the time of application)",
            },
        },
        lastned: "Download",
        lastopp: "Upload",
        leggtilekstravedlegg: "Upload additional documentation",
        leggved: "You must include the following:",
        lonnslipp: {
            arbeid: {
                tittel: "Wage slip (last month)",
            },
        },
        nedbetalingsplan: {
            avdraglaan: {
                tittel: "Instalment plan",
            },
        },
        netbetalingsplan: {
            avdraglaan: {
                tittel: "Instalment plan",
            },
        },
        oppholdstillatel: {
            oppholdstillatel: {
                tittel: "Registration certificate or residence permit",
            },
        },
        opplasting: {
            feil: {
                filType: "Upload failed. Only JPEG, PNG, and PDF files are supported.",
                forStor: "Upload failed. The total file size cannot exceed {{maxUploadSize}}.",
                generell: "Upload failed. Please try again.",
                infotekst: "Upload of attachment failed. Please try again or submit the documentation later.",
                muligVirus: "Uploading was stopped by antivirus software. You can try again with a different file.",
                samletStorrelseForStor:
                    "You have uploaded {{antall}} documentation that in total are more than 150 MB. It is not possible to upload further documentation; however, you can still forward any missing documentation after the application has been submitted.",
            },
            suksess: "Document(s) uploaded!",
        },
        oppsummering: {
            ikkelastetopp: "Not uploaded",
            tittel: "Documentation",
        },
        salgsoppgjor: {
            eiendom: {
                tittel: "Information about sale settlement",
            },
        },
        samvarsavtale: {
            barn: {
                tittel: "Visitation agreement, or agreement on shared residence",
            },
        },
        skattemelding: {
            skattemelding: {
                tittel: "Tax return and tax settlement",
            },
        },
        slett: "Delete",
        sletteModal: {
            tittel: "Are you sure you want to delete the file?",
            avbryt: "Cancel",
            slett: "Delete file",
        },
        slettvedlegg: "Delete document",
        sluttoppgjor: {
            arbeid: {
                tittel: "Final settlement",
            },
        },
        student: {
            vedtak: {
                tittel: "Letter of decision from Lånekassen",
            },
        },
        tittel: "Uploading documentation",
        video: {
            info: "For guidance on uploading, see video:",
            knapp: "Uploading in 60 seconds",
        },
    },
    backendCompat: {
        jsonOkonomiOpplysningerArbeidAvsluttet: "Final settlement/holiday pay after tax",
        jsonOkonomiOpplysningerArbeidJobb: "Salary income",
    },
    arbeidOgFamilie: {
        tittel: "Work and family",
        alert: "You are getting a new and shorter application since you have applied before. Feel free to provide feedback on the application to your advisor.",
    },
};

export default skjema;
