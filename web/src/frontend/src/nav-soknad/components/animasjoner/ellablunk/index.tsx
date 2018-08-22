import * as React from 'react'
import Lottie from 'react-lottie';
import blunkedamedata from './blunkedamedata.json'

export interface OwnProps {
	height?: number;
}

export default class EllaBlunk extends React.Component<OwnProps, any> {

	constructor(props: OwnProps) {
		super(props);
		this.state = {isStopped: false, isPaused: false};
	}

	render() {

		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData: blunkedamedata,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		};

		const blunkeDameAspectRatio = 100/168;
		const height = this.props.height ? this.props.height : 168;
		const width = height*blunkeDameAspectRatio;

		return (
			<div>
				<Lottie
					options={defaultOptions}
					height={height}
					width={width}
					isStopped={this.state.isStopped}
					isPaused={this.state.isPaused}
				/>
			</div>
		)
	}
}