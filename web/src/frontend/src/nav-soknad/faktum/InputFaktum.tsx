import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Input, InputBredde } from "nav-frontend-skjema";
import { getInputFaktumTekst } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps,
	Props as FaktumComponentProps
} from "./FaktumComponent";

export type InputTypes = "text" | "number" | "email" | "tel";

const DEFAULT_MAX_LENGTH = 50;

interface State {
	value: string;
}

export interface OwnProps extends FaktumComponentProps {
	disabled?: boolean;
	pattern?: string;
	maxLength?: number;
	bredde?: InputBredde;
	step?: string;
	type?: InputTypes;
}

export type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

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
		if (document.activeElement !== this.input && nextProps.feilkode === null) {
			this.setState(getStateFromProps(nextProps));
		}
	}

	handleOnChange(evt: any) {
		const value = evt.target.value;
		this.setState({ value });
		this.props.validerVerdiDersomNodvendig(value);
	}

	handleOnBlur() {
		this.props.setFaktumVerdi(this.state.value, this.props.property);
		this.props.validerFaktum(this.state.value);
	}

	render() {
		const {
			faktumKey,
			type,
			disabled,
			pattern,
			required,
			step,
			intl,
			maxLength = DEFAULT_MAX_LENGTH,
			bredde,
			property
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey, property);
		return (
			<Input
				className="input--xxl faktumInput"
				type={type}
				name={this.props.getName()}
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
				required={required}
				step={step}
				noValidate={
					true /* Unngå at nettleser validerer og evt. fjerner verdien */
				}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(InputFaktum));
