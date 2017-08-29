import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../skjema/faktum/FaktumInput";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Progresjonsblokk from "../../../skjema/components/progresjonsblokk";
import {} from "../../../skjema/types";
import { FaktumComponentProps } from "../../../skjema/reducer";

const UtgifterOgGjeld: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	return (
		<Progresjonsblokk
			tittel="Utgifter og gjeld"
			content={[
				<FaktumSkjemagruppe tittelId="ekstrainfo.utgifter.husleie.tittel">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column sm="6" xs="3">
								<FaktumInput faktumKey="ekstrainfo.utgifter.husleie" />
							</Column>
						</Row>
					</Container>
				</FaktumSkjemagruppe>,
				<FaktumSkjemagruppe tittelId="ekstrainfo.utgifter.strom.tittel">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column sm="6" xs="3">
								<FaktumInput faktumKey="ekstrainfo.utgifter.strom" />
							</Column>
						</Row>
					</Container>
				</FaktumSkjemagruppe>,
				<FaktumSkjemagruppe tittelId="ekstrainfo.utgifter.barn.tittel">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column sm="6" xs="3">
								<FaktumInput faktumKey="ekstrainfo.utgifter.barn.hva" />
							</Column>
							<Column sm="6" xs="3">
								<FaktumInput faktumKey="ekstrainfo.utgifter.barn.sum" />
							</Column>
						</Row>
					</Container>
				</FaktumSkjemagruppe>
			]}
		/>
	);
};

export default UtgifterOgGjeld;
