import * as React from "react";
import { Collapse } from "react-collapse";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";

interface OwnProps {
	farge: NavFarger;
	children?: any;
	synlig?: boolean;
	ikon: InformasjonspanelIkon;
}

interface State {
	vises: boolean;
}

export enum InformasjonspanelIkon {
	ELLA = "ella",
	// WILLIAM = "william",
	BREVKONVOLUTT = "brevkonvolutt"
}

export enum NavFarger {
	GRONN = "",
	ADVARSEL = "advarsel",
	FEIL = "feil"
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

	getIkonFargeKode(informasjonspanelFarge: NavFarger){
		switch (informasjonspanelFarge) {
			case "": {
				return DigisosFarge.OK_LYS_GRONN
			}
			case "advarsel": {
				return DigisosFarge.ADVARSEL
			}
			case "feil": {
				return DigisosFarge.FEIL
			}
			default: {
				return DigisosFarge.OK_LYS_GRONN
			}
		}
	}

	renderIkon() {

		switch (this.props.ikon){
			case "ella": {
				return <Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.getIkonFargeKode(this.props.farge)}/>;
			}
			case "brevkonvolutt": {
				return <Brevkonvolutt size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.getIkonFargeKode(this.props.farge)}/>
			}
			default: {
				return <Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.getIkonFargeKode(this.props.farge)}/>;
			}
		}
	}

	renderContent(fadeIn: boolean) {
		const styleClassName = (this.props.farge)
			? "skjema-informasjonspanel-" + this.props.farge
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
