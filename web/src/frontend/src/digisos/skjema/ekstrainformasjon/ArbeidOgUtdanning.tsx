import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import { injectIntl, InjectedIntlProps } from "react-intl";

import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import { faktumIsSelected, getFaktumVerdi, getIntlTextOrKey } from "../../../nav-soknad/utils";

const ArbeidsledigSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.arbeid.arbeidsledig">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column md="6" xs="12">
					<BelopFaktum
						faktumKey="ekstrainfo.arbeid.arbeidsledig.feriepenger"
						bredde="s"
					/>
				</Column>
				<Column md="6" xs="12">
					<BelopFaktum
						faktumKey="ekstrainfo.arbeid.arbeidsledig.sluttoppgjor"
						bredde="s"
					/>
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const JobbSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.arbeid.jobb">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column md="6" xs="12">
					<BelopFaktum
						faktumKey="ekstrainfo.arbeid.jobb.bruttolonn"
						bredde="s"
					/>
				</Column>
				<Column md="6" xs="12">
					<BelopFaktum
						faktumKey="ekstrainfo.arbeid.jobb.nettolonn"
						bredde="s"
					/>
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const StudentSkjema: React.StatelessComponent<{}> = () => (
	<SporsmalFaktum faktumKey="ekstrainfo.arbeid.student">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column md="6" xs="12">
					<BelopFaktum
						faktumKey="ekstrainfo.arbeid.student.utbetaling"
						bredde="s"
					/>
				</Column>
				<Column md="6" xs="12">
					<BelopFaktum
						faktumKey="ekstrainfo.arbeid.student.lantotalt"
						bredde="s"
					/>
				</Column>
			</Row>
		</Container>
	</SporsmalFaktum>
);

const ArbeidOgUtdanning: React.StatelessComponent<
	FaktumComponentProps &
	InjectedIntlProps
> = props => {
	const { fakta, intl } = props;
	const visArbeidsledig =
		getFaktumVerdi(fakta, "dinsituasjon.jobb") === "false";
	const visJobb = getFaktumVerdi(fakta, "dinsituasjon.jobb") === "true";
	const visStudent = faktumIsSelected(
		getFaktumVerdi(fakta, "dinsituasjon.studerer")
	);

	if (!visJobb && !visStudent && !visArbeidsledig) {
		return null;
	}
	const content = [
		...(visJobb ? [<JobbSkjema key="jobb" />] : []),
		...(visArbeidsledig ? [<ArbeidsledigSkjema key="arbeidsledig" />] : []),
		...(visStudent ? [<StudentSkjema key="student" />] : [])
	];

	return (
		<Progresjonsblokk
			tittel={ getIntlTextOrKey(intl, "ekstrainfo.arbeid.tittel") }
			content={content}
		/>
	);
};

export default injectIntl(ArbeidOgUtdanning);
