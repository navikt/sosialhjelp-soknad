import * as React from "react";
import { FaktumStruktur } from "../../redux/synligefakta/synligeFaktaReducer";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk/index";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import { Column, Container, Row } from "nav-frontend-grid";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";

interface Props {
	id: string;
	faktumstrukturer: FaktumStruktur[];
}

const InformasjonBolk: React.StatelessComponent<Props> = props => {

	const sporsmal = props.faktumstrukturer.map(s => {
		const width = "" + (12 / s.properties.length);
		const inputs = s.properties.map(property => {
			return (
				<Column md={width} xs="12" key={property.id}>
					<BelopFaktum faktumKey={s.id + "." + property.id} bredde="s"/>
				</Column>
			);
		});

		return (
			<SporsmalFaktum faktumKey={s.id} key={s.id}>
				<Container fluid={true} className="container--noPadding">
					<Row>
						{inputs}
					</Row>
				</Container>
			</SporsmalFaktum>
		);
	});
	return <Progresjonsblokk tittel={props.id} content={sporsmal}/>;
};

export default InformasjonBolk;
