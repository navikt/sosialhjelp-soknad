import * as React from "react";
import { Collapse } from "react-collapse";
import "./nivaTreSkjema.css";

interface NivaTreSkjemaProps extends React.Props<any> {
	tittel?: string;
	visible: boolean;
	children: React.ReactNode;
}

const NivaTreSkjema: React.StatelessComponent<NivaTreSkjemaProps> = ({
	tittel,
	visible,
	children
}) => {
	return (
		<Collapse isOpened={visible} className="underskjemaWrapper">
			<div className="nivaTreSkjema" >
				<div className="nivaTreSkjema__boks">
					<div className="nivaTreSkjema__innhold">
						{children}
					</div>
				</div>
			</div>
		</Collapse>
	);
};

export default NivaTreSkjema;
