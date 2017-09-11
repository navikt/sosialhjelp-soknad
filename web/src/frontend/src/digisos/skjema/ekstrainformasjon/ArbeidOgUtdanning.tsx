import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

const ArbeidsledigSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumId="ekstrainfo.arbeidsledig">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum
						faktumKey="ekstrainfo.arbeidsledig.feriepenger"
						bredde="s"
					/>
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum
						faktumKey="ekstrainfo.arbeidsledig.sluttoppgjor"
						bredde="s"
					/>
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const JobbSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumId="ekstrainfo.jobb">
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
	</SporsmalFaktum>
);

const StudentSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumId="ekstrainfo.student">
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
	</SporsmalFaktum>
);

const ArbeidOgUtdanning: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	const visArbeidsledig =
		getFaktumVerdi(fakta, "dinsituasjon.arbeidsledig") === "true";
	const visJobb = getFaktumVerdi(fakta, "dinsituasjon.jobb") === "true";
	const visStudent = faktumIsSelected(
		getFaktumVerdi(fakta, "dinsituasjon.studerer")
	);

	if (!visJobb && !visStudent) {
		return null;
	}
	const content = [
		...(visJobb ? [<JobbSkjema key="jobb" />] : []),
		...(visArbeidsledig ? [<ArbeidsledigSkjema key="arbeidsledig" />] : []),
		...(visStudent ? [<StudentSkjema key="student" />] : [])
	];

	return <Progresjonsblokk tittel="Arbeid og utdanning" content={content} />;
};

export default ArbeidOgUtdanning;
