import * as React from "react";
import { Select } from "nav-frontend-skjema";
import { Faktum } from "../../../../nav-soknad/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
import { finnFaktum } from "../../../../nav-soknad/utils";
import { velgSoknadsmottaker } from "./oppholdsadresseReducer";
import { getIntlTextOrKey } from "../../../../nav-soknad/utils/intlUtils";
import { setFaktumValideringsfeil } from "../../../../nav-soknad/redux/valideringActions";

interface OwnProps {
	soknadsmottakere: any[];
	soknadsmottaker: any;
	label: string;
	fakta: Faktum[];
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class VelgSoknadsmottaker extends React.Component<Props, {}> {

	velgNavKontor(event: any) {
		this.props.dispatch(setFaktumValideringsfeil(null, "soknadsmottaker"));
		const enhetsId = event.target.value;
		const valgtSoknadsmottaker = this.props.soknadsmottakere.find(
			(item: any) => item.enhetsId === enhetsId);
		this.props.dispatch(velgSoknadsmottaker(valgtSoknadsmottaker, this.props.fakta));
	}

	render() {
		const valgtSoknadsmottaker = finnFaktum("soknadsmottaker", this.props.fakta);
		if (valgtSoknadsmottaker == null) {
			return null;
		}
		const ENHETSID = "enhetsId";
		const enhetsId = valgtSoknadsmottaker.properties[ENHETSID] || "velg";
		const antallSoknadsmottakere = this.props.soknadsmottakere.length;
		if (antallSoknadsmottakere < 2) {
			return null;
		} else {
			return (
				<Select
					className="velgNavKontorDropDown"
					label={this.props.label}
					onChange={(event: any) => this.velgNavKontor(event)}
					value={enhetsId}
				>
					<option value="velg" key="velg" disabled={true}>
						{getIntlTextOrKey(this.props.intl, "kontakt.system.oppholdsadresse.velgMottaker")}
					</option>
					{this.props.soknadsmottakere.map((item: any, index: number) => {
						return (
							<option value={item.enhetsId} key={Math.random() * 10000}>
								{item.enhetsnavn}
							</option>
						);
					})}
				</Select>
			);
		}
	}
}

export default connect((state: State, props: any) => {
	return {
		soknadsmottaker: state.oppholdsadresse.soknadsmottaker,
		soknadsmottakerStatus: state.oppholdsadresse.soknadsmottakerStatus,
		soknadsmottakere: state.oppholdsadresse.soknadsmottakere

	};
})(injectIntl(VelgSoknadsmottaker));
