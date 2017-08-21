import * as React from "react";
import "./bolk.css";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";

interface BolkProps extends React.Props<any> {
	tittel?: string;
	hjelpetekst?: string;
}

const Bolk: React.StatelessComponent<BolkProps> = ({
	tittel,
	children,
	hjelpetekst
}) => {
	return (
		<div className="gui-bolk">
			{tittel
				? <h3 className="gui-bolk__tittel">
						{tittel}
					</h3>
				: null}
			{hjelpetekst
				? <div className="gui-bolk__hjelpetekst">
						<HjelpetekstAuto>
							{hjelpetekst}
						</HjelpetekstAuto>
					</div>
				: null}
			<div className="gui-bolk__innhold">
				{children}
			</div>
		</div>
	);
};

export default Bolk;
