import * as React from "react";
import { Select } from "nav-frontend-skjema";
import { Faktum } from "../../../../nav-soknad/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { DispatchProps } from "../../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../../redux/reducers";
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
		const {soknadsmottaker, soknadsmottakere, label, intl} = this.props;
		const ENHETSID = "enhetsId";
		const enhetsId = soknadsmottaker && soknadsmottaker[ENHETSID] || "velg";
		const antallSoknadsmottakere = soknadsmottakere.length;
		if (antallSoknadsmottakere < 2) {
			return null;
		} else {
			return (
				<Select
					className="velgNavKontorDropDown"
					label={label}
					onChange={(event: any) => this.velgNavKontor(event)}
					value={enhetsId}
				>
					<option value="velg" key="velg" disabled={true}>
						{getIntlTextOrKey(intl, "kontakt.system.oppholdsadresse.velgMottaker")}
					</option>
					{soknadsmottakere.map((item: any, index: number) => {
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
