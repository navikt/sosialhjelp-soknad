import * as React from "react";
import NavFrontendModal from "nav-frontend-modal";
import Nedtelling from "./Nedtelling";
import LoggetUt from "./LoggetUt";
import "./timeoutbox.css";

interface State {
	sesjonGarUt: number;
	visAdvarsel: number;
	apen: boolean;
	sjekkGjenstaendeTid: any;
}

interface Props {
	sessionDurationInMinutes: number;
	showWarningerAfterMinutes: number;
}

const now = () => {
	return new Date().getTime();
};

class TimeoutBox extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			sesjonGarUt: now() + 1000, // (this.props.sessionDurationInMinutes * 60 * 1000),
			visAdvarsel: now() + (this.props.showWarningerAfterMinutes * 60 * 1000),
			apen: false,
			sjekkGjenstaendeTid: null
		};
	}

	componentWillMount() {
		const sjekkGjenstaendeTid = setInterval(() => {
			const tidIgjenAvSesjon = this.state.sesjonGarUt - now();
			const tidIgjenForAdvarsel = this.state.visAdvarsel - now();
			const apen = (tidIgjenAvSesjon < 0) || (tidIgjenForAdvarsel < 0);
			this.setState({
				apen
			});
		}, 1000);
		this.setState({sjekkGjenstaendeTid});
	}

	componentWillUnmount() {
		clearInterval(this.state.sjekkGjenstaendeTid);
	}

	onCloseModal() {
		this.setState({ apen: false });
	}

	onLoginAgainClick() {
		window.location.reload();
	}

	onContinueClick() {
		this.setState({
			sesjonGarUt: now() + (this.props.sessionDurationInMinutes * 60 * 1000),
			apen: false
		});
	}

	render() {
		const visAdvarsel = ((this.state.visAdvarsel - now()) < 0);
		return (
			<NavFrontendModal
				isOpen={this.state.apen}
				contentLabel="Fortsett"
				onRequestClose={() => {
					this.onCloseModal();
				}}
			>
				{visAdvarsel && (
					<Nedtelling
						remainingTime={this.state.sesjonGarUt - now()}
						onContinueClick={() => {
							this.onContinueClick();
						}}/>
				)}
				{!visAdvarsel && (
					<LoggetUt
						onLoginAgainClick={() => {
							this.onLoginAgainClick();
						}}
					/>
				)}
			</NavFrontendModal>
		);
	}
}

export default TimeoutBox;
