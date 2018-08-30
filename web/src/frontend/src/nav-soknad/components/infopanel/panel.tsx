import * as React from "react";

interface OwnState {
	actionReceivedButNotCompleted: boolean;
	currentAction: PanelAction;
	vises: boolean;
}

interface OwnProps {
	children?: React.ReactNode;
	panelAction?: PanelAction;
	onFinishedFadingIn?: () => void;
	onFinishedFadingOut?: () => void;
}

export enum PanelAction {
	FADE_IN = "fade_in",
	FADE_OUT = "fade_out",
	ALWAYS_SHOW = "always_show",
	NO_OPERATION = "no_operation"
}

export enum PanelFadeClassName {
	FADE_IN = "infopanel_fade_in",
	FADE_OUT = "infopanel_fade_out"
}

class Panel extends React.Component<OwnProps, OwnState> {

	constructor(props: OwnProps){
		super(props);
		this.state = {
			actionReceivedButNotCompleted: false,
			currentAction: PanelAction.NO_OPERATION,
			vises: false,
		}
	}

	componentDidUpdate(){

		if (this.props.panelAction === PanelAction.FADE_IN && this.state.currentAction !== PanelAction.FADE_IN){

			this.props.onFinishedFadingIn();
			this.setState({
				currentAction: PanelAction.FADE_IN
			})
		}

		if (this.props.panelAction === PanelAction.FADE_OUT && this.state.currentAction !== PanelAction.FADE_OUT){
			setTimeout(()=> {
				this.props.onFinishedFadingOut();
				this.setState({
					currentAction: PanelAction.FADE_OUT
				})
			},500);
		}
	}

	render() {

		const classNameTo: string = "infopanel_fade_in";

		const classNameAddition: string = this.props.panelAction === PanelAction.FADE_IN
			? ""
			: PanelFadeClassName.FADE_OUT;

		const className = classNameTo + " " + classNameAddition;

		return (
				<div className={ className }>
					{ this.props.children }
				</div>
			)
	}

}

export default Panel;
