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
			{tittel
				? <h2>
						{tittel}
					</h2>
				: null}
			{children}
		</div>
	);
};

export default Infoblokk;
