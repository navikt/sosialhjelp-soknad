import * as React from "react";
import AriaAlternativTekst from "../aria/AriaAlternativeText";
import * as classNames from "classnames";

interface Props {
	children: string;
	onClick: () => void;
	stil?: "add";
	skjermleserLabel?: string;
	id?: string;
}
const baseClassName = "lenkeknapp";

class Lenkeknapp extends React.Component<Props> {
	render() {
		const { onClick, children, stil, skjermleserLabel } = this.props;
		// @ts-ignore
		const className = classNames(
			"linkbutton linkbutton--normal",
			baseClassName,
			stil ? `${baseClassName}--${stil}` : null
		);
		return (
			<button id={this.props.id} onClick={onClick} className={className} type="button">
				<AriaAlternativTekst
					visibleText={children}
					ariaText={skjermleserLabel}
				/>
			</button>
		);
	}
}

export default Lenkeknapp;
