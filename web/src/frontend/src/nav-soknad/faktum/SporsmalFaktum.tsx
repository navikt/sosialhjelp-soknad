import * as React from "react";
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
	children: React.ReactNode;
	visible?: boolean;
	renderValideringsfeil?: boolean;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	static defaultProps: any = {
		renderValideringsfeil: true
	};

	render() {
		const { visible, faktumKey, feil, intl, children } = this.props;
		if (visible === false) {
			return null;
		}
		const tekster = getFaktumSporsmalTekst(intl, faktumKey);
		const cls = classNames("skjema-fieldset", {
			"skjema-fieldset--harFeil": feil !== null && feil !== undefined
		});
		return (
			<div className="skjema-sporsmal">
				<SkjemaGruppe feil={feil}>
					<fieldset className={cls}>
						<legend>{tekster.sporsmal}</legend>
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
