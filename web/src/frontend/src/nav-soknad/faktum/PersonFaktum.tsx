import * as React from "react";
import { Column, Container, Row } from "nav-frontend-grid";
import { Faktum } from "../types";
import TallFaktum from "./typedInput/TallFaktum";
import NavnFaktum from "./typedInput/NavnFaktum";
import FdatoFaktum from "./typedInput/FdatoFaktum";

interface OwnProps {
	faktumKey: string;
	faktumId?: number;
	validering?: {
		navnRequired?: boolean;
		fnrRequired?: boolean;
		pnrRequired?: boolean;
	};
	id?: string;
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
		let id_navn = null;
		let id_fdato = null;
		let id_personnummer = null;
		if (this.props.id !== null) {
			id_navn = this.props.id + "_navn_input";
			id_fdato = this.props.id + "_fodselsdato_input";
			id_personnummer = this.props.id + "_personnummer_input";
		}
		return (
			<div className="personskjema">
				<Container fluid={true} className="container--noPadding">
					<Row>
						<Column xs="12">
							<NavnFaktum
								id={id_navn}
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
							<FdatoFaktum
								id={id_fdato}
								faktumKey={faktumKey}
								bredde="S"
								required={validering.fnrRequired}
								faktumId={faktumId}
								property="fnr"
							/>
						</Column>
						<Column xs="12">
							<TallFaktum
								id={id_personnummer}
								faktumKey={faktumKey}
								maxLength={5}
								minLength={5}
								bredde="S"
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
