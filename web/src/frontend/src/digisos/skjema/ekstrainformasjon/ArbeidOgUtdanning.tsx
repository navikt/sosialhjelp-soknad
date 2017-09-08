import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

const JobbSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum faktumId="ekstrainfo.jobb">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.jobb.bruttolonn" bredde="s" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.jobb.nettolonn" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const StudentSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum faktumId="ekstrainfo.student">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.student.utbetaling" bredde="s" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.student.totalt" bredde="s" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const ArbeidOgUtdanning: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	const visJobb = getFaktumVerdi(fakta, "dinsituasjon.jobb") === "true";
	const visStudent = faktumIsSelected(
		getFaktumVerdi(fakta, "dinsituasjon.studerer")
	);

	if (!visJobb && !visStudent) {
		return null;
	}
	const content = [
		...(visJobb ? [<JobbSkjema key="jobb" />] : []),
		...(visStudent ? [<StudentSkjema key="student" />] : [])
	];

	return <Progresjonsblokk tittel="Arbeid og utdanning" content={content} />;
};

export default ArbeidOgUtdanning;
