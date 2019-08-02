import * as React from "react";

class Snakkeboble extends React.Component<{children: React.ReactNode}, {}> {

	render() {
		return (
			<div className="digisos-snakkeboble-wrapper">
				<div className="digisos-snakkeboble">
					<div className="digisos-snakkeboble-innhold">
						{this.props.children}
					</div>
					<i className="digisos-snakkeboble-pil"/>
				</div>
			</div>
		);
	}
}

export default Snakkeboble;
