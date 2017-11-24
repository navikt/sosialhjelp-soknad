import * as React from "react";
import { FormattedMessage } from "react-intl";
import Systeminfo from "../../../../nav-soknad/components/systeminfo";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	adresse: string;
	postnummer: string;
	poststed: string;
	telefonnummer: string;
}

const KontaktinfoTPS: React.StatelessComponent<Props> = ({
	postnummer,
	poststed,
	adresse,
	telefonnummer
}) => {
	return (
		<Systeminfo>
			<Detaljeliste>
				<DetaljelisteElement
					tittel={<FormattedMessage id="tps.kontaktinfo.adresse" />}
					verdi={adresse}
				/>
				<DetaljelisteElement
					tittel={<FormattedMessage id="tps.kontaktinfo.postnummer" />}
					verdi={postnummer}
				/>
				<DetaljelisteElement
					tittel={<FormattedMessage id="tps.kontaktinfo.poststed" />}
					verdi={poststed}
				/>
				<DetaljelisteElement
					tittel={<FormattedMessage id="tps.kontaktinfo.telefonnummer" />}
					verdi={telefonnummer}
					spaced={true}
				/>
			</Detaljeliste>
		</Systeminfo>
	);
};

export default KontaktinfoTPS;
