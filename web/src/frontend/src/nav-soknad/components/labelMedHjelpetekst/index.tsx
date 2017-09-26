import * as React from "react";

import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { Infotekst } from "../../types/faktumTextTypes";
import "./labelMedHjelpetekst.css";

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
				<HjelpetekstAuto tittel={props.hjelpetekst.tittel} id={props.id}>
					{props.hjelpetekst.tekst}
				</HjelpetekstAuto>
			</span>
		</span>
	);
};

export default LabelMedHjelpetekst;
