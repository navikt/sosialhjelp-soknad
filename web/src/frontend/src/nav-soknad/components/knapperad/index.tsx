import * as React from "react";
import { Knapp } from "nav-frontend-knapper";

interface Props {
	gaViderePending?: boolean;
	gaVidereLabel?: string;
	gaVidere?: () => void;
	gaTilbake?: () => void;
	avbryt?: () => void;
}

class SkjemaKnapperad extends React.Component<Props, {}> {
	render() {
		const { gaVidere, gaTilbake, avbryt, gaVidereLabel } = this.props;
		return (
			<div className="skjema-knapperad">
				<Knapp
					type="hoved"
					htmlType="button"
					onClick={gaVidere}
					spinner={this.props.gaViderePending}
				>
					{gaVidereLabel ? gaVidereLabel : "Gå videre"}
				</Knapp>
				<Knapp type="standard" htmlType="button" onClick={gaTilbake}>
					Tilbake
				</Knapp>
				<a href="#" className="lenke" onClick={avbryt}>
					Avbryt
				</a>
			</div>
		);
	}
}

export default SkjemaKnapperad;
