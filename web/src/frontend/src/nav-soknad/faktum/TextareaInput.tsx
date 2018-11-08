import * as React from "react";
import { FaktumInputProps } from "./FaktumInput";
import FaktumInput from "./FaktumInput";
import { injectIntl, InjectedIntlProps } from "react-intl";
import TextareaInputImpl from "./TextareaInputImpl";

interface OwnProps {
	id?: string;
	placeholder?: string;
	faktumKey: string;
	labelId?: string;
	disabled?: boolean;
	textareaClass?: string;
	maxLength?: number;
	fakta?: any;
	required?: boolean
}

type Props = OwnProps & InjectedIntlProps;

class TextareaInput extends React.Component<Props, {}> {

	render() {
		const {
			id,
			faktumKey,
			// property,
			labelId,
			disabled,
			textareaClass,
			maxLength,
			required,
			placeholder,
			intl
		} = this.props;
		return (
			<FaktumInput
				render={(props: FaktumInputProps) => (
					<TextareaInputImpl
						id={id}
						label={intl.formatMessage({
							id: labelId
						})}
						disabled={disabled}
						placeholder={placeholder}
						value={props.verdi}
						textareaClass={textareaClass || "skjema-texarea--normal"}
						maxLength={maxLength || 400}
						required={required}
						setFaktumVerdi={props.setFaktumVerdi}
						faktumKey={faktumKey}
					/>
				)}/>
		);
	}
}

export default injectIntl(TextareaInput);
