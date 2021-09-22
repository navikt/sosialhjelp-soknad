import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
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
import {createSkjemaEventData, logAmplitudeEvent} from "../../nav-soknad/utils/amplitude";
import {Soknadsoversikt} from "./Soknadsoversikt";
import {fetchToJson} from "../../nav-soknad/utils/rest-utils";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useTitle} from "../../nav-soknad/hooks/useTitle";
import {Alert, BodyShort, Label} from "@navikt/ds-react";

const Greeting = (props: {name: string}) => (
    <Label size="small">
        <FormattedMessage id="informasjon.hilsen.hei" values={{fornavn: props.name}} />
    </Label>
);

export const InformasjonSide = (props: {enableModalV2: boolean}) => {
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
            enableModalV2: props.enableModalV2,
            erProdsatt: true,
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
                            <BodyShort size="small">
                                <FormattedMessage id="informasjon.hilsen.tittel" />
                            </BodyShort>
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
                </div>

                <div className="skjema-content" style={{border: "1px solid transparent"}}>
                    {startSoknadFeilet && (
                        <Alert variant="error">
                            <FormattedMessage id="applikasjon.opprettsoknadfeilet" />
                        </Alert>
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
                    </span>
                </div>
            </div>
        </>
    );
};

const Informasjon = () => {
    const [isLoadingFeatureToggles, setIsLoadingFeatureToggles] = React.useState(false);
    const [enableModalV2, setEnableModalV2] = React.useState(false);

    const harTilgang: boolean = useSelector((state: State) => state.soknad.tilgang?.harTilgang) ?? false;
    const sperrekode = useSelector((state: State) => state.soknad.tilgang?.sperrekode);

    const {nedetid} = useSelector((state: State) => state.soknad);

    const intl = useIntl();
    const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

    useTitle(title);

    React.useEffect(() => {
        skjulToppMeny();
    }, []);

    React.useEffect(() => {
        setIsLoadingFeatureToggles(true);
        fetchToJson("feature-toggle", true)
            .then((result: any) => {
                setEnableModalV2(result["modalV2"] ?? false);
            })
            .catch((e) => {
                setEnableModalV2(false);
            })
            .finally(() => setIsLoadingFeatureToggles(false));
    }, [setEnableModalV2]);

    if (!harTilgang) {
        return (
            <div className="informasjon-side">
                <AppBanner />
                <div className="skjema-content">
                    <IkkeTilgang sperrekode={sperrekode ? sperrekode : "pilot"} />
                </div>
            </div>
        );
    }

    if (isLoadingFeatureToggles) {
        return (
            <div className="informasjon-side">
                <AppBanner />
                <div className="application-spinner">
                    <NavFrontendSpinner type="XXL" />
                </div>
            </div>
        );
    }

    return (
        <div className="informasjon-side">
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

                {enableModalV2 ? <Soknadsoversikt /> : <InformasjonSide enableModalV2={false} />}
            </span>
        </div>
    );
};

export default Informasjon;
