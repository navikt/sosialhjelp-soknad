import * as React from "react";
import Bolk from "../../../../skjema/components/bolk";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../../../../skjema/reducer";
import { DispatchProps } from "../../../../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

import FaktumRadio from "../../../../skjema/faktum/FaktumRadio";
import FaktumSkjemagruppe from "../../../../skjema/faktum/FaktumSkjemagruppe";
import Underskjema from "../../../../skjema/components/underskjema";

interface StateProps {
	faktum: FaktumMap;
}

class Steg1 extends React.Component<
	StateProps & DispatchProps & InjectedIntlProps,
	any
> {
	render() {
		const { faktum, intl } = this.props;
		return (
			<Bolk>
				<FaktumSkjemagruppe
					title={intl.formatMessage({
						id: "familie.barn.sporsmal"
					})}
				>
					<FaktumRadio faktumKey="familie.barn" value="true" />
					<Underskjema visible={faktum.get("familie.barn") === "true"}>
						<FaktumSkjemagruppe
							title={intl.formatMessage({
								id: "familie.barn"
							})}
						>
							<div className="skjemaelement">what</div>
						</FaktumSkjemagruppe>
					</Underskjema>
					<FaktumRadio faktumKey="familie.barn" value="false" />
				</FaktumSkjemagruppe>
			</Bolk>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: any) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(Steg1));
