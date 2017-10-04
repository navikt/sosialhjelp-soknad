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
	bredde?: InputBredde;
	step?: string;
	type?: InputTypes;
}

export type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class InputFaktum extends React.Component<Props, {}> {
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
				autoComplete="off"
				name={this.props.getName()}
				disabled={disabled}
				value={this.props.getFaktumVerdi()}
				onChange={(evt: any) =>
					this.props.setFaktumVerdi(evt.target.value, this.props.property)}
				onBlur={() => this.props.lagreFaktumDersomGyldig()}
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
