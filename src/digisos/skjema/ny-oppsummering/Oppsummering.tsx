import React, {useEffect, useState} from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {Accordion, BodyShort, Link, Heading} from "@navikt/ds-react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {
    bekreftOppsummering,
    hentNyOppsummering,
    hentOppsumeringFeilet,
    setNyOppsummering,
} from "../../redux/oppsummering/oppsummeringActions";
import BekreftCheckboksPanel from "nav-frontend-skjema/lib/bekreft-checkboks-panel";
import {FormattedMessage, useIntl} from "react-intl";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";
import NavFrontendSpinner from "nav-frontend-spinner";
import {UbesvarteSporsmalPanel} from "./UbesvarteSporsmalPanel";
import {Category, NyOppsummeringBolk, NyOppsummeringResponse} from "../../redux/oppsummering/oppsummeringTypes";
import {fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {ListOfValues} from "./question/ListOfValues";
import {Edit} from "@navikt/ds-icons";
import {Question as QuestionEl} from "./question/Question";
import {SystemData} from "./question/SystemData";
import {FreeText} from "./question/FreeText";
import {Documentation} from "./question/Documentation";

const mockPersonalia: Category[] = [
    {
        title: "Personalia",
        questions: [
            {
                title: "Hentet fra Ditt NAV",
                questionType: "SYSTEM",
                systemValues: [
                    {key: "Navn", value: "Han Solo"},
                    {key: "Fødselsnummer", value: "111111 22222"},
                    {key: "Statsborgerskap", value: "Norge"},
                ],
            },
        ],
    },
    {
        title: "Adresse",
        questions: [
            {
                title: "Oppgi adressen der du bor",
                questionType: "RADIO_CHECKBOX",
                values: ["Folkeregistrert adresse: Sannergata 2, 0557 Oslo"],
            },
        ],
    },
    {
        title: "Telefonnummer",
        questions: [
            {
                title: "Hentet fra kontakt- og reservasjonsregisteret",
                questionType: "SYSTEM",
                systemValues: [
                    {
                        key: "Telefonnummer",
                        value: "11111111",
                    },
                ],
            },
        ],
    },
    {
        title: "Kontonummer",
        questions: [
            {
                title: "Hentet fra Ditt NAV",
                questionType: "SYSTEM",
                systemValues: [
                    {
                        key: "Kontonummer (11 siffer)",
                        value: "1111 11 11111",
                    },
                ],
            },
        ],
    },
];

const mockBegrunnelse: Category[] = [
    {
        title: "Søknad",
        questions: [
            {
                title: "Hva søker du om",
                questionType: "FREETEXT",
                freeText: "Dette er en lang string som kan printes ut som en del av et fritekstspørsmål.",
            },
            {
                title: "Gi en kort begrunnelse for søknaden",
                questionType: "FREETEXT",
            },
        ],
    },
];

const mockArbeid: Category[] = [
    {
        title: "Dine arbeidsforhold",
        questions: [
            {
                title: "Hentet fra Arbeidsgiver- og arbeidstakerregisteret for de siste tre månedene",
                questionType: "SYSTEM",
                systemValues: [],
            },
            {
                title: "Kommentarer til arbeidssituasjonen din",
                questionType: "FREETEXT",
            },
        ],
    },
    {
        title: "Utdanning",
        questions: [
            {
                title: "Er du skoleelev eller student?",
                questionType: "RADIO_CHECKBOX",
                values: ["Ja"],
            },
            {
                title: "Studerer du heltid eller deltid?",
                questionType: "RADIO_CHECKBOX",
            },
        ],
    },
];

const mockInntektOgFormue: Category[] = [
    {
        title: "Andre inntekter",
        questions: [
            {
                title: "Har du de siste tre månedene fått utbetalt penger som hverken er lønn eller ytelser fra NAV?",
                questionType: "RADIO_CHECKBOX",
                values: ["Ja"],
            },
            {
                title: "Hva har du mottatt?",
                questionType: "RADIO_CHECKBOX",
                values: ["Salg av aksjer", "Styregodtgjørelse", "Annet"],
                freeText: "Solgt eiendeler",
            },
        ],
    },
];

const mockØkonomiskeOpplysninger: Category[] = [
    {
        title: "Utgifter og gjeld",
        questions: [
            {
                title: "Hvor mye betaler du i strøm?",
                questionType: "DOCUMENTATION",
                files: [
                    {
                        filename: "strømregning-januar.pdf",
                        url: "#",
                    },
                ],
                freeText: "200",
            },
        ],
    },
    {
        title: "Generelle vedlegg",
        questions: [
            {
                title: "Vi ber deg dokumentere skattemeldingen og skatteoppgjør fra det siste året",
                questionType: "DOCUMENTATION",
            },
        ],
    },
];

export const EditAnswerLink = (props: {steg: number; questionId: string}) => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);
    return (
        <Link href={`/sosialhjelp/soknad/skjema/${behandlingsId}/${props.steg}#${props.questionId}`}>
            <Edit />
            Endre svar
        </Link>
    );
};

