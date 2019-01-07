import * as React from "react";
import { connect } from "react-redux";
import { FormattedHTMLMessage, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { State } from "../../redux/reducers";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { setVisSamtykkeInfo } from "../../../nav-soknad/redux/init/initActions";
import Informasjonspanel, { InformasjonspanelIkon } from "../../../nav-soknad/components/informasjonspanel/index";
import { finnValgtEnhetsNavn } from "../../data/kommuner";
import { Faktum } from "../../../nav-soknad/types/navSoknadTypes";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";

interface StateProps {
	fakta: Faktum[];
}

type Props = DispatchProps &
	StateProps &
	InjectedIntlProps;

class InformasjonsBoks extends React.Component<Props, {}> {

	render() {
		const valgtEnhetsNavn = finnValgtEnhetsNavn(this.props.fakta);

		return (
			<Informasjonspanel
				farge={DigisosFarge.VIKTIG}
				ikon={InformasjonspanelIkon.BREVKONVOLUTT}
			>
				<FormattedHTMLMessage id="soknasosialhjelp.oppsummering.hvorsendes" values={{navkontor: valgtEnhetsNavn}}/>
				<br/><br/>
					<a
						className="lenke"
						onClick={() => {
							this.props.dispatch(setVisSamtykkeInfo(true));
						}}>
						<FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke"/>
					</a>
			</Informasjonspanel>
		);
	}
}

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(InformasjonsBoks));
