import * as React from "react";
import { Radio, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../../utils/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../../components/skjema/LabelMedHjelpetekst";
import { getFaktumRadioTekst } from "../utils";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	value: string;
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumCheckbox extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, value, disabled, faktum, dispatch, intl } = this.props;
		const tekster = getFaktumRadioTekst(intl, faktumKey, value);
		return (
			<Radio
				name={faktumKey}
				checked={faktum.get(faktumKey) === value}
				disabled={disabled}
				value={value}
				onChange={(evt: any) => dispatch(setFaktumVerdi(faktumKey, value))}
				label={
					<LabelMedHjelpetekst
						id={`${faktumKey}.value`}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
			/>
		);
	}
}

export default connect((state: { faktum: FaktumState }, props: OwnProps) => {
	return {
		faktum: state.faktum.faktum,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumCheckbox));
