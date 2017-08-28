import * as React from "react";
import "./infoblokk.css";

interface Props {
	tittel?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({ children, tittel }) => {
	return (
		<div className="skjema-infoblokk">
			<h1>Tittel</h1>
			{children}
		</div>
	);
};

export default Infoblokk;
