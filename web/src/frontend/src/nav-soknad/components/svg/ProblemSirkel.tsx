/* tslint:disable*/
import * as React from "react";

interface Props {
	className?: string;
}

const ProblemSirkel: React.StatelessComponent<Props> = ({ className }) => (
	<svg
		className="problemsirkelIkon"
		xmlns="http://www.w3.org/2000/svg"
		width="32px"
		height="32px"
		viewBox="0 0 24 24"
		focusable="false"
	>
		<path
			className="sirkel"
			d="M11.696.996l-.205.002a11.715 11.715 0 0 0-8.162 3.506C1.13 6.727-.051 9.637.002 12.699.112 19.036 5.077 24 11.305 24l.203-.002c6.446-.111 11.601-5.361 11.49-11.7C22.888 5.961 17.923.996 11.696.996zm-.696 6a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm.518 11.5H11.5a1 1 0 0 1-.018-1.999l.018-.001a1 1 0 0 1 .018 2z"
		/>
	</svg>
);
export default ProblemSirkel;
