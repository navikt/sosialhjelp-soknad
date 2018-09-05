import * as React from 'react';
import Lottie from 'react-lottie';
import blunkedamedata from './blunkedamedata.json';

export interface OwnProps {
	hoyde?: number;
	erStoppet?: boolean | null;
	erPauset?: boolean | null;
}

export default class EllaBlunk extends React.Component<OwnProps, any> {

	constructor(props: OwnProps) {
		super(props);
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
		const hoyde = this.props.hoyde ? this.props.hoyde : 168;
		const bredde = hoyde*blunkeDameAspectRatio;

		return (
			<div className="ellablunk_bakgrunn_wrapper">
				<div className="ellablunk_bakgrunn">
					<Lottie
						options={defaultOptions}
						height={hoyde}
						width={bredde}
						isStopped={this.props.erStoppet}
						isPaused={this.props.erPauset}
					/>
				</div>
			</div>
		)
	}
}