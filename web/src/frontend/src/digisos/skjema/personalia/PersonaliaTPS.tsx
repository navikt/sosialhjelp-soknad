import * as React from "react";
import { FormattedMessage } from "react-intl";
import Systeminfo from "../../../nav-soknad/components/systeminfo";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../nav-soknad/components/detaljeliste";

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
		<Systeminfo>
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
						verdi={<span className="tekst-capitalize">statsborgerskap</span>}
					/>
				)}
			</Detaljeliste>
		</Systeminfo>
	);
};

export default PersonaliaTPS;
