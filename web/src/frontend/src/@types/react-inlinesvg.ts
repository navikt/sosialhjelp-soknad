declare module "react-inlinesvg" {
	import * as React from "react";

	export interface SVGProps {
		src: string;
		className?: string;
	}

	export default class SVG extends React.Component<SVGProps, {}> {}
}
