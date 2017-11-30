import * as React from "react";

/**
 * Innhold som legges her er skjult på skjerm, men vises på utskrift
 */

export interface Props extends React.Props<any> {
	active?: boolean;
}

const UtskriftContainer: React.StatelessComponent<Props> = props => {
	if (!props.active) {
		return null;
	}

	return (
		<div className="utskriftContainer" role="presentation">
			{props.children}
		</div>
	);
};

export default UtskriftContainer;
