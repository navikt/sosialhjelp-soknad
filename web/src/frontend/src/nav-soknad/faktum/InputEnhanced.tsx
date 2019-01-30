import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Feil, Input, InputBredde } from "nav-frontend-skjema";
import { getInputFaktumTekst } from "../utils";

export type InputTypes = "text" | "number" | "email" | "tel";

const DEFAULT_MAX_LENGTH = 50;

export interface OwnProps {
	disabled?: boolean;
	pattern?: string;
	maxLength?: number;
	minLength?: number;
	bredde?: InputBredde;
	step?: string;
	type?: InputTypes;
	inputRef?: (c: any) => HTMLInputElement;
	id?: string;
	className?: string;
	verdi: string;
	onBlur: () => void;
	onChange: (verdi: string) => void;
	getName: () => string;
	faktumKey: string;
	required: boolean;
	feil?: any;
	getFeil: () => Feil;
}

export type Props = OwnProps & InjectedIntlProps;

class InputEnhanced extends React.Component<Props, {}> {

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
			bredde
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey );
		const id = this.props.id ? this.props.id : faktumKey.replace(/\./g, "_");
		return (
			<Input
				id={id}
				className={"input--xxl faktumInput  " + (this.props.className ? this.props.className : "") }
				inputRef={(c: any) =>
					this.props.inputRef ? this.props.inputRef(c) : null}
				type={type}
				autoComplete="off"
				name={this.props.getName()}
				disabled={disabled}
				value={this.props.verdi}
				onChange={(evt: any) => this.props.onChange(evt.target.value)}
				onBlur={() => this.props.onBlur()}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={this.props.getFeil()}
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

export default injectIntl(InputEnhanced);
