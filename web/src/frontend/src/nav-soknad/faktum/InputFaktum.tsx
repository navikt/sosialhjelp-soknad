import * as React from "react";
import { Input, InputBredde } from "nav-frontend-skjema";
import { getInputFaktumTekst } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";
import { injectIntl, InjectedIntlProps } from "react-intl";

export type InputTypes = "text" | "number" | "email" | "tel";

interface State {
	value: string;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	pattern?: string;
	maxLength?: number;
	bredde?: InputBredde;
	type?: InputTypes;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

const getStateFromProps = (props: Props): State => ({
	value: props.getFaktumVerdi()
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
		this.props.setFaktumVerdi(this.state.value);
		this.props.validerFaktum(this.state.value);
	}

	render() {
		const {
			faktumKey,
			type,
			disabled,
			pattern,
			intl,
			maxLength,
			bredde
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Input
				className="input--xxl faktumInput"
				type={type}
				name={faktumKey}
				disabled={disabled}
				inputRef={(c: any) => (this.input = c)}
				value={this.state.value}
				onChange={this.handleOnChange}
				onBlur={this.handleOnBlur}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={this.props.getFeil(intl)}
				maxLength={maxLength}
				bredde={bredde}
				pattern={pattern}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(InputFaktum));
