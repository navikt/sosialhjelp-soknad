import * as React from "react";
import { Radio, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import { getFaktumRadioTekst } from "../utils";

interface OwnProps {
	option: string;
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumRadio extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, option, disabled, fakta, dispatch, intl } = this.props;
		const tekster = getFaktumRadioTekst(intl, faktumKey, option);
		return (
			<Radio
				name={faktumKey}
				checked={fakta.get(faktumKey) === option}
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

export default connect((state: FaktumStoreState, props: OwnProps) => {
	return {
		fakta: state.faktumStore.fakta,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumRadio));
