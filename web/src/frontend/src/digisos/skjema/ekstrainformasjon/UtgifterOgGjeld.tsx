import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { faktumIsSelected } from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";

const StromSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum faktumId="ekstrainfo.utgifter.strom" key="strom">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column xs="12">
					<InputFaktum faktumKey="ekstrainfo.utgifter.strom" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const HusleieSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum faktumId="ekstrainfo.utgifter.husleie" key="husleie">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column xs="12">
					<InputFaktum faktumKey="ekstrainfo.utgifter.husleie" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const BarneSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum faktumId="ekstrainfo.utgifter.barn" key="barn">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.utgifter.barn.hva" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.utgifter.barn.sum" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
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
