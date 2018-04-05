import * as React from "react";
import { Collapse } from "react-collapse";
import { loggFeil } from "../../redux/navlogger/navloggerActions";

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

	const renderContent = () => (
		<div className="nivaTreSkjema">
			<div className="nivaTreSkjema__boks">
				<div className={"nivaTreSkjema__innhold" + (visible ? " nivaTreSkjema__innhold__ekspandert" : "")}>
					{children}
				</div>
			</div>
		</div>
	);
	let content = (<span/>);
	try {
		content = renderContent();
	} catch (e) {
		loggFeil("Feil ved rendering av nivå tre skjema: " + e.toString());
	}

	return (
		<Collapse isOpened={visible} className="underskjemaWrapper">
			{content}
		</Collapse>
	);
};

export default NivaTreSkjema;
