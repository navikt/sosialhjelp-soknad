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
	}

	render() {
		const {
			faktumKey,
			labelId,
			disabled,
			feilkode,
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
				feil={{ feilmelding: intl.formatHTMLMessage({ id: feilkode }) }}
				maxLength={maxLength || 400}
				textareaClass={textareaClass || "skjema-texarea--normal"}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(TextareaFaktum));
