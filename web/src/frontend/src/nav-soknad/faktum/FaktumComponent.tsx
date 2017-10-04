import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntl } from "react-intl";
import { Feil } from "nav-frontend-skjema";
import { SoknadAppState, DispatchProps } from "../redux/reduxTypes";
import {
	setFaktum,
	lagreFaktum,
	setFaktumIgnorert
} from "../redux/faktaActions";
import { finnFaktum } from "../utils";
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
import {
	getFaktumVerdi,
	getPropertyVerdi,
	oppdaterFaktumMedVerdier
} from "../utils";

interface FaktumStatus {
	faktum: Faktum;
	feilkode: Valideringsfeil;
}

export interface Props {
	faktumKey: string;
	property?: string;
	faktumId?: number;
	/** Array med valideringsfunksjoner som skal brukes for komponenten */
	validerFunc?: FaktumValideringFunc[];
	/** Denne legger til validering for påkrevd dersom true */
	required?: boolean;
	/** Denne gjør at en evt. feil ikke tas hensyn til */
	ignorert?: boolean;
}

interface InjectedProps {
	fakta: Faktum[];
	/** Feilkode som brukes for å hente opp feilmelding gjennom intl */
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
	/** Validerer faktumverdi og lagre dersom gyldig  */
	lagreFaktumDersomGyldig: () => void;
	/** Lagrer faktum på server */
	lagreFaktum: () => Promise<any>;
	/** Validerer faktumverdi dersom feil eller verdi er registrert */
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
			this.setFaktumVerdi = this.setFaktumVerdi.bind(this);
			this.setFaktumVerdiOgLagre = this.setFaktumVerdiOgLagre.bind(this);
			this.getFaktumVerdi = this.getFaktumVerdi.bind(this);
			this.getPropertyVerdi = this.getPropertyVerdi.bind(this);
			this.validerFaktum = this.validerFaktum.bind(this);
			this.lagreFaktumDersomGyldig = this.lagreFaktumDersomGyldig.bind(this);
			this.lagreFaktum = this.lagreFaktum.bind(this);
			this.getName = this.getName.bind(this);
			this.getFeil = this.getFeil.bind(this);
			this.props.dispatch(
				setFaktumIgnorert(this.faktum(), this.props.ignorert)
			);
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

		componentWillReceiveProps(nextProps: any) {
			const ignorert = (nextProps as ResultProps).ignorert;
			if (ignorert !== this.props.ignorert) {
				this.props.dispatch(setFaktumIgnorert(this.faktum(), ignorert));
			}
		}

		faktum(): Faktum {
			return finnFaktum(
				this.props.faktumKey,
				this.props.fakta,
				this.props.faktumId
			);
		}

		getFaktumVerdi(): string {
			if (this.props.ignorert) {
				return "";
			}
			return this.props.property
				? this.getPropertyVerdi()
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

		validerOgOppdaterFaktum(verdi: string, property?: string): FaktumStatus {
			const faktum = oppdaterFaktumMedVerdier(this.faktum(), verdi, property);
			const feilkode = validerFaktum(
				this.props.fakta,
				this.props.faktumKey,
				faktum.value,
				this.props.valideringsregler
			);
			return {
				faktum,
				feilkode
			};
		}

		setFaktumVerdi(verdi: string, property?: string) {
			const res = this.validerOgOppdaterFaktum(verdi, property);
			this.props.dispatch(setFaktum(res.faktum));
			if (res.faktum.touched) {
				this.props.dispatch(
					setFaktumValideringsfeil(this.props.faktumKey, res.feilkode)
				);
			}
		}

		setFaktumVerdiOgLagre(verdi: string, property?: string) {
			const res = this.validerOgOppdaterFaktum(verdi, property);
			this.props.dispatch(setFaktum(res.faktum));
			if (!res.feilkode) {
				lagreFaktum(res.faktum, this.props.dispatch);
			}
			this.props.dispatch(
				setFaktumValideringsfeil(this.props.faktumKey, res.feilkode)
			);
		}

		validerFaktum(): Valideringsfeil {
			const feilkode = validerFaktum(
				this.props.fakta,
				this.props.faktumKey,
				this.getFaktumVerdi(),
				this.props.valideringsregler
			);
			this.props.dispatch(
				setFaktumValideringsfeil(this.props.faktumKey, feilkode)
			);
			return feilkode;
		}

		lagreFaktumDersomGyldig() {
			const feil = this.validerFaktum();
			if (!feil) {
				lagreFaktum(this.faktum(), this.props.dispatch);
			}
		}

		lagreFaktum(): Promise<any> {
			return lagreFaktum(this.faktum(), this.props.dispatch);
		}

		/** Returnerer feil for komponenten dersom det finnes og den ikke er ignorert */
		getFeil(intl: InjectedIntl) {
			if (!this.props.feilkode || this.props.ignorert) {
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
					lagreFaktumDersomGyldig={this.lagreFaktumDersomGyldig}
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
