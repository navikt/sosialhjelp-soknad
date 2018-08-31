import * as React from "react";
import { Collapse } from "react-collapse";
import Panel, {PanelAction } from "./panel";


interface OwnProps {
	children?: any;
	initialState: CollapseState;
	open: boolean;
}

interface State {
	collapseState: CollapseState;
	vises: boolean;
}

export enum CollapseState {
	COLLAPSED = "collapsed",
	CONTENT_FADED_IN = "CONTENT_FADED_IN",
	EXPANDED = "expanded",
	CONTENT_FADED_OUT = "CONTENT_FADED_OUT",
}


class InfoPanel extends React.Component<OwnProps, State> {

	constructor(props: OwnProps) {
		super(props);
		this.state = {
			collapseState: CollapseState.COLLAPSED,
			vises: false
		};
	}

	contentFadedIn(){
		this.setState({
			collapseState: CollapseState.CONTENT_FADED_IN
		})
	}

	contentFadedOut(){
		this.setState({
			collapseState: CollapseState.CONTENT_FADED_OUT
		})
	}

	handleOnRest(isOpened: boolean){

		if (isOpened && this.state.collapseState === CollapseState.COLLAPSED) {
			this.setState({
				collapseState: CollapseState.EXPANDED
			})
		}
		if(!isOpened && this.state.collapseState === CollapseState.CONTENT_FADED_OUT) {

			this.setState({
				collapseState: CollapseState.COLLAPSED
			})
		}
	}

	render() {

		const open = this.props.open;

		let isOpened = false;
		let panelAction: PanelAction = PanelAction.NO_OPERATION;

		const margin: string = this.state.collapseState === CollapseState.EXPANDED ||
						this.state.collapseState === CollapseState.CONTENT_FADED_IN ?
						"add-margin-smoothly" : "remove-margin-smoothly";

		if (open){
			switch (this.state.collapseState){
				case CollapseState.COLLAPSED: {
					isOpened = true;
					panelAction = PanelAction.FADE_IN;
					break;
				}
				case CollapseState.EXPANDED: {
					isOpened = true;
					panelAction = PanelAction.FADE_IN;
					break;
				}
				case CollapseState.CONTENT_FADED_IN: {
					isOpened = true;
					panelAction = PanelAction.FADE_IN;
					break;
				}
				case CollapseState.CONTENT_FADED_OUT: {
					isOpened = true;
					panelAction = PanelAction.FADE_IN;
					break;
				}
			}
		} else {
			switch (this.state.collapseState){
				case CollapseState.COLLAPSED: {
					isOpened = false;
					panelAction = PanelAction.FADE_OUT;
					break;
				}
				case CollapseState.EXPANDED: {
					isOpened = false;
					panelAction = PanelAction.FADE_IN;
					break;
				}
				case CollapseState.CONTENT_FADED_IN: {
					isOpened = true;
					panelAction = PanelAction.FADE_OUT;
					break;
				}
				case CollapseState.CONTENT_FADED_OUT: {
					isOpened = false;
					panelAction = PanelAction.FADE_OUT;
					break;
				}
			}
		}

		return (
				<Collapse
					isOpened={isOpened}
					className={"infopanel react-collapse-konfigurering " + margin }
					onRest={() => this.handleOnRest(isOpened)}
				>
					<Panel
						onFinishedFadingIn={() => this.contentFadedIn()}
						onFinishedFadingOut={() => this.contentFadedOut()}
						panelAction={panelAction}
					>
						{this.props.children}
					</Panel>

				</Collapse>
		);

	}
}

export default InfoPanel;
