import * as React from "react";
import AriaAlternativTekst from "../aria/AriaAlternativeText";
import * as classNames from "classnames";

interface Props {
	children: string;
	onClick: () => void;
	style?: "add";
	skjermleserLabel?: string;
}
const baseClassName = "lenkeknapp";

const Lenkeknapp = ({ onClick, children, style, skjermleserLabel }: Props) => {
	const className = classNames(
		"lenke",
		baseClassName,
		style ? `${baseClassName}--${style}` : null
	);
	return (
		<button onClick={onClick} className={className} type="button">
			<AriaAlternativTekst visibleText={children} ariaText={skjermleserLabel} />
		</button>
	);
};

export default Lenkeknapp;
