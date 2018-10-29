import * as React from "react";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";
import Hensyn from "../svg/Hensyn";

interface OwnProps {
	farge: DigisosFarge;
	children?: any;
	ikon: InformasjonspanelIkon;
}

export enum InformasjonspanelIkon {
	ELLA = "ella",
	BREVKONVOLUTT = "brevkonvolutt",
	HENSYN = "hensyn"
}

class Informasjonspanel extends React.Component<OwnProps, {}> {

	renderIkon() {

		let ikon = (<Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>);
		let mobilikon = (<Ella size={64} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>);

		switch (this.props.ikon){
			case InformasjonspanelIkon.BREVKONVOLUTT: {
				ikon =  (<Brevkonvolutt size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>);
				mobilikon = (<Brevkonvolutt size={64} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>);
			}
			case InformasjonspanelIkon.HENSYN: {
				ikon = (<Hensyn size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>);
				mobilikon = (<Hensyn size={64} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>);
			}
		}

		return (
			<div>
				<div className="ikke_mobilvennlig_ikon">
					{ ikon }
				</div>
				<div className="mobilvennlig_ikon">
					{ mobilikon }
				</div>
			</div>
		)
	}

	render() {

		const informasjonspanelClassName = this.props.farge ?
			"informasjonspanel informasjonspanel__" + this.props.farge :
			"informasjonspanel informasjonspanel__navGronnLighten40";

		return (
			<div className="informasjonspanelWrapper">
				<div className={informasjonspanelClassName}>
					{this.renderIkon()}
					<span className="informasjonspanel__tekst">{this.props.children}</span>
				</div>
			</div>
		)
	}

}

export default Informasjonspanel;
