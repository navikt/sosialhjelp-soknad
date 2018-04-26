declare module "react-inlinesvg" {
	import * as React from "react";

	export interface SVGProps {
		src: string;
		className?: string;
		style?: any;
	}

	export default class SVG extends React.Component<SVGProps, {}> {}
}
