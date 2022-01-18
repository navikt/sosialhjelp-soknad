import * as React from "react";
import Panel, {PanelProps} from "nav-frontend-paneler";
import classNames from "classnames";

const Skjemapanel: React.FC<PanelProps> = (props: PanelProps) => (
    <Panel {...props} className={classNames("skjema-skjemapanel", props.className)} />
);

export default Skjemapanel;
