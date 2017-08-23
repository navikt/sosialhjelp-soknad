import * as React from "react";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../skjema/reducer";
import { DispatchProps } from "../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Steg from "../../../skjema/components/steg";
import Sporsmal from "../../../skjema/components/sporsmal";
import FaktumTextarea from "../../../skjema/faktum/FaktumTextarea";

interface StateProps {
	faktum: FaktumMap;
}

class Begrunnelse extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { intl } = this.props;
		return (
			<Steg tittel={intl.formatMessage({ id: "begrunnelsebolk.tittel" })}>
				<Sporsmal
					sporsmal={intl.formatMessage({
						id: "begrunnelse.hvorfor"
					})}
				>
					<FaktumTextarea faktumKey="begrunnelse.hvorfor" />
				</Sporsmal>
				<Sporsmal
					sporsmal={intl.formatMessage({
						id: "begrunnelse.hva"
					})}
				>
					<FaktumTextarea faktumKey="begrunnelse.hva" />
				</Sporsmal>
			</Steg>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(Begrunnelse));
