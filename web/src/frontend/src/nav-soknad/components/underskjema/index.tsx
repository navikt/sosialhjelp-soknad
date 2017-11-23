import * as React from "react";
import * as classNames from "classnames";
import { Collapse } from "react-collapse";

interface UnderskjemaProps extends React.Props<any> {
	tittel?: string;
	visible?: boolean;
	arrow?: boolean;
	style?: "default" | "system";
	collapsable?: boolean;
	children: React.ReactNode;
}

const Underskjema: React.StatelessComponent<UnderskjemaProps> = ({
	tittel,
	visible,
	arrow = true,
	style = "default",
	collapsable = true,
	children
}) => {
	if (!visible && collapsable) {
		return null;
	}
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
			<div className="underskjema__boks">
				<div className="underskjema__innhold">{children}</div>
			</div>
		</div>
	);
	if (collapsable) {
		return (
			<Collapse
				isOpened={visible}
				className="underskjema__wrapper"
				hasNestedCollapse={true}
			>
				{visible ? renderContent() : <div />}
			</Collapse>
		);
	}
	return <div className="underskjema__wrapper">{renderContent()}</div>;
};

export default Underskjema;
