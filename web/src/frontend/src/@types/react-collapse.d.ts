declare module "react-collapse" {
	import * as React from "react";

	export interface CollapseProps {
		isOpened: boolean;
		id?: string;
		className?: string;
		children: React.ReactNode;
		hasNestedCollapse?: boolean;
		onRest?: Function;
	}

	export class Collapse extends React.Component<CollapseProps, {}> {}
}
