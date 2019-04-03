import * as React from "react";

interface Props {
	lines?: number
}

const TextPlaceholder: React.FunctionComponent<Props> = ({ lines }) => (
	<div className="loaderBar">
		<div className="bar"/>
		<div className="bar bar1"/>
		<div className="bar bar2"/>
	</div>
);

export default TextPlaceholder;
