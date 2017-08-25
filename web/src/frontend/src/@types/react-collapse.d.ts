declare module "react-collapse" {
	import * as React from "react";

	export interface CollapseProps {
		isOpened: boolean;
		id?: string;
		className?: string;
		children: React.ReactNode;
		hasNestedCollapse?: boolean;
	}

	export class Collapse extends React.Component<CollapseProps, {}> {}
}
