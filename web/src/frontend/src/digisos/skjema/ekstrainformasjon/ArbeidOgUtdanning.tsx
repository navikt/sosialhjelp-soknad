import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected } from "../../../nav-soknad/utils";

const ArbeidsledigSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum tittelId="ekstrainfo.arbeidsledig.tittel">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.arbeidsledig.feriepenger" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.arbeidsledig.sluttoppgjor" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const JobbSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum tittelId="ekstrainfo.jobb.tittel">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.jobb.bruttolonn" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.jobb.nettolonn" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const StudentSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum tittelId="ekstrainfo.student.tittel">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.student.utbetaling" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.student.totalt" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const ArbeidOgUtdanning: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	const visArbeidsledig = faktumIsSelected(fakta.get("dinsituasjon.jobb"));
	const visJobb = !visArbeidsledig;
	const visStudent = faktumIsSelected(fakta.get("dinsituasjon.studerer"));

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
