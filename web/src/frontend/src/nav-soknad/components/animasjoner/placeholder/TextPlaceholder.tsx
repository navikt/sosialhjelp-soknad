import * as React from "react";

interface Props {
	lines?: number
}

const bars = (lines: number): React.ReactNode[] => {
	let barNumber = 0;
	const divs: React.ReactNode[] = [];
	for (let index = 0;index<lines;index++) {
		if (barNumber === 0) {
			divs.push(<div className="bar" key={index}/>);
		}
		if (barNumber === 1) {
			divs.push(<div className="bar bar__short_delay" key={index}/>);
		}
		if (barNumber === 2) {
			divs.push(<div className="bar bar__long_delay bar__narrow" key={index}/>);
		}
		barNumber++;
		if (barNumber === 3) {
			barNumber = 0;
		}
	}
	return divs;
};

const TextPlaceholder: React.FunctionComponent<Props> = ({ lines = 3 }) => (
	<div className="loaderBar">
		{bars(lines)}
	</div>
);

export default TextPlaceholder;
