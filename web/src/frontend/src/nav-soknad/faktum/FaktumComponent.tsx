import * as React from "react";
import { connect } from "react-redux";
import { DispatchProps, Faktum } from "../redux/faktaTypes";
import { SoknadAppState } from "../redux/faktaReducer";
import { setFaktumVerdi as setFaktumVerdiOnState } from "../redux/faktaActions";
import { finnFaktum } from "../redux/faktaUtils";
import { getFaktumVerdi } from "../utils";
import { InjectedIntl } from "react-intl";
import {
	FaktumValideringFunc,
	FaktumValideringsregler
} from "../validering/types";
import {
	registerFaktumValidering,
	unregisterFaktumValidering,
	setFaktumValideringsfeil
} from "../redux/valideringActions";
import { validerFaktum } from "../validering/utils";
import { Feil } from "nav-frontend-skjema";

interface Props {
	faktumKey: string;
	/** Array med valideringsfunksjoner som skal brukes for komponenten */
	valideringer?: FaktumValideringFunc[];
	valideringsregler?: FaktumValideringsregler[];
}

interface InjectedProps {
	fakta: Faktum[];
	feilkode?: string;
	setFaktumVerdi: (verdi: string) => void;
	getFaktumVerdi: () => string;
	validerFaktum: (verdi: string) => string;
	getFeil: (intl: InjectedIntl) => Feil;
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
			this.validerFaktum = this.validerFaktum.bind(this);
			this.getFeil = this.getFeil.bind(this);
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

		validerFaktum(verdi: string) {
			const feil = validerFaktum(
				this.props.fakta,
				this.props.faktumKey,
				verdi,
				this.props.valideringsregler
			);
			this.props.dispatch(setFaktumValideringsfeil(this.props.faktumKey, feil));
		}

		getFeil(intl: InjectedIntl) {
			if (!this.props.feilkode) {
				return null;
			}
			return {
				feilmelding: intl.formatHTMLMessage({ id: this.props.feilkode })
			};
		}

		render(): JSX.Element {
			return (
				<Component
					{...this.props}
					setFaktumVerdi={this.setFaktumVerdi}
					getFaktumVerdi={this.getFaktumVerdi}
					validerFaktum={this.validerFaktum}
					getFeil={this.getFeil}
				/>
			);
		}
	};

	interface StateFromProps {
		fakta: Faktum[];
		feilkode?: string;
		valideringsregler?: FaktumValideringsregler[];
	}

	const mapStateToProps = (
		state: SoknadAppState,
		props: Props
	): StateFromProps => {
		const feil = state.validering.feil.find(
			f => f.faktumKey === props.faktumKey
		);
		return {
			fakta: state.fakta.data,
			feilkode: feil ? feil.feilkode : null,
			valideringsregler: state.validering.valideringsregler
		};
	};

	return connect<StateFromProps, {}, TOriginalProps & Props>(mapStateToProps)(
		result
	);
};
