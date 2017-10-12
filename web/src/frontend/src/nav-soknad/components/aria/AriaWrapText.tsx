import * as React from "react";

/**
 * Legger til tekst foran og/eller etter som ikke vises, men leses av skjermleser 
 */

export interface AriaWrapTextProps extends React.Props<any> {
	text?: string; // Or children
	before?: React.ReactNode | string;
	after: string;
}

const AriaWrapText: React.StatelessComponent<AriaWrapTextProps> = ({
	text,
	children,
	before,
	after
}) => {
	if (!text && !children) {
		return null;
	}
	return (
		<span>
			{before ? <span className="invisible">{before}</span> : null}
			{text || children}
			{after ? <span className="invisible">{after}</span> : null}
		</span>
	);
};

export default AriaWrapText;
