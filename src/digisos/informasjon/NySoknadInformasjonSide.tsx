import styled from "styled-components";
import {filterAndSortPabegynteSoknader} from "./filterAndSortPabegynteSoknader";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../redux/reducers";
import {useHistory} from "react-router";
import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {createSkjemaEventData, logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {opprettSoknad} from "../redux/soknad/soknadActions";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import {Alert, BodyLong, BodyShort, Button, Heading, Label, Link, Loader, Panel} from "@navikt/ds-react";
import EllaBlunk from "../../nav-soknad/components/animasjoner/ellaBlunk";
import PersonopplysningerKortfattet from "./personopplysninger/PersonopplysningerKortfattet";
import {PlanlagtNedetidAlert} from "./feilmld/planlagtNedetidAlert";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import {NedetidAlert} from "./feilmld/nedetidAlert";

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

export const NySoknadInformasjonSide = () => {
    const antallPabegynteSoknader = filterAndSortPabegynteSoknader(
        useSelector((state: State) => state.soknad.pabegynteSoknader),
        new Date()
    ).length;

    const antallNyligInnsendteSoknader =
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
            antallPabegynteSoknader,
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
                <PersonopplysningerKortfattet />
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
