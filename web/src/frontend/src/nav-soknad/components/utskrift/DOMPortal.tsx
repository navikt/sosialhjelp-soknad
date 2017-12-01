import * as React from "react";

import {
	unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
	unmountComponentAtNode
} from "react-dom";

export interface Props extends React.Props<any> {
	renderTargetId?: string;
}

class DOMPortal extends React.Component<Props, {}> {
	node: HTMLElement;
	layer: Element;

	constructor(props: Props) {
		super(props);
		this.renderLayer = this.renderLayer.bind(this);
		this.getTargetNode = this.getTargetNode.bind(this);
	}

	componentDidMount() {
		this.node = document.createElement("div");
		this.node.className = "DOMPortal";
		this.getTargetNode().appendChild(this.node);
		this.renderLayer(this.props);
	}

	componentWillReceiveProps(newProps: Props) {
		this.renderLayer(newProps);
	}

	componentWillUnmount() {
		unmountComponentAtNode(this.node);
		this.getTargetNode().removeChild(this.node);
	}

	getTargetNode() {
		if (this.props.renderTargetId) {
			return document.getElementById(this.props.renderTargetId);
		}
		return document.body;
	}

	renderLayer(props: Props) {
		this.layer = renderSubtreeIntoContainer(
			this,
			<div>{props.children}</div>,
			this.node
		) as Element;
	}

	render() {
		return <noscript />;
	}
}

export default DOMPortal;
