import * as React from "react";
import { Collapse } from "react-collapse";
import Ella from "../svg/Ella";
import Brevkonvolutt from "../svg/Brevkonvolutt";
import {DigisosFarge} from "../svg/DigisosFarger";
import Hensyn from "../svg/Hensyn";

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

		switch (this.props.ikon){
			case InformasjonspanelIkon.ELLA: {
				return <Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>;
			}
			case InformasjonspanelIkon.BREVKONVOLUTT: {
				return <Brevkonvolutt size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
			}
			case InformasjonspanelIkon.HENSYN: {
				return <Hensyn size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>
			}
			default: {
				return <Ella size={80} visBakgrundsSirkel={true} bakgrundsFarge={this.props.farge}/>;
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
