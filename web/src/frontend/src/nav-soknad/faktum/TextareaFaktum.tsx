import * as React from "react";
import { Textarea, Feil } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {
	getInputFaktumTekst,
	getIntlTextOrKey,
	getFaktumVerdi
} from "../utils";
import {
	InjectedFaktumComponentProps,
	faktumComponent
} from "./FaktumComponent";

interface OwnProps {
	faktumKey: string;
	labelId?: string;
	disabled?: boolean;
	textareaClass?: string;
	maxLength?: number;
	feil?: Feil;
}

interface State {
	value: string;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

const getStateFromProps = (props: Props): State => ({
	value: getFaktumVerdi(props.fakta, props.faktumKey) || ""
});

class TextareaFaktum extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.state = getStateFromProps(props);
	}

	componentWillReceiveProps(nextProps: Props) {
		this.setState(getStateFromProps(nextProps));
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
			feil,
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
				feil={feil}
				maxLength={maxLength || 400}
				textareaClass={textareaClass || "skjema-texarea--normal"}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(TextareaFaktum));
