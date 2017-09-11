import * as React from "react";
import { Input, Feil, InputBredde } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getInputFaktumTekst, getFaktumVerdi } from "../utils";
import { Faktum } from "../soknadTypes";
import { finnFaktum } from "../redux/faktaUtils";

interface State {
	value: string;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
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
		const { faktumKey, disabled, feil, intl, maxLength, bredde } = this.props;
		const tekster = getInputFaktumTekst(intl, faktumKey);
		return (
			<Input
				className="input--xxl faktumInput"
				name={faktumKey}
				disabled={disabled}
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

export default connect((state: FaktumStoreState, props: OwnProps) => {
	return {
		fakta: state.faktumStore.fakta,
		faktumKey: props.faktumKey
	};
})(injectIntl(InputFaktum));
