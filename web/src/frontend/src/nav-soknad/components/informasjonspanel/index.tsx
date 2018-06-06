import * as React from "react";

interface OwnProps {
	style?: string;
	icon?: any;
	children?: any;
	synlig?: boolean;
}

const Informasjonspanel: React.StatelessComponent<OwnProps> = (props: OwnProps) => {
	const styleClassName = (props.style != null)
			? "skjema-informasjonspanel-" + props.style
			: "";

	return (
		<div
			className={
				"skjema-informasjonspanel " + styleClassName
				+ (props.synlig ? " skjema-informasjonspanel__synlig" : "")
			}
		>
			<div>{props.icon}</div>
			<span>{props.children}</span>
		</div>
	);
};

export default Informasjonspanel;
