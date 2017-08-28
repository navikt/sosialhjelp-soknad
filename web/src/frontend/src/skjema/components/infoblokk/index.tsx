import * as React from "react";
import "./infoblokk.css";
import Info from "../svg/Info";
interface Props {
	tittel?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({ children, tittel }) => {
	return (
		<div className="skjema-infoblokk">
			<Info />
			<h1>Tittel</h1>
			{children}
		</div>
	);
};

export default Infoblokk;
