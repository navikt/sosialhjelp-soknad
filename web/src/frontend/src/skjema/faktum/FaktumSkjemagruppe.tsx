import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import { getIntlTextOrKey } from "../utils";
import "./faktumSkjemagruppe.css";

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
		<fieldset className="faktumSkjemagruppe">
			<legend className="invisible">
				{tittel}
			</legend>
			<SkjemaGruppe title={tittel} feil={feil} children={children} />
		</fieldset>
	);
};

export default injectIntl(FaktumSkjemagruppe);
