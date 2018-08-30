import * as React from "react";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";

interface OwnProps {
	farge: DigisosFarge;
	children?: any;
	ikon: InfoBoksDesignIkon;
}

export enum InfoBoksDesignIkon {
	ELLA = "ella",
	BREVKONVOLUTT = "brevkonvolutt"
}

class InfoBoksDesign extends React.Component<OwnProps, {}> {


	renderIkon() {

		switch (this.props.ikon){
			case "ella": {
				return <Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>;
			}
			case "brevkonvolutt": {
				return <Brevkonvolutt size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
			}
			default: {
				return <Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>;
			}
		}
	}

	render() {

		const kantFarge = this.props.farge ? "infoboksdesign-" + this.props.farge : "";

		return (
			<div className="infoboksdesign-wrapper">
				<div className={"infoboksdesign" + " "+ kantFarge}>
					<div>{this.renderIkon()}</div>
					<span>{this.props.children}</span>
				</div>
			</div>
		);
	}

}

export default InfoBoksDesign;
