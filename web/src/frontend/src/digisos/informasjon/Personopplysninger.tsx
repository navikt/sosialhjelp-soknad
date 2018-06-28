import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { setVisSamtykkeInfo } from "../../nav-soknad/redux/init/initActions";
import { State } from "../redux/reducers";
import BehandlingAvPersonopplysningerModal from "./BehandlingAvPersonopplysningerModal";
import { Element, Undertittel } from "nav-frontend-typografi";

type Props = InjectedIntlProps & DispatchProps;

class Personopplysninger extends React.Component<Props, {}> {

	render() {

		return (
			<div className="blokk-s panel personopplysninger-panel">
				<div className="personopplysning-infoblokk">
					<Undertittel className="blokk-m">
						<FormattedMessage id="informasjon.tekster.personopplysninger.tittel"/>
					</Undertittel>

						<div className="personopplysning-blokk blokk-s">
							<div className="ikon">
								<img src="/soknadsosialhjelp/statisk/bilder/ikon_papirstabel.svg"/>
							</div>
							<div className="innhold">
								<Element>
									<FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tittel"/>
								</Element>
								<FormattedMessage id="informasjon.tekster.personopplysninger.innhenting.tekst"/>
							</div>
						</div>
						<div className="personopplysning-blokk blokk-s">
							<div className="ikon">
								<img src="/soknadsosialhjelp/statisk/bilder/ikon_blyanter.svg"/>
							</div>
							<div className="innhold">
								<Element>
									<FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tittel"/>
								</Element>
								<FormattedMessage id="informasjon.tekster.personopplysninger.fordusender.tekst"/>
							</div>
						</div>
						<div className="personopplysning-blokk blokk-s">
							<div className="ikon">
								<img src="/soknadsosialhjelp/statisk/bilder/ikon_brevkonvolutt.svg"/>
							</div>
							<div className="innhold">
								<Element>
									<FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tittel"/>
								</Element>
								<FormattedMessage id="informasjon.tekster.personopplysninger.ettersendt.tekst"/>
							</div>
						</div>

						<div className="personopplysning-blokk blokk-m">
							<div className="ikon">
								<img src="/soknadsosialhjelp/statisk/bilder/ikon_ark.svg"/>
							</div>
							<div className="innhold">
								<Element>
									<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tittel"/>
								</Element>
								<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.tekst"/>
								&nbsp;<a
								className="lenke"
								onClick={() => {
									this.props.dispatch(setVisSamtykkeInfo(true));
								}}
							>
								<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke"/>
							</a>
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
