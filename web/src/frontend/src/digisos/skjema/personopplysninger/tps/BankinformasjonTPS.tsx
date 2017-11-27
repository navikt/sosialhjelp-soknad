import * as React from "react";
import { FormattedMessage } from "react-intl";
import Systeminfo from "../../../../nav-soknad/components/systeminfo";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
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
			<div className="blokk-xxs">
				<Detaljeliste>
					<DetaljelisteElement
						tittel={<FormattedMessage id="tps.bankinfo.kontonummer" />}
						verdi={kontonummer}
					/>
				</Detaljeliste>
			</div>
			<Lenkeknapp label="Endre" onClick={() => alert(1)} />
		</Systeminfo>
	);
};

export default BankinformasjonTPS;
