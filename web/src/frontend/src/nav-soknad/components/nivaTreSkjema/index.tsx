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
	if (!visible) {
		return null;
	}
	const renderContent = () => (
		<div className="nivaTreSkjema">
			<div className="nivaTreSkjema__boks">
				<div className="nivaTreSkjema__innhold">{children}</div>
			</div>
		</div>
	);
	return (
		<Collapse isOpened={visible} className="underskjemaWrapper">
			{renderContent()}
		</Collapse>
	);
};

export default NivaTreSkjema;
