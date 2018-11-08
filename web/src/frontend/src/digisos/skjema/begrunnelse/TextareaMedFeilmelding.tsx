import * as React from "react";
import { Textarea } from "nav-frontend-skjema";
import { InjectedIntlProps, injectIntl } from "react-intl";
import FaktumData from "./FaktumData";
import { connect } from "react-redux";
import { Faktum } from "../../../nav-soknad/types";
import { DispatchProps, SoknadAppState } from "../../../nav-soknad/redux/reduxTypes";

interface OwnProps {
	id?: string;
	placeholder?: string;
	faktumKey: string; // Lese ut fra context?
	labelId?: string;
	disabled?: boolean;
	textareaClass?: string;
	maxLength?: number;
	required?: boolean;
	property?: string; // Hva er denne til?
	faktumId?: number; // Hva er denne til?
	fakta?: Faktum[];
}

type Props = OwnProps & InjectedIntlProps & DispatchProps;

class TextareaMedFeilmelding extends React.Component<Props, {}> {

	faktumData: FaktumData;

	constructor(props: Props) {
		super(props);
		const {fakta, faktumKey, property, faktumId, dispatch} = this.props;
		this.faktumData = new FaktumData(fakta, faktumKey, property, faktumId, dispatch);
	}

	handleOnChange(event: any): void {
		// TODO: this.props.dispatch()
		console.warn("Debug TextareaMedFeilmelding: handleOnChange: " + event.target.value);
		this.faktumData.setFaktumVerdi(event.target.value, this.props.property);
	}

	render() {
		const {
			id,
			property,
			labelId,
			disabled,
			textareaClass,
			maxLength,
			required,
			placeholder,
			intl
		} = this.props;
		const value =
			(property
				? this.faktumData.getPropertyVerdi()
				: this.faktumData.getFaktumVerdi()) || "";
		return (
			<Textarea
				id={id}
				label={intl.formatMessage({
					id: labelId
				})}
				disabled={disabled}
				placeholder={placeholder}
				value={value}
				textareaClass={textareaClass}
				maxLength={maxLength}
				required={required}
				onChange={(event: any) => this.handleOnChange(event)}
			/>
		);
	}
}

interface StateFromProps {
	fakta?: Faktum[];
}

export default connect<StateFromProps, {}, OwnProps>(
	(state: SoknadAppState) => {
		// const feil = state.validering.feil.find(
		// 	f =>
		// 		f.faktumKey === this.props.faktumKey &&
		// 		(props.property ? f.property === props.property : true) &&
		// 		(props.faktumId ? f.faktumId === props.faktumId : true)
		// );

		return {
			fakta: state.fakta.data,
			feilkode: null,
			valideringsregler: state.validering.valideringsregler
		};
	}
)(injectIntl(TextareaMedFeilmelding));

