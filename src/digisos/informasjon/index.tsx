import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import DocumentTitle from "react-document-title";
import {Hovedknapp} from "nav-frontend-knapper";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import IkkeTilgang from "./IkkeTilgang";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import Personopplysninger from "./Personopplysninger";
import Panel from "nav-frontend-paneler";
import {opprettSoknad} from "../redux/soknad/soknadActions";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {State} from "../redux/reducers";
import EllaBlunk from "../../nav-soknad/components/animasjoner/ellaBlunk";
import AlertStripe from "nav-frontend-alertstriper";
import {createSkjemaEventData, logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {Soknadsoversikt} from "./Soknadsoversikt";

const Greeting = (props: {name: string}) => (
    <h2 className="digisos-snakkeboble-tittel typo-element">
        <FormattedMessage id="informasjon.hilsen.hei" values={{fornavn: props.name}} />
    </h2>
);

export const InformasjonSide = () => {
    const antallNyligInnsendteSoknader: number =
        useSelector((state: State) => state.soknad.harNyligInnsendteSoknader?.antallNyligInnsendte) ?? 0;
    const {startSoknadPending, startSoknadFeilet, nedetid, fornavn, visNedetidPanel} = useSelector(
        (state: State) => state.soknad
    );

    const dispatch = useDispatch();

    const intl = useIntl();

    const onSokSosialhjelpButtonClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        startSoknad();
    };

    const startSoknad = () => {
        logAmplitudeEvent("skjema startet", {
            antallNyligInnsendteSoknader,
            ...createSkjemaEventData(),
        });
        dispatch(opprettSoknad(intl));
    };

    return (
        <>
            <div>
                <div className="skjema-content informasjon-innhold">
                    <span className="informasjon-fra-ella">
                        <Snakkeboble>
                            {fornavn && fornavn.length > 0 && <Greeting name={fornavn} />}
                            <FormattedMessage id="informasjon.hilsen.tittel" />
                        </Snakkeboble>
                        <EllaBlunk size={"175"} />
                    </span>

                    <Panel className="informasjon-viktig">
                        <h2 className="typo-element">
                            <FormattedMessage id="informasjon.start.undertittel" />
                        </h2>
                        <p>
                            <FormattedMessage
                                id="informasjon.start.tekst_del1"
                                values={{
                                    a: (msg: string) => (
                                        // Disable target-blank-rule on internal urls
                                        /* eslint-disable-next-line react/jsx-no-target-blank */
                                        <a href="https://www.nav.no/sosialhjelp/" target="_blank">
                                            {msg}
                                        </a>
                                    ),
                                }}
                            />
                        </p>
                        <p>
                            <FormattedMessage id="informasjon.start.tekst_del2" />
                        </p>
                        <p>
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
                        </p>
                        <h2 className="typo-element">
                            <FormattedMessage id="informasjon.nodsituasjon.undertittel" />
                        </h2>

                        <p className="blokk-s">
                            <FormattedMessage id="informasjon.nodsituasjon.tekst" />
                        </p>
                    </Panel>
                </div>
            </div>
            <div className="zebra-stripe graa">
                <div className="skjema-content">
                    <Personopplysninger />
                    {nedetid?.isPlanlagtNedetid && (
                        <AlertStripe type="info">
                            <FormattedMessage
                                id="nedetid.alertstripe.infoside"
                                values={{
                                    nedetidstart: nedetid.nedetidStart,
                                    nedetidslutt: nedetid.nedetidSlutt,
                                }}
                            />
                        </AlertStripe>
                    )}
                </div>

                <div className="skjema-content" style={{border: "1px solid transparent"}}>
                    {startSoknadFeilet && (
                        <AlertStripe type="feil">
                            <FormattedMessage id="applikasjon.opprettsoknadfeilet" />
                        </AlertStripe>
                    )}

                    <span className="informasjon-start-knapp">
                        <Hovedknapp
                            id="start_soknad_button"
                            spinner={startSoknadPending}
                            disabled={startSoknadPending || visNedetidPanel}
                            onClick={(event) => {
                                onSokSosialhjelpButtonClick(event);
                            }}
                        >
                            {getIntlTextOrKey(intl, "skjema.knapper.start")}
                        </Hovedknapp>

                        {nedetid?.isNedetid && visNedetidPanel && (
                            <AlertStripe type="feil" style={{marginTop: "0.4rem"}}>
                                <FormattedMessage
                                    id="nedetid.alertstripe.infoside"
                                    values={{
                                        nedetidstart: nedetid.nedetidStart,
                                        nedetidslutt: nedetid.nedetidSlutt,
                                    }}
                                />
                            </AlertStripe>
                        )}
                    </span>
                </div>
            </div>
        </>
    );
};

const Informasjon = () => {
    const harTilgang: boolean = useSelector((state: State) => state.soknad.tilgang?.harTilgang) ?? false;
    const sperrekode = useSelector((state: State) => state.soknad.tilgang?.sperrekode);

    const {nedetid} = useSelector((state: State) => state.soknad);

    const [shouldShowSoknadsoversikt, setShouldShowSoknadsoversikt] = React.useState(true);

    const intl = useIntl();
    const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

    React.useEffect(() => {
        skjulToppMeny();
    }, []);

    const onSoknadClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setShouldShowSoknadsoversikt(false);
    };

    return (
        <div className="informasjon-side">
            <AppBanner />
            <DocumentTitle title={title} />

            {harTilgang ? (
                <span>
                    {nedetid?.isNedetid && (
                        <AlertStripe type="feil" style={{justifyContent: "center"}}>
                            <FormattedMessage
                                id="nedetid.alertstripe.infoside"
                                values={{
                                    nedetidstart: nedetid.nedetidStart,
                                    nedetidslutt: nedetid.nedetidSlutt,
                                }}
                            />
                        </AlertStripe>
                    )}
                    {shouldShowSoknadsoversikt ? (
                        <Soknadsoversikt onSoknadClick={onSoknadClick} />
                    ) : (
                        <InformasjonSide />
                    )}
                </span>
            ) : (
                <div className="skjema-content">
                    <IkkeTilgang sperrekode={sperrekode ? sperrekode : "pilot"} />
                </div>
            )}
        </div>
    );
};

export default Informasjon;
