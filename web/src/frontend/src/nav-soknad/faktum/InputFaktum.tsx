import * as React from "react";
// import { findDOMNode } from "react-dom";
import { Input, Feil, InputBredde } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SoknadAppState, FaktumComponentProps } from "../redux/faktaReducer";
import {
	setFaktumVerdi,
	registerFaktumValidering,
	unregisterFaktumValidering
} from "../redux/faktaActions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getInputFaktumTekst, getFaktumVerdi } from "../utils";
import { Faktum } from "../soknadTypes";
import { finnFaktum } from "../redux/faktaUtils";

interface State {
	value: string;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	maxLength?: number;
	bredde?: InputBredde;
	required?: boolean;
}

interface StateProps {
	feil?: Feil;
}

type Props = OwnProps &
	FaktumComponentProps &
	Faktum &
	DispatchProps &
	InjectedIntlProps &
	StateProps;

const getStateFromProps = (props: Props): State => ({
	value: getFaktumVerdi(props.fakta, props.faktumKey) || ""
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

	componentDidMount() {
		this.props.dispatch(
			registerFaktumValidering({
				faktumKey: this.props.faktumKey,
				rules: null
			})
		);
	}

	componentWillUnmount() {
		this.props.dispatch(unregisterFaktumValidering(this.props.faktumKey));
	}

	handleOnChange(evt: any) {
		this.setState({ value: evt.target.value });
	}

	handleOnBlur() {
		this.props.dispatch(setFaktumVerdi(finnFaktum(this.props.faktumKey, this.props.fakta), this.state.value));
	}

	render() {
		const { faktumKey, disabled, feil, intl, maxLength, bredde } = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Input
				className="input--xxl faktumInput"
				name={faktumKey}
				disabled={disabled}
				inputRef={(c: any) => (this.input = c)}
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

export default connect<
	StateProps,
	{},
	OwnProps
>((state: SoknadAppState, props: OwnProps) => {
	const feil = state.validering.feil.find(f => f.faktumKey === props.faktumKey);
	return {
		fakta: state.faktum.data,
		faktumKey: props.faktumKey,
		feil: feil ? feil.feil : null
	};
})(injectIntl(InputFaktum));
