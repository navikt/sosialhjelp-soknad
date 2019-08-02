import * as React from "react";
import {Panel, PanelBaseProps} from "nav-frontend-paneler";
import * as classNames from "classnames";


const Skjemapanel: React.FC<PanelBaseProps> = (
	props: PanelBaseProps
) => (
	<Panel
		{...props}
		// @ts-ignore
		className={classNames("skjema-skjemapanel", props.className)}
	/>
);

export default Skjemapanel;
