import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../skjema/faktum/FaktumInput";
import FaktumSkjemagruppe from "../../../skjema/faktum/FaktumSkjemagruppe";
import Progresjonsblokk from "../../../skjema/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../skjema/reducer";
import { faktumIsSelected } from "../../../skjema/utils";

const ArbeidsledigSkjema: React.StatelessComponent<{}> = () =>
	<FaktumSkjemagruppe tittelId="ekstrainfo.arbeidsledig.tittel">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.arbeidsledig.feriepenger" />
				</Column>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.arbeidsledig.sluttoppgjor" />
				</Column>
			</Row>
		</Container>
	</FaktumSkjemagruppe>;

const JobbSkjema: React.StatelessComponent<{}> = () =>
	<FaktumSkjemagruppe tittelId="ekstrainfo.jobb.tittel">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.jobb.bruttolonn" />
				</Column>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.jobb.nettolonn" />
				</Column>
			</Row>
		</Container>
	</FaktumSkjemagruppe>;

const StudentSkjema: React.StatelessComponent<{}> = () =>
	<FaktumSkjemagruppe tittelId="ekstrainfo.student.tittel">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.student.utbetaling" />
				</Column>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey="ekstrainfo.student.totalt" />
				</Column>
			</Row>
		</Container>
	</FaktumSkjemagruppe>;

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
		...(visArbeidsledig ? [<ArbeidsledigSkjema />] : []),
		...(visJobb ? [<JobbSkjema />] : []),
		...(visStudent ? [<StudentSkjema />] : [])
	];

	return <Progresjonsblokk tittel="Arbeid og utdanning" content={content} />;
};

export default ArbeidOgUtdanning;
