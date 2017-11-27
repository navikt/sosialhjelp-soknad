import * as React from "react";
import * as cuid from "cuid";
import * as classNames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe } from "nav-frontend-skjema";
import Hjelpetekst from "../components/hjelpetekst/Hjelpetekst";
import { getFaktumSporsmalTekst } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

export interface OwnProps {
	faktumKey: string;
	children: React.ReactNode;
	visible?: boolean;
	htmlRef?: (c: any) => HTMLElement;
	style?: "normal" | "system";
	tittelRenderer?: (title: string) => React.ReactNode;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	mounted: boolean;

	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.harValidering = this.harValidering.bind(this);
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	harValidering() {
		return (
			this.props.required ||
			(this.props.validerFunc && this.props.validerFunc.length > 0)
		);
	}

	handleOnBlur(evt: any) {
		if (this.harValidering()) {
			setTimeout(() => {
				if (this.mounted) {
					this.props.validerFaktum();
				}
			}, 0);
		}
	}

	render() {
		const { visible, feilkode, intl, children } = this.props;
		if (visible === false) {
			return null;
		}
		const tekster = getFaktumSporsmalTekst(intl, this.props.faktumKey);
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
				onBlur={this.handleOnBlur}
				aria-labelledby={legendId}
			>
				<SkjemaGruppe
					feil={this.harValidering() ? this.props.getFeil(intl) : null}
				>
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

export default injectIntl(faktumComponent()(SporsmalFaktum));
