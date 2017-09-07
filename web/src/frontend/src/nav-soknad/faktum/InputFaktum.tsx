import * as React from "react";
import { findDOMNode } from "react-dom";
import { Input, Feil, InputBredde } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumAppState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi, setFaktumValidering } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getInputFaktumTekst } from "../utils";

interface State {
	value: string;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
	maxLength?: number;
	bredde?: InputBredde;
	required?: boolean;
}

type Props = OwnProps &
	FaktumComponentProps &
	DispatchProps &
	InjectedIntlProps;

const getStateFromProps = (props: Props): State => ({
	value: props.fakta.get(props.faktumKey) || ""
});

class InputFaktum extends React.Component<Props, State> {
	input: any;
	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.state = getStateFromProps(props);
	}
	componentWillReceiveProps(nextProps: Props) {
		this.setState(getStateFromProps(nextProps));
	}

	handleOnChange(evt: any) {
		this.setState({ value: evt.target.value });
	}

	handleOnBlur() {
		this.props.dispatch(setFaktumVerdi(this.props.faktumKey, this.state.value));
		if (this.state.value === "") {
			this.props.dispatch(
				setFaktumValidering(this.props.faktumKey, findDOMNode(this.input), {
					feilmelding: "mangler"
				})
			);
		}
	}

	render() {
		const { faktumKey, disabled, feil, intl, maxLength, bredde } = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Input
				ref={(c: any) => (this.input = c)}
				className="input--xxl faktumInput"
				name={faktumKey}
				disabled={disabled}
				value={this.state.value}
				onChange={this.handleOnChange}
				onBlur={this.handleOnBlur}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={feil}
				maxLength={maxLength}
				bredde={bredde}
			/>
		);
	}
}

export default connect((state: FaktumAppState, props: OwnProps) => {
	return {
		fakta: state.faktum.fakta,
		faktumKey: props.faktumKey
	};
})(injectIntl(InputFaktum));
