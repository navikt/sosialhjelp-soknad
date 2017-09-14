import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "./InputFaktum";

interface OwnProps {
	faktumKey: string;
}

class PersonFaktum extends React.Component<OwnProps, {}> {
	render() {
		const { faktumKey } = this.props;
		const navnFaktumKey = `${faktumKey}.navn`;
		const fnrFaktumKey = `${faktumKey}.fnr`;
		const pnrFaktumKey = `${faktumKey}.pnr`;
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<InputFaktum faktumKey={navnFaktumKey} />
						</Column>
					</Row>
					<Row>
						<Column xs="6">
							<InputFaktum faktumKey={fnrFaktumKey} maxLength={6} bredde="s" />
						</Column>
						<Column xs="3">
							<InputFaktum faktumKey={pnrFaktumKey} maxLength={5} bredde="s" />
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
