import * as React from "react";
import { connect } from "react-redux";
import NavFrontendModal from "nav-frontend-modal";
import Nedtelling from "./Nedtelling";
import LoggetUt from "./LoggetUt";
import { REST_STATUS } from "../../types/restTypes";
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
	restStatus: string;
}

const now = () => {
	return new Date().getTime();
};

class TimeoutBox extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			sesjonGarUt: this.sesjonGarUtTidspunkt(),
			visAdvarsel: this.visAdvarselTidspunkt(),
			apen: false,
			sjekkGjenstaendeTid: null
		};
	}

	sesjonGarUtTidspunkt(): number {
		return now() + 5000; // + (this.props.sessionDurationInMinutes * 60 * 1000);
	}

	visAdvarselTidspunkt(): number {
		return now() + 3000; // + (this.props.showWarningerAfterMinutes * 60 * 1000);
	}
	componentWillMount() {
		console.log("TimeoutBox.componentWillMount()");
		const sjekkGjenstaendeTid = setInterval(() => {
			const tidIgjenAvSesjon = this.state.sesjonGarUt - now();
			const tidIgjenForAdvarsel = this.state.visAdvarsel - now();
			const apen = (tidIgjenAvSesjon < 0) || (tidIgjenForAdvarsel < 0);
			this.setState({
				apen
			});
			// if (tidIgjenForAdvarsel > 0 && tidIgjenAvSesjon > 0) {
			// 	console.log("Tid igjen:\n" +
			// 		"  Advarsel  : " + Math.round( tidIgjenForAdvarsel / 1000 ) + " sekunder.\n" +
			// 		"  Utlogging : " + Math.round( tidIgjenAvSesjon / 1000 ) + " sekunder."
			// 	);
			// }
		}, 1000);
		this.setState({sjekkGjenstaendeTid});
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.restStatus === REST_STATUS.PENDING && this.props.restStatus === REST_STATUS.OK) {
			this.setState({
				sesjonGarUt: this.sesjonGarUtTidspunkt(),
				visAdvarsel: this.visAdvarselTidspunkt(),
				apen: false
			});
		}
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
			sesjonGarUt: this.sesjonGarUtTidspunkt(),
			visAdvarsel: this.visAdvarselTidspunkt(),
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
				<div className="timeoutbox">
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
				</div>
			</NavFrontendModal>
		);
	}
}

export default connect((state: any, props: any) => {
	return {
		restStatus: state.fakta.restStatus
	};
})(TimeoutBox);
