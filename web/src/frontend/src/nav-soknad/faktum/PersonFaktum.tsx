import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "./InputFaktum";

interface OwnProps {
	faktumKey: string;
	brukProperties?: boolean;
	faktumId?: number;
}

class PersonFaktum extends React.Component<OwnProps, {}> {
	render() {
		const { faktumKey, brukProperties, faktumId } = this.props;
		const getInputFaktum = (type: string) => {
			if (brukProperties) {
				return <InputFaktum faktumKey={faktumKey} property={type} faktumId={faktumId} />;
			}
			return <InputFaktum faktumKey={`${faktumKey}.${type}`} faktumId={faktumId} />;
		};
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							{getInputFaktum("navn")}
						</Column>
					</Row>
					<Row>
						<Column xs="6">
							{getInputFaktum("fnr")}
						</Column>
						<Column xs="3">
							{getInputFaktum("pnr")}
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
