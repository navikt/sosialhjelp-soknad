import * as React from "react";
import { Checkbox, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../../utils/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import LabelMedHjelpetekst from "../../components/skjema/LabelMedHjelpetekst";
import { getIntlText } from "../utils";

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
		const checked = faktum.get(faktumKey) === "true";
		const value = checked ? "true" : "false";
		const hjelpetekst = getIntlText(intl, `${faktumKey}.hjelpetekst`);
		return (
			<Checkbox
				name={faktumKey}
				value={value}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, `${evt.target.checked}`))}
				label={
					<LabelMedHjelpetekst
						label={intl.formatMessage({ id: `${faktumKey}` })}
						hjelpetekst={hjelpetekst}
					/>
				}
				checked={checked}
				disabled={disabled}
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
