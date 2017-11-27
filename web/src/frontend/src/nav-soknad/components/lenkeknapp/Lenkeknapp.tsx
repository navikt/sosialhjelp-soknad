import * as React from "react";
import AriaAlternativTekst from "../aria/AriaAlternativeText";
import * as classNames from "classnames";

export interface Props {
	label: string;
	onClick: () => void;
	style?: "add";
	alternativLabel?: string;
}
const baseClassName = "lenkeknapp";

const Lenkeknapp = ({ onClick, label, style, alternativLabel }: Props) => {
	const className = classNames(
		"lenke",
		baseClassName,
		style ? `${baseClassName}--${style}` : null
	);
	return (
		<button onClick={onClick} className={className} type="button">
			<AriaAlternativTekst visibleText={label} ariaText={alternativLabel} />
		</button>
	);
};

export default Lenkeknapp;
