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
export interface OwnProps extends FaktumComponentProps {
	disabled?: boolean;
	pattern?: string;
	maxLength?: number;
	maxAmount?: number;
	minLength?: number;
	bredde?: InputBredde;
	step?: string;
	type?: InputTypes;
	inputRef?: (c: any) => HTMLInputElement;
}

export type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class InputFaktum extends React.Component<Props, {feil?: string}> {

	setValue(value: any) {
		const { maxAmount } = this.props;
		if ( maxAmount && maxAmount > 0) {
			const parsedValue = parseFloat(value);
			if (!parsedValue || parsedValue <= maxAmount) {
				this.props.setFaktumVerdi(value, this.props.property);
			} else {
				if (!parsedValue || parsedValue > maxAmount) {
					this.setState({feil: "Max " + maxAmount});
				}
			}
		} else {
			this.props.setFaktumVerdi(value, this.props.property);
		}
	}

	getFeil(intl: any) {
		// const feil = this.state.feil;
		// if (feil) {
		// 	return feil;
		// }
		return this.props.getFeil(intl);
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
				inputRef={(c: any) =>
					this.props.inputRef ? this.props.inputRef(c) : null}
				type={type}
				autoComplete="off"
				name={this.props.getName()}
				disabled={disabled}
				value={this.props.getFaktumVerdi()}
				onChange={(evt: any) =>
					this.setValue(evt.target.value)}
				onBlur={() => this.props.lagreFaktumDersomGyldig()}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={this.getFeil(intl)}
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
