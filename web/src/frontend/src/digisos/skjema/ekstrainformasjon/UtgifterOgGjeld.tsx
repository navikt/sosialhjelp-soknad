import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";

import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";

const StromSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.utgifter.strom" key="strom">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column xs="12">
					<BelopFaktum faktumKey="ekstrainfo.utgifter.strom" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const HusleieSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.utgifter.husleie" key="husleie">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column xs="12">
					<BelopFaktum faktumKey="ekstrainfo.utgifter.husleie" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const BarneSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.utgifter.barn" key="barn">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column md="6" xs="12">
					<InputFaktum faktumKey="ekstrainfo.utgifter.barn.hva" />
				</Column>
				<Column md="6" xs="12">
					<BelopFaktum faktumKey="ekstrainfo.utgifter.barn.sum" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const UtgifterOgGjeld: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	const visHusleie = faktumIsSelected(
		getFaktumVerdi(fakta, "utgifter.boutgift.true.type.husleie")
	);
	const visStrom = faktumIsSelected(
		getFaktumVerdi(fakta, "utgifter.boutgift.true.type.strom")
	);
	const visBarn = faktumIsSelected(getFaktumVerdi(fakta, "utgifter.barn"));

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
