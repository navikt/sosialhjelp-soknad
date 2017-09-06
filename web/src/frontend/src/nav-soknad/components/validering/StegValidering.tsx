import * as React from "react";
import { Feil } from "nav-frontend-skjema";

interface Props {
	feil?: Feil[];
}

const StegValidering: React.StatelessComponent<Props> = ({ feil }) => {
	if (!feil || feil.length === 0) {
		return null;
	}
	return (
		<div>
			{feil.map((f, k) => (
				<div className="feil" key={k}>
					{f.feilmelding}
				</div>
			))}
		</div>
	);
};

export default StegValidering;
