import * as React from "react";
import * as cuid from "cuid";
import * as classNames from "classnames";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { SporsmalFaktumTekst } from "../../types";
import SporsmalHjelpetekst from "./SporsmalHjelpetekst";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

export enum LegendTittleStyle {
	DEFAULT = "skjema-fieldset--legend-title-default",
	NORMAL = "skjema-fieldset--legend-title-normal-tekst",
	FET_NORMAL = "skjema-fieldset--legend-title-normal-fet"
}

export interface Props {
	id?: string;
	children: React.ReactNode;
	visible?: boolean;
	htmlRef?: (c: any) => HTMLElement;
	style?: SporsmalStyle;
	tittelRenderer?: (title: string) => React.ReactNode;
	handleOnBlur?: (evt: any) => void;
	feil?: Feil;
	feilkode?: string;
	tekster: SporsmalFaktumTekst;
	legendTittelStyle?: LegendTittleStyle;
}

class Sporsmal extends React.Component<Props, {}> {
	render() {
		const { id, visible, children, feil, feilkode, tekster } = this.props;
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
			? this.props.tittelRenderer(tekster.sporsmal)
			: tekster.sporsmal;
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
							<SporsmalHjelpetekst tekster={tekster} legendId={legendId}/>
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

export default Sporsmal;
