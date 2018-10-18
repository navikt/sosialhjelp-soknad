import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { Faktum } from "../../../../nav-soknad/types";
import { getFaktumVerdi } from "../../../../nav-soknad/utils";
import NavFrontendSpinner from "nav-frontend-spinner";
import { SoknadsMottakerStatus } from "./oppholdsadresseReducer";

interface OwnProps {
	soknadsmottakere: any[];
	soknadsmottakerStatus: SoknadsMottakerStatus;
	label: string;
	fakta: Faktum[];
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class FinnNavKontorProgressIndikator extends React.Component<Props, {}> {

	render() {
		const oppholdsadresseValg = getFaktumVerdi(this.props.fakta, "kontakt.system.oppholdsadresse.valg");
		const antallSoknadsmottakere = this.props.soknadsmottakere.length;
		const visProgressIndikator: boolean = (oppholdsadresseValg === "folkeregistrert" ||
			oppholdsadresseValg === "midlertidig") &&
			antallSoknadsmottakere === 0 &&
			this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.UGYLDIG &&
			this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.MANGLER_NAV_KONTOR;
		if (true || visProgressIndikator) {
			return (<div className="finnNavKontor">{this.props.label} <NavFrontendSpinner type="XS" /></div>);
		} else {
			return null;
		}
	}
}

export default connect((state: State, props: any) => {
	return {
		soknadsmottaker: state.oppholdsadresse.soknadsmottaker,
		soknadsmottakerStatus: state.oppholdsadresse.soknadsmottakerStatus,
		soknadsmottakere: state.oppholdsadresse.soknadsmottakere

	};
})(injectIntl(FinnNavKontorProgressIndikator));
