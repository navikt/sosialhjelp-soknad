import * as React from "react";

interface Props {
	tittel: string | undefined;
}

class MockDataBolkWrapper extends React.Component<Props, {}>{

	render(){

		const children = this.props.children;

		return (
			<div className="mock-data-bolk">
				{ this.props.tittel &&
					<div className="mock-data-bolk__tittel"> {this.props.tittel} </div>
				}
				<div className="mock-data-bolk__body">
					{ children }
				</div>
			</div>
		)
	}
}

export default MockDataBolkWrapper;