import * as React from "react";
import { Textarea } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getInputFaktumTekst, getIntlTextOrKey } from "../utils";
import {
	InjectedFaktumComponentProps,
	faktumComponent
} from "./FaktumComponent";

interface OwnProps {
	labelId?: string;
	disabled?: boolean;
	textareaClass?: string;
	maxLength?: number;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class TextareaFaktum extends React.Component<Props, {}> {
	textarea: any;

	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.tellerTekst = this.tellerTekst.bind(this);
	}

	handleOnChange(evt: any) {
		this.props.setFaktumVerdi(evt.target.value, this.props.property);
	}

	handleOnBlur() {
		this.props.lagreFaktumDersomGyldig();
	}

	tellerTekst(antallTegn: number, maxLength: number) {
		const antallTegnIgjen = maxLength - antallTegn;
		if (antallTegnIgjen > 25) {
			return null;
		} else if (antallTegn > maxLength) {
			return this.props.intl.formatMessage(
				{
					id: "textarea.overmaks"
				},
				{ antall: antallTegn - maxLength }
			);
		}
		return this.props.intl.formatMessage(
			{
				id: "textarea.undermaks"
			},
			{ antall: maxLength - antallTegn }
		);
	}

	render() {
		const {
			faktumKey,
			labelId,
			disabled,
			textareaClass,
			maxLength,
			required,
			intl
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Textarea
				label={labelId ? getIntlTextOrKey(intl, labelId) : tekster.label}
				textareaRef={(c: any) => (this.textarea = c)}
				value={this.props.getFaktumVerdi()}
				name={this.props.getName()}
				disabled={disabled}
				onChange={this.handleOnChange}
				onBlur={this.handleOnBlur}
				feil={this.props.getFeil(intl)}
				maxLength={maxLength || 400}
				textareaClass={textareaClass || "skjema-texarea--normal"}
				tellerTekst={this.tellerTekst}
				required={required}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(TextareaFaktum));
