import * as React from "react";

/**
 * Innhold som legges her er skjult på skjerm, men vises på utskrift
 */

export interface Props extends React.Props<any> {
	active?: boolean;
}

export const Side: React.StatelessComponent<any> = ({ children }) => (
	<div className="utskriftsContainer__side">{children}</div>
);

const UtskriftContainer: React.StatelessComponent<Props> = props => {
	if (!props.active) {
		return null;
	}

	return (
		<div className="utskriftContainer" role="presentation">
			<div className="utskriftContainer__hode">
				<img
					src="/soknadsosialhjelp/statisk/nav-logo.svg"
					alt=""
					width="90"
					height="56"
				/>
			</div>
			<div className="utskriftContainer__innhold">{props.children}</div>
		</div>
	);
};

export default UtskriftContainer;
