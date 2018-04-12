import * as React from "react";
import * as classNames from "classnames";
import { Collapse } from "react-collapse";
import { loggFeil } from "../../redux/navlogger/navloggerActions";

interface UnderskjemaProps extends React.Props<any> {
	visible?: boolean;
	arrow?: boolean;
	style?: "default" | "system";
	collapsable?: boolean;
	children: React.ReactNode;
}

const Underskjema: React.StatelessComponent<UnderskjemaProps> = ({
	visible,
	arrow = true,
	style = "default",
	collapsable = true,
	children
}) => {
	const cls = classNames(
		"underskjema",
		`underskjema--${style}`,
		{
			"underskjema--arrow": arrow,
			"underskjema--noPadding": !collapsable
		},
		style
	);
	const renderContent = () => (
		<div className={cls}>
			<div className={"underskjema__boks " + (visible ? "underskjema__boks__synlig" : "")}>
				<div className="underskjema__innhold ">
					{children}
				</div>
			</div>
		</div>
	);

	let content = (<span/>);
	try {
		content = renderContent();
	} catch (e) {
		loggFeil("Feil ved rendering av underskjema: " + e.toString());
	}
	if (collapsable) {
		return (
			<Collapse
				isOpened={visible}
				className="underskjema__wrapper"
				hasNestedCollapse={true}
			>
				{content}
			</Collapse>
		);
	}
	return <div className="underskjema__wrapper">{renderContent()}</div>;
};

export default Underskjema;
