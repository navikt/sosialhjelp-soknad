import * as React from "react";
import { Collapse } from "react-collapse";

type Sizes = "small" | "large";

interface NivaTreSkjemaProps extends React.Props<any> {
	tittel?: string;
	visible: boolean;
	children: React.ReactNode;
	size?: Sizes;
}

const NivaTreSkjema: React.StatelessComponent<NivaTreSkjemaProps> = ({
	tittel,
	visible,
	children,
	size
}) => {
	if (!visible) {
		return null;
	}
	const className = (size && size === "small") ? " nivaTreSkjema__small" : "";
	const renderContent = () => (
		<div className={"nivaTreSkjema " + className}>
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
