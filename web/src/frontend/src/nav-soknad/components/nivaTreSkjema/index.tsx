import * as React from "react";
import { Collapse } from "react-collapse";
import "./nivaTreSkjema.css";

interface NivaTreSkjemaProps extends React.Props<any> {
	tittel?: string;
	visible: boolean;
	useCollapse?: boolean;
	children: React.ReactNode;
}

// TODO: Vurder å fjerne useCollapse
const NivaTreSkjema: React.StatelessComponent<NivaTreSkjemaProps> = ({
	tittel,
	useCollapse,
	visible,
	children
}) => {
	useCollapse = true;
	const renderContent = () =>
		<div className="nivaTreSkjema">
			<div className="nivaTreSkjema__boks">
				<div className="nivaTreSkjema__innhold">
					{children}
				</div>
			</div>
		</div>;
	return useCollapse
		? <Collapse isOpened={visible} className="underskjemaWrapper">
				{renderContent()}
			</Collapse>
		: visible ? renderContent() : null;
};

NivaTreSkjema.defaultProps = {
	useCollapse: false
};

export default NivaTreSkjema;
