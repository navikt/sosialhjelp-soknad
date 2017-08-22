import * as React from "react";
import "./bolk.css";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";

interface Props extends React.Props<any> {
	tittel?: string;
	hjelpetekst?: string;
}

const Bolk: React.StatelessComponent<Props> = ({
	tittel,
	children,
	hjelpetekst
}) => {
	return (
		<div className="gui-sporsmal">
			{tittel
				? <h3 className="gui-sporsmal__tittel">
						{tittel}
					</h3>
				: null}
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

export default Bolk;
