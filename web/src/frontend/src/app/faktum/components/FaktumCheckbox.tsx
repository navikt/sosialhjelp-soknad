import * as React from "react";
import { Checkbox, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../../utils/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../../components/skjema/LabelMedHjelpetekst";
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
	disabled?: boolean;
	feil?: Feil;
}

class FaktumCheckbox extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, disabled, feil, faktum, dispatch, intl } = this.props;
		const checked = faktumIsSelected(faktum.get(faktumKey));
		const tekster = getFaktumCheckboksTekst(intl, faktumKey);
		return (
			<Checkbox
				name={faktumKey}
				checked={checked}
				disabled={disabled}
				value={faktum.get(faktumKey)}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, boolToString(evt.target.checked)))}
				label={
					<LabelMedHjelpetekst
						id={faktumKey}
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
		faktum: state.faktum.faktum,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumCheckbox));
