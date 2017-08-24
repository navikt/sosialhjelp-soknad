import * as React from "react";
import { Checkbox, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../components/labelMedHjelpetekst";
import {
	getFaktumCheckboksTekst,
	faktumIsSelected,
	boolToString
} from "../utils";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	faktumKey: string;
	option: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumCheckbox extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const {
			faktumKey,
			option,
			disabled,
			feil,
			faktum,
			dispatch,
			intl
		} = this.props;
		const key = `${faktumKey}.${option}`;
		const tekster = getFaktumCheckboksTekst(intl, key);
		const checked = faktumIsSelected(faktum.get(key));
		return (
			<Checkbox
				name={key}
				checked={checked}
				disabled={disabled}
				value={faktum.get(key)}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(key, boolToString(evt.target.checked)))}
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

export default connect((state: { faktum: FaktumState }, props: OwnProps) => {
	return {
		faktum: state.faktum.faktum
	};
})(injectIntl(FaktumCheckbox));
