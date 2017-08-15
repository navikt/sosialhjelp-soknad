declare module "nav-frontend-ekspanderbartpanel" {
	import * as React from "react";

	export interface EkspanderbartpanelProps {
		apen: boolean;
		className?: string;
		onClick?: Function;
		tittel: string;
		tittelProps?: string;
		children?: {};
	}

	export default class Ekspanderbartpanel extends React.Component<
		EkspanderbartpanelProps,
		{}
	> {}
}
