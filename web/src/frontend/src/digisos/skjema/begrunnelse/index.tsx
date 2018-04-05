import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { InjectedIntlProps, injectIntl } from "react-intl";

const MAX_CHARS = 500;

const Begrunnelse: React.StatelessComponent<InjectedIntlProps> = ({intl}) => (
	<DigisosSkjemaSteg steg={DigisosSteg.begrunnelsebolk}>
		<SporsmalFaktum faktumKey="begrunnelse.hvorfor">
			<TextareaFaktum
				id="begrunnelse_soknad_textarea"
				placeholder={intl.formatMessage({
					id: "begrunnelse.hvorfor.placeholder"
				})}
				textareaClass="skjema-textarea--large"
				faktumKey="begrunnelse.hvorfor"
				labelId="begrunnelse.hvorfor.label"
				maxLength={MAX_CHARS}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
			/>
		</SporsmalFaktum>
		<SporsmalFaktum faktumKey="begrunnelse.hva">
			<TextareaFaktum
				id="hva_sokes_det_om_textarea"
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
				textareaClass="skjema-textarea--large"
				faktumKey="begrunnelse.hva"
				labelId="begrunnelse.hva.label"
				maxLength={MAX_CHARS}
			/>
		</SporsmalFaktum>
	</DigisosSkjemaSteg>
);

export default injectIntl(Begrunnelse);
