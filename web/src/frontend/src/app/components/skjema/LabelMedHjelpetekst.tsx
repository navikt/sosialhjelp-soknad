import * as React from "react";

import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import "./labelMedHjelpetekst.css";

interface Props {
	label: React.ReactNode;
	hjelpetekst?: React.ReactNode;
}

const LabelMedHjelpetekst: React.StatelessComponent<Props> = (props: Props) => {
	if (!props.hjelpetekst) {
		return (
			<span>
				{props.label}
			</span>
		);
	}
	return (
		<span className="labelMedHjelpetekst">
			<span className="labelMedHjelpetekst__label">
				{props.label}
			</span>
			<span className="labelMedHjelpetekst__hjelpetekst">
				<HjelpetekstAuto>
					{props.hjelpetekst}
				</HjelpetekstAuto>
			</span>
		</span>
	);
};

export default LabelMedHjelpetekst;
