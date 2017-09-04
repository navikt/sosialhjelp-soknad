import * as React from "react";
import { Input, Feil } from "nav-frontend-skjema";
import { connect } from "react-redux";
import { FaktumStoreState, FaktumComponentProps } from "../redux/reducer";
import { setFaktumVerdi } from "../redux/actions";
import { DispatchProps } from "../redux/types";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getInputFaktumTekst } from "../utils";

interface State {
	value: string;
}

interface OwnProps {
	faktumKey: string;
	disabled?: boolean;
	feil?: Feil;
	maxLength?: number;
}

type Props = OwnProps &
	FaktumComponentProps &
	DispatchProps &
	InjectedIntlProps;

const getStateFromProps = (props: Props): State => ({
	value: props.fakta.get(props.faktumKey) || ""
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
		this.props.dispatch(setFaktumVerdi(this.props.faktumKey, this.state.value));
	}

	render() {
		const { faktumKey, disabled, feil, intl, maxLength } = this.props;
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
				placeholder={tekster.placeholder}
				feil={feil}
				maxLength={maxLength}
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
