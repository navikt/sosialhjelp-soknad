import * as React from "react";
import { Textarea } from "nav-frontend-skjema";
import { DispatchProps } from "../redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../digisos/redux/reducers";
import { InjectedIntlProps, injectIntl } from "react-intl";

interface OwnProps {
	id?: string;
	placeholder?: string;
	disabled?: boolean;
	textareaClass?: string;
	maxLength?: number;
	label?: string;
	value: string;
	required?: boolean;
	faktumKey: string;
	setFaktumVerdi?: (verdi: string, property: string) => void;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps;

class TextareaInputImpl extends React.Component<Props, {}> {

	handleOnChange(event: any): void {
		// TODO: this.props.dispatch()
		console.warn("Debug out: handleOnChange: " + event.target.value);
		this.props.setFaktumVerdi(event.target.value, undefined);
	}

	render() {
		const {
			id,
			disabled,
			textareaClass,
			maxLength,
			placeholder,
			value,
			label,
			required,
		} = this.props;
		return (
			<Textarea
				id={id}
				label={label}
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

export default connect((state: State, props: any) => {
	return {
		fakta: state.fakta.data
	};
})(injectIntl(TextareaInputImpl));
