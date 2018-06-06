import * as React from "react";

interface OwnProps {
	style?: string;
	icon?: any;
	children?: any;
}

interface State {
	vises: boolean;
}

class Informasjonspanel extends React.Component<OwnProps, State> {

	constructor(props: OwnProps) {
		super(props);
		this.state = {
			vises: false
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({vises: true});
		}, 200);
	}

	render() {
		const styleClassName = (this.props.style != null)
			? "skjema-informasjonspanel-" + this.props.style
			: "";

		return (
				<div
				className={
					"skjema-informasjonspanel " + styleClassName
					+ (this.state.vises ? " skjema-informasjonspanel__synlig" : "")
				}
				>
				<div>{this.props.icon}</div>
				<span>{this.props.children}</span>
				</div>
		);
	}

}

export default Informasjonspanel;
