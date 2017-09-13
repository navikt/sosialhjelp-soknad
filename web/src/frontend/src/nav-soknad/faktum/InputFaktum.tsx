import * as React from "react";
import { Input, InputBredde } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { SoknadAppState, FaktumComponentProps } from "../redux/faktaReducer";
import { setFaktumVerdi } from "../redux/faktaActions";
import { setFaktumValideringsfeil } from "../redux/valideringActions";
import { DispatchProps, Faktum } from "../redux/faktaTypes";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getInputFaktumTekst, getFaktumVerdi } from "../utils";
import { validerFaktum } from "../validering/utils";
import { finnFaktum } from "../redux/faktaUtils";
import {
	withFaktumValidering,
	FaktumValideringProps
} from "./FaktumValideringComponent";

interface State {
	value: string;
}

interface OwnProps extends FaktumValideringProps {
	disabled?: boolean;
	maxLength?: number;
	bredde?: InputBredde;
}

type Props = OwnProps &
	FaktumComponentProps &
	Faktum &
	DispatchProps &
	InjectedIntlProps;

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
		this.props.dispatch(
			setFaktumVerdi(
				finnFaktum(this.props.faktumKey, this.props.fakta),
				this.state.value
			)
		);
		if (this.props.feil) {
			const valideringsfeil = validerFaktum(
				this.props.fakta,
				this.props.valideringsregler,
				this.props.faktumKey
			);
			this.props.dispatch(
				setFaktumValideringsfeil(this.props.faktumKey, valideringsfeil)
			);
		}
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

export default connect<
	{},
	{},
	OwnProps & FaktumValideringProps
>((state: SoknadAppState, props: OwnProps & FaktumValideringProps) => {
	const feil = state.validering.feil.find(f => f.faktumKey === props.faktumKey);
	return {
		fakta: state.fakta.data,
		faktumKey: props.faktumKey,
		feil: feil ? feil.feil : null,
		valideringsregler: state.validering.valideringsregler
	};
})(injectIntl(withFaktumValidering()(InputFaktum)));
