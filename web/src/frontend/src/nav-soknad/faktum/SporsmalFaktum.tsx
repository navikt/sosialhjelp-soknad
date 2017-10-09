import * as React from "react";
import * as cuid from "cuid";
import * as classNames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe } from "nav-frontend-skjema";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
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
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	mounted: boolean;
	htmlRef: HTMLElement;

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
		const cls = classNames("skjema-fieldset", {
			"skjema-fieldset--harFeil": feilkode !== null && feilkode !== undefined
		});
		const legendId = cuid();
		return (
			<div
				className="skjema-sporsmal"
				onBlur={this.handleOnBlur}
				tabIndex={0}
				aria-labelledby={legendId}
				ref={c => (this.props.htmlRef ? this.props.htmlRef(c) : null)}
			>
				<SkjemaGruppe
					feil={this.harValidering() ? this.props.getFeil(intl) : null}
				>
					<fieldset className={cls}>
						<legend id={legendId}>{tekster.sporsmal}</legend>
						{tekster.hjelpetekst ? (
							<div className="skjema-sporsmal__hjelpetekst">
								<HjelpetekstAuto tittel={tekster.hjelpetekst.tittel}>
									{tekster.hjelpetekst.tekst}
								</HjelpetekstAuto>
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
