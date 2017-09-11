import * as React from "react";
import { Collapse } from "react-collapse";
import "./underskjema.css";

interface UnderskjemaProps extends React.Props<any> {
	tittel?: string;
	visible: boolean;
	children: React.ReactNode;
}

const Underskjema: React.StatelessComponent<UnderskjemaProps> = ({
	tittel,
	visible,
	children
}) => {
	return (
		<Collapse
			isOpened={visible}
			className="underskjema__wrapper"
			hasNestedCollapse={true}>
			{visible ? (
				<div className="underskjema">
					<div className="underskjema__boks">
						<div className="underskjema__innhold">{children}</div>
					</div>
				</div>
			) : (
				<div />
			)}
		</Collapse>
	);
};

export default Underskjema;