export const Oppsummering = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const {bekreftet, visBekreftMangler, nyOppsummering} = useSelector((state: State) => state.oppsummering);
    const {behandlingsId} = useSelector((state: State) => state.soknad);

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(behandlingsId));
            dispatch(hentNyOppsummering());
            fetchToJson<NyOppsummeringResponse>(`soknader/${behandlingsId}/oppsummering`)
                .then((response) => {
                    response.steg[0].categories = mockPersonalia;
                    response.steg[1].categories = mockBegrunnelse;
                    response.steg[2].categories = mockArbeid;
                    response.steg[5].categories = mockInntektOgFormue;
                    response.steg[7].categories = mockØkonomiskeOpplysninger;
                    dispatch(setNyOppsummering(response));
                })
                .catch((reason) => {
                    if (reason.message === HttpStatus.UNAUTHORIZED) {
                        return;
                    }
                    dispatch(hentOppsumeringFeilet(reason));
                });
            setLoading(false);
        }
    }, [behandlingsId, dispatch]);

    const bekreftOpplysninger: string = intl.formatMessage({
        id: "soknadsosialhjelp.oppsummering.harLestSamtykker",
    });

    if (loading) {
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
            <UbesvarteSporsmalPanel />

            {nyOppsummering.map((bolk: NyOppsummeringBolk) => {
                return (
                    <OppsummeringBolk bolk={bolk} key={bolk.steg}>
                        {bolk.categories?.map((category) => (
                            <QuestionEl key={category.title} title={category.title}>
                                {category.questions.map((question) => {
                                    return (
                                        <div key={question.title}>
                                            {question.questionType === "SYSTEM" && (
                                                <SystemData title={question.title} values={question.systemValues} />
                                            )}
                                            {question.questionType === "FREETEXT" && (
                                                <FreeText title={question.title} value={question.freeText} />
                                            )}
                                            {question.questionType === "RADIO_CHECKBOX" && (
                                                <ListOfValues
                                                    title={question.title}
                                                    values={question.values}
                                                    freeText={question.freeText}
                                                />
                                            )}
                                            {question.questionType === "DOCUMENTATION" && (
                                                <Documentation
                                                    title={question.title}
                                                    freeText={question.freeText}
                                                    files={question.files}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </QuestionEl>
                        ))}
                    </OppsummeringBolk>
                );
            })}

            <SoknadsmottakerInfoPanel />

            <BekreftCheckboksPanel
                label={bekreftOpplysninger}
                checked={bekreftet ? bekreftet : false}
                onChange={() => dispatch(bekreftOppsummering())}
                feil={
                    visBekreftMangler
                        ? {
                              feilmelding: intl.formatMessage({
                                  id: "oppsummering.feilmelding.bekreftmangler",
                              }),
                          }
                        : undefined
                }
            >
                <BodyShort>
                    <FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger" />
                </BodyShort>
            </BekreftCheckboksPanel>

            <BehandlingAvPersonopplysningerModal />
        </DigisosSkjemaSteg>
    );
};

const OppsummeringBolk = (props: {bolk: NyOppsummeringBolk; children: React.ReactNode}) => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <BolkTittel tittel={props.bolk.tittel} />
                </Accordion.Header>
                <Accordion.Content>{props.children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const BolkTittel = (props: {tittel: string}) => {
    return (
        <Heading level="2" size="medium">
            {props.tittel}
        </Heading>
    );
};

export default Oppsummering;
