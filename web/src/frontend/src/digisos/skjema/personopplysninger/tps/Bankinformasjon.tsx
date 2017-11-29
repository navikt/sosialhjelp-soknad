import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import {
	faktumIsSelected,
	getFaktumVerdi,
	harFaktumVerdi
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

export const Skjema: React.StatelessComponent<Props> = ({ fakta }) => {
	const brukerHarIkkeKontonummer = faktumIsSelected(
		getFaktumVerdi(fakta, "kontakt.kontonummer.harikke")
	);
	return (
		<SporsmalFaktum faktumKey="kontakt.kontonummer">
			<KontonummerFaktum
				faktumKey="kontakt.kontonummer"
				disabled={brukerHarIkkeKontonummer}
				ignorert={brukerHarIkkeKontonummer}
			/>
			<CheckboxFaktum faktumKey="kontakt.kontonummer.harikke" />
		</SporsmalFaktum>
	);
};

const BankinformasjonTPS: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({ fakta, intl }) => {
	const systemKontonummerKey = "kontakt.system.kontonummer";

	if (!harFaktumVerdi(fakta, systemKontonummerKey)) {
		return <Skjema fakta={fakta} />;
	} else {
		return (
			<SporsmalFaktum faktumKey="kontakt.kontonummer" style="system">
				<SysteminfoFaktum
					faktumKey="kontakt.kontonummer.brukerendret"
					endreLabel={intl.formatMessage({
						id: "kontakt.system.kontonummer.endreknapp.label"
					})}
					skjema={<Skjema fakta={fakta} />}
				>
					<Detaljeliste>
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="kontakt.system.kontonummer.label" />
							}
							verdi={getFaktumVerdi(fakta, systemKontonummerKey)}
						/>
					</Detaljeliste>
				</SysteminfoFaktum>
			</SporsmalFaktum>
		);
	}
};

export default injectIntl(BankinformasjonTPS);
