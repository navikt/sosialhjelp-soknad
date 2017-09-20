import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "./InputFaktum";

interface OwnProps {
	faktumKey: string;
	validering?: {
		navnRequired?: boolean;
		fnrRequired?: boolean;
		pnrRequired?: boolean;
	};
}

class PersonFaktum extends React.Component<OwnProps, {}> {
	render() {
		const { faktumKey, validering = {} } = this.props;
		const navnFaktumKey = `${faktumKey}.navn`;
		const fnrFaktumKey = `${faktumKey}.fnr`;
		const pnrFaktumKey = `${faktumKey}.pnr`;
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<InputFaktum
								faktumKey={navnFaktumKey}
								required={validering.navnRequired}
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12" md="6">
							<InputFaktum
								faktumKey={fnrFaktumKey}
								maxLength={6}
								bredde="s"
								required={validering.fnrRequired}
							/>
						</Column>
						<Column xs="12" md="6">
							<InputFaktum
								faktumKey={pnrFaktumKey}
								maxLength={5}
								bredde="s"
								required={validering.pnrRequired}
							/>
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
