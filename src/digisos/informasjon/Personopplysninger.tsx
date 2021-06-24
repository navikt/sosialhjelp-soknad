import * as React from "react";
import {FormattedMessage} from "react-intl";
import {useDispatch} from "react-redux";
import BehandlingAvPersonopplysningerModal from "./BehandlingAvPersonopplysningerModal";
import {Undertittel} from "nav-frontend-typografi";
import {getContextPathForStaticContent} from "../../configuration";
import {visSamtykkeInfo} from "../redux/soknad/soknadActions";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";

const Personopplysninger = () => {
    const dispatch = useDispatch();

    return (
        <div className="blokk-xxs panel personopplysninger-panel">
            <div className="personopplysning-infoblokk">
                <Undertittel className="gdpr-tittel-margin-top blokk-m">
                    <FormattedMessage id="informasjon.tekster.personopplysninger.tittel" />
                </Undertittel>

                <div className="personopplysning-blokk blokk-s">
                    <div className="ikon">
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_papirstabel.svg`} alt={""} />
                    </div>
                    <div className="innhold">
                        <h3 className="typo-element">
                            <FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tittel" />
                        </h3>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tekst" />
                    </div>
                </div>
                <div className="personopplysning-blokk blokk-s">
                    <div className="ikon">
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_blyanter.svg`} alt={""} />
                    </div>
                    <div className="innhold">
                        <h3 className="typo-element">
                            <FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tittel" />
                        </h3>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tekst" />
                    </div>
                </div>
                <div className="personopplysning-blokk blokk-s">
                    <div className="ikon">
                        <img
                            src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_brevkonvolutt.svg`}
                            alt={""}
                        />
                    </div>
                    <div className="innhold">
                        <h3 className="typo-element">
                            <FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tittel" />
                        </h3>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tekst" />
                    </div>
                </div>

                <div className="personopplysning-blokk blokk-m">
                    <div className="ikon">
                        <img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""} />
                    </div>
                    <div className="innhold">
                        <h3 className="typo-element">
                            <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tittel" />
                        </h3>
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tekst" />
                        &nbsp;
                        <LinkButton
                            onClick={() => {
                                dispatch(visSamtykkeInfo(true));
                            }}
                        >
                            <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                        </LinkButton>
                    </div>
                </div>

                <p>
                    <FormattedMessage id="informasjon.tekster.personopplysninger.sporsmal" />
                </p>
            </div>

            <BehandlingAvPersonopplysningerModal />
        </div>
    );
};

export default Personopplysninger;
