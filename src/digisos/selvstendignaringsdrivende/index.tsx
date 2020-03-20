import * as React from "react";
import {connect} from "react-redux";
import {RouterProps} from "react-router";
import {FormattedHTMLMessage, FormattedMessage, injectIntl, IntlShape} from "react-intl";
import DocumentTitle from "react-document-title";
import Knapp from "nav-frontend-knapper";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import {DispatchProps} from "../redux/reduxTypes";
import IkkeTilgang from "./IkkeTilgang";
import {TilgangSperrekode} from "../redux/soknad/soknadTypes";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import Personopplysninger from "./Personopplysninger";
import {opprettSoknad} from "../redux/soknad/soknadActions";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {State} from "../redux/reducers";
import EllaBlunk from "../../nav-soknad/components/animasjoner/ellaBlunk";
import AlertStripe from "nav-frontend-alertstriper";

interface StateProps {
    harTilgang: boolean;
    sperrekode: TilgangSperrekode | undefined;
    startSoknadPending: boolean;
    fornavn: string | undefined;
    intl: IntlShape;
    nedetidstart: string | undefined;
    nedetidslutt: string | undefined;
    isNedetid: boolean;
    isPlanlagtNedetid: boolean;
    visNedetidPanel: boolean;
}

type Props = StateProps & RouterProps & DispatchProps;

class SelvstendigNaringsdrivende extends React.Component<Props, {}> {

    componentDidMount() {
        skjulToppMeny();
    }

    renderHilsen(): React.ReactNode {
        if (this.props.fornavn && this.props.fornavn.length > 0) {
            return (
                <h3 className="digisos-snakkeboble-tittel">
                    <FormattedHTMLMessage id="informasjon.hilsen.hei" values={{fornavn: this.props.fornavn}}/>
                </h3>);
        }
        return null;
    }

    render() {
        const {
            intl,
            harTilgang,
            startSoknadPending,
            sperrekode,
            nedetidstart,
            nedetidslutt,
            isNedetid,
            isPlanlagtNedetid,
            visNedetidPanel
        } = this.props;
        const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

        return (
            <div className="informasjon-side">
                <AppBanner/>
                <DocumentTitle title={title}/>
                {harTilgang ? (
                    <span>
                        {isNedetid && (
                            <AlertStripe type="feil" style={{justifyContent: "center"}}>
                                <FormattedHTMLMessage
                                    id="nedetid.alertstripe.infoside"
                                    values={
                                        {
                                            nedetidstart: nedetidstart,
                                            nedetidslutt: nedetidslutt
                                        }}
                                />
                            </AlertStripe>
                        )}
                        <div>
							<div className="skjema-content informasjon-innhold">
								<span className="informasjon-fra-ella">
									<Snakkeboble>
										{this.renderHilsen()}
                                        <FormattedMessage id="informasjon.hilsen.tittel"/>
									</Snakkeboble>
									<EllaBlunk size={"175"}/>
								</span>
							</div>
						</div>
                        <br/>
                        <br/>
						<div>
							<div className="skjema-content">
								<Personopplysninger/>
                                {isPlanlagtNedetid && (
                                    <AlertStripe type="info">
                                        <FormattedHTMLMessage
                                            id="nedetid.alertstripe.infoside"
                                            values={
                                                {
                                                    nedetidstart: nedetidstart,
                                                    nedetidslutt: nedetidslutt
                                                }}
                                        />
                                    </AlertStripe>
                                )}
							</div>

							<div className="skjema-content" style={{border: "1px solid transparent"}}>
								<span className="informasjon-start-knapp">
									<Knapp
                                        id="start_soknad_button"
                                        type="hoved"
                                        spinner={startSoknadPending}
                                        disabled={startSoknadPending || visNedetidPanel}
                                        onClick={() => {
                                            this.props.dispatch(opprettSoknad(intl, true))
                                        }}
                                    >
										{getIntlTextOrKey(intl, "skjema.knapper.start")}
									</Knapp>

                                    {isNedetid && visNedetidPanel && (
                                        <AlertStripe type="feil" style={{marginTop: "0.4rem"}}>
                                            <FormattedHTMLMessage
                                                id="nedetid.alertstripe.infoside"
                                                values={
                                                    {
                                                        nedetidstart: nedetidstart,
                                                        nedetidslutt: nedetidslutt
                                                    }}
                                            />
                                        </AlertStripe>
                                    )}
								</span>
							</div>
						</div>
					</span>
                ) : (
                    <div className="skjema-content">
                        <IkkeTilgang sperrekode={sperrekode ? sperrekode : "pilot"}/>
                    </div>
                )}
            </div>
        );
    }

}

export default connect((state: State) => ({
    harTilgang: state.soknad.tilgang ? state.soknad.tilgang.harTilgang : false,
    sperrekode: state.soknad.tilgang ? state.soknad.tilgang.sperrekode : undefined,
    nedetidstart: state.soknad.nedetid ? state.soknad.nedetid.nedetidStartText : "",
    nedetidslutt: state.soknad.nedetid ? state.soknad.nedetid.nedetidSluttText : "",
    isNedetid: state.soknad.nedetid ? state.soknad.nedetid.isNedetid : false,
    isPlanlagtNedetid: state.soknad.nedetid ? state.soknad.nedetid.isPlanlagtNedetid : false,
    visNedetidPanel: state.soknad.visNedetidPanel,
    startSoknadPending: state.soknad.startSoknadPending,
    fornavn: state.soknad.fornavn ? state.soknad.fornavn : undefined
}))(injectIntl(SelvstendigNaringsdrivende));
