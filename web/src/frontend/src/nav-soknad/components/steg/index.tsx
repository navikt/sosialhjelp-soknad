import * as React from "react";
import "./steg.css";

interface StegProps extends React.Props<any> {
	tittel: string;
}

const Steg: React.StatelessComponent<StegProps> = ({ tittel, children }) => {
	return (
		<div className="skjema-steg skjema-content">
			<h2 className="skjema-steg__tittel">{tittel}</h2>
			{children}
		</div>
	);
};

export default Steg;
