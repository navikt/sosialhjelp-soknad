import * as React from "react";
import { Checkbox } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../../utils/types";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
}

class FaktumCheckbox extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, faktum, dispatch, intl } = this.props;
		const label = intl.formatMessage({ id: `${faktumKey}` });
		const checked = faktum.get(faktumKey) === "true";
		const value = checked ? "true" : "false";
		return (
			<Checkbox
				checked={checked}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, `${evt.target.checked}`))}
				label={label}
				name={faktumKey}
				value={value}
				disabled={false}
			/>
		);
	}
}

// export default Steg1;
export default connect((state: { faktum: FaktumState }, props: OwnProps) => {
	return {
		faktum: state.faktum.faktum,
		faktumKey: props.faktumKey
	};
})(injectIntl(FaktumCheckbox));
