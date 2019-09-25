import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { DispatchProps } from "../redux/reduxTypes";
import { connect } from "react-redux";
import { setVisSamtykkeInfo } from "../redux/init/initActions";
import { State } from "../redux/reducers";
import BehandlingAvPersonopplysningerModal from "./BehandlingAvPersonopplysningerModal";
import { Undertittel } from "nav-frontend-typografi";
import {getContextPathForStaticContent} from "../../configuration";

type Props = InjectedIntlProps & DispatchProps;

class Personopplysninger extends React.Component<Props, {}> {

	render() {

		return (
			<div className="blokk-s panel personopplysninger-panel">
				<div className="personopplysning-infoblokk">
					<Undertittel className="gdpr-tittel-margin-top blokk-m">
						<FormattedMessage id="informasjon.tekster.personopplysninger.tittel"/>
					</Undertittel>

						<div className="personopplysning-blokk blokk-s">
							<div className="ikon">
								<img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_papirstabel.svg`} alt={""}/>
							</div>
								<div className="innhold">
								<h3 className="typo-element">
									<FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tittel"/>
								</h3>
								<FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tekst"/>
							</div>
						</div>
						<div className="personopplysning-blokk blokk-s">
							<div className="ikon">
								<img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_blyanter.svg`} alt={""}/>
							</div>
							<div className="innhold">
								<h3 className="typo-element">
									<FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tittel"/>
								</h3>
								<FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tekst"/>
							</div>
						</div>
						<div className="personopplysning-blokk blokk-s">
							<div className="ikon">
								<img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_brevkonvolutt.svg`} alt={""}/>
							</div>
							<div className="innhold">
								<h3 className="typo-element">
									<FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tittel"/>
								</h3>
								<FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tekst"/>
							</div>
						</div>

						<div className="personopplysning-blokk blokk-m">
							<div className="ikon">
								<img src={`${getContextPathForStaticContent()}/statisk/bilder/ikon_ark.svg`} alt={""}/>
							</div>
							<div className="innhold">
								<h3 className="typo-element">
									<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tittel"/>
								</h3>
								<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tekst"/>
								&nbsp;
								<button
									className="linkbutton linkbutton--normal"
									onClick={() => {
										this.props.dispatch(setVisSamtykkeInfo(true));
									}}
								>
									<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke"/>
								</button>
							</div>
						</div>

					<p>
						<FormattedMessage id="informasjon.tekster.personopplysninger.sporsmal"/>
					</p>

				</div>

				<BehandlingAvPersonopplysningerModal/>
			</div>
		);
	}
}

export default connect((state: State) => {
	return {};
})(injectIntl(Personopplysninger));
