import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Feil, Input, InputBredde } from "nav-frontend-skjema";
import { getInputFaktumTekst } from "../utils";
import { State } from "../../digisos/redux/reducers";
import { connect } from "react-redux";
import {getFeil} from "../utils/enhancedComponentUtils";
import {Valideringsfeil} from "../redux/valideringActionTypes";

export type InputTypes = "text" | "number" | "email" | "tel";

const DEFAULT_MAX_LENGTH = 50;

export interface OwnProps {
	verdi: string;
	feil?: Valideringsfeil[];
	onChange: (verdi: string) => void;
	onBlur: () => void;
	faktumKey: string;
	required: boolean;

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
	getName?: () => string;
	faktumIndex?: number;
	getFeil?: () => Feil;
}

export type Props = OwnProps & InjectedIntlProps;

class InputEnhanced extends React.Component<Props, {}> {

	getName(): string {
		return `${this.props.faktumKey}`.replace(/\./g, "_");
	}

	render() {
		const {
			faktumKey,
			faktumIndex,
			type,
			disabled,
			pattern,
			required,
			step,
			intl,
			maxLength = DEFAULT_MAX_LENGTH,
			bredde,
			feil
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey );

		return (
			<Input
				id={faktumKey}
				className={"input--xxl faktumInput  " + (this.props.className ? this.props.className : "") }
				// inputRef={(c: any) =>
				// 	this.props.inputRef ? this.props.inputRef(c) : null}
				type={type}
				autoComplete="off"
				name={this.getName()}
				disabled={disabled}
				value={this.props.verdi}
				onChange={(evt: any) => this.props.onChange(evt.target.value)}
				onBlur={() => this.props.onBlur()}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={getFeil(feil, intl, faktumKey, faktumIndex)}
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
