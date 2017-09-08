import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

const ArbeidsledigSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.arbeidsledig">
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
	<SporsmalFaktum faktumKey="ekstrainfo.jobb">
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
	<SporsmalFaktum faktumKey="ekstrainfo.student">
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
	const visJobb = getFaktumVerdi(fakta, "dinsituasjon.jobb") === "true";
	const visArbeidsledig =
		getFaktumVerdi(fakta, "dinsituasjon.jobb") === "false";
	const visStudent = faktumIsSelected(
		getFaktumVerdi(fakta, "dinsituasjon.studerer")
	);

	if (!visArbeidsledig && !visJobb && !visStudent) {
		return null;
	}
	const content = [
		...(visArbeidsledig ? [<ArbeidsledigSkjema key="arbeidsledig" />] : []),
		...(visJobb ? [<JobbSkjema key="jobb" />] : []),
		...(visStudent ? [<StudentSkjema key="student" />] : [])
	];

	return <Progresjonsblokk tittel="Arbeid og utdanning" content={content} />;
};

export default ArbeidOgUtdanning;
