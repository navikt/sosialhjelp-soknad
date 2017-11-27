import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import Systeminfo from "../../../../nav-soknad/components/systeminfo";
import Lenkeknapp from "../../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import Detaljeliste, {
	DetaljelisteElement
} from "../../../../nav-soknad/components/detaljeliste";

interface Props {
	kontonummer: string;
}

const BankinformasjonTPS: React.StatelessComponent<
	Props & InjectedIntlProps
> = ({ kontonummer, intl }) => {
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
			<Lenkeknapp
				label={intl.formatMessage({ id: "tps.bankinfo.endreknapp.label" })}
				onClick={() => alert(1)}
			/>
		</Systeminfo>
	);
};

export default injectIntl(BankinformasjonTPS);
