import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

const Familiesituasjon: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	if (!faktumIsSelected(getFaktumVerdi(fakta, "familie.barn"))) {
		return null;
	}

	return (
		<Progresjonsblokk
			tittel="Familiesituasjonen"
			content={[
				<SporsmalFaktum
					faktumKey="ekstrainfo.familie.barnebidrag"
					key="barnebidrag">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column xs="6">
								<InputFaktum
									faktumKey="ekstrainfo.familie.barnebidrag.betaler"
									bredde="s"
								/>
							</Column>
							<Column xs="6">
								<InputFaktum
									faktumKey="ekstrainfo.familie.barnebidrag.mottar"
									bredde="s"
								/>
							</Column>
						</Row>
					</Container>
				</SporsmalFaktum>
			]}
		/>
	);
};

export default Familiesituasjon;
