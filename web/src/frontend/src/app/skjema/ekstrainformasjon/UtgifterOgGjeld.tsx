import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../skjema/faktum/FaktumInput";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Progresjonsblokk from "../../../skjema/components/progresjonsblokk";
import { faktumIsSelected } from "../../../skjema/utils";
import { FaktumComponentProps } from "../../../skjema/reducer";

const StromSkjema: React.StatelessComponent<{}> = () => (
	<FaktumSkjemagruppe tittelId="ekstrainfo.utgifter.strom.tittel" key="strom">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.utgifter.strom" />
				</Column>
			</Row>
		</Container>
	</FaktumSkjemagruppe>
);

const HusleieSkjema: React.StatelessComponent<{}> = () => (
	<FaktumSkjemagruppe
		tittelId="ekstrainfo.utgifter.husleie.tittel"
		key="husleie">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.utgifter.husleie" />
				</Column>
			</Row>
		</Container>
	</FaktumSkjemagruppe>
);

const BarneSkjema: React.StatelessComponent<{}> = () => (
	<FaktumSkjemagruppe tittelId="ekstrainfo.utgifter.barn.tittel" key="barn">
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
);

const UtgifterOgGjeld: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	const visHusleie = faktumIsSelected(fakta.get("dinsituasjon.jobb"));
	const visStrom = faktumIsSelected(fakta.get("dinsituasjon.jobb"));
	const visBarn = faktumIsSelected(fakta.get("dinsituasjon.studerer"));

	if (!visHusleie && !visStrom && !visBarn) {
		return null;
	}
	const content = [
		...(visHusleie ? [<HusleieSkjema key="husleie" />] : []),
		...(visStrom ? [<StromSkjema key="strom" />] : []),
		...(visBarn ? [<BarneSkjema key="barn" />] : [])
	];

	return <Progresjonsblokk tittel="Utgifter og gjeld" content={content} />;
};

export default UtgifterOgGjeld;
