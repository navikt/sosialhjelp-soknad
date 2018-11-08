import * as React from "react";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import TextareaFaktum from "../../../nav-soknad/faktum/TextareaFaktum";
import { getMaksLengdeFunc } from "../../../nav-soknad/validering/valideringer";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { InjectedIntlProps, injectIntl } from "react-intl";
import SnakkebobleIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SnakkebobleIllustrasjon";
import TextareaInput from "../../../nav-soknad/faktum/TextareaInput";
import SporsmalBlokk from "./SporsmalBlokk";
import TextareaContainer from "./TextareaContainer";
import TextareaMedFeilmelding from "./TextareaMedFeilmelding";

const MAX_CHARS = 500;

const Begrunnelse: React.StatelessComponent<InjectedIntlProps> = ({intl}) => (
	<DigisosSkjemaSteg
		steg={DigisosSteg.begrunnelsebolk}
		ikon={<SnakkebobleIllustrasjon/>}
	>

		<SporsmalBlokk i18nKey="begrunnelse.hvorfor">
			<TextareaContainer faktumKey="begrunnelse.hvorfor">
				<TextareaMedFeilmelding
					id="begrunnelse_soknad_textarea"
					placeholder={intl.formatMessage({
						id: "begrunnelse.hvorfor.placeholder"
					})}
					faktumKey="begrunnelse.hvorfor"
					labelId="begrunnelse.hvorfor.label"
					maxLength={MAX_CHARS}
					// validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
				/>
			</TextareaContainer>
		</SporsmalBlokk>


		<SporsmalFaktum faktumKey="begrunnelse.hvorfor">
			<TextareaInput
				id="begrunnelse_soknad_textarea"
				placeholder={intl.formatMessage({
					id: "begrunnelse.hvorfor.placeholder"
				})}
				faktumKey="begrunnelse.hvorfor"
				labelId="begrunnelse.hvorfor.label"
				maxLength={MAX_CHARS}
				// validerFunc={[getMaksLengdeFunc(MAX_CHARS)]}
			/>
		</SporsmalFaktum>


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
