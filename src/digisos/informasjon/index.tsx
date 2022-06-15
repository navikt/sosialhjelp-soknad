import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import Personopplysninger from "./Personopplysninger";
import {opprettSoknad} from "../redux/soknad/soknadActions";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {State} from "../redux/reducers";
import EllaBlunk from "../../nav-soknad/components/animasjoner/ellaBlunk";
import {createSkjemaEventData, logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {Soknadsoversikt} from "./Soknadsoversikt";
import {useTitle} from "../../nav-soknad/hooks/useTitle";
import {Alert, BodyLong, BodyShort, Button, Heading, Label, Link, Loader, Panel} from "@navikt/ds-react";
import {useHistory} from "react-router";
import styled from "styled-components";
import {SkjemaContent} from "../../nav-soknad/components/SkjemaContent";
import {WhiteBackground} from "../../nav-soknad/components/WhiteBackground";

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

const GrayContainer = styled(Panel)`
    padding-bottom: 2rem;
    margin-bottom: 0rem !important;
    background-color: var(--navds-semantic-color-canvas-background);
`;

const CenteredContent = styled.div`
    margin-top: 1rem;
    text-align: center;
`;

export const InformasjonSide = (props: {antallPabegynteSoknader: number}) => {
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
                <InformasjonFraElla>
                    <Snakkeboble>
                        {fornavn && fornavn.length > 0 && <Greeting name={fornavn} />}
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

const Informasjon = () => {
    const harTilgang: boolean = useSelector((state: State) => state.soknad.tilgang?.harTilgang) ?? false;
    const sperrekode = useSelector((state: State) => state.soknad.tilgang?.sperrekode);

    const {nedetid} = useSelector((state: State) => state.soknad);

    const intl = useIntl();
    const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

    useTitle(title);

    React.useEffect(() => {
        skjulToppMeny();
    }, []);

    if (!harTilgang) {
        return (
            <WhiteBackground>
                <AppBanner />
                <div className="skjema-content">
                    <IkkeTilgang sperrekode={sperrekode ? sperrekode : "pilot"} />
                </div>
            </WhiteBackground>
        );
    }

    return (
        <WhiteBackground>
            <AppBanner />

            <span>
                {nedetid?.isNedetid && (
                    <Alert variant="error" style={{justifyContent: "center"}}>
                        <FormattedMessage
                            id="nedetid.alertstripe.infoside"
                            values={{
                                nedetidstart: nedetid.nedetidStart,
                                nedetidslutt: nedetid.nedetidSlutt,
                            }}
                        />
                    </Alert>
                )}

                <Soknadsoversikt />
            </span>
        </WhiteBackground>
    );
};

export default Informasjon;
