import * as React from "react";
import {connect} from "react-redux";
import {RouterProps} from "react-router";
import {FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl,} from "react-intl";
import DocumentTitle from "react-document-title";
import Knapp from "nav-frontend-knapper";
import {getIntlTextOrKey} from "../../nav-soknad/utils";
import {DispatchProps} from "../redux/reduxTypes";
import IkkeTilgang from "./IkkeTilgang";
import {TilgangSperrekode} from "../redux/tilgang/tilgangTypes";
import {skjulToppMeny} from "../../nav-soknad/utils/domUtils";
import Personopplysninger from "./Personopplysninger";
import {Panel} from "nav-frontend-paneler";
import {opprettSoknad} from "../redux/soknad/soknadActions";
import Snakkeboble from "../../nav-soknad/components/snakkeboble/Snakkeboble";
import AppBanner from "../../nav-soknad/components/appHeader/AppHeader";
import {State} from "../redux/reducers";
import EllaBlunk from "../../nav-soknad/components/animasjoner/ellaBlunk";


interface StateProps {
    harTilgang: boolean;
    sperrekode: TilgangSperrekode | undefined;
    startSoknadPending: boolean;
    fornavn: string | undefined;
}



type Props = StateProps & InjectedIntlProps & RouterProps & DispatchProps;

class Informasjon extends React.Component<Props, {}> {

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

    startSoknad() {
        this.props.dispatch(opprettSoknad(this.props.intl));
    }

    render() {
        const {
            intl,
            harTilgang,
            startSoknadPending,
            sperrekode
        } = this.props;
        const title = getIntlTextOrKey(intl, "applikasjon.sidetittel");

        return (
            <div className="informasjon-side">
                <AppBanner/>
                <DocumentTitle title={title}/>
                {harTilgang ? (
                    <span>
						<div>
							<div className="skjema-content informasjon-innhold">
								<span className="informasjon-fra-ella">
									<Snakkeboble>
										{this.renderHilsen()}
                                        <FormattedMessage id="informasjon.hilsen.tittel"/>
									</Snakkeboble>
									<EllaBlunk size={"175"}/>
								</span>

								<Panel className="informasjon-viktig">
									<h2 className="typo-element">
										<FormattedMessage id="informasjon.start.undertittel"/>
									</h2>

									<p className="blokk-s">
										<FormattedHTMLMessage id="informasjon.start.tekst"/>
									</p>

									<h2 className="typo-element">
										<FormattedMessage id="informasjon.nodsituasjon.undertittel"/>
									</h2>

									<p className="blokk-s">
										<FormattedHTMLMessage id="informasjon.nodsituasjon.tekst"/>
									</p>
								</Panel>
							</div>
						</div>
						<div className="zebra-stripe graa">
							<div className="skjema-content">
								<Personopplysninger/>
							</div>

							<div className="skjema-content" style={{border: "1px solid transparent"}}>
								<span className="informasjon-start-knapp">
									<Knapp
                                        id="start_soknad_button"
                                        type="hoved"
                                        spinner={startSoknadPending}
                                        disabled={startSoknadPending}
                                        onClick={() => this.startSoknad()}
                                    >
										{getIntlTextOrKey(intl, "skjema.knapper.start")}
									</Knapp>
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
    harTilgang: state.tilgang.harTilgang,
    sperrekode: state.tilgang.sperrekode,
    startSoknadPending: state.soknad.startSoknadPending,
    fornavn: state.init.fornavn
}))(injectIntl(Informasjon));
