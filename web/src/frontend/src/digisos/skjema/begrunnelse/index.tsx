import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Ella from "../../../nav-soknad/components/svg/Ella";
import { DigisosFarge } from "../../../nav-soknad/components/svg/DigisosFarger";

const MAX_CHARS = 500;

const Begrunnelse: React.StatelessComponent<InjectedIntlProps> = ({intl}) => (
	<DigisosSkjemaSteg
		steg={DigisosSteg.begrunnelsebolk}
		ikon={<Ella visBakgrundsSirkel={true} bakgrundsFarge={DigisosFarge.NAV_GRONN_LIGHTEN_40}/>}
	>
		<SporsmalFaktum faktumKey="begrunnelse.hvorfor">
			<TextareaFaktum
				id="begrunnelse_soknad_textarea"
				placeholder={intl.formatMessage({
					id: "begrunnelse.hvorfor.placeholder"
				})}
				faktumKey="begrunnelse.hvorfor"
				labelId="begrunnelse.hvorfor.label"
				maxLength={MAX_CHARS}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
			/>
		</SporsmalFaktum>
		<SporsmalFaktum faktumKey="begrunnelse.hva">
			<TextareaFaktum
				id="hva_sokes_det_om_textarea"
				placeholder={intl.formatMessage({
					id: "begrunnelse.hva.placeholder"
				})}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
				faktumKey="begrunnelse.hva"
				labelId="begrunnelse.hva.label"
				maxLength={MAX_CHARS}
			/>
		</SporsmalFaktum>
	</DigisosSkjemaSteg>
);

export default injectIntl(Begrunnelse);
