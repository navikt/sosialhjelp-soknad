import * as React from "react";
import { FaktumStruktur } from "../../redux/synligefakta/synligeFaktaTypes";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk/index";
import Opplysning from "./Opplysning";

interface Props {
	id: string;
	tittel: string;
	beskrivelse?: string;
	faktumstrukturer: FaktumStruktur[];
}

const InformasjonBolk: React.StatelessComponent<Props> = props => {
	const sporsmal = props.faktumstrukturer.map(struktur => (
		<Opplysning faktumstruktur={struktur} key={struktur.id} vedlegg={null} />
	));

	return (
		<Progresjonsblokk
			tittel={props.tittel}
			beskrivelse={props.beskrivelse}
			content={sporsmal}
		/>
	);
};

export default InformasjonBolk;
