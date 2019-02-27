import * as React from "react";
import DigisosSkjemaSteg, { DigisosSteg } from "../DigisosSkjemaSteg";
import { InjectedIntlProps, injectIntl } from "react-intl";
import SnakkebobleIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SnakkebobleIllustrasjon";
import BegrunnelseSkjema from "../begrunnelse_ny/Begrunnelse";

const Begrunnelse: React.FunctionComponent<InjectedIntlProps> = ({intl}) => (
	<DigisosSkjemaSteg
		steg={DigisosSteg.begrunnelsebolk}
		ikon={<SnakkebobleIllustrasjon/>}
	>
		<BegrunnelseSkjema />
	</DigisosSkjemaSteg>
);

export default injectIntl(Begrunnelse);
