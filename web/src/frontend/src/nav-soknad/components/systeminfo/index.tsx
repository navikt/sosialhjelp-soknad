import * as React from "react";
import Underskjema from "../underskjema";

interface Props {
	children: React.ReactNode;
}

const Systeminfo: React.StatelessComponent<Props> = (props: Props) => (
	<Underskjema arrow={false} visible={true} collapsable={false}>
		{props.children}
	</Underskjema>
);

export default Systeminfo;
