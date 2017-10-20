import * as React from "react";
import { Column, Container, Row } from "nav-frontend-grid";
import { Faktum } from "../types";
import TallFaktum from "./typedInput/TallFaktum";
import NavnFaktum from "./typedInput/NavnFaktum";
import { fdato } from "../validering/valideringer";

interface OwnProps {
	faktumKey: string;
	faktumId?: number;
	validering?: {
		navnRequired?: boolean;
		fnrRequired?: boolean;
		pnrRequired?: boolean;
	};
}

interface PersonFaktumProperties {
	navn: string;
	fnr: string;
	fdato: string;
}

export const oppsummerPersonData = (faktum: Faktum) => {
	const props = faktum.properties as PersonFaktumProperties;
	const ingenVerdi = "blankt";
	return `Navn: ${props.navn || ingenVerdi}, fødselsnummer: ${props.fnr ||
		ingenVerdi}, fødselsdato: ${props.fdato || ingenVerdi}`;
};

class PersonFaktum extends React.Component<OwnProps, {}> {
	navnInput: HTMLInputElement;

	constructor(props: OwnProps) {
		super(props);
		this.focus = this.focus.bind(this);
	}

	focus() {
		this.navnInput.focus();
	}

	render() {
		const { faktumKey, validering = {}, faktumId } = this.props;
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<NavnFaktum
								inputRef={c => (this.navnInput = c)}
								faktumKey={faktumKey}
								required={validering.navnRequired}
								faktumId={faktumId}
								property="navn"
							/>
						</Column>
					</Row>
					<Row>
						<Column xs="12">
							<TallFaktum
								faktumKey={faktumKey}
								maxLength={6}
								minLength={6}
								bredde="s"
								required={validering.fnrRequired}
								faktumId={faktumId}
								property="fnr"
								validerFunc={[fdato]}
							/>
						</Column>
						<Column xs="12">
							<TallFaktum
								faktumKey={faktumKey}
								maxLength={5}
								minLength={5}
								bredde="s"
								required={validering.pnrRequired}
								faktumId={faktumId}
								property="pnr"
							/>
						</Column>
					</Row>
				</Container>
			</div>
		);
	}
}

export default PersonFaktum;
