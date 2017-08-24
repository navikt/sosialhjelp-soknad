import * as React from "react";
import { Radio, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getFaktumRadioTekst } from "../utils";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	option: string;
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumRadio extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, option, disabled, faktum, dispatch, intl } = this.props;
		const tekster = getFaktumRadioTekst(intl, faktumKey, option);
		return (
			<Radio
				name={faktumKey}
				checked={faktum.get(faktumKey) === option}
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

export default connect((state: { faktum: FaktumState }, props: OwnProps) => {
	return {
		faktum: state.faktum.faktum,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumRadio));
