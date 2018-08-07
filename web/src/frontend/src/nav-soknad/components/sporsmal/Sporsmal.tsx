import * as React from "react";
import * as cuid from "cuid";
import * as classNames from "classnames";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { SporsmalFaktumTekst } from "../../types";
import SporsmalHjelpetekst from "./SporsmalHjelpetekst";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

export interface Props {
	children: React.ReactNode;
	visible?: boolean;
	htmlRef?: (c: any) => HTMLElement;
	style?: SporsmalStyle;
	tittelRenderer?: (title: string) => React.ReactNode;
	handleOnBlur?: (evt: any) => void;
	feil?: Feil;
	feilkode?: string;
	tekster: SporsmalFaktumTekst;
	className?: string;
}

class Sporsmal extends React.Component<Props, {}> {
	render() {
		const { visible, children, feil, feilkode, tekster } = this.props;
		if (visible === false) {
			return null;
		}
		const sporsmalCls = classNames("skjema-sporsmal", {
			"skjema-sporsmal--noBottomPadding":
				this.props.style === "system" || this.props.style === "jaNeiSporsmal",
			"skjema-sporsmal--systeminfo": this.props.style === "system"
		});
		const cls = classNames("skjema-fieldset", {
			"skjema-fieldset--harFeil": feilkode !== null && feilkode !== undefined
		});
		const legendId = cuid();
		const sporsmal = this.props.tittelRenderer
			? this.props.tittelRenderer(tekster.sporsmal)
			: tekster.sporsmal;
		return (
			<div
				className={sporsmalCls + " " + this.props.className}
				onBlur={this.props.handleOnBlur}
				aria-labelledby={legendId}
			>
				<SkjemaGruppe feil={feil}>
					<fieldset className={cls}>
						<legend
							id={legendId}
						>
							{sporsmal}
							<SporsmalHjelpetekst tekster={tekster} legendId={legendId}/>
						</legend>
						<div className="skjema-sporsmal__innhold">{children}</div>
					</fieldset>
				</SkjemaGruppe>
			</div>
		);
	}
}

export default Sporsmal;
