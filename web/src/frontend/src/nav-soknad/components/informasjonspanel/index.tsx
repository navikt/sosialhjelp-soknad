import * as React from "react";
import { Collapse } from "react-collapse";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";
import Hensyn from "../svg/Hensyn";
import { erMobilVisning } from "../../utils/domUtils";
import EllaKompakt from "../svg/EllaKompakt";

interface OwnProps {
	farge: DigisosFarge;
	children?: any;
	synlig?: boolean;
	ikon: InformasjonspanelIkon;
}

interface State {
	vises: boolean;
}

export enum InformasjonspanelIkon {
	ELLA = "ella",
	BREVKONVOLUTT = "brevkonvolutt",
	HENSYN = "hensyn"
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
		const iconSize = erMobilVisning() ? 64 : 80;
		switch (this.props.ikon){
			case InformasjonspanelIkon.ELLA: {
				return (
					<div>
						<div className="ikke_mobilvennlig_ikon">
							<Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
						</div>

						<div className="mobilvennlig_ikon">
							<EllaKompakt bakgrundsFarge={this.props.farge}/>
						</div>
					</div>
				);
			}
			case InformasjonspanelIkon.BREVKONVOLUTT: {
				return <Brevkonvolutt size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
			}
			case InformasjonspanelIkon.HENSYN: {
				return <Hensyn size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
			}
			default: {
				return <Ella size={iconSize} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>;
			}
		}
	}

	renderContent(fadeIn: boolean) {
		const styleClassName = "skjema-informasjonspanel-" + this.props.farge;

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
					className="react-collapse-konfigurering"
				>
					{this.renderContent(true)}
				</Collapse>
			);
		}
	}

}

export default Informasjonspanel;
