import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, Faktum } from "../redux/faktaTypes";
import { Feil } from "nav-frontend-skjema";
import { SoknadAppState } from "../redux/faktaReducer";
import { setFaktumVerdi as setFaktumVerdiOnState } from "../redux/faktaActions";
import { finnFaktum } from "../redux/faktaUtils";
import { getFaktumVerdi, getPropertyVerdi } from "../utils";
import { FaktumValideringFunc } from "../validering/types";
import {
	registerFaktumValidering,
	unregisterFaktumValidering
} from "../redux/valideringActions";

interface Props {
	faktumKey: string;
	/** Array med valideringsfunksjoner som skal brukes for komponenten */
	valideringer?: FaktumValideringFunc[];
	property?: string;
}

interface InjectedProps {
	fakta: Faktum[];
	feil?: Feil;
	setFaktumVerdi: (verdi: string, property?: string) => void;
	getFaktumVerdi: () => string;
	getPropertyVerdi: () => string;
}

export type InjectedFaktumComponentProps = InjectedProps & Props;

export const faktumComponent = () => <TOriginalProps extends {}>(
	Component:
		| React.ComponentClass<TOriginalProps & InjectedProps>
		| React.StatelessComponent<TOriginalProps & InjectedProps>
) => {
	type ResultProps = TOriginalProps & InjectedProps & DispatchProps & Props;

	const result = class FaktumComponent extends React.Component<
		ResultProps,
		{}
	> {
		static displayName: string = `FaktumComponent(${Component.displayName ||
			Component.name})`;

		constructor(props: ResultProps) {
			super(props);
			this.setFaktumVerdi = this.setFaktumVerdi.bind(this);
			this.getFaktumVerdi = this.getFaktumVerdi.bind(this);
			this.getPropertyVerdi = this.getPropertyVerdi.bind(this);
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

		/** Kan ikke bruke faktumKey fra props, i og med checkbox modifiserer denne med option value */
		setFaktumVerdi(verdi: string) {
			this.props.dispatch(
				setFaktumVerdiOnState(
					finnFaktum(this.props.faktumKey, this.props.fakta),
					verdi
				)
			);
		}

		/** Kan ikke bruke faktumKey fra props, i og med checkbox modifiserer denne med option value */
		getFaktumVerdi(): string {
			return getFaktumVerdi(this.props.fakta, this.props.faktumKey) || "";
		}

		getPropertyVerdi(): string {
			return getPropertyVerdi(this.props.fakta, this.props.faktumKey, this.props.property) || "";
		}

		render(): JSX.Element {
			return (
				<Component
					{...this.props}
					setFaktumVerdi={this.setFaktumVerdi}
					getFaktumVerdi={this.getFaktumVerdi}
					getPropertyVerdi={this.getPropertyVerdi}
				/>
			);
		}
	};

	interface StateFromProps {
		fakta: Faktum[];
		feil?: Feil;
	}

	const mapStateToProps = (state: SoknadAppState, props: Props) => {
		const feil = state.validering.feil.find(
			f => f.faktumKey === props.faktumKey
		);
		return {
			fakta: state.fakta.data,
			feil: feil ? feil.feil : null
		};
	};

	return connect<StateFromProps, {}, TOriginalProps & Props>(mapStateToProps)(
		result
	);
};
