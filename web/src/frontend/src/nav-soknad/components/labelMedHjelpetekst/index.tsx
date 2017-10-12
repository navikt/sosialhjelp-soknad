import * as React from "react";

import Hjelpetekst from "../hjelpetekst/Hjelpetekst";
import { Infotekst } from "../../types/faktumTextTypes";

interface Props {
	id: string;
	label: React.ReactNode;
	hjelpetekst?: Infotekst;
}

const LabelMedHjelpetekst: React.StatelessComponent<Props> = (props: Props) => {
	if (!props.hjelpetekst) {
		return <span>{props.label}</span>;
	}
	return (
		<span className="labelMedHjelpetekst">
			<span className="labelMedHjelpetekst__label">{props.label}</span>
			<span className="labelMedHjelpetekst__hjelpetekst">
				<Hjelpetekst tittel={props.hjelpetekst.tittel} id={props.id}>
					{props.hjelpetekst.tekst}
				</Hjelpetekst>
			</span>
		</span>
	);
};

export default LabelMedHjelpetekst;
