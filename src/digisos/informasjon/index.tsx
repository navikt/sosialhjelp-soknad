import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
import Personopplysninger from "./Personopplysninger";
import {opprettSoknad} from "../redux/soknad/soknadActions";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import {State} from "../redux/reducers";
import EllaBlunk from "../../nav-soknad/components/animasjoner/ellaBlunk";
import {createSkjemaEventData, logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {Soknadsoversikt} from "./Soknadsoversikt";
import {Alert, BodyLong, BodyShort, Button, Heading, Label, Link, Loader, Panel} from "@navikt/ds-react";
import {useHistory} from "react-router";
import styled from "styled-components";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import {NedetidAlert} from "./nedetidAlert";
import {PlanlagtNedetidAlert} from "./planlagtNedetidAlert";

const Greeting = (props: {name: string}) => (
    <Label spacing>
        <FormattedMessage id="informasjon.hilsen.hei" values={{fornavn: props.name}} />
    </Label>
);

const InformasjonFraElla = styled.div`
    margin: 1rem 0;
    display: block;
    text-align: center;
`;

const CenteredContent = styled.div`
    margin-top: 1rem;
    text-align: center;
`;

export const NySoknadInformasjonSide = (props: {antallPabegynteSoknader: number}) => {
    const antallNyligInnsendteSoknader: number =
        useSelector((state: State) => state.soknad.harNyligInnsendteSoknader?.antallNyligInnsendte) ?? 0;
    const {startSoknadPending, startSoknadFeilet, fornavn, visNedetidPanel} = useSelector(
        (state: State) => state.soknad
    );

    const dispatch = useDispatch();

    const history = useHistory();

    const intl = useIntl();

    const onSokSosialhjelpButtonClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        startSoknad();
    };

    const startSoknad = () => {
        logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            antallPabegynteSoknader: props.antallPabegynteSoknader,
            enableModalV2: true,
            erProdsatt: true,
            ...createSkjemaEventData(),
        });
        dispatch(opprettSoknad(intl, history));
    };

    return (
        <>
            <SkjemaContent>
                <InformasjonFraElla>
                    <Snakkeboble>
                        {fornavn?.length && <Greeting name={fornavn} />}
                        <BodyShort>
                            <FormattedMessage id="informasjon.hilsen.tittel" />
                        </BodyShort>
                    </Snakkeboble>
                    <EllaBlunk size={"175"} />
                </InformasjonFraElla>
                <Panel>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="informasjon.start.undertittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="informasjon.start.tekst_del1"
                            values={{
                                a: (msg: string) => (
                                    // Disable target-blank-rule on internal urls
                                    /* eslint-disable-next-line react/jsx-no-target-blank */
                                    <a href="https://www.nav.no/sosialhjelp/andre-muligheter" target="_blank">
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </BodyLong>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.start.tekst_del2" />
                    </BodyLong>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="informasjon.start.tekst_del3"
                            values={{
                                a: (msg: string) => (
                                    // Disable target-blank-rule on internal urls
                                    /* eslint-disable react/jsx-no-target-blank */
                                    <a
                                        href="https://www.nav.no/person/personopplysninger/nb/#ditt-nav-kontor"
                                        target="_blank"
                                    >
                                        {msg}
                                    </a>
                                    /* eslint-enable react/jsx-no-target-blank */
                                ),
                            }}
                        />
                    </BodyLong>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="informasjon.nodsituasjon.undertittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="informasjon.nodsituasjon.tekst"
                            values={{
                                a: (msg: string) => (
                                    <Link
                                        href="https://www.nav.no/person/personopplysninger/nb/#ditt-nav-kontor"
                                        target="_blank"
                                    >
                                        {msg}
                                    </Link>
                                ),
                            }}
                        />
                    </BodyLong>
                </Panel>
            </SkjemaContent>
            <SkjemaContent>
                <Personopplysninger />
                <PlanlagtNedetidAlert />
            </SkjemaContent>

            <SkjemaContent>
                {startSoknadFeilet && (
                    <Alert variant="error">
                        <FormattedMessage id="applikasjon.opprettsoknadfeilet" />
                    </Alert>
                )}

                <CenteredContent>
                    <Button
                        variant="primary"
                        id="start_soknad_button"
                        disabled={startSoknadPending || visNedetidPanel}
                        onClick={(event) => {
                            onSokSosialhjelpButtonClick(event);
                        }}
                    >
                        {getIntlTextOrKey(intl, "skjema.knapper.start")}
                        {startSoknadPending && <Loader />}
                    </Button>
                    <NedetidAlert skjul={!visNedetidPanel} />
                </CenteredContent>
            </SkjemaContent>
        </>
    );
};

const Informasjon = () => {
    if (!useSelector((state: State) => state.soknad.tilgang?.harTilgang)) return <IkkeTilgang />;

    return (
        <>
            <NedetidAlert />
            <Soknadsoversikt />
        </>
    );
};

export default Informasjon;
