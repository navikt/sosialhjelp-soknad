import * as React from "react";
import * as cuid from "cuid";
import * as classNames from "classnames";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { SporsmalFaktumTekst } from "../../types";
import SporsmalHjelpetekst from "./SporsmalHjelpetekst";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { getFaktumSporsmalTekst } from "../../utils";
import { FaktumValideringFunc } from "../../validering/types";
// import { registerFaktumValidering } from "../../redux/valideringActions";
// import { validerFaktum } from "../../validering/utils";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

export enum LegendTittleStyle {
	DEFAULT = "skjema-fieldset--legend-title-default",
	NORMAL = "skjema-fieldset--legend-title-normal-tekst",
	FET_NORMAL = "skjema-fieldset--legend-title-normal-fet"
}

export interface OwnProps {
	id?: string;
	children: React.ReactNode;
	visible?: boolean;
	htmlRef?: (c: any) => HTMLElement;
	style?: SporsmalStyle;
	tittelRenderer?: (title: string) => React.ReactNode;
	handleOnBlur?: (evt: any) => void;
	feil?: Feil;
	feilkode?: string;
	tekster?: SporsmalFaktumTekst;
	sprakNokkel?: string;
	legendTittelStyle?: LegendTittleStyle;
	visLedetekst?: boolean;
	faktumKey?: string;

	/** Array med valideringsfunksjoner som skal brukes ved validering */
	validerFunc?: FaktumValideringFunc[];
	/** Påkrevd validering legges til i validerFunc array dersom true */
	required?: boolean;
	/** Ikke valider ved onBlur */
	noValidateOnBlur?: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class Sporsmal extends React.Component<Props, {}> {
	// mounted: boolean;
	//
	// componentDidMount() {
	// 	// registerFaktumValidering({
	// 	// 	faktumKey: this.props.faktumKey,
	// 	// 	property: this.props.property,
	// 	// 	faktumId: this.props.faktumId,
	// 	// 	valideringer
	// 	// })
	// 	this.mounted = true;
	// }
	//
	// componentWillUnmount() {
	// 	this.mounted = false;
	// }
	//
	// harValidering() {
	// 	return (
	// 		this.props.required ||
	// 		(this.props.validerFunc && this.props.validerFunc.length > 0)
	// 	);
	// }
	//
	// handleOnBlur(evt: any) {
	// 	console.warn("debug: sporsmal onBlur");
	// 	debugger;
	// 	// if (this.harValidering() && !this.props.noValidateOnBlur) {
	// 	if (this.harValidering()) {
	// 		setTimeout(() => {
	// 			if (this.mounted) {
	// 				this.valider();
	// 			}
	// 		}, 0);
	// 	}
	// }
	//
	// valider() {
	// 	console.warn("Debug: kjører validering ");
	// 	console.warn("feilmelding: " + this.props.faktumKey);
	// 	// const feilkode = validerFaktum({
	// 	// 	faktum,
	// 	// 	property,
	// 	// 	valideringsregler: this.props.valideringsregler
	// 	// });
	// }

	render() {
		const { id, visible, children, feil, feilkode, tekster, intl, sprakNokkel, visLedetekst } = this.props;
		const ledeTekster: SporsmalFaktumTekst = tekster ? tekster :
			getFaktumSporsmalTekst(intl, sprakNokkel );
		if (visible === false) {
			return null;
		}
		const sporsmalCls = classNames("skjema-sporsmal", {
			"skjema-sporsmal--noBottomPadding":
				this.props.style === "system" || this.props.style === "jaNeiSporsmal",
			"skjema-sporsmal--systeminfo": this.props.style === "system",
			"skjema-sporsmal--jaNeiSporsmal": this.props.style === "jaNeiSporsmal"
		});
		const cls = classNames("skjema-fieldset", {
			"skjema-fieldset--harFeil": feilkode !== null && feilkode !== undefined
		});
		const legendCls = this.props.legendTittelStyle ? this.props.legendTittelStyle : LegendTittleStyle.DEFAULT;
		const legendId = cuid();
		const sporsmal = this.props.tittelRenderer
			? this.props.tittelRenderer(ledeTekster.sporsmal)
			: ledeTekster.sporsmal;
		return (
			<div
				id={id}
				className={sporsmalCls}
				onBlur={this.props.handleOnBlur}
				aria-labelledby={legendId}
			>
				<SkjemaGruppe feil={feil}>
					<fieldset className={cls + " " + legendCls}>
						<legend
							id={legendId}
						>
							{sporsmal}
							{visLedetekst !== false && (
								<SporsmalHjelpetekst tekster={ledeTekster} legendId={legendId}/>
							)}
						</legend>
						<div className="skjema-sporsmal__innhold">
							{children}
						</div>
					</fieldset>
				</SkjemaGruppe>
			</div>
		);
	}
}

export default injectIntl(Sporsmal);
