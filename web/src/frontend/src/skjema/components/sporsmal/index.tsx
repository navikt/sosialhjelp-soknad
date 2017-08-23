import * as React from "react";
import "./sporsmal.css";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";

interface Props extends React.Props<any> {
	sporsmal: string;
	hjelpetekst?: string;
}

const Sporsmal: React.StatelessComponent<Props> = ({
	children,
	sporsmal,
	hjelpetekst
}) => {
	return (
		<div className="skjema-sporsmal">
			<fieldset>
				<legend>
					{sporsmal}
				</legend>
				{hjelpetekst
					? <div className="skjema-sporsmal__hjelpetekst">
							<HjelpetekstAuto>
								{hjelpetekst}
							</HjelpetekstAuto>
						</div>
					: null}
				<div className="skjema-sporsmal__innhold">
					{children}
				</div>
			</fieldset>
		</div>
	);
};

export default Sporsmal;
