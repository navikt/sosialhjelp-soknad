import * as React from "react";

interface Props {
	children: React.ReactNode;
	faktum: string;
}

const logEvt = (evt: any) => {
	console.log(evt.target.checked);
};

const WhatNot: React.StatelessComponent<Props> = (props: Props) =>
	<div onChange={logEvt}>
		{props.children}
	</div>;

export default WhatNot;
