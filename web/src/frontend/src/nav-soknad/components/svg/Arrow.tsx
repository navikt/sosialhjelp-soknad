/* tslint:disable*/
import * as React from "react";

interface Props {
	size?: number;
}

const Arrow: React.StatelessComponent<Props> = ({ size }) => (
	<svg
		className="bostedBydelArrow"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 125"
		width={size || 40}
		height={size || 40}>
		<path d="M67.4 57.3L53.5 71.3V19.7c0-2-1.6-3.6-3.6-3.6s-3.6 1.6-3.6 3.6v51.6L32.3 57.3c-1.4-1.4-3.7-1.4-5.1 0 -1.4 1.4-1.4 3.7 0 5.1l20.1 20.1c0.2 0.2 0.4 0.3 0.5 0.4 0 0 0.1 0.1 0.2 0.1 0.2 0.1 0.3 0.2 0.5 0.2 0.1 0 0.1 0 0.2 0.1 0.2 0.1 0.3 0.1 0.5 0.1 0.2 0 0.5 0.1 0.7 0.1h0c0.2 0 0.5 0 0.7-0.1 0.2 0 0.3-0.1 0.4-0.1 0.1 0 0.2 0 0.2-0.1 0.2-0.1 0.3-0.2 0.5-0.3 0 0 0.1 0 0.1-0.1 0.2-0.1 0.4-0.3 0.5-0.4l20.1-20.1c1.4-1.4 1.4-3.7 0-5.1C71.1 55.9 68.8 55.9 67.4 57.3z" />
	</svg>
);
export default Arrow;
