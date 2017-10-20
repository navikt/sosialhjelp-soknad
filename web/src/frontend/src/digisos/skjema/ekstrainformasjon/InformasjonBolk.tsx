import * as React from "react";
import { FaktumStruktur } from "../../redux/synligefakta/synligeFaktaTypes";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk/index";
import Opplysning from "./Opplysning";

interface Props {
	id: string;
	faktumstrukturer: FaktumStruktur[];
}

const InformasjonBolk: React.StatelessComponent<Props> = props => {
	const sporsmal = props.faktumstrukturer.map(struktur => {
		return <Opplysning faktumstruktur={struktur} key={struktur.id} />;
	});

	return <Progresjonsblokk tittel={props.id} content={sporsmal} />;
};

export default InformasjonBolk;
