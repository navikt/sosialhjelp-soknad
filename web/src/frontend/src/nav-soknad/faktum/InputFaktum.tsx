import * as React from "react";
import { Input, InputBredde } from "nav-frontend-skjema";
import { getFaktumVerdi, getInputFaktumTekst } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface State {
	value: string;
}

interface OwnProps {
	disabled?: boolean;
	maxLength?: number;
	bredde?: InputBredde;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

const getStateFromProps = (props: Props): State => ({
	value: getFaktumVerdi(props.fakta, props.faktumKey) || ""
});

class InputFaktum extends React.Component<Props, State> {
	input: any;

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
		const { faktumKey, disabled, feil, intl, maxLength, bredde } = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Input
				className="input--xxl faktumInput"
				name={faktumKey}
				disabled={disabled}
				inputRef={(c: any) => (this.input = c)}
				value={this.state.value}
				onChange={this.handleOnChange}
				onBlur={this.handleOnBlur}
				label={tekster.label}
				placeholder={tekster.pattern}
				feil={feil}
				maxLength={maxLength}
				bredde={bredde}
			/>
		);
	}
}

export default injectIntl(faktumComponent()(InputFaktum));
