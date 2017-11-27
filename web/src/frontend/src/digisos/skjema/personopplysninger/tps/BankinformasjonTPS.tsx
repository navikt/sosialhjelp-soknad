import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import {
	faktumIsSelected,
	getFaktumVerdi,
	getPropertyVerdi
} from "../../../../nav-soknad/utils";
import { Faktum } from "../../../../nav-soknad/types";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import KontonummerFaktum from "../../../../nav-soknad/faktum/typedInput/KontonummerFaktum";
import CheckboxFaktum from "../../../../nav-soknad/faktum/CheckboxFaktum";

interface Props {
	fakta: Faktum[];
}

const BankinformasjonTPS: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({ fakta, intl }) => {
	const brukerHarIkkeKontonummer = faktumIsSelected(
		getFaktumVerdi(fakta, "kontakt.kontonummer.harikke")
	);

	const visEndreSkjema =
		getPropertyVerdi(fakta, "kontakt.kontonummer", "brukerendret") === "true";

	const kontonummer = "abc";
	return (
		<SysteminfoFaktum
			faktumKey="kontakt.kontonummer"
			property="brukerendret"
			endreLabel={intl.formatMessage({
				id: "kontakt.kontonummer.endreknapp.label"
			})}
			skjema={
				<SporsmalFaktum
					faktumKey="kontakt.kontonummer"
					visible={visEndreSkjema}
				>
					<KontonummerFaktum
						faktumKey="kontakt.kontonummer"
						disabled={brukerHarIkkeKontonummer}
						ignorert={brukerHarIkkeKontonummer}
					/>
					<CheckboxFaktum faktumKey="kontakt.kontonummer.harikke" />
				</SporsmalFaktum>
			}
		>
			<Detaljeliste>
				<DetaljelisteElement
					tittel={<FormattedMessage id="kontakt.tps.bankinfo.kontonummer" />}
					verdi={kontonummer}
				/>
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default injectIntl(BankinformasjonTPS);
