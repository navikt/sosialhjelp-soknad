import * as React from "react";
import { Input, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumState, FaktumMap } from "../reducer";
import { setFaktumVerdi } from "../actions";
import { DispatchProps } from "../types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getFaktumInputTekst } from "../utils";
import "./FaktumInput.css";

interface StateProps {
	faktum: FaktumMap;
}

interface OwnProps {
	value: string;
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
}

class FaktumInput extends React.Component<
	OwnProps & StateProps & DispatchProps & InjectedIntlProps,
	{}
> {
	render() {
		const { faktumKey, disabled, feil, faktum, dispatch, intl } = this.props;
		const tekster = getFaktumInputTekst(intl, faktumKey);
		return (
			<Input
				className="input--xxl faktumInput"
				name={faktumKey}
				disabled={disabled}
				value={faktum.get(faktumKey)}
				onChange={(evt: any) =>
					dispatch(setFaktumVerdi(faktumKey, evt.target.value))}
				label={tekster.label}
				placeholder={tekster.placeholder}
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
})(injectIntl(FaktumInput));
