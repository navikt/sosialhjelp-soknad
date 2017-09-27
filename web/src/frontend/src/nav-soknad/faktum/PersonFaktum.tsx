import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import TallFaktum from "./typedInput/TallFaktum";
import NavnFaktum from "./typedInput/NavnFaktum";

interface OwnProps {
	faktumKey: string;
	brukProperties?: boolean;
	faktumId?: number;
	validering?: {
		navnRequired?: boolean;
		fnrRequired?: boolean;
		pnrRequired?: boolean;
	};
}

class PersonFaktum extends React.Component<OwnProps, {}> {
	render() {
		const { faktumKey, validering = {}, brukProperties, faktumId } = this.props;
		const navnFaktumKey = brukProperties ? faktumKey : `${faktumKey}.navn`;
		const fnrFaktumKey = brukProperties ? faktumKey : `${faktumKey}.fnr`;
		const pnrFaktumKey = brukProperties ? faktumKey : `${faktumKey}.pnr`;
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<NavnFaktum
								faktumKey={navnFaktumKey}
								required={validering.navnRequired}
								faktumId={faktumId}
								{...(brukProperties ? { property: "navn" } : {})}
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12" md="6">
							<TallFaktum
								faktumKey={fnrFaktumKey}
								maxLength={6}
								bredde="s"
								required={validering.fnrRequired}
								faktumId={faktumId}
								{...(brukProperties ? { property: "fnr" } : {})}
							/>
						</Column>
						<Column xs="12" md="6">
							<TallFaktum
								faktumKey={pnrFaktumKey}
								maxLength={5}
								bredde="s"
								required={validering.pnrRequired}
								faktumId={faktumId}
								{...(brukProperties ? { property: "pnr" } : {})}
							/>
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
