import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import FaktumInput from "../../../skjema/faktum/FaktumInput";

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
					<FaktumInput faktumKey={navnFaktumKey} />
				</Column>
			</Row>
			<Row>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey={fnrFaktumKey} maxLength={6} />
				</Column>
				<Column sm="6" xs="3">
					<FaktumInput faktumKey={pnrFaktumKey} maxLength={5} />
				</Column>
			</Row>
		</Container>
	</div>
);

export default Personskjema;
