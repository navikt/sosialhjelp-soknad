import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import NavFrontendModal from "nav-frontend-modal";
import { setVisSamtykkeInfo } from "../../nav-soknad/redux/init/initActions";
import { Knapp } from "nav-frontend-knapper";
import { connect } from "react-redux";
import { DispatchProps } from "../../nav-soknad/redux/reduxTypes";
import { State } from "../redux/reducers";
import { NavEnhet } from "../skjema/personopplysninger/adresse/AdresseTypes";
import { Soknadsdata } from "../../nav-soknad/redux/soknadsdata/soknadsdataReducer";

interface OwnProps {
	modalSynlig?: boolean;
	soknadsdata?: null | Soknadsdata;
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

interface OwnState {
	oppstartsModus: boolean
}

class RettigheterModalView extends React.Component<Props, OwnState> {

	constructor(props: Props) {
		super(props);
		this.state = {
			oppstartsModus: true
		}
	}

	getText() {
		const valgtEnhetsNavn = this.getValgtEnhetsnavn();
		let text = this.props.intl.messages["soknadsosialhjelp.forstesiden.bekreftInfoModal.body"];
		text = text.replace(/{navkontor:(.*)}/g, valgtEnhetsNavn);
		return text;
	}

	getValgtEnhetsnavn() {
		const { soknadsdata } = this.props;
		const navEnheter = soknadsdata.personalia.navEnheter;
		const valgtNavEnhet = navEnheter.find((navEnhet: NavEnhet) => navEnhet.valgt);
		let enhetsnavn = "";
		let kommunenavn = "";
		if (valgtNavEnhet) {
			enhetsnavn = valgtNavEnhet.enhetsnavn;
			kommunenavn = valgtNavEnhet.kommunenavn;
		}
		let valgtEnhetsNavn: string = enhetsnavn + ", " + kommunenavn + " kommune";
		if (kommunenavn === "") {
			valgtEnhetsNavn = "din bostedskommune";
		}
		return valgtEnhetsNavn;
	}

	render() {
		return (
			<NavFrontendModal
				isOpen={this.props.modalSynlig || false}
				contentLabel={this.props.intl.formatMessage({id: "avbryt.avbryt"})}
				closeButton={true}
				onRequestClose={() => this.props.dispatch(setVisSamtykkeInfo(false))}
				style={{
					content: {
						overflowY: 'auto'
					}
				}}
			>
				<div className="personopplysning_info">
					<div dangerouslySetInnerHTML={{__html: this.getText()}}/>
				</div>

				<div className="timeoutbox__knapperad">
					<Knapp
						type="standard"
						onClick={() => this.props.dispatch(setVisSamtykkeInfo(false))}
					>
						<FormattedMessage id={"soknadsosialhjelp.forstesiden.bekreftInfoModal.lukk"}/>
					</Knapp>
				</div>
			</NavFrontendModal>
		);
	}

}

export { RettigheterModalView };

export default connect((state: State, props: OwnProps): any => {
	return {
		modalSynlig: state.init.visSamtykkeInfo,
		soknadsdata: JSON.parse(JSON.stringify(state.soknadsdata)),
	};
})(injectIntl(RettigheterModalView));
