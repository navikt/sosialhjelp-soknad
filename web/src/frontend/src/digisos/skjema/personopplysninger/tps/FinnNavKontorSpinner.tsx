import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { Faktum } from "../../../../nav-soknad/types";
import NavFrontendSpinner from "nav-frontend-spinner";
import { SoknadsMottakerStatus } from "./oppholdsadresseReducer";
import { AdresseAutocompleteStatus } from "../../../../nav-soknad/components/adresseAutocomplete/adresseAutocompleteReducer";

interface OwnProps {
	soknadsmottakere: any[];
	soknadsmottakerStatus: SoknadsMottakerStatus;
	status: AdresseAutocompleteStatus;
	label: string;
	fakta: Faktum[];
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class FinnNavKontorSpinner extends React.Component<Props, {}> {

	render() {
		const antallSoknadsmottakere = this.props.soknadsmottakere.length;
		const visProgressIndikator: boolean =
			antallSoknadsmottakere === 0 &&
			this.props.status !== AdresseAutocompleteStatus.INITIELL &&
			this.props.status !== AdresseAutocompleteStatus.ADRESSE_UGYLDIG &&
			this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.UGYLDIG &&
			this.props.soknadsmottakerStatus !== SoknadsMottakerStatus.MANGLER_NAV_KONTOR;
		if (visProgressIndikator) {
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
		status: state.adresseAutocomplete.status,
		soknadsmottakere: state.oppholdsadresse.soknadsmottakere

	};
})(injectIntl(FinnNavKontorSpinner));
