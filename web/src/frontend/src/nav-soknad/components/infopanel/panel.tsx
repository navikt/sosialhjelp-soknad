import * as React from "react";

interface OwnState {
	actionReceivedButNotCompleted: boolean;
	currentAction: PanelAction;
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
			currentAction: PanelAction.NO_OPERATION
		}
	}

	componentDidUpdate(){
		if (this.props.panelAction === PanelAction.FADE_IN && this.state.actionReceivedButNotCompleted){
			this.props.onFinishedFadingIn();
			this.setState({
				actionReceivedButNotCompleted: false
			})

		}

		if (this.props.panelAction === PanelAction.FADE_OUT && this.state.actionReceivedButNotCompleted){
			this.props.onFinishedFadingOut();
		}
	}

	componentWillReceiveProps(){
		if (this.props.panelAction !== this.state.currentAction){
			this.setState({
				actionReceivedButNotCompleted: true,
				currentAction: this.props.panelAction
			})
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
				<div>
					{ "className: " + className }
				</div>
				<div>
					{ this.props.children }
				</div>
			</div>
			)
	}

}

export default Panel;
