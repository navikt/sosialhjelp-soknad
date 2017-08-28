import * as React from "react";
import "./infoblokk.css";

interface Props {
	tittel?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({ children, tittel }) => {
	return (
		<div className="skjema-infoblokk">
			{tittel
				? <h1>
						{tittel}
					</h1>
				: null}
			{children}
		</div>
	);
};

export default Infoblokk;
