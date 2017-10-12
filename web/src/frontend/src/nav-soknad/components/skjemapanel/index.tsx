import * as React from "react";
import { Panel } from "nav-frontend-paneler";
import * as classNames from "classnames";

import { PanelProps } from "nav-frontend-paneler";

const Skjemapanel: React.StatelessComponent<PanelProps> = (
	props: PanelProps
) => (
	<Panel
		{...props}
		className={classNames("skjema-skjemapanel", props.className)}
	/>
);

export default Skjemapanel;
