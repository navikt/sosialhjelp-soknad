import * as React from "react";
import { FormattedMessage } from "react-intl";
import SysteminfoFaktum from "../../../../nav-soknad/faktum/SysteminfoFaktum";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	navn: string;
	fnr: string;
	statsborgerskap: string;
}

const PersonaliaTPS: React.StatelessComponent<Props> = ({
	navn,
	fnr,
	statsborgerskap
}) => {
	return (
		<SysteminfoFaktum faktumKey="tps.personalia">
			<Detaljeliste>
				<DetaljelisteElement
					tittel={<FormattedMessage id="tps.personalia.navn" />}
					verdi={navn}
				/>
				{fnr && (
					<DetaljelisteElement
						tittel={<FormattedMessage id="tps.personalia.fnr" />}
						verdi={fnr}
					/>
				)}
				{statsborgerskap && (
					<DetaljelisteElement
						tittel={<FormattedMessage id="tps.personalia.statsborgerskap" />}
						verdi={<span className="tekst-capitalize">{statsborgerskap}</span>}
					/>
				)}
			</Detaljeliste>
		</SysteminfoFaktum>
	);
};

export default PersonaliaTPS;
