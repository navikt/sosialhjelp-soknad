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

class FadeCollapsePanel extends React.Component<OwnProps, OwnState> {

	constructor(props: OwnProps){
		super(props);
		this.state = {
			actionReceivedButNotCompleted: false,
			currentAction: PanelAction.NO_OPERATION,
			vises: false,
		}
	}

	componentDidUpdate() {

		if (this.props.panelAction === PanelAction.FADE_IN && this.state.currentAction !== PanelAction.FADE_IN){

			if (this.props.onFinishedFadingIn){
				this.props.onFinishedFadingIn();
			}
			this.setState({
				currentAction: PanelAction.FADE_IN
			})
		}

		if (this.props.panelAction === PanelAction.FADE_OUT && this.state.currentAction !== PanelAction.FADE_OUT){
			setTimeout(()=> {
				if(this.props.onFinishedFadingOut){
					this.props.onFinishedFadingOut();
				}
				this.setState({
					currentAction: PanelAction.FADE_OUT
				})
			},750);
		}
	}

	render() {

		const className = "fadeCollapsePanel__" + this.props.panelAction;

		return (
				<div className={ "fadeCollapsePanel " + className }>
					{ this.props.children }
				</div>
			)
	}

}

export default FadeCollapsePanel;
