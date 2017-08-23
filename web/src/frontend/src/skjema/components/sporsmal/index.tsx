import * as React from "react";
import "./sporsmal.css";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";

interface Props extends React.Props<any> {
	sporsmal?: string;
	hjelpetekst?: string;
}

const Sporsmal: React.StatelessComponent<Props> = ({
	children,
	hjelpetekst
}) => {
	return (
		<div className="gui-sporsmal">
			{hjelpetekst
				? <div className="gui-sporsmal__hjelpetekst">
						<HjelpetekstAuto>
							{hjelpetekst}
						</HjelpetekstAuto>
					</div>
				: null}
			<div className="gui-sporsmal__innhold">
				{children}
			</div>
		</div>
	);
};

export default Sporsmal;
