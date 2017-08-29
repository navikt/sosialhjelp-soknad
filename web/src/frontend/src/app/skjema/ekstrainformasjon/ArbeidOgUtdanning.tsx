import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../skjema/faktum/FaktumInput";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Progresjonsblokk from "../../../skjema/components/progresjonsblokk";

interface Props {}

const Arbeidsledig: React.StatelessComponent<Props> = () =>
	<Progresjonsblokk tittel="Arbeid og utdanning">
		<FaktumSkjemagruppe tittelId="ekstrainfo.arbeidsledig.tittel">
			<Container fluid={true}>
				<Row>
					<Column sm="6" xs="3">
						<FaktumInput faktumKey="ekstrainfo.arbeidsledig.feriepenger" />
					</Column>
					<Column sm="6" xs="3">
						<FaktumInput faktumKey="ekstrainfo.arbeidsledig.sluttoppgjor" />
					</Column>
				</Row>
			</Container>
		</FaktumSkjemagruppe>
	</Progresjonsblokk>;

export default Arbeidsledig;
