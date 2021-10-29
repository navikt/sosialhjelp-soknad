import React, {useEffect, useState} from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {Accordion, ConfirmationPanel, Link, Label, Loader} from "@navikt/ds-react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {
    bekreftOppsummering,
    hentNyOppsummering,
    hentOppsumeringFeilet,
    setNyOppsummering,
} from "../../redux/oppsummering/oppsummeringActions";
import {FormattedMessage, useIntl} from "react-intl";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";
import {UbesvarteSporsmalPanel} from "./UbesvarteSporsmalPanel";
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
import {useHistory} from "react-router";

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

    const history = useHistory();

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(behandlingsId, history));
            dispatch(hentNyOppsummering());
            fetchToJson<NyOppsummeringResponse>(`soknader/${behandlingsId}/oppsummering`)
                .then((response) => {
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
    }, [behandlingsId, history, dispatch]);

    const bekreftOpplysninger: string = intl.formatMessage({
        id: "soknadsosialhjelp.oppsummering.harLestSamtykker",
    });

    if (loading) {
        return (
            <div className="application-spinner">
                <Loader size="2xlarge" />
            </div>
        );
    }

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
            <UbesvarteSporsmalPanel />

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

            <SoknadsmottakerInfoPanel />

            <ConfirmationPanel
                label={bekreftOpplysninger}
                checked={bekreftet ? bekreftet : false}
                onChange={() => dispatch(bekreftOppsummering())}
                error={
                    visBekreftMangler
                        ? intl.formatMessage({
                              id: "oppsummering.feilmelding.bekreftmangler",
                          })
                        : ""
                }
            >
                <FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger" />
            </ConfirmationPanel>

            <BehandlingAvPersonopplysningerModal />
        </DigisosSkjemaSteg>
    );
};

const OppsummeringBolk = (props: {bolk: NyOppsummeringBolk; children: React.ReactNode}) => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id={props.bolk.tittel} />
                </Accordion.Header>
                <Accordion.Content>{props.children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Oppsummering;
