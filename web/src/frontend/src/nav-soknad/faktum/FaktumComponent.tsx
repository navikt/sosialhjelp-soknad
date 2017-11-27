import * as React from "react";
import { connect } from "react-redux";
import { InjectedIntl } from "react-intl";
import { Feil } from "nav-frontend-skjema";
import { SoknadAppState, DispatchProps } from "../redux/reduxTypes";
import {
	setFaktum,
	lagreFaktum,
	setFaktumIgnorert
} from "../redux/fakta/faktaActions";
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
	/** Array med valideringsfunksjoner som skal brukes ved validering av Faktum */
	validerFunc?: FaktumValideringFunc[];
	/** Påkrevd validering legges til i validerFunc array dersom true */
	required?: boolean;
	/** Ignorerer validering */
	ignorert?: boolean;
	/** Om verdien er hentet gjennom integrasjon og ikke skal kunne endres */
	systemverdi?: boolean;
}

interface InjectedProps {
	/** Alle fakta som er registrert i søknaden */
	fakta: Faktum[];
	/** Feilkode som brukes for å hente opp feilmelding gjennom intl */
	feilkode?: string;
	/** Alle registrerte valideringsregler i state */
	valideringsregler?: FaktumValideringsregler[];
	/** Genererer navn for bruk i "name"-prop i DOM elementet */
	getName: () => string;
	/** Setter verdi på state */
	setFaktumVerdi: (verdi: string, property?: string) => void;
	/** Setter verdi på state og lagrer på server dersom verdier er gyldig */
	setFaktumVerdiOgLagre: (verdi: string, property?: string) => void;
	/** Henter faktumverdi fra state  */
	getFaktumVerdi: () => string;
	/** Henter properties fra state  */
	getPropertyVerdi: () => string;
	/** Validerer faktumverdi og returnerer feilkode eller null dersom det ikke er noen feil */
	validerFaktum: () => string | null;
	/** Validerer faktumverdi og lagre dersom gyldig  */
	lagreFaktumDersomGyldig: () => void;
	/** Lagrer faktum på server */
	lagreFaktum: () => Promise<any>;
	/** Returnerer feil på faktum. Tar ikke med feil dersom faktum er ignorert */
	getFeil: (intl: InjectedIntl) => Feil;
}

export type InjectedFaktumComponentProps = InjectedProps & Props;

const getValideringer = (
	required: boolean,
	validerFunc: FaktumValideringFunc[]
): FaktumValideringFunc[] => {
	return [...(required ? [pakrevd] : []), ...(validerFunc ? validerFunc : [])];
};

export function getFaktumElementName(
	faktumKey: string,
	property?: string,
	faktumId?: number
): string {
	return `${faktumKey}${getEkstraName(faktumId, property)}`.replace(/\./g, "_");
}

function getEkstraName(faktumId: number, property: string): string {
	return `${faktumId || ""}${property || ""}`;
}

export const faktumComponent = (defProps?: { property: string }) => <
	TOriginalProps extends {}
>(
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

		static defaultProps: any = { ...defProps };

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
			this.registerFaktumValidering = this.registerFaktumValidering.bind(this);
			this.unregisterFaktumValidering = this.unregisterFaktumValidering.bind(
				this
			);
		}

		componentWillMount() {
			this.registerFaktumValidering();
			const valideringer = getValideringer(
				this.props.required,
				this.props.validerFunc
			);
			if (this.props.ignorert) {
				const faktum = this.faktum();
				this.props.dispatch(setFaktumIgnorert(faktum, this.props.ignorert));
			}
			if (valideringer.length > 0) {
				this.registerFaktumValidering();
				if (this.props.ignorert) {
					const faktum = this.faktum();
					this.props.dispatch(setFaktumIgnorert(faktum, this.props.ignorert));
				}
			}
		}

		componentWillUnmount() {
			this.unregisterFaktumValidering();
		}

		componentWillReceiveProps(nextProps: any) {
			const ignorert = (nextProps as ResultProps).ignorert;
			if (ignorert !== this.props.ignorert) {
				this.props.dispatch(setFaktumIgnorert(this.faktum(), ignorert));
				if (ignorert) {
					this.unregisterFaktumValidering();
				} else {
					this.registerFaktumValidering();
				}
			}
		}

		registerFaktumValidering() {
			if (this.props.systemverdi) {
				return;
			}
			const valideringer = getValideringer(
				this.props.required,
				this.props.validerFunc
			);
			if (valideringer.length > 0) {
				this.props.dispatch(
					registerFaktumValidering({
						faktumKey: this.props.faktumKey,
						property: this.props.property,
						faktumId: this.props.faktumId,
						valideringer
					})
				);
			}
		}

		unregisterFaktumValidering() {
			if (this.props.systemverdi) {
				return;
			}
			this.props.dispatch(
				unregisterFaktumValidering(
					this.props.faktumKey,
					this.props.property,
					this.props.faktumId
				)
			);
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
			const feilkode = validerFaktum({
				faktum,
				property,
				valideringsregler: this.props.valideringsregler
			});
			return {
				faktum,
				feilkode
			};
		}

		setFaktumVerdi(verdi: string, property?: string) {
			const res = this.validerOgOppdaterFaktum(verdi, property);
			this.props.dispatch(setFaktum(res.faktum));
			if (this.props.feilkode) {
				this.props.dispatch(
					setFaktumValideringsfeil(
						null,
						this.props.faktumKey,
						this.props.property,
						this.props.faktumId
					)
				);
			}
		}

		setFaktumVerdiOgLagre(verdi: string, property?: string) {
			const res = this.validerOgOppdaterFaktum(verdi, property);
			this.props.dispatch(setFaktum(res.faktum));
			if (!res.feilkode) {
				this.props.dispatch(lagreFaktum(res.faktum));
			}
			this.props.dispatch(
				setFaktumValideringsfeil(
					res.feilkode,
					this.props.faktumKey,
					this.props.property,
					this.props.faktumId
				)
			);
		}

		validerFaktum(): Valideringsfeil {
			const feilkode = validerFaktum({
				faktum: this.faktum(),
				property: this.props.property,
				valideringsregler: this.props.valideringsregler
			});
			this.props.dispatch(
				setFaktumValideringsfeil(
					feilkode,
					this.props.faktumKey,
					this.props.property,
					this.props.faktumId
				)
			);
			return feilkode;
		}

		lagreFaktum(): Promise<any> {
			return this.props.dispatch(lagreFaktum(this.faktum()));
		}

		lagreFaktumDersomGyldig() {
			const feil = this.validerFaktum();
			if (!feil) {
				this.lagreFaktum();
			}
		}

		getFeil(intl: InjectedIntl) {
			if (!this.props.feilkode || this.props.ignorert) {
				return null;
			}
			return {
				feilmelding: intl.formatHTMLMessage({ id: this.props.feilkode })
			};
		}

		getName() {
			return getFaktumElementName(
				this.props.faktumKey,
				this.props.property,
				this.props.faktumId
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
			f =>
				f.faktumKey === props.faktumKey &&
				(props.property ? f.property === props.property : true) &&
				(props.faktumId ? f.faktumId === props.faktumId : true)
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
