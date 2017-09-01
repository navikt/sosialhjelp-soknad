import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { getIntlTextOrKey } from "../utils";

interface Props {
	tittelId: string;
	feil?: Feil;
	visible?: boolean;
	children: React.ReactNode;
}

const FaktumSkjemagruppe: React.StatelessComponent<Props> = (
	props: Props & InjectedIntlProps
) => {
	const { visible, tittelId, intl, feil, children } = props;
	if (visible === false) {
		return null;
	}
	const tittel = getIntlTextOrKey(intl, tittelId);
	return (
		<SkjemaGruppe feil={feil}>
			<fieldset className="skjema-fieldset">
				<legend>{tittel}</legend>
				{children}
			</fieldset>
		</SkjemaGruppe>
	);
};

export default injectIntl(FaktumSkjemagruppe);
