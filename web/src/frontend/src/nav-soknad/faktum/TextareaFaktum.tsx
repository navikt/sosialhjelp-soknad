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

interface State {
	value: string;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

const getStateFromProps = (props: Props): State => ({
	value: props.getFaktumVerdi() || ""
});

class TextareaFaktum extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.tellerTekst = this.tellerTekst.bind(this);
		this.state = getStateFromProps(this.props);
	}

	componentWillReceiveProps(nextProps: Props) {
		this.state = getStateFromProps(nextProps);
	}

	handleOnChange(evt: any) {
		this.setState({ value: evt.target.value });
	}

	handleOnBlur() {
		this.props.setFaktumVerdi(this.state.value);
		this.props.validerFaktum(this.state.value);
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
			intl
		} = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Textarea
				label={labelId ? getIntlTextOrKey(intl, labelId) : tekster.label}
				value={this.state.value}
				name={faktumKey}
				disabled={disabled}
				onChange={this.handleOnChange}
				onBlur={this.handleOnBlur}
				feil={this.props.getFeil(intl)}
				maxLength={maxLength || 400}
				textareaClass={textareaClass || "skjema-texarea--normal"}
				tellerTekst={this.tellerTekst}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(TextareaFaktum));
