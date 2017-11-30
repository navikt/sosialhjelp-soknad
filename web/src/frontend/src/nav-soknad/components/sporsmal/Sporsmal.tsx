import * as React from "react";
import * as cuid from "cuid";
import * as classNames from "classnames";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import Hjelpetekst from "../hjelpetekst/Hjelpetekst";
import { SporsmalFaktumTekst } from "../../types";

export interface Props {
	children: React.ReactNode;
	visible?: boolean;
	htmlRef?: (c: any) => HTMLElement;
	style?: "normal" | "system";
	tittelRenderer?: (title: string) => React.ReactNode;
	handleOnBlur?: (evt: any) => void;
	feil?: Feil;
	feilkode?: string;
	tekster: SporsmalFaktumTekst;
}

class Sporsmal extends React.Component<Props, {}> {
	render() {
		const { visible, children, feil, feilkode, tekster } = this.props;
		if (visible === false) {
			return null;
		}
		const sporsmalCls = classNames("skjema-sporsmal", {
			"skjema-sporsmal--noBottomPadding": this.props.style === "system",
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
				className={sporsmalCls}
				onBlur={this.props.handleOnBlur}
				aria-labelledby={legendId}
			>
				<SkjemaGruppe feil={feil}>
					<fieldset className={cls}>
						<legend id={legendId}>{sporsmal}</legend>
						{tekster.hjelpetekst ? (
							<div className="skjema-sporsmal__hjelpetekst">
								<span
									className="invisible"
									id={`tooltip-hjelpetekst_${legendId}`}
								>
									{tekster.hjelpetekst.tekst}
								</span>
								<Hjelpetekst
									tittel={tekster.hjelpetekst.tittel}
									id={`hjelpetekst_${legendId}`}
								>
									{tekster.hjelpetekst.tekst}
								</Hjelpetekst>
							</div>
						) : null}
						{tekster.infotekst ? (
							<div className="skjema-sporsmal__infotekst">
								{tekster.infotekst.tittel ? (
									<h4 className="skjema-sporsmal__infotekst__tittel">
										{tekster.infotekst.tittel}
									</h4>
								) : null}
								{tekster.infotekst.tekst}
							</div>
						) : null}
						<div className="skjema-sporsmal__innhold">{children}</div>
					</fieldset>
				</SkjemaGruppe>
			</div>
		);
	}
}

export default Sporsmal;
