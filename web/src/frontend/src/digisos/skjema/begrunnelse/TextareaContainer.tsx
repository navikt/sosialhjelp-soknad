import * as React from "react";

class TextareaContainer extends React.Component<{faktumKey: string, children: React.ReactNode}, {}> {

	render() {
		return (
			<span>{this.props.children}</span>
		);
	}
}

export default TextareaContainer;
