import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-skjema/faktum/InputFaktum";

interface Props {
	navnFaktumKey: string;
	fnrFaktumKey: string;
	pnrFaktumKey: string;
}

const Personskjema: React.StatelessComponent<Props> = ({
	navnFaktumKey,
	fnrFaktumKey,
	pnrFaktumKey
}) => (
	<div className="personskjema">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column xs="12">
					<InputFaktum faktumKey={navnFaktumKey} />
				</Column>
			</Row>
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey={fnrFaktumKey} maxLength={6} />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey={pnrFaktumKey} maxLength={5} />
				</Column>
			</Row>
		</Container>
	</div>
);

export default Personskjema;
