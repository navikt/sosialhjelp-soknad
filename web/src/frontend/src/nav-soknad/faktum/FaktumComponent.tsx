import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntl } from "react-intl";
import { Feil } from "nav-frontend-skjema";
import { SoknadAppState, DispatchProps } from "../redux/reduxTypes";
import {
	setFaktum,
	lagreFaktum as soknadLagreFaktum
} from "../redux/faktaActions";
import { finnFaktum } from "../redux/faktaUtils";
import {
	registerFaktumValidering,
	unregisterFaktumValidering,
	setFaktumValideringsfeil
} from "../redux/valideringActions";
import { Faktum } from "../types";
import {
	Valideringsfeil,
	FaktumValideringFunc,
	FaktumValideringsregler
} from "../validering/types";
import { validerFaktum } from "../validering/utils";
import { pakrevd } from "../validering/valideringer";
import { getFaktumVerdi, getPropertyVerdi, oppdaterFaktum } from "../utils";

export interface Props {
	faktumKey: string;
	property?: string;
	faktumId?: number;
	/** Array med valideringsfunksjoner som skal brukes for komponenten */
	validerFunc?: FaktumValideringFunc[];
	/** Denne legger til validering for påkrevd dersom true */
	required?: boolean;
}

interface InjectedProps {
	fakta: Faktum[];
	feilkode?: string;
	/** Alle registrerte valideringsregler i state */
	valideringsregler?: FaktumValideringsregler[];
	getName: () => string;
	/** Setter verdi på state og server */
	setFaktumVerdiOgLagre: (verdi: string, property?: string) => void;
	/** Setter verdi på state */
	setFaktumVerdi: (verdi: string, property?: string) => void;
	/** Henter faktumverdi fra state  */
	getFaktumVerdi: () => string;
	/** Henter properties fra state  */
	getPropertyVerdi: () => string;
	/** Validerer faktumverdi  */
	validerFaktum: () => string;
	/** Lagrer faktum på server */
	lagreFaktum: () => Promise<any>;
	/** Validerer faktumverdi dersom feil eller verdi er registrert */
	// validerVerdiDersomNodvendig: (verdi: string) => void;
	getFeil: (intl: InjectedIntl) => Feil;
}

export type InjectedFaktumComponentProps = InjectedProps & Props;

const getValideringer = (
	required: boolean,
	validerFunc: FaktumValideringFunc[]
): FaktumValideringFunc[] => {
	return [...(required ? [pakrevd] : []), ...(validerFunc ? validerFunc : [])];
};

export function getFaktumElementName(faktumKey: string): string {
	return faktumKey.replace(/\./g, "_");
}

function getEkstraName(faktumId: number, property: string): string {
	return (faktumId ? faktumId.toString() : "") + (property ? property : "");
}

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
			this.lagreFaktum = this.lagreFaktum.bind(this);
			this.setFaktumVerdiOgLagre = this.setFaktumVerdiOgLagre.bind(this);
			this.setFaktumVerdi = this.setFaktumVerdi.bind(this);
			this.getFaktumVerdi = this.getFaktumVerdi.bind(this);
			this.getPropertyVerdi = this.getPropertyVerdi.bind(this);
			this.validerFaktum = this.validerFaktum.bind(this);
			this.lagreFaktum = this.lagreFaktum.bind(this);
			this.getName = this.getName.bind(this);
			this.getFeil = this.getFeil.bind(this);
		}

		componentWillMount() {
			const valideringer = getValideringer(
				this.props.required,
				this.props.validerFunc
			);
			if (valideringer.length > 0) {
				this.props.dispatch(
					registerFaktumValidering({
						faktumKey: this.props.faktumKey,
						valideringer
					})
				);
			}
		}

		componentWillUnmount() {
			this.props.dispatch(unregisterFaktumValidering(this.props.faktumKey));
		}

		faktum(): Faktum {
			return finnFaktum(
				this.props.faktumKey,
				this.props.fakta,
				this.props.faktumId
			);
		}

		validerFaktum(faktum?: Faktum): Valideringsfeil {
			const feil = validerFaktum(
				this.props.fakta,
				this.props.faktumKey,
				faktum ? faktum.value : this.getFaktumVerdi(),
				this.props.valideringsregler
			);
			this.props.dispatch(setFaktumValideringsfeil(this.props.faktumKey, feil));
			return feil;
		}

		setFaktumVerdi(verdi: string) {
			const faktum = oppdaterFaktum(this.faktum(), verdi, this.props.property);
			this.props.dispatch(setFaktum(faktum));
			if (faktum.touched) {
				this.validerFaktum(faktum);
			}
		}

		setFaktumVerdiOgLagre(verdi: string, property?: string) {
			const feilkode = validerFaktum(
				this.props.fakta,
				this.props.faktumKey,
				verdi,
				this.props.valideringsregler
			);
			const faktum = oppdaterFaktum(this.faktum(), verdi, property);
			this.props.dispatch(setFaktum(faktum));
			if (!feilkode) {
				soknadLagreFaktum(faktum, this.props.dispatch);
			}
			this.props.dispatch(
				setFaktumValideringsfeil(this.props.faktumKey, feilkode)
			);
		}

		getFaktumVerdi(): string {
			return this.props.property
				? getPropertyVerdi(
						this.props.fakta,
						this.props.faktumKey,
						this.props.property,
						this.props.faktumId
					) || ""
				: getFaktumVerdi(this.props.fakta, this.props.faktumKey) || "";
		}

		getPropertyVerdi(): string {
			return (
				getPropertyVerdi(
					this.props.fakta,
					this.props.faktumKey,
					this.props.property,
					this.props.faktumId
				) || ""
			);
		}

		lagreFaktum(): Promise<any> {
			const faktum = finnFaktum(
				this.props.faktumKey,
				this.props.fakta,
				this.props.faktumId
			);
			return soknadLagreFaktum(faktum, this.props.dispatch);
		}

		getFeil(intl: InjectedIntl) {
			if (!this.props.feilkode) {
				return null;
			}
			return {
				feilmelding: intl.formatHTMLMessage({ id: this.props.feilkode })
			};
		}

		getName() {
			return (
				getFaktumElementName(this.props.faktumKey) +
				getEkstraName(this.props.faktumId, this.props.property)
			);
		}

		render(): JSX.Element {
			return (
				<Component
					{...this.props}
					setFaktumVerdiOgLagre={this.setFaktumVerdiOgLagre}
					setFaktumVerdi={this.setFaktumVerdi}
					getFaktumVerdi={this.getFaktumVerdi}
					getPropertyVerdi={this.getPropertyVerdi}
					validerFaktum={this.validerFaktum}
					lagreFaktum={this.lagreFaktum}
					getFeil={this.getFeil}
					getName={this.getName}
				/>
			);
		}
	};

	interface PropsFromState {
		fakta: Faktum[];
		feilkode?: string;
		valideringsregler?: FaktumValideringsregler[];
	}

	const mapStateToProps = (
		state: SoknadAppState,
		props: Props
	): PropsFromState => {
		const feil = state.validering.feil.find(
			f => f.faktumKey === props.faktumKey
		);
		return {
			fakta: state.fakta.data,
			feilkode: feil ? feil.feilkode : null,
			valideringsregler: state.validering.valideringsregler
		};
	};

	return connect<PropsFromState, {}, TOriginalProps & Props>(mapStateToProps)(
		result
	);
};
