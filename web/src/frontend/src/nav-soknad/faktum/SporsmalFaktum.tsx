import * as React from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { getFaktumSporsmalTekst } from "../utils";

import { FaktumAppState } from "../redux/reducer";

export interface OwnProps {
	faktumKey: string;
	visible?: boolean;
	children: React.ReactNode;
}

interface StateProps {
	feil?: Feil;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	render() {
		const { visible, faktumKey, feil, intl, children } = this.props;
		if (visible === false) {
			return null;
		}
		const tekster = getFaktumSporsmalTekst(intl, faktumKey);
		return (
			<SkjemaGruppe className="skjema-sporsmal" feil={feil}>
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
	}
}

export default connect<
	StateProps,
	{},
	OwnProps
>((state: FaktumAppState, props: OwnProps): StateProps => {
	const feil = state.validering.feil.find(f => f.faktumKey === props.faktumKey);
	return {
		feil: feil ? feil.feil : null
	};
})(injectIntl(SporsmalFaktum));
