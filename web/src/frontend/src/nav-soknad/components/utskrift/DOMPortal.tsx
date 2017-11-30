import * as React from "react";

import {
	unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer,
	unmountComponentAtNode
} from "react-dom";

export type Props = React.Props<any>;

class DOMPortal extends React.Component<Props, {}> {
	node: HTMLElement;
	layer: Element;

	constructor(props: Props) {
		super(props);
		this.renderLayer = this.renderLayer.bind(this);
	}

	componentDidMount() {
		this.node = document.createElement("div");
		this.node.className = "DOMPortal";
		document.body.appendChild(this.node);
		this.renderLayer(this.props);
	}

	componentWillReceiveProps(newProps: Props) {
		this.renderLayer(newProps);
	}

	componentWillUnmount() {
		unmountComponentAtNode(this.node);
		document.body.removeChild(this.node);
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
