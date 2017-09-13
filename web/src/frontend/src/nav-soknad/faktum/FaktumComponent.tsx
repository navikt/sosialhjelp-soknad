import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, Faktum } from "../redux/faktaTypes";
import { Feil } from "nav-frontend-skjema";
import { SoknadAppState } from "../redux/faktaReducer";
import { setFaktumVerdi as setFaktumVerdiOnState } from "../redux/faktaActions";
import { finnFaktum } from "../redux/faktaUtils";
import { getFaktumVerdi } from "../utils";
import { FaktumValidering } from "../validering/types";
import {
	registerFaktumValidering,
	unregisterFaktumValidering
} from "../redux/valideringActions";

interface FaktumComponentProps {
	faktumKey: string;
	valideringer?: FaktumValidering[];
}

interface InjectedProps {
	fakta: Faktum[];
	feil?: Feil;
	setFaktumVerdi: (verdi: string) => void;
	getFaktumVerdi: () => string;
}

export type InjectedFaktumComponentProps = InjectedProps & FaktumComponentProps;

export const faktumComponent = () => <TOriginalProps extends {}>(
	Component:
		| React.ComponentClass<TOriginalProps & InjectedProps>
		| React.StatelessComponent<TOriginalProps & InjectedProps>
) => {
	type ResultProps = TOriginalProps &
		InjectedProps &
		DispatchProps &
		FaktumComponentProps;

	const result = class FaktumComponent extends React.Component<
		ResultProps,
		{}
	> {
		static displayName: string = `FaktumComponent(${Component.displayName ||
			Component.name})`;

		constructor(props: ResultProps) {
			super(props);
			this.setFaktumVerdi = this.setFaktumVerdi.bind(this);
		}
		componentWillMount() {
			if (this.props.valideringer) {
				this.props.dispatch(
					registerFaktumValidering({
						faktumKey: this.props.faktumKey,
						valideringer: this.props.valideringer
					})
				);
			}
		}

		componentWillUnmount() {
			this.props.dispatch(unregisterFaktumValidering(this.props.faktumKey));
		}

		setFaktumVerdi(verdi: string) {
			this.props.dispatch(
				setFaktumVerdiOnState(
					finnFaktum(this.props.faktumKey, this.props.fakta),
					verdi
				)
			);
		}

		getFaktumVerdi(): string {
			return getFaktumVerdi(this.props.fakta, this.props.faktumKey) || "";
		}

		render(): JSX.Element {
			return (
				<Component
					{...this.props}
					setFaktumVerdi={this.setFaktumVerdi}
					getFaktumVerdi={this.getFaktumVerdi}
				/>
			);
		}
	};

	interface StateFromProps {
		fakta: Faktum[];
		feil?: Feil;
	}

	const mapStateToProps = (
		state: SoknadAppState,
		props: FaktumComponentProps
	) => {
		const feil = state.validering.feil.find(
			f => f.faktumKey === props.faktumKey
		);
		return {
			fakta: state.fakta.data,
			feil: feil ? feil.feil : null
		};
	};

	return connect<StateFromProps, {}, TOriginalProps & FaktumComponentProps>(
		mapStateToProps
	)(result);
};
