import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../skjema/faktum/FaktumInput";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Progresjonsblokk from "../../../skjema/components/progresjonsblokk";
import {} from "../../../skjema/types";
import { FaktumComponentProps } from "../../../skjema/reducer";

const Familiesituasjon: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	return (
		<Progresjonsblokk
			tittel="Familiesituasjonen"
			content={[
				<FaktumSkjemagruppe
					tittelId="ekstrainfo.familie.barnebidrag.tittel"
					key="barnebidrag">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column sm="6" xs="3">
								<FaktumInput faktumKey="ekstrainfo.familie.barnebidrag.betaler" />
							</Column>
							<Column sm="6" xs="3">
								<FaktumInput faktumKey="ekstrainfo.familie.barnebidrag.mottar" />
							</Column>
						</Row>
					</Container>
				</FaktumSkjemagruppe>
			]}
		/>
	);
};

export default Familiesituasjon;
