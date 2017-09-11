import * as React from "react";
import { Radio } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SoknadAppState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getRadioFaktumTekst, getFaktumVerdi } from "../utils";

interface OwnProps {
	option: string;
	faktumKey: string;
	disabled?: boolean;
}

class RadioFaktum extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, option, disabled, fakta, dispatch, intl } = this.props;
		const tekster = getRadioFaktumTekst(intl, faktumKey, option);
		return (
			<Radio
				name={faktumKey}
				checked={getFaktumVerdi(fakta, faktumKey) === option}
				disabled={disabled}
				value={option}
				onChange={(evt: any) => dispatch(setFaktumVerdi(faktumKey, option))}
				label={
					<LabelMedHjelpetekst
						id={`${faktumKey}.${option}`}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
			/>
		);
	}
}

export default connect((state: SoknadAppState, props: OwnProps) => {
	return {
		fakta: state.faktum.data,
		faktumKey: props.faktumKey
	};
})(injectIntl(RadioFaktum));
