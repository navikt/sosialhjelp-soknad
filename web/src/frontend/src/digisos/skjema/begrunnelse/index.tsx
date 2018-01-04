import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";

import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";

const MAX_CHARS = 500;

const Begrunnelse: React.StatelessComponent = () => (
	<DigisosSkjemaSteg steg={DigisosSteg.begrunnelsebolk}>
		<SporsmalFaktum faktumKey="begrunnelse.hvorfor">
			<TextareaFaktum
				textareaClass="skjema-textarea--large"
				faktumKey="begrunnelse.hvorfor"
				labelId="begrunnelse.hvorfor.label"
				maxLength={MAX_CHARS}
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
			/>
		</SporsmalFaktum>
		<SporsmalFaktum faktumKey="begrunnelse.hva">
			<TextareaFaktum
				validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
				textareaClass="skjema-textarea--large"
				faktumKey="begrunnelse.hva"
				labelId="begrunnelse.hva.label"
				maxLength={MAX_CHARS}
			/>
		</SporsmalFaktum>
	</DigisosSkjemaSteg>
);

export default Begrunnelse;
