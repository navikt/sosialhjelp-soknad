import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "./InputFaktum";
import { FaktumValideringFunc } from "../validering/types";

interface OwnProps {
	faktumKey: string;
	validering?: {
		navn?: FaktumValideringFunc[];
		fnr?: FaktumValideringFunc[];
		pnr?: FaktumValideringFunc[];
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
								validerFunc={validering.navn}
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12" md="6">
							<InputFaktum
								faktumKey={fnrFaktumKey}
								maxLength={6}
								bredde="s"
								validerFunc={validering.fnr}
							/>
						</Column>
						<Column xs="12" md="6">
							<InputFaktum
								faktumKey={pnrFaktumKey}
								maxLength={5}
								bredde="s"
								validerFunc={validering.pnr}
							/>
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
