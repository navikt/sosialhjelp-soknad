import * as React from "react";
import {FormattedMessage, InjectedIntlProps, injectIntl} from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import {
	faktumIsSelected,
	getFaktumVerdi,
	harFaktumVerdi
} from "../../../../nav-soknad/utils";
import {Faktum} from "../../../../nav-soknad/types";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import KontonummerFaktum from "../../../../nav-soknad/faktum/typedInput/KontonummerFaktum";
import CheckboxFaktum from "../../../../nav-soknad/faktum/CheckboxFaktum";

interface Props {
	fakta: Faktum[];
	onHarIkkeKontonummer: (s: string) => void;
}

export const Skjema: React.StatelessComponent<Props> = ({fakta, onHarIkkeKontonummer}) => {
	const brukerHarIkkeKontonummer = faktumIsSelected(
		getFaktumVerdi(fakta, "kontakt.kontonummer.harikke")
	);
	return (
		<div>
			<KontonummerFaktum
				id="kontakt_kontonummer_number_input"
				faktumKey="kontakt.kontonummer"
				disabled={brukerHarIkkeKontonummer}
				ignorert={brukerHarIkkeKontonummer}
			/>
			<CheckboxFaktum
				id="kontakt_kontonummer_har_ikke_checkbox"
				faktumKey="kontakt.kontonummer.harikke"
				onChange={onHarIkkeKontonummer}
			/>
		</div>
	);
};

const BankinformasjonTPS: React.StatelessComponent<Props & InjectedIntlProps> = ({fakta, onHarIkkeKontonummer, intl}) => {
	const systemKontonummerKey = "kontakt.system.kontonummer";

	if (!harFaktumVerdi(fakta, systemKontonummerKey)) {
		return (
			<SporsmalFaktum faktumKey="kontakt.kontonummer">
				<Skjema fakta={fakta} onHarIkkeKontonummer={onHarIkkeKontonummer}/>
			</SporsmalFaktum>
		)
	} else {
		return (
			<SporsmalFaktum id="kontakt_kontonummer" faktumKey="kontakt.system.kontonummer" style="system">
				<SysteminfoFaktum
					faktumKey="kontakt.kontonummer.brukerendrettoggle"
					endreLabel={intl.formatMessage({
						id: "kontakt.system.kontonummer.endreknapp.label"
					})}
					skjema={<Skjema fakta={fakta} onHarIkkeKontonummer={onHarIkkeKontonummer}/>}
				>
					<Detaljeliste>
						<DetaljelisteElement
							tittel={
								<FormattedMessage id="kontakt.system.kontonummer.label"/>
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
