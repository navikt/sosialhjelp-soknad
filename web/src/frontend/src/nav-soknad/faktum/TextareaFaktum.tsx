import * as React from "react";
import { Textarea, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SoknadAppState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import {
	getInputFaktumTekst,
	getIntlTextOrKey,
	getFaktumVerdi
} from "../utils";
import { finnFaktum } from "../redux/faktaUtils";

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

type Props = OwnProps &
	FaktumComponentProps &
	DispatchProps &
	InjectedIntlProps;

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
		this.props.dispatch(setFaktumVerdi(finnFaktum(this.props.faktumKey, this.props.fakta), this.state.value));
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

export default connect((state: SoknadAppState, props: OwnProps) => {
	return {
		fakta: state.faktum.data,
		faktumKey: props.faktumKey
	};
})(injectIntl(TextareaFaktum));
