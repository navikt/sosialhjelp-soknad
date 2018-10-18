import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { InjectedIntlProps, injectIntl } from "react-intl";
import SnakkebobleIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SnakkebobleIllustrasjon";

const MAX_CHARS = 500;

const Begrunnelse: React.StatelessComponent<InjectedIntlProps> = ({intl}) => (
	<DigisosSkjemaSteg
		steg={DigisosSteg.begrunnelsebolk}
		ikon={<SnakkebobleIllustrasjon/>}
	>
		<SporsmalFaktum
			faktumKey="begrunnelse.hvorfor"
			className="luftOverForsteUndertittel liteLuftMellomSpsm boldVanligTekst"
			legendClassName="normalTekstUndertittel"
		>
			<TextareaFaktum
				id="begrunnelse_soknad_textarea"
				placeholder={intl.formatMessage({
					id: "begrunnelse.hvorfor.placeholder"
				})}
				faktumKey="begrunnelse.hvorfor"
				maxLength={MAX_CHARS}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
			/>
		</SporsmalFaktum>
		<SporsmalFaktum
			faktumKey="begrunnelse.hva"
			className="luftUnderFireRem boldVanligTekst"
			legendClassName="normalTekstUndertittel"
		>
			<TextareaFaktum
				id="hva_sokes_det_om_textarea"
				placeholder={intl.formatMessage({
					id: "begrunnelse.hva.placeholder"
				})}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
				faktumKey="begrunnelse.hva"
				maxLength={MAX_CHARS}
			/>
		</SporsmalFaktum>
	</DigisosSkjemaSteg>
);

export default injectIntl(Begrunnelse);
