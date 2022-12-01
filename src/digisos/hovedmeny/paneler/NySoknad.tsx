import styled from "styled-components";
import {Alert, BodyLong, BodyShort, Button, Heading, Label, Loader, Panel} from "@navikt/ds-react";
import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {useHistory} from "react-router";
import {createSkjemaEventData, logAmplitudeEvent} from "../../../nav-soknad/utils/amplitude";
import {opprettSoknad} from "../../redux/soknad/soknadActions";
import {SkjemaContent} from "../../../nav-soknad/components/SkjemaContent";
import Snakkeboble from "../../../nav-soknad/components/snakkeboble/Snakkeboble";
import EllaBlunk from "../../../nav-soknad/components/animasjoner/ellaBlunk";
import Personopplysninger from "./Personopplysninger";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Notes} from "@navikt/ds-icons";

const Greeting = (props: {name: string}) => (
    <Label spacing>
        <FormattedMessage id="informasjon.hilsen.hei" values={{fornavn: props.name}} />
    </Label>
);

const GrayContainer = styled(Panel)`
    padding-bottom: 2rem;
    margin-bottom: 0rem !important;
    background-color: var(--a-bg-subtle);
`;
const CenteredContent = styled.div`
    margin-top: 1rem;
    text-align: center;
`;
export const NySoknadInfo = (props: {antallPabegynteSoknader: number}) => {
    const antallNyligInnsendteSoknader: number =
        useSelector((state: State) => state.soknad.harNyligInnsendteSoknader?.antallNyligInnsendte) ?? 0;
    const {startSoknadPending, startSoknadFeilet, nedetid, fornavn, visNedetidPanel} = useSelector(
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
                <div className={"mx-4 flex items-center flex-col"}>
                    <Snakkeboble>
                        {fornavn?.length && <Greeting name={fornavn} />}
                        <BodyShort>
                            <FormattedMessage id="informasjon.hilsen.tittel" />
                        </BodyShort>
                    </Snakkeboble>

                    <EllaBlunk size={"175"} />
                </div>
                <Panel>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="informasjon.start.undertittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.start.tekst_del1" />
                    </BodyLong>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.start.tekst_del2" />
                    </BodyLong>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="informasjon.start.tekst_del3"
                            values={{
                                a: (msg) => (
                                    // Disable target-blank-rule on internal urls
                                    /* eslint-disable react/jsx-no-target-blank */
                                    <a href="https://www.nav.no/okonomisk-sosialhjelp#soknad" target="_blank">
                                        {msg}
                                    </a>
                                    /* eslint-enable react/jsx-no-target-blank */
                                ),
                            }}
                        />
                    </BodyLong>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="informasjon.svarpasoknad.undertittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage id="informasjon.svarpasoknad.tekst" />
                    </BodyLong>
                    <Heading level="2" size="small" spacing>
                        <FormattedMessage id="informasjon.nodsituasjon.undertittel" />
                    </Heading>
                    <BodyLong spacing>
                        <FormattedMessage
                            id="informasjon.nodsituasjon.tekst"
                            values={{
                                a: (msg) => (
                                    // Disable target-blank-rule on internal urls
                                    /* eslint-disable react/jsx-no-target-blank */
                                    <a href="https://www.nav.no/sok-nav-kontor" target="_blank">
                                        {msg}
                                    </a>
                                    /* eslint-enable react/jsx-no-target-blank */
                                ),
                            }}
                        />
                    </BodyLong>
                </Panel>
            </SkjemaContent>
            <GrayContainer>
                <SkjemaContent>
                    <Personopplysninger />
                    {nedetid?.isPlanlagtNedetid && (
                        <Alert variant="info">
                            <FormattedMessage
                                id="nedetid.alertstripe.infoside"
                                values={{
                                    nedetidstart: nedetid.nedetidStart,
                                    nedetidslutt: nedetid.nedetidSlutt,
                                }}
                            />
                        </Alert>
                    )}
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

                        {nedetid?.isNedetid && visNedetidPanel && (
                            <Alert variant="error" style={{marginTop: "0.4rem"}}>
                                <FormattedMessage
                                    id="nedetid.alertstripe.infoside"
                                    values={{
                                        nedetidstart: nedetid.nedetidStart,
                                        nedetidslutt: nedetid.nedetidSlutt,
                                    }}
                                />
                            </Alert>
                        )}
                    </CenteredContent>
                </SkjemaContent>
            </GrayContainer>
        </>
    );
};

export const NySoknadPanel = ({antallPabegynteSoknader}: {antallPabegynteSoknader: number}) => (
    <Ekspanderbartpanel
        tittel={
            <div className={"flex items-center px-4 py-2"}>
                <div className={"rounded-full bg-green-500/40 p-3 mr-5 tw-hidden lg:block"}>
                    <Notes className={"w-9 h-9"} />
                </div>
                <Heading level="2" size="small">
                    Start en ny søknad
                </Heading>
            </div>
        }
    >
        <NySoknadInfo antallPabegynteSoknader={antallPabegynteSoknader} />
    </Ekspanderbartpanel>
);
