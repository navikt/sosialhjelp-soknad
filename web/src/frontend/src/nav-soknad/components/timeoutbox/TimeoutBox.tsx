import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
// import Nedtelling from "./Nedtelling";
import "./timeoutbox.css";
import LoggetUt from "./LoggetUt";

interface State {
	apen: boolean;
	remainingTime: number;
}

class TimeoutBox extends React.Component<{}, State> {

	constructor(props: {}) {
		super(props);
		this.state = {
			apen: true,
			remainingTime: 12345
		};
	}

	onCloseModal() {
		this.setState({ apen: !this.state.apen });
	}
	onLoginAgainClick() {
		this.setState({ apen: !this.state.apen });
	}

	onContinueClick() {
		this.setState({ remainingTime: 12345, apen: !this.state.apen  });
	}

	render() {
		return (
			<NavFrontendModal
				isOpen={this.state.apen}
				contentLabel="Fortsett"
				onRequestClose={() => {
					this.onCloseModal();
				}}
			>
				<LoggetUt
					onLoginAgainClick={() => {
					this.onLoginAgainClick();
					}}
				/>
				{/*<Nedtelling*/}
					{/*remainingTime={this.state.remainingTime}*/}
					{/*onContinueClick={() => {*/}
						{/*this.onContinueClick();*/}
					{/*}}/>*/}

			</NavFrontendModal>
		);
	}
}

export default TimeoutBox;
