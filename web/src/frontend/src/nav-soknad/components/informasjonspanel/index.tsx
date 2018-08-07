import * as React from "react";
import { Collapse } from "react-collapse";

interface OwnProps {
	style?: string;
	icon?: any;
	children?: any;
	synlig?: boolean;
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

	renderIkon() {
		const SVG_FOLDER = "/soknadsosialhjelp/statisk/bilder/";
		let icon = this.props.icon;
		if (typeof this.props.icon === "string") {
			icon = (<img src={SVG_FOLDER + this.props.icon}/>);
		}
		if (typeof this.props.icon === "undefined") {
			icon = (<img src={SVG_FOLDER + "illustrasjon_ella.svg"}/>);
		}
		return icon;
	}

	renderContent(fadeIn: boolean) {
		const styleClassName = (this.props.style != null)
			? "skjema-informasjonspanel-" + this.props.style
			: "";
		return (
			<div className="skjema-informasjonspanel-wrapper">
				<div
					className={
						"skjema-informasjonspanel " + styleClassName
						+ (this.props.synlig || fadeIn === false ? " skjema-informasjonspanel__synlig" : "")
					}
				>
					<div>{this.renderIkon()}</div>
					<span>{this.props.children}</span>
				</div>
			</div>
		);
	}
	render() {
		const isOpened = this.state.vises && this.props.synlig;
		if (typeof isOpened === "undefined") {
			return this.renderContent(false);
		} else {
			return (
				<Collapse
					id="info-panel-collapse"
					isOpened={isOpened}
				>
					{this.renderContent(true)}
				</Collapse>
			);
		}
	}

}

export default Informasjonspanel;
