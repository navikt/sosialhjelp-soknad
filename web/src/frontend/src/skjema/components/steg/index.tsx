import * as React from "react";
import "./steg.css";

interface StegProps extends React.Props<any> {
	tittel: string;
}

const Steg: React.StatelessComponent<StegProps> = ({ tittel, children }) => {
	return (
		<div className="gui-steg">
			<h2 className="gui-steg__tittel">
				{tittel}
			</h2>
			{children}
		</div>
	);
};

export default Steg;
