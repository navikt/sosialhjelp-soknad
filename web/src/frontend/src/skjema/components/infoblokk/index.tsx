import * as React from "react";
import "./infoblokk.css";
import Info from "../svg/Info";
interface Props {
	tittel?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({ children, tittel }) => {
	return (
		<div className="skjema-infoblokk">
			<div className="skjema-infoblokk__icon">
				<Info />
			</div>
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
