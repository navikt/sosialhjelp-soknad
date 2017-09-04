import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../nav-skjema/faktum/FaktumInput";
import FaktumSkjemagruppe from "../../../nav-skjema/faktum/FaktumSkjemagruppe";
import Progresjonsblokk from "../../../nav-skjema/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-skjema/redux/reducer";
import { faktumIsSelected } from "../../../nav-skjema/utils";

const Familiesituasjon: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	if (!faktumIsSelected(fakta.get("familie.barn"))) {
		return null;
	}

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
