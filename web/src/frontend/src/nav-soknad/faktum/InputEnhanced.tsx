import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Feil, Input, InputBredde } from "nav-frontend-skjema";
import { getInputFaktumTekst } from "../utils";
import { State } from "../../digisos/redux/reducers";
import { connect } from "react-redux";
import { Valideringsfeil } from "../validering/types";

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
	getName?: () => string;
	faktumKey: string;
	required: boolean;
	feil?: any;
	getFeil?: () => Feil;
}

export type Props = OwnProps & InjectedIntlProps;

class InputEnhanced extends React.Component<Props, {}> {

	getName(): string {
		return `${this.props.faktumKey}`.replace(/\./g, "_");
	}

	// TODO Dra ut til EnhancedComponentUtils.ts
	getFeil(): Feil {
		const { faktumKey } = this.props;
		const feilkode = this.props.feil.find((f: Valideringsfeil) => f.faktumKey === faktumKey);
		return !feilkode ? null : { feilmelding: this.props.intl.formatHTMLMessage({ id: feilkode.feilkode }) };
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
				name={this.getName()}
				disabled={disabled}
				value={this.props.verdi}
				onChange={(evt: any) => this.props.onChange(evt.target.value)}
				onBlur={() => this.props.onBlur()}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={this.getFeil()}
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

const mapStateToProps = (state: State) => ({
	feil: state.validering.feil,
});

export default connect<{}, {}, OwnProps>(
	mapStateToProps
)(injectIntl(InputEnhanced));
