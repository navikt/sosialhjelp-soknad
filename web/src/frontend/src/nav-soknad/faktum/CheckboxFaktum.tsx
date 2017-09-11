import * as React from "react";
import { Checkbox, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SoknadAppState, FaktumComponentProps } from "../redux/faktaReducer";
import { setFaktumVerdi } from "../redux/faktaActions";
import { DispatchProps } from "../redux/faktaTypes";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import {
	getFaktumCheckboksTekst,
	faktumIsSelected,
	boolToString,
	getFaktumVerdi
} from "../utils";
import { finnFaktum } from "../redux/faktaUtils";

interface OwnProps {
	faktumKey: string;
	option: string;
	disabled?: boolean;
	feil?: Feil;
}

class CheckboxFaktum extends React.Component<
	OwnProps & FaktumComponentProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			option,
			disabled,
			feil,
			fakta,
			dispatch,
			intl
		} = this.props;
		const key = `${faktumKey}.${option}`;
		const tekster = getFaktumCheckboksTekst(intl, key);
		const checked = faktumIsSelected(getFaktumVerdi(fakta, key));
		return (
			<Checkbox
				name={key}
				checked={checked}
				disabled={disabled}
				value={option}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(finnFaktum(key, this.props.fakta ), boolToString(evt.target.checked)))}
				label={
					<LabelMedHjelpetekst
						id={key}
						label={tekster.label}
						hjelpetekst={tekster.hjelpetekst}
					/>
				}
				feil={feil}
			/>
		);
	}
}

export default connect((state: SoknadAppState, props: OwnProps) => {
	return {
		fakta: state.faktum.data
	};
})(injectIntl(CheckboxFaktum));
