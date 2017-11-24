import * as React from "react";
import { FormattedMessage } from "react-intl";
import Systeminfo from "../../../../nav-soknad/components/systeminfo";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	kontonummer: string;
}

const BankinformasjonTPS: React.StatelessComponent<Props> = ({
	kontonummer
}) => {
	return (
		<Systeminfo>
			<Detaljeliste>
				<DetaljelisteElement
					tittel={<FormattedMessage id="tps.bankinfo.kontonummer" />}
					verdi={kontonummer}
				/>
			</Detaljeliste>
		</Systeminfo>
	);
};

export default BankinformasjonTPS;
