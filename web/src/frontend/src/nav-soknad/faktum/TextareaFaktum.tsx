import * as React from "react";
import { Textarea } from "nav-frontend-skjema";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { getInputFaktumTekst, getIntlTextOrKey } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

interface OwnProps {
	labelId?: string;
	disabled?: boolean;
	textareaClass?: string;
	maxLength?: number;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class TextareaFaktum extends React.Component<Props, {}> {
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
			property,
			labelId,
			disabled,
			textareaClass,
			maxLength,
			required,
			intl
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey, property);
		const verdi =
			(property
				? this.props.getPropertyVerdi()
				: this.props.getFaktumVerdi()) || "";
		return (
			<Textarea
				label={labelId ? getIntlTextOrKey(intl, labelId) : tekster.label}
				value={verdi}
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
