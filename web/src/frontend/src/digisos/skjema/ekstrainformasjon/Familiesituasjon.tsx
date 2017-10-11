import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import { injectIntl, InjectedIntlProps } from "react-intl";

import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { faktumIsSelected, getFaktumVerdi, getIntlTextOrKey } from "../../../nav-soknad/utils";

const Familiesituasjon: React.StatelessComponent<
	FaktumComponentProps &
	InjectedIntlProps
> = props => {
	const { fakta, intl } = props;
	if (!faktumIsSelected(getFaktumVerdi(fakta, "familie.barn"))) {
		return null;
	}

	return (
		<Progresjonsblokk
			tittel={ getIntlTextOrKey( intl, "ekstrainfo.familie.tittel") }
			content={[
				<SporsmalFaktum
					faktumKey="ekstrainfo.familie.barnebidrag"
					key="barnebidrag">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column md="6" xs="12">
								<BelopFaktum
									faktumKey="ekstrainfo.familie.barnebidrag.betaler"
									bredde="s"
									kunHeltall={true}
								/>
							</Column>
							<Column md="6" xs="12">
								<BelopFaktum
									faktumKey="ekstrainfo.familie.barnebidrag.mottar"
									bredde="s"
									kunHeltall={true}
								/>
							</Column>
						</Row>
					</Container>
				</SporsmalFaktum>
			]}
		/>
	);
};

export default injectIntl(Familiesituasjon);
