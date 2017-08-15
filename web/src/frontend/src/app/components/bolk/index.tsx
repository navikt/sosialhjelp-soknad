import * as React from "react";
import "./bolk.css";

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
			<div className="gui-bolk__innhold">
				{children}
			</div>
		</div>
	);
};

export default Bolk;
