import React, {useEffect, useState} from "react";
import {Accordion, ConfirmationPanel, Link, Label, Alert} from "@navikt/ds-react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {oppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {
    bekreftOppsummering,
    hentNyOppsummering,
    hentOppsumeringFeilet,
    setNyOppsummering,
} from "../../redux/oppsummering/oppsummeringActions";
import {FormattedMessage, useIntl} from "react-intl";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import BehandlingAvPersonopplysningerModal from "../../hovedmeny/paneler/BehandlingAvPersonopplysningerModal";
import {NyOppsummeringBolk, NyOppsummeringResponse} from "../../redux/oppsummering/oppsummeringTypes";
import {fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {ListOfValues} from "./question/ListOfValues";
import {Edit} from "@navikt/ds-icons";
import {Question as QuestionEl} from "./question/Question";
import {SystemData} from "./question/SystemData";
import {FreeText} from "./question/FreeText";
import {Warning} from "./question/Warning";
import {SystemDataMap} from "./question/SystemDataMap";
import {Attachment} from "./question/Attachment";
import {useNavigate} from "react-router";
import {ApplicationSpinner} from "../../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {Link as ReactRouterLink} from "react-router-dom";
import styled from "styled-components";
import {useSoknad} from "../../redux/soknad/useSoknad";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import {NavEnhet} from "../personopplysninger/adresse/AdresseTypes";
import {soknadsdataUrl} from "../../redux/soknadsdata/soknadsdataActions";
import {SoknadsSti} from "../../redux/soknadsdata/soknadsdataReducer";
import {logWarning} from "../../../nav-soknad/utils/loggerUtils";

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
    const {behandlingsId, valgtSoknadsmottaker, showSendingFeiletPanel, nedetid, visMidlertidigDeaktivertPanel} =
        useSoknad();

    const nedetidstart = nedetid?.nedetidStartText ?? "";
    const nedetidslutt = nedetid?.nedetidSluttText ?? "";
    const isNedetid = nedetid?.isNedetid;

    const navigate = useNavigate();

    const intl = useIntl();

    useEffect(() => {
        if (!behandlingsId) return;

        fetchToJson<NavEnhet[]>(soknadsdataUrl(behandlingsId, SoknadsSti.NAV_ENHETER)).then((enheter) => {
            const valgtSoknadsmottaker = enheter.find((n) => n.valgt);
            if (!valgtSoknadsmottaker || valgtSoknadsmottaker.isMottakMidlertidigDeaktivert) {
                logWarning(`Ugyldig søknadsmottaker ${valgtSoknadsmottaker} på side 9, sender bruker til side 1`);
                navigate("1");
                return;
            }
            dispatch(oppdaterSoknadsmottakerStatus(valgtSoknadsmottaker));
        });

        dispatch(hentNyOppsummering());
        fetchToJson<NyOppsummeringResponse>(`soknader/${behandlingsId}/oppsummering`)
            .then((response) => {
                dispatch(setNyOppsummering(response));
            })
            .catch((reason) => {
                if (reason.message === HttpStatus.UNAUTHORIZED) return;
                dispatch(hentOppsumeringFeilet(reason));
            });
        setLoading(false);
    }, [behandlingsId, dispatch, navigate]);

    const bekreftOpplysninger: string = intl.formatMessage({
        id: "soknadsosialhjelp.oppsummering.harLestSamtykker",
    });

    if (loading) return <ApplicationSpinner />;

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"oppsummering"}>
            {nyOppsummering.map((bolk: NyOppsummeringBolk) => {
                return (
                    <OppsummeringBolk bolk={bolk} key={bolk.stegNr}>
                        {bolk.avsnitt.map((avsnitt) => (
                            <QuestionEl key={avsnitt.tittel} title={intl.formatMessage({id: avsnitt.tittel})}>
                                {avsnitt.sporsmal?.map((sporsmal) => {
                                    return (
                                        <div key={sporsmal.tittel}>
                                            {sporsmal.tittel && (
                                                <Label spacing>
                                                    <FormattedMessage id={sporsmal.tittel} />
                                                </Label>
                                            )}
                                            {!sporsmal.erUtfylt && <Warning />}
                                            <SystemData
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "SYSTEMDATA")}
                                            />
                                            <SystemDataMap
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "SYSTEMDATA_MAP")}
                                            />
                                            <ListOfValues
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "CHECKBOX")}
                                            />
                                            <Attachment
                                                behandlingsId={behandlingsId}
                                                felter={sporsmal.felt?.filter((felt) => felt.type === "VEDLEGG")}
                                            />
                                            <FreeText felter={sporsmal.felt?.filter((felt) => felt.type === "TEKST")} />
                                        </div>
                                    );
                                })}
                            </QuestionEl>
                        ))}
                    </OppsummeringBolk>
                );
            })}

            {valgtSoknadsmottaker && <SoknadsmottakerInfoPanel valgtSoknadsmottaker={valgtSoknadsmottaker} />}

            <ConfirmationPanel
                label={bekreftOpplysninger}
                checked={bekreftet ? bekreftet : false}
                onChange={() => dispatch(bekreftOppsummering())}
                error={visBekreftMangler}
            >
                <FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger" />
            </ConfirmationPanel>

            <BehandlingAvPersonopplysningerModal />

            {showSendingFeiletPanel && (
                <div role="alert">
                    <Alert variant="error" style={{marginTop: "1rem"}}>
                        Vi klarte ikke sende søknaden din, grunnet en midlertidig teknisk feil. Vi ber deg prøve igjen.
                        Søknaden din er lagret og dersom problemet fortsetter kan du forsøke igjen senere. Kontakt ditt
                        NAV kontor dersom du er i en nødsituasjon.
                    </Alert>
                </div>
            )}

            {visMidlertidigDeaktivertPanel && isNedetid && (
                <Alert variant="error" style={{marginTop: "1rem"}}>
                    <FormattedMessage
                        id="nedetid.alertstripe.send"
                        values={{
                            nedetidstart: nedetidstart,
                            nedetidslutt: nedetidslutt,
                        }}
                    />
                </Alert>
            )}
        </StegMedNavigasjon>
    );
};

const EditAnswer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const OppsummeringBolk = (props: {bolk: NyOppsummeringBolk; children: React.ReactNode}) => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id={props.bolk.tittel} />
                </Accordion.Header>
                <Accordion.Content>
                    <EditAnswer>
                        <ReactRouterLink className="navds-link" to={`/skjema/${behandlingsId}/${props.bolk.stegNr}`}>
                            Gå tilbake for å endre
                        </ReactRouterLink>
                    </EditAnswer>
                    {props.children}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Oppsummering;
