import * as React from "react";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";
import Hensyn from "../svg/Hensyn";
import { erMobilVisning } from "../../utils/domUtils";
import EllaKompakt from "../svg/EllaKompakt";

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
		const iconSize = erMobilVisning() ? 64 : 80;

		let ikon = <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>;
		let mobilikon = <EllaKompakt bakgrundsFarge={this.props.farge}/>;

		switch (this.props.ikon){
			case InformasjonspanelIkon.BREVKONVOLUTT: {
				ikon =  <Brevkonvolutt size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
				mobilikon = ikon
			}
			case InformasjonspanelIkon.HENSYN: {
				ikon = <Hensyn size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
				mobilikon = ikon
			}
		}

		return (
			<div>
				<div className="ikke_mobilvennlig_ikon">
					{{ ikon }}
				</div>

				<div className="mobilvennlig_ikon">
					{{ mobilikon }}
				</div>
			</div>
		)
	}

	render() {

		return (
			<div className="informasjonspanelToWrapper">
				<div className="informasjonspanelTo">
					<div className="informasjonspanelTo__ikon">{this.renderIkon()}</div>
					<span className="informasjonspanelTo__tekst">{this.props.children}</span>
				</div>
			</div>
		)
	}

}

export default Informasjonspanel;
