declare module "nav-frontend-paneler" {
	import * as React from "react";

	export interface PanelProps {
		className?: string;
		children: React.ReactNode;
	}
	export class Panel extends React.Component<PanelProps, {}> {}
}
