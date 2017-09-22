import * as React from "react";
import { Knapp } from "nav-frontend-knapper";
import "./knapperad.css";

interface Props {
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
				<Knapp type="hoved" htmlType="button" onClick={gaVidere} id="ga_videre">
					{gaVidereLabel ? gaVidereLabel : "Gå videre"}
				</Knapp>
				<Knapp type="standard" htmlType="button" onClick={gaTilbake} id="ga_tilbake">
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
