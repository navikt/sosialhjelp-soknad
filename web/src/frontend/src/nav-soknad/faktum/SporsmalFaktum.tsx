import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { getFaktumSporsmalTekst } from "../utils";

export interface Props {
	faktumId: string;
	feil?: Feil;
	visible?: boolean;
	children: React.ReactNode;
}

const SporsmalFaktum: React.StatelessComponent<Props> = (
	props: Props & InjectedIntlProps
) => {
	const { visible, faktumId, intl, feil, children } = props;
	if (visible === false) {
		return null;
	}
	const tekster = getFaktumSporsmalTekst(intl, faktumId);
	return (
		<SkjemaGruppe feil={feil} className="skjema-sporsmal">
			<fieldset className="skjema-fieldset">
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
	);
};

export default injectIntl(SporsmalFaktum);
